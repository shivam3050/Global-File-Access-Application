import { useState } from "react"

const CircularBtn = ({ buttonname, color = '#3aff1c', backgroundcolor="#0051cc", borderradius = "5px",fontsize="auto",width="auto",height="auto", onClick=()=>{}})=>{
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const style = {
    backgroundColor: isPressed ? backgroundcolor : (isHovered ? backgroundcolor : backgroundcolor),  // Bootstrap info button color
    border: "1px solidrgb(77, 103, 255)",  // Border color same as background
    borderRadius: borderradius,
    // display: "inline-block",
    padding: "0.375rem 0.75rem",  // Bootstrap padding for buttons
    cursor: "pointer",
    color: 'white',
    textAlign: 'center',
    width: width,
    height: height,
    fontSize: fontsize,            // Bootstrap font size
    lineHeight: '1', 
    fontWeight: "800",          // Bootstrap line height
    textDecoration: 'none',      // Remove underline for links
    transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    transform: isPressed ? "scale(0.97)" : "scale(1)",

    }
    return <div style={style}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => {
                setIsPressed(false);
                setIsHovered(false);
            }}
            onMouseEnter={
                () => setIsHovered(true)
            }
            onClick={onClick}
            >{buttonname}</div>
}

export {CircularBtn}