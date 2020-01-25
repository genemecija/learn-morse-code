import React, {useContext} from "react"
import {GameModeContext} from "../contexts/gameModeContext"
import { MorseBufferContext } from "../contexts/morseBufferContext"

function ModePicker() {

    const {setGameMode} = useContext(GameModeContext)
    const {setMorseCharBuffer} = useContext(MorseBufferContext)

    function handleClick(e) {
        setMorseCharBuffer('')
        setGameMode(e.target.id)
        console.log("Switched to " + e.target.id + " mode.");
    }

    return (
            <div id="gameMode" className="mode-picker">
                <button id="practice" onClick={handleClick}>
                    Practice
                </button>
                <button id="training" onClick={handleClick}>
                    Training Mode
                </button>
                <button id="challenge" onClick={handleClick}>
                    Challenge Mode
                </button>
            </div>
    )
}

export default React.memo(ModePicker)