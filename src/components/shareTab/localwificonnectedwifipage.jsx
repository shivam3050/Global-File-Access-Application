import { useEffect,useState } from "react";
import { CircularBtn } from "../randomObjects/randomObjects.jsx"
// import { socketCloser } from "../../utils/lansocketglobal.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { FileBox } from "../randomObjects/cards.jsx";

const ConnectedWifiPage = () => {
    let host_or_quickip=null
    // const location = useLocation();
    const location = useLocation()
    const particular_host = location.state?.particular_host ?? null;
    const [sendAllowed,setSendAllowed] = useState(false)
    const [recieveAllowed,setRecieveAllowed] = useState(false)
    // console.log("calling uselocation : before")
    // console.log("calling uselocation : ",ssid)
    const [fileDetailsS,setFileDetailsS] = useState([]);
    const [fileDetailsRarray, setFileDetailsRarray] = useState([]);


    const navigate = useNavigate()
    const closeLANClient = async ()=> {
        await window.electronAPI.stopEXPRESS()
        navigate(-1)
    }

    const handleSEND = ()=>{
        if(!sendAllowed){

            async function handleALLOWSEND (){
                const result = await window.electronAPI.sendFILES()
                if(Array.isArray(result)) {
                console.log("the result is here : ", result)
                setFileDetailsS(result)
                setSendAllowed(true)
                }
                else {
                console.log("filedetailsSss is not an arraysss")
                setFileDetailsS([])
                }
            }
            // let filePaths;
            handleALLOWSEND()
        } else {
            async function handleREFUSESEND (){
                const flag = await window.electronAPI.refuseSENDFILES()
                setSendAllowed(false)
                setFileDetailsS([])
            }
            handleREFUSESEND ()
        }


    }

    const handleRECIEVE = ()=>{
        // console.log(recieveAllowed)
        if(!recieveAllowed){
            const handleALLOWRECIEVE = async ()=>{
            const flag = await window.electronAPI.allowRECIEVE()
            setRecieveAllowed(flag)
// e.log(filePaths)
            }
            handleALLOWRECIEVE()
        } else {
            const handleREFUSERECIEVE = async ()=>{
            const flagnot = await window.electronAPI.refuseRECIEVE()
            setRecieveAllowed(false)
            // const filePaths = fileDetailsS.map((file)=>{
            //     return file.path
            // })
            // window.electronAPI.sendFILES(filePaths)
            // console.log(filePaths)
            }
            handleREFUSERECIEVE()
        }
    }
  

    useEffect( ()=>{
   
            document.title=particular_host
            // Listen for backend event
            window.electronAPI.onUpdateSpan((event, message) => {
                setFileDetailsRarray(prevArray => [...prevArray, message]);
                // setFileDetailsR(message)
            });
            
            
        // }
        // quickIPgetter()
        

    },[])



    // console.log("file details are being prinetd",fileDetailsS)




    const commonStyle = {
        position:"absolute",
        transition: `all 0.5s ease-in-out`,
        height:"100%",
        width:"100%",
        borderRadius:"5px",
        animation: 'fade-in 2s forwards',
        animationDelay: '2s',
        padding:"5%",
        boxSizing:"border-box",
        background: 'linear-gradient(to top right, #212121, #FFFFFF)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        display: "flex",
        flexDirection: "row"
        
        }

        const btnStyle = {
            backgroundColor:'#0064e6',  
            border: "1px solid rgb(77, 103, 255)",  
            borderRadius: "2px",
            display: "inline-block",
            padding: "0.375rem 0.75rem",  
            cursor: "pointer",
            color: 'white',
            textAlign: 'center',
            width: "1rem",
            fontSize: '0.5em',            // Bootstrap font size
            lineHeight: '0.4rem',           // Bootstrap line height
            textDecoration: 'none',      // Remove underline for links
            transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
            }
            const closeBtnStyle = {
                ...btnStyle,  
                
                width: '2rem',
                height:"5%",
                fontSize:"1rem",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
                
              };
              
    return  <div style={commonStyle}>
                
                <div style={{width:"95%",display:"flex",flexDirection:"row"}}>
                    <div style={{width:"50%"}}>Selected files are ready for share ...
                        <div style={{maxHeight:"52.5%",display:"flex",flexWrap:"wrap",rowGap:"5px",columnGap:"5px",padding:"5px",margin:"5px",overflowY:"auto"}}>
                            {
                                fileDetailsS ? (
                                    <>
                                    
                                    {
                                    fileDetailsS.map(
                                        (file,index)=>{
                                            return <FileBox path={file.path} size={file.size} index={index} />
                                        }
                                    )
                                    }
                                    
                                    </>
                                ):(
                                    <div>Refresh Required</div>
                                )
                            }
                        </div>
                        <CircularBtn onClick={()=>{handleSEND()}} buttonname={sendAllowed?"Stop Send":"📤Allow Send"} backgroundcolor={sendAllowed?"red":"#0051cc"} width="4rem" height="4.5rem" borderradius="50%" />

                        
                    </div>
                    <div style={{width:"50%"}}>
                        Recieved files ...
                        <div style={{maxHeight:"52.5%",display:"flex",flexWrap:"wrap",rowGap:"5px",columnGap:"5px",padding:"5px",margin:"5px",overflowY:"auto"}}>
                            {
                                fileDetailsRarray ? (
                                    <>
                                    
                                    {
                                    fileDetailsRarray.map(
                                        (file,index)=>{
                                            return <FileBox path={file.filename} size={file.filesize} index={index} />
                                        }
                                    )
                                    }
                                    
                                    </>
                                ):(
                                    <div>Refresh Required</div>
                                )
                            }
                        </div>
                          <CircularBtn onClick={()=>{handleRECIEVE()}} buttonname={recieveAllowed?"Stop Recieve":"📥Allow Recieve"} backgroundcolor={recieveAllowed?"red":"#0051cc"} width="4rem" height="4.5rem" borderradius="50%" />  
                    </div>
                </div>


                <div onClick={()=>{closeLANClient()}} style={closeBtnStyle}>❌ 
                </div>
                <div style={{position:"absolute",bottom:"10px",right:"10px",fontWeight:"800",color:"blue",cursor: 'text'}}>Allowed: {particular_host}</div>
                
            </div>
}




export { ConnectedWifiPage };