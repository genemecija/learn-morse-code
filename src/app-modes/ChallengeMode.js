import React from 'react';
import '../css/App.css';
import morseCode from '../data/morse-reverse.json'
import useTelegraph from '../hooks/useTelegraph';
// import ChallengeWord from '../components/ChallengeWord'
// import MorseBufferDisplay from '../components/MorseBufferDisplay'
// import ChallengeDisplay from '../components/ChallengeDisplay';
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';

function ChallengeMode() {

    let word = "morse"
    
    const {morseCharBuffer} = useTelegraph('challenge')
    // console.log('morseCharBuffer:', morseCharBuffer, '|END');
    let morseLetters = morseCharBuffer.split('_').filter(l => l !== '')
    // console.log('morseLetters:', morseLetters, morseLetters.length);
    let challengeLetters = word.split('')
    let correctIndexes = []
    let incorrectIndex = null
    
    morseLetters.forEach((morseLetter, index) => {
        let morseAlpha = morseCode[morseLetter]
        let challengeLetter = challengeLetters[index].toLowerCase()

        if (morseAlpha === challengeLetter) {
            correctIndexes.push(index)
            // console.log('MATCH', correctIndexes);
        }
        else {
            if (morseCharBuffer.slice(-1) === "_") {
                incorrectIndex = index
                // console.log('MISMATCH:', incorrectIndex, 'should be', challengeLetter, 'instead of', morseAlpha, '>', morseLetter);
                // props.setMorseCharBuffer(morseLetters.slice(0,-1).join('_') + '_')
            }
        }
    })
    
    let spannedWord = challengeLetters.map((letter,index) => {
        // console.log('correctIndexes',correctIndexes);
        // console.log('index',index);
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
            <ChallengeBufferDisplay buffer={morseCharBuffer.slice(0,-1).replace(/_/g, ' ')} incorrectIndex={incorrectIndex} />
            <button onClick={() => console.log(morseCharBuffer)}>morseCharBuffer</button>
        </>
    );

}

export default React.memo(ChallengeMode);
