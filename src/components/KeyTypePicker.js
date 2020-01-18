import React, {useContext} from "react"
import {KeyTypeContext} from "../contexts/keyTypeContext"

export default React.memo(function KeyTypePicker() {

    const {setKeyType} = useContext(KeyTypeContext)

    function handleClick(e) {
        setKeyType(e.target.id)

        let buttons = document.querySelector(".mode-picker#keyType").childNodes
        buttons.forEach(button => {
            console.log('buttonID', button.id);
            if (button.id === e.target.id) {
                button.classList.add('selected')
            } else { button.classList.remove('selected')}
        })

        if (e.target.id === 'electronic') {
            document.querySelector('#morseButton').classList.add('showPaddles')
            document.querySelector('.paddle').classList.add('showPaddles')
            document.querySelector('.paddle#left').classList.add('showPaddles')
            document.querySelector('.paddle#right').classList.add('showPaddles')
        } else {
            document.querySelector('#morseButton').classList.remove('showPaddles')
            document.querySelector('.paddle').classList.remove('showPaddles')
            document.querySelector('.paddle#left').classList.remove('showPaddles')
            document.querySelector('.paddle#right').classList.remove('showPaddles')
        }

    }

    return (
            <div id="keyType" className="mode-picker">
                <button id="straight" onClick={handleClick}>
                    Straight Key
                </button>
                <button id="electronic" onClick={handleClick}>
                    Electronic Key
                </button>
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