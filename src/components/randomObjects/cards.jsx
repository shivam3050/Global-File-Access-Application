// import { socketSetter, socket } from "../../utils/lansocketglobal.jsx";
import { CircularBtn } from "./randomObjects.jsx"
import { useNavigate } from "react-router-dom";



const Wifis = ({wifiSsid,index,isRelayConnection=false})=>{
    console.log("is relayconnection at Wifis page :",isRelayConnection)

    const navigate = useNavigate();

    const startEXPRESSButtonALLOWUSER = async ()=>{
        const particular_host = await window.electronAPI.getIP()


        let flag = await window.electronAPI.startEXPRESS(particular_host);
            // navigate("/connectedWifiPage");
        if (flag) {
                // If the operation is successful, navigate to the new page
                flag=false
                navigate("/connectedWifiPage",{state:{particular_host:particular_host}});
                // navigate(navigateTo,{ state: { isRelayConnection: isRelayConnection } })
            } else {
                // Handle failure if EXPRESS could not be started
                console.log("Failed to start EXPRESS with host:", particular_host);
                
            }

        



    }


    



    return <div onClick={

        ()=>{

                console.log("nonrelay connection")
                startEXPRESSButtonALLOWUSER()
            
        }

        } style={{
        width:"7%",
        height:"7%",
        backgroundColor:"#cccccc",
        borderRadius:"5px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        boxSizing:"border-box",
        boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.5)',
        

    }}>
        <div style={{
            borderTopRightRadius:"5px",
            borderTopLeftRadius:"5px",
            height:"50%",
            width:"100%",
            
        }}><img style={{borderTopRightRadius:"5px",
            borderTopLeftRadius:"5px",
            backgroundSize:"cover",
            height:"100%",
            width:"100%"
        }} src="assets/heading.jpg"/></div>
        <div style={{height:"50%",
            width:"100%",
            backgroundColor:"#212121",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            borderBottomRightRadius:"5px",
            borderBottomLeftRadius:"5px",
            fontSize:"0.5rem",
            color:"white",
            lineHeight:"1.2"
            }}>
            <div style={{fontWeight:"600",fontSize:"1.2rem"}}>{wifiSsid}</div>
            <div>Requesting to connect</div>
            <div>
                <CircularBtn buttonname={"Allow"} fontsize="12px" />
            </div>
        </div>
        
    </div>
}




const Wifis2 = (props)=>{
    // console.log("is relayconnection at Wifis page :",isRelayConnection)

    const navigate = useNavigate();

    const startEXPRESSButtonALLOWUSER = async ()=>{
        // console.log("cards top")
        const particular_host = await window.electronAPI.getIP()

        let flag = await window.electronAPI.startEXPRESS(particular_host);
        if (flag) {
                flag=false
                navigate("/connectedWifiPage",{state:{particular_host:particular_host}});
            } else {
                // Handle failure if EXPRESS could not be started
                console.log("Failed to start EXPRESS");
                
            }

        



           
    }

    



    return <div 
    onClick={

        ()=>{

                console.log("nonrelay connection")
                startEXPRESSButtonALLOWUSER()
        }

        }
        style={{
        width:"7rem",
        height:"7rem",
        backgroundColor:"#cccccc",
        borderRadius:"5px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        boxSizing:"border-box",
        boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.5)',
        

    }}>
        <div style={{
            borderTopRightRadius:"5px",
            borderTopLeftRadius:"5px",
            height:"60%",
            width:"100%",
            
        }}><img style={{borderTopRightRadius:"5px",
            borderTopLeftRadius:"5px",
            backgroundSize:"cover",
            height:"100%",
            width:"100%",
            
            
        }} src="assets/heading.jpg"/></div>
        <div style={{height:"40%",
            width:"100%",
            backgroundColor:"#212121",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            borderBottomRightRadius:"5px",
            borderBottomLeftRadius:"5px",
            fontSize:"0.85rem",
            color:"white",
            lineHeight:"1.2",
            overflowX:"hidden"
            }}>

            <div>             

                {
                    <div>
                        <span>{props.type.slice(0,8)}</span> : <br /><span >{props.interfaceSubObj.address}</span>
                    </div>
                    
                   
                    
                }
            </div>
        </div>
        
    </div>
}





const FileBox = ({path,size,_})=>{
    return <div style={
        {
            width:"7em",
            height:"1.5rem",
            backgroundColor:"rgb(0, 100, 230)",
            borderRadius:"5px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            cursor:"pointer",
            boxSizing:"border-box",
            boxShadow: '0px 0px 5px 2px rgba(77, 103, 255, 0.5)',
            color:"white",
            padding:"20px",
        }
    }>
        <div>
            
            <span style={{fontSize:"0.6rem"}}>
                {
                    (()=>{

                        let a = (path.replaceAll("\\","/").split("/").pop())
                        let b = a.slice(-7);
                        a= a.slice(0,4)
                        return a+"..."+b  
                    })()
                }
            </span>
        </div>
        <div style={{fontSize:"0.5rem"}}>
            size: {size} Mb
        </div>

    </div>
}





export {Wifis,Wifis2,FileBox}



