import { useEffect, useState } from "react";
import { CircularBtn } from "../randomObjects/randomObjects.jsx"
import { Wifis,Wifis2 } from "../randomObjects/cards.jsx";
import { showConnectedWifi } from "../../utils/serverFrontEndFunctions.jsx";
const LocalWifiSearchPage = () => {
    
    const [ssid, setssid] = useState(null);
    const [networks, setNetworks] = useState(null);

    const fetchData = async () => {
        try {
            const data = await showConnectedWifi();
            setssid(data);

            
        } catch (error) {
            setssid(null)
            try {
                const interfaces = await window.electronAPI.getIP2()
                setNetworks(interfaces)
            } catch (error) {
                setNetworks(null)
            }
        }
    };
    useEffect(()=>{  
        fetchData() 
  }, []); 


    const commonStyle = {
        position:"absolute",
        transition: `all 0.5s ease-in-out`,
        height:"100%",
        width:"100%",
        borderRadius:"5px",
        animation: 'fade-in 2s forwards',
        animationDelay: '2s',
        paddingBottom:"40px",
        boxSizing:"border-box",
        background: 'linear-gradient(to top right, #212121, #FFFFFF)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        
        }

    return (
        <>
            {ssid ? (
                <>
                    <div
                    style={commonStyle}>
                        <div style={{height:"20%"}} className="upper">
                            <p style={{textAlign:"center",fontSize:"2em",fontFamily:"cursive",textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',}}>Available Wifi Networks</p>
                        </div>
                        <div style={{padding:"10px",height:"90%",display:"flex",flexWrap: "wrap",overflowY: "auto",gap: "1rem",justifyContent: "center",aligItems: "center"}} className="lowerWifi">

                       
                            
                            <Wifis key={"0"} wifiSsid={ssid} isRelayConnection={false}/>
                        
                        
                        </div>
                        

                    </div>
                    
                </>
            ) : ( 
                (networks && Object.keys(networks).length > 0) ? (<>
                    <div
                        style={commonStyle}>
                        <div style={{height:"20%"}} className="uppers">
                            <p style={{margin:"5px",textAlign:"center",fontSize:"2em",fontFamily:"cursive",textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',}}>Available Networks</p>
                        </div>


                        <div style={{height:"80%",display:"flex",flexDirection:"row",justifyContent: "space-evenly",alignItems: "center",padding:"10px",boxSizing:"border-box"}} className="lowerWifi">
                            
                       
                            {
                                Object.entries(networks).map(([key,value])=>(
                                    <div style={{position:"relative",display:"flex",flexDirection:"row",alignItems:"center",marginTop: "5px",overflow:"auto",flexWrap:"wrap"}}>
                                        <div style={{padding:"10px",display:"flex",flexWrap:"wrap",columnGap:"1rem",rowGap:"2rem"}}>
                                        {value.filter((subobj)=>(subobj.family.toLowerCase()==="ipv4" && subobj.internal === false)).map((data,index)=>{
                                            return <Wifis2 interfaceSubObj={data} type={key}/>
                                        })}
                                        </div>
                                    </div>
                                    
                                ))
                            }
                        
                        
                        </div>
                        
                        

                    </div>
                            </>):(
                            <>
                                <div 
                                style={commonStyle}>
                                    <div style={{width:"70%",height:"70%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>Connect to a network first<div><CircularBtn onClick={fetchData} buttonname={"Refresh"}/></div> </div>
                                    
                                </div>
                            </>)
                
            )}
        </>
    );
};


export { LocalWifiSearchPage };

















