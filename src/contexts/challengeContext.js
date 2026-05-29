import React, {useState, useContext, useEffect} from "react"
import { WordFeederContext } from "./wordFeederContext"
import { MorseBufferContext } from "./morseBufferContext";
import morseCode from '../data/morse-reverse.json'


const ChallengeContext = React.createContext()

function ChallengeContextProvider(props) {

    const [challengeState, setChallengeState] = useState('ready')
    const [challengeWordClass, setChallengeWordClass] = useState('')
    const {resetFeeder, word, getNextWord} = useContext(WordFeederContext)
    const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)

    const morseArray = morseCharBuffer.split('_').filter(l => l !== '')
    const challengeLetters = (typeof word === 'object' ? word[0] : word).split('')


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

    // Complete the challenge when the word list is exhausted
    useEffect(() => {
        if (typeof word === 'object') {
            completeChallenge()
        }
        // eslint-disable-next-line
    }, [word])

    // Process the morse buffer against the current challenge word
    useEffect(() => {
        if (challengeState !== 'started') return
        if (typeof word === 'object') return
        if (morseCharBuffer.slice(-1) !== '_') return

        const arr = morseCharBuffer.split('_').filter(l => l !== '')
        if (arr.length === 0) return

        const letters = challengeLetters
        let correctIndexes = []

        for (let index = 0; index < arr.length; index++) {
            // Guard against more entries than letters in the word
            if (index >= letters.length) {
                setMorseCharBuffer(prev => {
                    const parts = prev.split('_').filter(l => l !== '')
                    parts.splice(index, 1)
                    return parts.join('_') + '_'
                })
                return
            }

            const morseLetter = morseCode[arr[index]] || '[?]'
            const challengeLetter = letters[index].toLowerCase()

            if (morseLetter === challengeLetter) {
                correctIndexes.push(index)
                const challengeWordEl = document.getElementById('challengeWord')
                if (challengeWordEl && challengeWordEl.childNodes[index]) {
                    challengeWordEl.childNodes[index].classList.add('correct')
                }
            } else {
                // Remove the incorrect entry and let the user retry
                setMorseCharBuffer(prev => {
                    const parts = prev.split('_').filter(l => l !== '')
                    parts.splice(index, 1)
                    return parts.join('_') + '_'
                })
                return
            }
        }

        // All letters correct — advance to next word
        if (correctIndexes.length === letters.length) {
            setChallengeWordClass('correct')
            setTimeout(() => {
                setMorseCharBuffer('')
                setChallengeWordClass('')
                const challengeWordEl = document.getElementById('challengeWord')
                if (challengeWordEl) {
                    challengeWordEl.childNodes.forEach(node => {
                        node.classList = 'cLetter'
                    })
                }
            }, 800)
            setTimeout(() => {
                getNextWord()
            }, 1000)
        }
        // eslint-disable-next-line
    }, [morseCharBuffer, challengeState, word])


    return (
        <ChallengeContext.Provider value={{
            challengeState: challengeState,
            setChallengeState: setChallengeState,
            startChallenge: startChallenge,
            completeChallenge: completeChallenge,
            cancelChallenge: cancelChallenge,
            challengeWordClass: challengeWordClass,
            morseArray: morseArray,
            incorrectMorseIndexes: []
            }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}

export {ChallengeContextProvider, ChallengeContext}
