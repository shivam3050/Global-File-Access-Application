






export const showConnectedWifi = async ()=>{
    let ssid=null;
    // let ssidsWithStatus=null;
    try {
        ssid=null
        // ssidsWithStatus=null
        
        ssid = await window.electronAPI.getSSIDs();
            // ssidsWithStatus = {"ssid":ssid,"isAllowed":false}
        return ssid
   }catch (error) { 
       console.log("Cannot show initially wifi networks either Location if off or something else")
       throw new Error("hi")
   }
}



