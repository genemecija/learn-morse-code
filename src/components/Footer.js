import React from "react"

export default (function Footer() {

    const contactLinks = {
        'email': {
            name: 'Email',
            icon: "ri-mail-line",
            link: 'mailto:gene@genemecija.com?subject='+encodeURIComponent('Hello, Gene!')
        },
        'github': {
            name: 'GitHub',
            icon: 'ri-github-fill',
            link: 'https://github.com/genemecija'
        },
        'twitter': {
            name: 'Twitter',
            icon: 'ri-twitter-fill',
            link:'https://twitter.com/genemecija'
        }
    }

    function handleClick(event) {
        window.open(contactLinks[event.target.id]['link'])
    }
    
    return (
        <div id="footer">
            app by @genemecija •
            contact&nbsp;<span id="contact-icons"><i id="twitter" onClick={handleClick} className={contactLinks['twitter']['icon']}></i>&nbsp;<i id="email" onClick={handleClick} className={contactLinks['email']['icon']}></i></span>&nbsp;•
            code&nbsp;<span id="contact-icons"><i id="github" onClick={handleClick} className={contactLinks['github']['icon']}></i></span>
        </div>
    )
})