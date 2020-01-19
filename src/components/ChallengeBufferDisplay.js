import React, { useContext } from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'
// import { MorseBufferContext } from "../contexts/morseBufferContext"

function ChallengeBufferDisplay(props) {

    // // INCREMENTING COUNTER TO MONITOR COMPONENT RELOADING
    // // console.log('ChallengeMode')
    // if (!document.getElementById('counter')) {
    //     let counter = document.createElement('h1')
    //     let holder = document.createElement('h3')
    //     counter.id = 'counter'
    //     holder.id = 'holder'
    //     counter.innerText = "0"
    //     document.querySelector('#main-content').appendChild(counter)
    //     document.querySelector('#main-content').appendChild(holder)
    // } else {
    //     let num = document.getElementById('counter').innerText
    //     document.getElementById('counter').innerText = Number(num) + 1
    //     document.getElementById('holder').innerText = buffer
    // }
    // const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)

    const morseLetters = props.morseLetters
    console.log('morseLetters', morseLetters);
    const setMorseCharBuffer = props.setMorseCharBuffer
    let ditDahs = []
    let alphanumeric = ''
    let incorrectIndex = props.incorrectIndex

    for (let i in morseLetters) {
        let morseChar = morseLetters[i]
        alphanumeric += morseCode[morseChar]
        
        let cn = ''
        cn = (incorrectIndex === i) ? 'morseError' : ''
        ditDahs.push(morseChar)
        ditDahs.push(' ')
    }
    

    return (
        <div id="challengeBufferDisplay">
            <div id="alphanumeric-container">
                <div id="alphanumeric">
                    {alphanumeric.toUpperCase()}
                </div>
            </div>
            <div id="ditDahs">
                {ditDahs}
            </div>
        </div>
    )
}

export default React.memo(ChallengeBufferDisplay)