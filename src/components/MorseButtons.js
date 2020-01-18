import React, { useContext } from "react"
import { KeyTypeContext } from "../contexts/keyTypeContext"

export default React.memo(function MorseButtons() {

    const {keyType} = useContext(KeyTypeContext)

    return (
        <div id="morseButton">
            <button className="paddle" id="left"></button>
            <button className="paddle" id="right"></button>
        </div>
    )
})