

import { exec } from "child_process";

import { app, BrowserWindow,ipcMain,dialog } from 'electron';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import Busboy from "busboy";
import wifi from "node-wifi";
import os from "os";


import express from "express";




const app2 = express();
const expressapp = express();


const __dirname = path.dirname(fileURLToPath(import.meta.url));
let win=null;

app2.use('/assets', express.static(path.join(__dirname, 'dist','assets')));

app2.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app2.listen(5175,"0.0.0.0",()=>{console.log("app2 is listenig")})

const EXPRESS_PORT=8000


const createWindow = ()=>{
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: false,
            preload: path.join(__dirname, 'preload.js'),  // Link to preload.js
        },
    })
    

        // win.loadFile('dist/index.html')
        win.loadURL('http://localhost:5175')
            .then(() => {
                console.log(`Successfully loaded dev server URL`);
            })
            .catch(err => {
                console.error('Failed to load dev server URL:', err);
            });
    

    win.setMenu(null);
    win.setAutoHideMenuBar(true);
}


app.whenReady().then(()=>{
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('close', () => {

    app.quit();
});












let uploadsPaths;
let directFilePaths={}
let dialogOpen=false;
let recieveFlag = false
let ip_port = null
let server=null;









ipcMain.handle('get-ssids', async () => {
    
    return new Promise((resolve, reject) => 
        {


            wifi.init({ iface: null });
            wifi.getCurrentConnections((error, currentConnections) => {
            if (error) {
                return reject(new Error("Error getting Wi-Fi information"));
            }

            if (currentConnections.length === 0) {
                return reject(new Error("No active Wi-Fi"));
            }

            const current = currentConnections[0]; // assumption that only 1 active Wi-Fi

            return resolve(current.mac)

            }

            )
    }
);
});



ipcMain.handle('connect-wifi-ifnot-connected', async (ssid) => {
    
    return new Promise((resolve,reject) => {
        exec(
            `netsh wlan connect ssid="${ssid}" name="${ssid}"`,
            (err, _, __) => {
                if (err) return reject(err);
                resolve(ssid);
            }
        )
    })
});













ipcMain.handle('get-ip', async () => {
    return new Promise((resolve,reject)=>{
        const interfaces = os.networkInterfaces();
        let localIp = null;
        for (const ifaceName in interfaces) {
            if(ifaceName === "Wi-Fi") {
                const ifaceList = interfaces[ifaceName];
    
                for (const iface of ifaceList) {
                    if (
                        iface.family === 'IPv4' &&
                        !iface.internal 
                        // iface.netmask === '255.255.255.0' 
                    ) {
                        localIp = iface.address;
                        resolve(localIp)
                    }
                }
    
    
            } else {
                console.log("No wifis found")
            }
        }
        reject(new Error("No wifis found"))
            
    })
});





ipcMain.handle('get-ip-2', async () => {
    return new Promise((resolve,reject)=>{
   
        try {
            const interfaces = os.networkInterfaces();
            resolve(interfaces); 
        } catch (err) {
            console.log("❌ Error in get-ip-2:");
            reject(err); 
        }
            
    })
});









ipcMain.handle("start-express", async (_,particular_host)=>{

    server = expressapp.listen(EXPRESS_PORT,particular_host,()=>{
        // console.log(`Server is listening on ${particular_host}:${EXPRESS_PORT}`)
        ip_port=`${particular_host}:${EXPRESS_PORT}`
    })

    


    


    expressapp.get("/",(_,res)=>{
        try   
        {
            const filepath = path.resolve(__dirname,"src","client","client.html")
            // console.log("this is req.socket.remoteipaddress : ",req.socket.remoteAddress)
            // console.log("this is req.ip : ",req.ip) // just shortcut for... req.headers['x-forwarded-for'] || req.socket.remoteAddress
            // console.log("this is req.ips : ",req.ips)
            // console.log("this is req.headers.host : ",req.headers.host)
            // console.log("this is req.headers['xforwarddedfor'] : ",req.headers['x-forwarded-for'])
            // console.log(req.host+" gateway/router with port") // gateway/router with port
            // console.log(req.hostname+" gateway/router") // gateway/router
            // console.log(req.headers['x-forwarded-for']+" This contains the array of forwarded ips the zeroth ip is the original ip") // This contains the array of forwarded ips the zeroth ip is the original ip
            // console.log(req.connection.remoteAddress+" IP address of the immediate TCP connection to your server.") //IP address of the immediate TCP connection to your server.
            const data = fs.readFileSync(filepath,"utf8")
            const finalClientWebpage = data.replace(/__HOST__/g,particular_host).replace(/__PORT__/g,EXPRESS_PORT)
            res.send(finalClientWebpage)

        }
        catch
        {
            res.status(500).send("Error HTML file");
            return false
        }
    })

    expressapp.get("/manifest.json", (_, res) => {
        const manifestPath = path.resolve(__dirname, "src", "client", "manifest.json");
        res.type("application/manifest+json");
        res.sendFile(manifestPath);
    });

    expressapp.get("/get/isready",(_,res)=>{
        if(Object.keys(directFilePaths).length) {
            const response=[]
            for(const key of Object.keys(directFilePaths)){
                response.push(key)
            }
            res.status(200).json(response)
        } else {
            res.status(500).send("First allow send button of server") // this function sends res immediately
        } 
    })
    expressapp.get("/post/isready",(req,res)=>{
        if(recieveFlag){
            res.sendStatus(200)
        } else {
            if(uploadsPaths){
                res.status(500).send("Turn on recieve button of server")
            } else {
                res.status(501).send("First select a save directory in the server")
            }
        }
    })
    expressapp.get("/get/:filename",(req,res)=>{
        const filename=decodeURIComponent(req.params.filename)
        const filepath = directFilePaths[filename]
        res.download(filepath)
    })
    expressapp.post("/post/",async (req,res)=>{

        
        const busboy = Busboy({ headers: req.headers });


        busboy.on("file", (_, file, fileWrapps) => {

            const saveDir = path.join(uploadsPaths,"Data_Sharing")
            const savePath = path.join(saveDir,fileWrapps.filename)
            if (!fs.existsSync(saveDir)) {
                fs.mkdirSync(saveDir, { recursive: true });
            }
            const writeStream = fs.createWriteStream(savePath)
            file.pipe(writeStream)
            writeStream.on("close",()=>{
                const stats = fs.statSync(savePath);
                const sizeInBytes = stats.size;
                win.webContents.send('update-span', {filename:fileWrapps.filename,filesize:(sizeInBytes/(1024*1024)).toFixed(2)});
            })
        });

        busboy.on("finish", () => {
            console.log("All files uploaded");
            res.status(200).send("Upload complete");
            
        });

        req.pipe(busboy);

    })

return true
})







ipcMain.handle("stop-express", async ()=>{
    try {

        if (server) {
            server.close(() => {
                directFilePaths={}
                recieveFlag=false
                ip_port=null;
                uploadsPaths=null;
                console.log("Express server closed.");
            });
            server = null;  // Clear reference
        }

    } catch (error) {
        console.error("Error closing servers:", error);
    }


})






ipcMain.handle("send-the-files", async ()=>{
    directFilePaths={}
    if (dialogOpen) {
        dialogOpen=false
        return { canceled: true, filePaths: [] };
    }
        dialogOpen=true
        const filesPaths = await dialog.showOpenDialog(
            {
                title:"Pick files by CTRL + Click each file",
                properties:['openFile','multiSelections']
            }
        )
        console.log(filesPaths)
        

        dialogOpen=false

        const fileDetails = filesPaths.filePaths.map((filepath)=>{
            const fileStats = fs.statSync(filepath)
            directFilePaths[path.basename(filepath)] = filepath
            return {
            path: filepath,  
            size: Number(((fileStats.size)/(1024*1024)).toFixed(3)),           // Get the file size in Mbytes
        };
        })

        if (filesPaths.canceled || !filesPaths.filePaths.length) {
            return null;
        }

        
         
        return fileDetails
 


})

ipcMain.handle("stop-send-the-files",()=>{

    directFilePaths={}
    return true
})




ipcMain.handle("allow-to-recieve", async ()=>{
    const dirpickedobject = await dialog.showOpenDialog(
            {
                title:"Pick directory to recieve files...",
                properties:['openDirectory']
            }
        )
        uploadsPaths=dirpickedobject.filePaths[0]
    if(uploadsPaths){
        recieveFlag=true
        return true
    }
    return false
})
ipcMain.handle("refuse-to-recieve", async ()=>{
    uploadsPaths=null
    recieveFlag=false
    return true
})




ipcMain.handle("get-ip-quickly",()=>(ip_port))


