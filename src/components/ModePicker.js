import React, {useContext} from "react"
import {GameModeContext} from "../contexts/gameContext"

function ModePicker() {

    const {setGameMode} = useContext(GameModeContext)

    function handleClick(e) {
        setGameMode(e.target.id)
        console.log("Switched to " + e.target.id + " mode.");
    }

    return (
            <div id="gameMode" className="mode-picker">
                <button id="practice" onClick={handleClick}>
                    Practice
                </button>
                <button id="timed" onClick={handleClick}>
                    Timed Mode
                </button>
                <button id="challenge" onClick={handleClick}>
                    Challenge Mode
                </button>
            </div>
    )
}

export default React.memo(ModePicker)