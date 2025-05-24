import './App.css';
import { useState} from "react"
import { Outlet } from "react-router-dom"
import { ShareTabSmallCard } from "./components/shareTab/shareTabSmall.components.jsx"


function App() {

  const [isFlexboxClicked,setIsFlexboxClicked] = useState(false)
  const [shouldWeFaceItAway,setShouldWeFaceItAway] = useState(false)
  

  return (
    <>
    {/* put ,minWidth:"360px",minHeight:"700px" when working in the responsive mobile phones */}
      <main style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"0px",fontSize:"1rem",backgroundColor:"white",color:"black",width:"100vw",height:"100vh"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",boxShadow:"0px 0px 20px 1px",position:"relative",width:"98%",height:"98%",borderRadius:"10px",backgroundColor:"white"}} className="outermostDiv">
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundImage:`linear-gradient(to bottom,rgba(23, 104, 255, 0.7),rgba(23, 104,255, 0.7)), url("assets/internetShareImage.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",width:"100%",height:"40%",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
            <div className="mainPageHeader" style={{color:"white",fontFamily:"cursive"}}>
              <div className="mainpageheaderNavbar" style={{fontWeight: "bold",textAlign:"center",top:"2%",left:"2%",position:"absolute",height:"5%",width:"96%",margin:"0px",textDecoration:"underline"}}>
                <div style={{ position: "relative",zIndex:"10",width:"50%",display:"inline-block",textAlign:"start",fontSize:"1.8rem",cursor:"pointer",textShadow: "1px 1.2px 10px rgba(0, 0, 0, 1)"}}>Logo</div><div style={{width:"50%",display:"inline-block",textAlign:"end"}}>
                  {/* <ul style={{listStyleType:"none",gap:"10%",display:"flex",justifyContent:"end",fontSize:"1rem",textShadow: "1px 1.2px 5px rgba(0, 0, 0, 0.9)"}}>
                    <li onClick={()=>{navigate("/")}} style={navLIstyle}>Home</li>
                    <li onClick={()=>{navigate("/contact")}} style={navLIstyle}>Contact</li>
                    <li  style={navLIstyle}>About</li>
                  </ul> */}
                </div>
                </div>
              <div style={{textAlign:"center",color:"#cccccc",filter: "blur(0.8px)"}}>
                Files sharing Plateform to any user Locally 
              </div>
              <div style={{textAlign:"center",color:"#cccccc",filter: "blur(0.8px)"}}>without using cables or internet.</div>
              <div style={{textAlign:"center",color:"#cccccc",fontSize:"3rem",fontFamily:"cursive",fontWeight:"1000",filter: "blur(0.8px)"}}>Rising the data spread</div>
            </div>
          </div>
          <div style={{width:"100%",height:"50%",backgroundColor:"white"}}></div>
            <div className="test" style={{width:"100%",height:"10%",background:`linear-gradient(to top,rgb(23, 104, 255),rgb(23, 104, 255))`,borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
            </div>
            <div style={{borderRadius:"3px",position:"absolute",width:"80%",height:isFlexboxClicked?"90%":"40%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div onClick={()=>{setShouldWeFaceItAway(true);setTimeout(()=>{setIsFlexboxClicked(true)},500)}} style={{width:"100%",height:"100%",transition: `all 0.5s ease-in-out`,opacity: shouldWeFaceItAway ? 0 : 1,marginTop:"5%",display:isFlexboxClicked?"none":"flex",backgroundColor:"transparent",borderRadius:"3px",gap: "15%"}} className="horizontal">
                {/* <ShareTabSmallCard navigateTo="/globalshare" height="100%" connectionType="Global" headerImageUrl={"localShareTabHeaderBG.jpg"} description={"Internet Required"} /> */}
                <ShareTabSmallCard navigateTo="/searchWifi"  height="100%" connectionType="LAN Server" headerImageUrl={"assets/localShareHeader.jpg"} description={"Offline WiFi Sharing"}/>
                {/* <ShareTabSmallCard navigateTo="/searchWifi"  height="100%" connectionType="LAN" headerImageUrl={"heading.jpg"} isRelayConnection={true} description={"Offline Files Direct Forwarding"} /> */}
              </div>
              <div style={{zIndex: "20",height:"70%",width:"100%",position:shouldWeFaceItAway?"relative":"absolute",top:shouldWeFaceItAway?"auto":"0%",transition: `all 0.5s ease-in-out`,opacity: shouldWeFaceItAway ? 1 : 0,display:isFlexboxClicked?"block":"none"}}>
              <Outlet/>
              </div>
            </div>
            </div>
        
      </main>

    </>
  )
}

export {App}
