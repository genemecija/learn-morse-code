import React, { useContext } from "react"
import { MorseBufferContext } from "../contexts/morseBufferContext"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'

export default React.memo(function MorseBufferDisplay() {
    
    const {morseCharBuffer} = useContext(MorseBufferContext)

    let ditDahs = morseCharBuffer.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} />)
    let alphanumeric = ''
    let letters = morseCharBuffer.split(' ')

    if (morseCharBuffer === '') {}
    else {
        for (let i in letters) {
            if (letters[i] === ' ') {
                alphanumeric += ' '
            } else {
                if (morseCode[letters[i]] === undefined) {
                    alphanumeric += (letters[i] === '' ? '':'[?]')
                } else {
                    alphanumeric += morseCode[letters[i]]
                }
            }
        }
    }

    return (
        <div id="morseBufferDisplay">
            <div id="overlay"></div>
            <div id="ditDahs-container">
                <div id="ditDahs">
                    {ditDahs}
                </div>
            </div>
            <div id="alphanumeric-container">
                <div id="alphanumeric">
                    {alphanumeric.toUpperCase()}
                </div>
            </div>
        </div>
    )
})