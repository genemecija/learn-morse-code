import React from "react"
import { shareLinks } from "../data/social"

export default (function Header () {

    function PopupCenter(url, title, w, h) {  
        // Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
    
        // Fixes dual-screen position                         Most browsers      Firefox  
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;  
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;  
                  
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;  
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;  
                  
        const left = ((width / 2) - (w / 2)) + dualScreenLeft;  
        const top = ((height / 2) - (h / 2)) + dualScreenTop;  
        const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);  
      
        // Puts focus on the newWindow  
        if (window.focus) {  
            newWindow.focus();  
        }  
    }
    
    function handleClick(event) {
        let link = event.target.id
        let url = shareLinks[link]['link']
        let title = 'Share'
        let width = '900'
        let height = '500'
        if (link === 'email') {
            width = '150'
            height = '150'
        }
        PopupCenter(url, title, width, height)
    }

    let contacts = Object.keys(shareLinks).map((contact, index) => {
        return (
            <i id={contact} key={index} onClick={handleClick} className={shareLinks[contact]['icon']}></i> 
        )
    })

    return (
        <div id="header">
            <div id="title">
                Learn Morse Code
            </div>
            <div id="social-links">
                Share: <span id="share-icons">{contacts}</span>
            </div>
        </div>
    )
})