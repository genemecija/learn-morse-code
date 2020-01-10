import React from "react"
// import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'
import MorseBufferDisplay from "./MorseBufferDisplay";
// import ChallengeWord from "./ChallengeWord";

function ChallengeDisplay(props) {
    console.log('props.buffer:', props.buffer, '|END');
    let morseLetters = props.buffer.split(' ')
    console.log('morseLetters:', morseLetters, morseLetters.length);
    let challengeLetters = props.word.split('')
    let correctIndexes = []
    
    morseLetters.forEach((morseLetter, index) => {
        let morseAlpha = morseCode[morseLetter]
        let challengeLetter = challengeLetters[index].toLowerCase()

        if (morseAlpha === challengeLetter) {
            correctIndexes.push(index)
            console.log('MATCH', correctIndexes);
        } else {
            console.log('MISMATCH: should be', challengeLetter, 'instead of', morseAlpha);
            
        }
        // else {
        //     let onlyCorrectMorse = morseLetters.splice(0,index+1).join(' ')
        //     props.setMorseCharBuffer(onlyCorrectMorse)
        // }
    })
    // for (let i in morseLetters) {
        
    //     let morseLetter = morseLetters[i].slice(-1) === '/' ?
    //         morseLetters[i].slice(0,morseLetters[i].length-1) : morseLetters[i]
    //     let challengeLetter = challengeLetters[i].toLowerCase()
    //     let endOfMorseLetter = morseLetter.includes('/')
    //     let morseAlpha = morseCode[morseLetter]

    //     if (challengeLetter === morseAlpha && endOfMorseLetter) {
    //         correctIndexes.push(i)
    //         console.log('CORRECT!!', `"${morseAlpha}"`);
    //         morseLetters[i] = morseLetters[i].slice(0,morseLetters[i].length-1)
    //         console.log(morseLetters);
    //         props.setMorseCharBuffer(morseLetters.join(' '))
    //     }
    //     else if (challengeLetter !== morseAlpha && endOfMorseLetter) {
    //         console.log('WRONG!!', `"${morseLetter}"`)
    //         // Rejoin morse characters except the last wrong character
    //         props.setMorseCharBuffer(morseLetters.slice(0,morseLetters.length-1).join(' '))
    //     }
    // }

    let spannedWord = challengeLetters.map((letter,index) => {
        // console.log('correctIndexes',correctIndexes);
        // console.log('index',index);
        let className = (correctIndexes.includes(index)) ? 'cLetter correct' : 'cLetter'
        return (
            <span key={index} className={className} id={"chal"+index}>{letter}</span>
        )
    })



    return (
        <>
            <div id="challengeWord">{spannedWord}</div>
            <MorseBufferDisplay buffer={props.buffer.replace(/\//g, ' ')} />
        </>
    )
}

export default React.memo(ChallengeDisplay)