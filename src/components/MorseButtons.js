import React from "react"

export default React.memo(function MorseButtons() {
    return (
        <div id="morseButton">
            <button className="paddle" id="left">DIT</button>
            <button className="paddle" id="right">DAH</button>
        </div>
    )
})