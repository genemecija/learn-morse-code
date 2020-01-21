import React, {useContext} from 'react';
import '../css/App.css';
import morseCode from '../data/morse-reverse.json'
import ChallengeWord from '../components/ChallengeWord'
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import { MorseBufferContext } from '../contexts/morseBufferContext';


export default React.memo(function ChallengeMode() {
    
    console.log("ChallengeMode loaded");
    
    let wordList = ['morse', 'code', 'hello', 'gene']
    let word = wordList.shift()
    let challengeLetters = word.split('')
    
    const {morseCharBuffer} = useContext(MorseBufferContext)
    let morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    
    let correctCharIndexes = [] // Indexes of correct letters in Challenge Word
    let incorrectCharIndex = null
    let incorrectMorseIndexes = [] // Indexes of incorrect morse characters in morse character buffer

    // Iterate through the morse character buffer and compare with each letter of challenge word
    morseArray.forEach((item, index) => {

        let offset = incorrectMorseIndexes.length || 0 

        let morseLetter = morseCode[morseArray[index+offset]]
        let challengeLetter = challengeLetters[index-offset]
        if (morseLetter === challengeLetter) {
            correctCharIndexes.push(index-offset)
            incorrectCharIndex = null
        }
        else {
            incorrectCharIndex = index-offset
            incorrectMorseIndexes.push(index+offset)
        }

        // let offset = incorrectMorseIndexes.length

        // if (morseArray[index + offset]) { // If value exists at index

        //     let morseAlpha = morseCode[morseArray[index + offset]]
        //     let adjustedIndex = index - offset
            
        //     if (challengeLetters[adjustedIndex]) { // If value exists at index

        //         let challengeLetter = challengeLetters[adjustedIndex].toLowerCase()

        //         if (morseCharBuffer.slice(-1) === "_") { // Signifies buffer has complete characters (i.e. no partial characters)

        //             if (morseAlpha === challengeLetter) {
        //                 correctCharIndexes.push(adjustedIndex)
        //                 incorrectCharIndex = null
        //             } else {
        //                 incorrectMorseIndexes.push(index)
        //                 incorrectCharIndex = adjustedIndex
        //             }
        //         }
        //     }
        //     else { word = wordList.shift() }
        // }
    })


    return (
        <>
            <ChallengeWord word={word} correctCharIndexes={correctCharIndexes} incorrectCharIndex={incorrectCharIndex} />
            <ChallengeBufferDisplay morseArray={morseArray} incorrectMorseIndexes={incorrectMorseIndexes} />
            {/* <button onClick={() => console.log(morseCharBuffer)}>morseCharBuffer</button> */}
        </>
    );
});
