import React from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'

function MorseBufferDisplay(props) {
    
    let ditDahs = props.buffer.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} />)

    let alphanumeric = ''
    // if (props.buffer.includes(' ')) {

    let letters = props.buffer.split(' ')

    if (props.buffer === '') {}
    else {
        for (let i in letters) {
            if (letters[i] === ' ') {
                alphanumeric += ' '
            } else {
                if (morseCode[letters[i]] === undefined) {
                    // alphanumeric += '[?]'
                    alphanumeric += (letters[i] === '' ? '':'[?]')
                } else {
                    alphanumeric += morseCode[letters[i]]
                }
            }
        }
    }
    
    // } else if (props.buffer !== '') {
    //     let letters = props.buffer
    //     if (morseCode[letters] === undefined) {
    //         alphanumeric += '[?]'
    //     } else {
    //         alphanumeric += morseCode[letters]
    //     }
    // }

    return (
        <div id="morseBufferDisplay">
            <div id="ditDahs">
                {ditDahs}
            </div>
            <div id="alphanumeric-container">
                <div id="alphanumeric">
                    {alphanumeric.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default React.memo(MorseBufferDisplay)