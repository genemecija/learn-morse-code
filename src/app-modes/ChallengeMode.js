import React, {useContext} from 'react';
import '../css/App.css';
import morseCode from '../data/morse-reverse.json'
import ChallengeWord from '../components/ChallengeWord'
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import { MorseBufferContext } from '../contexts/morseBufferContext';


export default React.memo(function ChallengeMode(props) {
    
    console.log("ChallengeMode loaded");
    
    let wordList = ['morse', 'code', 'hello', 'gene']
    // let word = wordList.shift()

    // let word = props.word
    let getNextWord = props.getNextWord
    let word = getNextWord()
    let challengeLetters = word.split('')
    
    const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)
    let morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    
    let correctCharIndexes = [] // Indexes of correct letters in Challenge Word
    let incorrectCharIndex = null
    let incorrectMorseIndexes = [] // Indexes of incorrect morse characters in morse character buffer

    let offset = 0

    // Iterate through the morse character buffer and compare with each letter of challenge word
    morseArray.forEach((item, index) => {        

        // if (morseCharBuffer.slice(-1) === '_') { // If end of morse character
            let morseLetter = morseCode[morseArray[index]]
            let challengeLetter = challengeLetters[index-offset]

            if (morseLetter === challengeLetter) {
                correctCharIndexes.push(index-offset)
                incorrectCharIndex = null
            }
            else {
                incorrectCharIndex = index-offset
                incorrectMorseIndexes.push(index)
                offset = incorrectMorseIndexes.length
            }
        // }
    })
    console.log('morseArray', morseArray);

    // Next word once all correct
    if (correctCharIndexes.length === challengeLetters.length) {
        word = wordList.shift()

        setMorseCharBuffer('')
    }


    return (
        <>
            <ChallengeWord word={word} correctCharIndexes={correctCharIndexes} incorrectCharIndex={incorrectCharIndex} />
            <ChallengeBufferDisplay morseArray={morseArray} incorrectMorseIndexes={incorrectMorseIndexes} />
            {/* <button onClick={() => console.log(morseCharBuffer)}>morseCharBuffer</button> */}
        </>
    );
});
