import React from "react"

export default React.memo(function MorseButtons() {
    return (
        <>
            <div id="morseButton">
                <button className="paddle" id="left">&lt;<br/>,</button>
                <button className="paddle" id="right">&gt;<br/>.</button>
            </div>
            <div id="morseButtonText">
                SPACEBAR
            </div>
        </>
    )
})