import React from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'

function ChallengeBufferDisplay(props) {
    
    let ditDahs = []
    let incorrectIndex = props.incorrectIndex
    
    let morseLetters = props.buffer.split(' ')
    if (incorrectIndex) {
        console.log('incorrectIndex:', incorrectIndex);
        for (let i in morseLetters) {
            let letter = morseLetters[i]

            if (Number(i) === incorrectIndex) {
                ditDahs.push(letter.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah}  className={"morseError"}/>))
            } else {
                console.log('i === incorrectIndex', i, incorrectIndex);
                ditDahs.push(letter.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} className={""}/>))
            }
        }
    } else {
        ditDahs = props.buffer.split('').map((ditdah,index) => <DitDahDisplay key={index} dd={ditdah} />)
        console.log('ditDahs:', typeof ditDahs, ditDahs.length, ditDahs);
    }


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