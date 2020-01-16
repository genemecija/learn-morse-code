import React, {useContext} from "react"
import {GameModeContext} from "../contexts/gameContext"

function ModePicker() {

    const {switchGameModeTo} = useContext(GameModeContext)

    function handleClick(e) {
        switchGameModeTo(e.target.id)
        console.log("Switched to " + e.target.id + " mode.");
    }

    return (
            <div id="mode-picker">
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