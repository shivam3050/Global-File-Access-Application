// import { useNavigate } from "react-router-dom";

export let socket = null;

export function socketSetter (newSocket) {
    socket = newSocket
}

export function socketCloser () {
    console.log("clicked")
    // const navigate = useNavigate()
    if(socket && socket.readyState==1){
        socket.close()
        // navigate("/searchWifi")
        console.log("socket closed")
        
    } else {
        console.log("socket already closed")

    }
    socket=null
    
}