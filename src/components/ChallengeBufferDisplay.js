import React, { useContext } from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'
import { MorseBufferContext } from "../contexts/morseBufferContext"

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
    const {morseCharBuffer} = useContext(MorseBufferContext)

    let buffer = morseCharBuffer.slice(0,-1).replace(/_/g, ' ')
    console.log('buffer', buffer);

    let ditDahs = []
    let incorrectIndex = props.incorrectIndex
    
    let morseLetters = buffer.split(' ')
    if (incorrectIndex) {
        
        for (let i in morseLetters) {
            let letter = morseLetters[i]

            if (Number(i) === incorrectIndex) {
                ditDahs.push(letter.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah}  className={"morseError"}/>))
            } else {
                ditDahs.push(letter.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} className={""}/>))
            }
        }
    } else {
        ditDahs = buffer.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} />)
    }


    let alphanumeric = ''
    let letters = buffer.split(' ')

    if (buffer === '') {}
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
    
    // } else if (buffer !== '') {
    //     let letters = buffer
    //     if (morseCode[letters] === undefined) {
    //         alphanumeric += '[?]'
    //     } else {
    //         alphanumeric += morseCode[letters]
    //     }
    // }

    return (
        <div id="challengeBufferDisplay">
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

export default React.memo(ChallengeBufferDisplay)