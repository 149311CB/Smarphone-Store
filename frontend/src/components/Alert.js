import React, {useRef, useState} from 'react'

const Alert = ({children,message,top,left,right}) => {
    const ALERT_STYLES={
        top:top,
        left:left,
        right:right,
        position:"absolute",
        width:"220px",
        background:"#323d43",
        padding:"0.6rem",
        boxShadow:  "0px 0px 5px rgba(34,41,46,0.3),0px 0px 5px rgba(66,81,88,0.7)",
        zIndex: 2,
        borderRadius:"0.3rem",
        fontWeight:500,
        color:"white",
        fontSize:"0.813rem"
    }
    return (
        <div className={"alert-message"} style={ALERT_STYLES}>
            <div>{message}</div>
            {children}
        </div>
  )
}

export default Alert

