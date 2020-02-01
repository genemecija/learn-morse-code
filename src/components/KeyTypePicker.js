import React, {useContext} from "react"
import {KeyTypeContext} from "../contexts/keyTypeContext"


export default React.memo(function KeyTypePicker() {

    const {setKeyType} = useContext(KeyTypeContext)

    function handleClick(e) {
        setKeyType(e.target.id)
        console.log("KEYTYPE PICKED:", e.target.id);

        let buttons = document.querySelector(".mode-picker#keyType #buttons").childNodes
        buttons.forEach(button => {
            if (button.id === e.target.id) {
                button.classList.add('selected')
            } else { button.classList.remove('selected')}
        })

        if (e.target.id === 'electronic') {
            document.querySelector('#morseButton').classList.add('showPaddles')
            document.querySelector('.paddle').classList.add('showPaddles')
            document.querySelector('.paddle#left').classList.add('showPaddles')
            document.querySelector('.paddle#right').classList.add('showPaddles')
            document.getElementById('morseButtonText').innerHTML = '<div id="paddleText"><div id="comma">COMMA (,)</div><div id="period">PERIOD (.)</div></div>'
        } else {
            document.querySelector('#morseButton').classList.remove('showPaddles')
            document.querySelector('.paddle').classList.remove('showPaddles')
            document.querySelector('.paddle#left').classList.remove('showPaddles')
            document.querySelector('.paddle#right').classList.remove('showPaddles')
            document.getElementById('morseButtonText').innerHTML = 'SPACEBAR'
        }

    }

    return (
            <div id="keyType" className="mode-picker">
                <div id="title">
                    Key Type
                    {/* &nbsp;<i className="ri-question-line"></i>  */}
                </div>
                <div id="buttons">
                    <button id="straight" className="selected" onClick={handleClick}>
                        Straight Key
                    </button>
                    <button id="electronic" onClick={handleClick}>
                        Electronic Key
                    </button>
                </div>
            </div>
    )
})


// > STRAIGHT KEY SELECTED
// CONTEXT LOAD: KeyTypeContextProvider
// COMPONENT LOADED: PracticeMode
// COMPONENT LOAD: MorseBufferDisplay
// COMPONENT LOAD: MorseDisplay
// morseWords Array []

// —————————

// > ELECTRONIC KEY SELECTED
// CONTEXT LOAD: KeyTypeContextProvider
// COMPONENT LOADED: PracticeMode
// COMPONENT LOAD: MorseBufferDisplay
// COMPONENT LOAD: MorseDisplay
// morseWords Array []

// CONTEXT LOAD: MorseBufferContextProvider // MorseBufferContextProvider reloading when Electronic selected
// COMPONENT LOAD: MorseBufferDisplay
// COMPONENT LOAD: MorseDisplay
// morseWords Array []