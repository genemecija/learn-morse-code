import React, {useContext} from "react"
import {GameModeContext} from "../contexts/gameModeContext"
import { MorseBufferContext } from "../contexts/morseBufferContext"

function ModePicker() {

    const {setGameMode} = useContext(GameModeContext)
    const {setMorseCharBuffer} = useContext(MorseBufferContext)

    function handleClick(e) {
        setMorseCharBuffer('')
        setGameMode(e.target.id)

        let buttons = document.querySelector(".mode-picker#gameMode #buttons").childNodes
        buttons.forEach(button => {
            if (button.id === e.target.id) {
                button.classList.add('selected')
            } else { button.classList.remove('selected')}
        })
        console.log("Switched to " + e.target.id + " mode.");
    }

    return (
            <div id="gameMode" className="mode-picker">
                <div id="title">
                    Mode
                </div>
                <div id='buttons'>
                    <button id="practice" class="selected" onClick={handleClick}>
                        Practice
                    </button>
                    <button id="training" onClick={handleClick}>
                        Training
                    </button>
                    <button id="challenge" onClick={handleClick}>
                        Challenge
                    </button>
                </div>
            </div>
    )
}

export default React.memo(ModePicker)