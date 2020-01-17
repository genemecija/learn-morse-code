import React, {useContext} from "react"
import {KeyTypeContext} from "../contexts/keyTypeContext"

export default React.memo(function KeyTypePicker() {

    const {switchKeyType} = useContext(KeyTypeContext)

    function handleClick(e) {
        switchKeyType(e.target.id)
        console.log("Switched to " + e.target.id + " keyType.");
    }

    return (
            <div id="mode-picker">
                <button id="straight" onClick={handleClick}>
                    Straight Key
                </button>
                <button id="electronic" onClick={handleClick}>
                    Electronic Key
                </button>
            </div>
    )
})