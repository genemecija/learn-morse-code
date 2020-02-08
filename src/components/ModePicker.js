import React, {useContext} from "react"
import {GameModeContext} from "../contexts/gameModeContext"
import { MorseBufferContext } from "../contexts/morseBufferContext"
import { WordFeederContext } from "../contexts/wordFeederContext"
import { GameClockContext } from "../contexts/gameClockContext"

function ModePicker() {

    const {setGameMode} = useContext(GameModeContext)
    const {setMorseCharBuffer} = useContext(MorseBufferContext)
    const {resetFeeder} = useContext(WordFeederContext)
    const {stopGameClock, clockIsRunning} = useContext(GameClockContext)

    function handleClick(e) {
        setMorseCharBuffer('')
        resetFeeder()

        setGameMode(e.target.id)

        if (clockIsRunning) { stopGameClock() }

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
                {/* <div id="title">
                    Mode
                </div> */}
                <div id='buttons'>
                    <button id="practice" className="selected" onClick={handleClick}>
                        Practice Mode
                    </button>
                    <button id="training" onClick={handleClick}>
                        Training Mode
                    </button>
                    <button id="challenge" onClick={handleClick}>
                        Challenge Mode
                    </button>
                </div>
            </div>
    )
}

export default React.memo(ModePicker)