import React, { useContext } from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'
import {MorseBufferContext} from "../contexts/morseBufferContext"

function MorseBufferDisplay() {
    const {morseCharBuffer} = useContext(MorseBufferContext)

    console.log('COMPONENT LOAD: MorseBufferDisplay');
    let ditDahs = morseCharBuffer.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} />)

    let alphanumeric = ''
    // if (morseCharBuffer.includes(' ')) {

    let letters = morseCharBuffer.split(' ')

    if (morseCharBuffer === '') {}
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
    
    // } else if (morseCharBuffer !== '') {
    //     let letters = morseCharBuffer
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

export default MorseBufferDisplay