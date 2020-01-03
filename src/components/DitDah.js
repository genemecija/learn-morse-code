import React from "react"
import morseCode from '../data/morse-reverse.json'

function DitDah(props) {
    console.log('DitDah rendered');
    if (props.morseLetter === '') {
        return (
            <span className='space'>&nbsp;</span>
        )
    } else {
        if (morseCode[props.morseLetter] === undefined) {
            return (
                <span className='morseError'>{props.morseLetter}</span>
            )
        } else {
            return (
                <span>{props.morseLetter}</span>
            )
        }
    }
}

export default React.memo(DitDah)