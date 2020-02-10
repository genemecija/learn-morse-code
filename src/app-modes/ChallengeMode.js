import React, {useContext} from 'react';
import '../css/App.css';
import morseCode from '../data/morse-reverse.json'
import ChallengeWord from '../components/ChallengeWord'
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import { MorseBufferContext } from '../contexts/morseBufferContext';
import { WordFeederContext } from '../contexts/wordFeederContext';
import GameClock from '../components/GameClock';
import { GameClockContext } from '../contexts/gameClockContext';
import { KeyTypeContext } from '../contexts/keyTypeContext';
import StraightKey from '../components/StraightKey';
import ElectronicKey from '../components/ElectronicKey';
import ChallengeControls from '../components/ChallengeControls';
import { ChallengeContext } from '../contexts/challengeContext';


export default React.memo(function ChallengeMode(props) {

    console.log('CHALLENGE MODE');
    const {word, getNextWord} = useContext(WordFeederContext)
    const {clockIsRunning} = useContext(GameClockContext)
    const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)
    const {keyType} = useContext(KeyTypeContext)
    const {completeChallenge, cancelChallenge} = useContext(ChallengeContext)
    
    let morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    let challengeWordClass = ''
    
    let correctCharIndexes = [] // Indexes of correct letters in Challenge Word
    let incorrectMorseIndexes = [] // Indexes of incorrect morse characters in morse character buffer
    
    let offset = 0
    let challengeLetters

    // If no more words in wordlist, feeder returns first word in an array
    if (typeof word === 'object') {
        completeChallenge()
        challengeLetters = word[0].split('')
    }
    else {
        challengeLetters = word.split('')
    }

    // Iterate through the morse character buffer and compare with each letter of challenge word
    morseArray.forEach((item, index) => {        
        if (morseCharBuffer.slice(-1) === '_') { // If end of morse character
            
            let morseLetter = morseCode[morseArray[index]] || '[?]'
            let challengeLetter = challengeLetters[index-offset].toLowerCase()
            
            if (morseLetter === challengeLetter) {
                correctCharIndexes.push(index-offset)
                
                document.getElementById('challengeWord').childNodes[index-offset].classList.add('correct')
                // incorrectCharIndex = null
            }
            else {
                // incorrectCharIndex = index-offset
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
            morseArray = []
            incorrectMorseIndexes = []
            correctCharIndexes = []
            offset = 0
        }, 800)
        setTimeout(() => {
            getNextWord()
            if (document.getElementById('challengeWord') !== null) {
                document.getElementById('challengeWord').childNodes.forEach(node => {
                    node.classList = "cLetter"
                })
            }
        }, 1000)
    }


    return (
        <>
            {clockIsRunning ? (keyType === "straight" ?
                <StraightKey /> : <ElectronicKey />) : <></>
            }
            <ChallengeControls cancelChallenge={cancelChallenge} />
            <GameClock />
            <ChallengeWord className={challengeWordClass} word={word} />
            <ChallengeBufferDisplay morseArray={morseArray} incorrectMorseIndexes={incorrectMorseIndexes} />
        </>
    )
});
