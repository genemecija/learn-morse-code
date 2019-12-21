import React, { useEffect, useState } from 'react';
import './App.css';
import MorseDisplay from './components/MorseDisplay'
import MorseBufferDisplay from './components/MorseBufferDisplay'
import MorseButton from './components/MorseButton'
// import LettersDisplay from './components/LettersDisplay'

function App() {

    const [morseCharBuffer, setMorseCharBuffer] = useState('') // e.g. '-..'
    // const [morseLettersBuffer, setMorseLettersBuffer] = useState([]) // e.g. ['-..','.','-,']
    const [morseWords, setMorseWords] = useState([]) // e.g. [['-..','.','-,'], ['...','---','...']]
    
    let charTimer = 0
    let charTime = 0
    let gapTimer = 0
    let gapTime = 0

    const timingUnit = 15 // default: 25

    const ditMaxTime = 5  // default: 3
    const letterGapMinTime = ditMaxTime*3
    const wordGapMaxTime = ditMaxTime*7
    const morseHistorySize = 3

    let context = new AudioContext()
    let o
    

    function handleInputStart(event) {
        if ((event.keyCode !== 32 && event.target.id !== "morseButton") ||
        (event.repeat)) {
            return
        }
        // if (gapTimer===0) { setMorseLettersBuffer('') }
        checkGapBetweenInputs()
        clearInterval(gapTimer)
        
        o = context.createOscillator()
        o.type = "sine"
        let frequency = 550.0
        o.frequency.value = frequency
        o.connect(context.destination)
        o.start()

        startCharTimer()
    }
    function startCharTimer() {
        // Reset character time
        charTime = 0
        // Start Character Timer
        charTimer = setInterval(() => {
            charTime += 1
        }, timingUnit);
    }

    function handleInputEnd(event) {
        if ((event.keyCode !== 32 && event.target.id !== "morseButton") ||
        (event.repeat)) {
            return
        }

        if (charTime <= ditMaxTime) {
            setMorseCharBuffer(prev => prev + '.')
        } else {
            setMorseCharBuffer(prev => prev + '-')
        }

        stopCharTimer()
        startGapTimer()
        o.stop()
    }

    function stopCharTimer() {    
        clearInterval(charTimer)
        charTimer = 0
    }

    function startGapTimer() {
        gapTime = 0
        gapTimer = setInterval(() => {
            gapTime += 1

            // Gap between words
            if (gapTime >= wordGapMaxTime) {
                setMorseCharBuffer(prev => prev + '/')
                clearInterval(gapTimer)
                gapTimer = 0
                gapTime = 0
            }
        }, timingUnit);
    }

    function checkGapBetweenInputs() {
        // Check Gap between letters
        if ((gapTime >= letterGapMinTime) && (gapTime < wordGapMaxTime)) {
            // setMorseLettersBuffer(prev => [...prev, morseCharBuffer])
            setMorseCharBuffer(prev => prev + ' ')
            // morseLettersBuffer = [...morseLettersBuffer, morseCharBuffer]
            // setMorseCharBuffer('')

            clearInterval(gapTimer)
            gapTimer = 0
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleInputStart)
        document.addEventListener('keyup', handleInputEnd)
        document.getElementById('morseButton').addEventListener('mousedown', handleInputStart)
        document.getElementById('morseButton').addEventListener('mouseup', handleInputEnd)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (morseCharBuffer.slice(-1) === ' ') {
            // setMorseLettersBuffer([morseCharBuffer])
            // setMorseCharBuffer('')
        }
        if (morseCharBuffer.slice(-1) === '/') {
            // Remove forward slash
            let val = morseCharBuffer.slice(0,morseCharBuffer.length-1)
            console.log('val: ', val);

            setMorseWords(prev => [val, ...prev])

            if (morseWords.length >= morseHistorySize) {
                setMorseWords(prev => prev.slice(0,prev.length-1))
            }
            
            setMorseCharBuffer('')
        }

        // setMorseLettersBuffer(prev => [...prev, morseCharBuffer])
        // eslint-disable-next-line
    }, [morseCharBuffer])

    return (
        <div>charTime: {charTime}<br/>
            <MorseButton />
            morseCharBuffer:<br/>
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseDisplay morseWords={morseWords}/>
            
        </div>
    );
}

export default App;
