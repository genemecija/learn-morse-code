import React, { useState } from "react"
import Info from "./Info"
import PlayMorseInput from "./PlayMorseInput"
import Legend from "./Legend"

export default (function SidebarLeft() {

    const [sidebarContent, setSidebarContent] = useState('nav-learn')

    function toggleLeft() {
        document.querySelector('.sidebar#left').classList.toggle('hide')
        document.querySelector('#main-interface').classList.toggle('expandLeft')
    }
    function navClicked(e) {
        if (e.target.id === 'nav-learn') {
            setSidebarContent('nav-learn')
        } else if (e.target.id === 'nav-legend') {
            setSidebarContent('nav-legend')
        } else {
            setSidebarContent('nav-play')
        }
        let navItems = document.querySelector(".navbar").childNodes

        navItems.forEach(item => {
            if (item.id === e.target.id) {
                item.classList.add('selected')
            } else {
                item.classList.remove('selected')
            }
        })
    }

    return (
        <div className="sidebar" id="left">
            <div id="sidebar-container">
                <div className="navbar">
                    <div id="nav-play" className="nav-item" onClick={navClicked}>
                        Play
                    </div>
                    <div id="nav-learn" className="nav-item selected" onClick={navClicked}>
                        Learn
                    </div>
                    <div id="nav-legend" className="nav-item" onClick={navClicked}>
                        Legend
                    </div>
                </div>

                <div id="info-icon" onClick={toggleLeft}><i className="ri-arrow-left-circle-line"></i></div>
                
                <div id='sidebar-content'>
                    {sidebarContent === 'nav-learn' && <Info />}
                    {sidebarContent === 'nav-legend' && 
                        <div id="playerAndLegend">
                            <Legend />
                            <span id="note">Adjust the Morse code speed by changing the WPM in the Options menu.</span>
                            <PlayMorseInput />
                        </div>
                    }
                </div>
            </div>
        </div>
    )

})
