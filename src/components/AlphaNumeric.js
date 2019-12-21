import React from "react"
import morseCode from '../data/morse-reverse.json'

function AlphaNumeric(props) {

    if (props.morseLetter === '') {
        return (
            <span></span>
        )
    } else {
        if (morseCode[props.morseLetter] === undefined) {
            return (
                <span className='morseError'>[?]</span>
            )
        } else {
            return (
                <span>{morseCode[props.morseLetter].toUpperCase()}</span>
            )
        }
    }
}

export default AlphaNumeric