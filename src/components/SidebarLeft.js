import React, { useState } from "react"
import Info from "./Info"
import PlayMorseInput from "./PlayMorseInput"
import Legend from "./Legend"
import Options from "./Options"

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
            setSidebarContent('nav-options')
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
                    <div id="nav-learn" className="nav-item selected" onClick={navClicked}>
                        Learn
                    </div>
                    <div id="nav-legend" className="nav-item" onClick={navClicked}>
                        Legend
                    </div>
                    <div id="nav-options" className="nav-item" onClick={navClicked}>
                        Options
                    </div>
                </div>

                <div id="info-icon" onClick={toggleLeft}><i class="ri-information-line"></i></div>
                
                <div id='sidebar-content'>
                    {sidebarContent === 'nav-learn' && <Info />}
                    {sidebarContent === 'nav-legend' && <div id="playerAndLegend"><PlayMorseInput /><Legend /></div>}
                    {sidebarContent === 'nav-options' && <Options />  }
                    
                </div>
            </div>
        </div>
    )

})
