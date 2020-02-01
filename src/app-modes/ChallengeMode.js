import React, {useContext, useEffect} from 'react';
import '../css/App.css';
import morseCode from '../data/morse-reverse.json'
import ChallengeWord from '../components/ChallengeWord'
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import { MorseBufferContext } from '../contexts/morseBufferContext';
import { WordFeederContext } from '../contexts/wordFeederContext';
import { WordListPickerContext } from '../contexts/wordListPickerContext';


export default React.memo(function ChallengeMode(props) {
    
    console.log("ChallengeMode loaded");

    const {word, getNextWord} = useContext(WordFeederContext)

    let challengeWordClass = ''
    
    const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)
    let morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    
    let correctCharIndexes = [] // Indexes of correct letters in Challenge Word
    let incorrectCharIndex = null
    let incorrectMorseIndexes = [] // Indexes of incorrect morse characters in morse character buffer
    
    let offset = 0


    if (!word) {
        console.log('FINISHED ALL WORDS!')
        alert('No more words.')
        return
    }
    console.log('word:', word);
    
    let challengeLetters = word.split('')
    

    // Iterate through the morse character buffer and compare with each letter of challenge word
    morseArray.forEach((item, index) => {        
        if (morseCharBuffer.slice(-1) === '_') { // If end of morse character

            let morseLetter = morseCode[morseArray[index]] || '[?]'
            let challengeLetter = challengeLetters[index-offset].toLowerCase()

            if (morseLetter === challengeLetter) {
                correctCharIndexes.push(index-offset)
                incorrectCharIndex = null
            }
            else {
                incorrectCharIndex = index-offset
                incorrectMorseIndexes.push(index)
                if (incorrectMorseIndexes.length > 0) {
                    setMorseCharBuffer(prev => {
                        let newState = prev.split('_').filter(l => l !== '')
                        newState.splice(incorrectMorseIndexes[0], 1)
                        newState = newState.join('_') + '_'
                        
                        return newState
                    })
                    incorrectMorseIndexes.splice(1,incorrectMorseIndexes.length)
                }
                offset = incorrectMorseIndexes.length
            }
        }
    })

    function timeout(delay) {
        new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
    }

    // Next word once all correct
    if (correctCharIndexes.length === challengeLetters.length) {
        // 
        challengeWordClass = 'correct'
        setTimeout(() => {
            setMorseCharBuffer('')
        }, 800)
        setTimeout(() => {
            getNextWord()
            
        }, 1000)
    }

    return (
        <>
            <ChallengeWord className={challengeWordClass} word={word} correctCharIndexes={correctCharIndexes} incorrectCharIndex={incorrectCharIndex} />
            <ChallengeBufferDisplay morseArray={morseArray} incorrectMorseIndexes={incorrectMorseIndexes} />
            {/* <button onClick={() => console.log(morseCharBuffer)}>morseCharBuffer</button> */}
        </>
    )
});
