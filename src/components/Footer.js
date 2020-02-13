import React from "react"
import { contactLinks } from "../data/social"

export default (function Footer() {

    function handleClick(event) {
        window.open(contactLinks[event.target.id]['link'])
    }
    
    return (
        <div id="footer">
            app by @genemecija&nbsp;<span id="contact-icons"><i id="twitter" onClick={handleClick} className={contactLinks['twitter']['icon']}></i></span>•
            contact&nbsp;<span id="contact-icons"><i id="email" onClick={handleClick} className={contactLinks['email']['icon']}></i></span>&nbsp;•
            code&nbsp;<span id="contact-icons"><i id="github" onClick={handleClick} className={contactLinks['github']['icon']}></i></span>
        </div>
    )
})