import { useState } from 'react'
// import { CircularBtn } from "../randomObjects/randomObjects.jsx"
import { useNavigate } from "react-router-dom"

const ShareTabSmallCard = function ({height="100%",connectionType,navigateTo,headerImageUrl,description,isRelayConnection=false}){
    const navigate = useNavigate()

    const [isHovered, setIsHovered] = useState(false);
    // const [ZIndex, setZIndex] = useState(1);
    const svg = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>)

    const localConnection = () => {
        setTimeout(()=>{
            navigate(navigateTo,{ state: { isRelayConnection: isRelayConnection } })
        },500)
    }
    return <>
        <div 
        onClick={localConnection} 
        onMouseEnter={() => {setIsHovered(true);}} 
        onMouseLeave={() => {setIsHovered(false);}} 
        style={{
            zIndex: (isHovered ? 10 : 1),
            position: "relative",
            backgroundColor:"white",
            cursor:"pointer",
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: `all 0.5s ease-in-out`,
            width:height,
            height:height,
            fontFamily:"cursive",
            boxShadow:"5px 5px 25px 15px rgba(0, 0, 110, 0.7)",
            borderRadius:"3px"}} 
        className="card">
            <div 
            style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                backgroundImage:`url(${headerImageUrl})`,
                backgroundSize:"cover", 
                backgroundRepeat:"no-repeat",
                width:"100%",height:"100%",padding:"2px"
            }} 
            className="heading">
                <div style={{fontSize:"1rem",color:"white",fontWeight:"800"}} className="h1">
                {description}
                </div>
                <div style={{fontSize:"2rem",color:"white"}} className="h1">
                {connectionType}
                </div>
                
            </div>
            
        </div>
        
    </>
}

export {ShareTabSmallCard}