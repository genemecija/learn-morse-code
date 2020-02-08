import React from "react"
import KeyTypePicker from "./KeyTypePicker"
import WordsPerMinute from "./WordsPerMinute"

export default (function Options() {

    return (
        <div id="mainOptions">
            <div id="mainOptions-title">Options</div>
            <KeyTypePicker />
            <WordsPerMinute />
        </div>
    )
})
