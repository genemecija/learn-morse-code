import React from "react"
import morseCode from '../data/morse-reverse.json'
import ChallengeBufferDisplay from "./ChallengeBufferDisplay";

export default React.memo(function ChallengeDisplay(props) {

    let morseLetters = props.buffer.split('_').filter(l => l !== '')
    let challengeLetters = props.word.split('')
    let correctIndexes = []
    let incorrectIndex = null
    
    morseLetters.forEach((morseLetter, index) => {
        let morseAlpha = morseCode[morseLetter]
        let challengeLetter = challengeLetters[index].toLowerCase()

        if (morseAlpha === challengeLetter) {
            correctIndexes.push(index)
        } else {
            if (props.buffer.slice(-1) === "_") {
                incorrectIndex = index
            }
        }
    })
    
    let spannedWord = challengeLetters.map((letter,index) => {
        let className = 'cLetter'
        className += (correctIndexes.includes(index)) ? ' correct' : ''
        className += (incorrectIndex === index) ? ' morseError' : ''
        return (
            <span key={index} className={className} id={"chal"+index}>{letter}</span>
        )
    })


    return (
        <>
            <div id="challengeWord">{spannedWord}</div>
            <ChallengeBufferDisplay buffer={props.buffer.slice(0,-1).replace(/_/g, ' ')} incorrectIndex={incorrectIndex} />
        </>
    )
})