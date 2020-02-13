import React, {useState, useContext} from "react"
import { WordFeederContext } from "./wordFeederContext"
import { MorseBufferContext } from "./morseBufferContext";
import morseCode from '../data/morse-reverse.json'


const ChallengeContext = React.createContext()

function ChallengeContextProvider(props) {

    const [challengeState, setChallengeState] = useState('ready')
    const {resetFeeder} = useContext(WordFeederContext)
    const {word, getNextWord} = useContext(WordFeederContext)
    const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)
    
    
    let morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    let challengeWordClass = ''
    
    let correctCharIndexes = [] // Indexes of correct letters in Challenge Word
    let incorrectMorseIndexes = [] // Indexes of incorrect morse characters in morse character buffer
    
    let offset = 0
    let challengeLetters


    function startChallenge() {

        let countdown
        let count = 3

        // Challenge countdown setup
        document.getElementById('challengeReady').classList.add('starting')
        document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        // Start Challenge countdown
        countdown = setInterval(() => {
            count--
            if (count === 0) {
                // Do this when countdown hits 0
                document.getElementById('challenge-overlay').classList.add('fade')
                clearInterval(countdown)
                setTimeout(() => {
                    document.getElementById('challenge-overlay').classList.add('hide')
                    // Start Challenge
                    setChallengeState('started')
                }, 900);
            }
            document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        }, 1000)
    }

    function completeChallenge() {
        if (challengeState !== 'completed') {
            setChallengeState('completed')
            resetFeeder()
            showOverlay()
        }
    }

    function cancelChallenge() {
        if (challengeState !== 'cancelled') {
            setChallengeState('cancelled')
            resetFeeder()
            showOverlay()
        }
    }

    function showOverlay() {
        const challengeOverlay = document.getElementById('challenge-overlay')
        challengeOverlay.classList.remove('fade')
        challengeOverlay.classList.remove('hide')
    }


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
            }
            else {
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


    // Retrieve next word once all characters are correct
    if (correctCharIndexes.length === challengeLetters.length) {
        challengeWordClass = 'correct'
        setTimeout(() => {
            setMorseCharBuffer('')
            morseArray = []
            incorrectMorseIndexes = []
            offset = 0
            if (document.getElementById('challengeWord') !== null) {
                document.getElementById('challengeWord').childNodes.forEach(node => {
                    node.classList = "cLetter"
                })
            }
        }, 800)
        setTimeout(() => {
            if (correctCharIndexes.length > 0) {
                correctCharIndexes = []
                getNextWord()
            }
        }, 1000)
    }

    
    return (
        <ChallengeContext.Provider value={{
            challengeState: challengeState,
            setChallengeState: setChallengeState,
            startChallenge: startChallenge,
            completeChallenge: completeChallenge,
            cancelChallenge: cancelChallenge,
            challengeWordClass: challengeWordClass,
            morseArray: morseArray,
            incorrectMorseIndexes: incorrectMorseIndexes
            }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}

export {ChallengeContextProvider, ChallengeContext}
