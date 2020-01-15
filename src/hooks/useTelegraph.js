import {useState, useEffect} from 'react'
import config from '../config.json'

// STRAIGHT KEY TELEGRAPH

function useTelegraph(mode = 'practice') {

    const [morseCharBuffer, setMorseCharBuffer] = useState('') // e.g. '-..'
    const [morseWords, setMorseWords] = useState([]) // e.g. [['-..','.','-,'], ['...','---','...']]

    let charTimer = 0
    let charTime = 0
    let gapTimer = 0
    let gapTime = 0
    
    const timingUnit = config.timingUnit
    
    const ditMaxTime = config.practiceSpeed.normal
    const letterGapMinTime = ditMaxTime*3
    const wordGapMaxTime = ditMaxTime*7
    const morseHistorySize = 5

    // Tone Setup
    let AudioContext = window.AudioContext || window.webkitAudioContext || false
    let context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        context = new AudioContext()
    } else {
        context = null
    }

    let o // Oscillator Node
    let g // Gain Node
    let frequency = config.frequency

    let isRunning = false
    
    function clearHistory() {
        setMorseWords([])
    }

    function handleInputStart(event) {
        event.preventDefault()

        console.log('ditmaxtime:', ditMaxTime);

        if (isRunning) {
            return
        } else {
            isRunning = true

            // TODO:
            // Make sure only one touchdown event registered at a time
            if ((event.keyCode !== 32 && event.target.id !== "morseButton") ||
            (event.repeat)) {
                return
            }
            if (context.state === 'interrupted') {
                context.resume()
            }
            
            o = context.createOscillator()
            o.frequency.value = frequency
            o.type = "sine"
            
            g = context.createGain()
            g.gain.exponentialRampToValueAtTime(config.mainVolume, context.currentTime)
            o.connect(g)
            g.connect(context.destination)
            o.start()
            
            checkGapBetweenInputs()
            clearInterval(gapTimer)

            startCharTimer()
        }
        
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
        event.preventDefault()

        if (isRunning) {
            isRunning = false
            if ((event.keyCode !== 32 && event.target.id !== "morseButton") ||
            (event.repeat)) {
                return
            }
            // if (event.repeat) {
            //     return
            // }
    
            if (charTime <= ditMaxTime) {
                setMorseCharBuffer(prev => prev + '.')
            } else {
                setMorseCharBuffer(prev => prev + '-')
            }
    
            stopCharTimer()
            startGapTimer()
            
            if (o.context.state === 'running') {
                g.gain.setTargetAtTime(0.0001, context.currentTime, 0.001)
                o.stop(context.currentTime + 0.01)
            }
        } else { return }
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
            if (mode === 'practice' && gapTime >= wordGapMaxTime) {
                setMorseCharBuffer(prev => prev + '/')
                clearInterval(gapTimer)
                gapTimer = 0
                gapTime = 0
            }
            if (mode === 'challenge' && gapTime >= letterGapMinTime) {
                setMorseCharBuffer(prev => prev + '_')
                clearInterval(gapTimer)
                gapTimer = 0
                gapTime = 0
            }
        }, timingUnit);
    }

    function checkGapBetweenInputs() {
        // Check Gap between letters

        if (gapTime >= letterGapMinTime && gapTime < wordGapMaxTime) {
            if (mode === 'practice') {
                setMorseCharBuffer(prev => prev + ' ')
            } else if (mode === 'challenge') {
                setMorseCharBuffer(prev => prev + '_')
            }
            clearInterval(gapTimer)
            gapTimer = 0
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleInputStart)
        document.addEventListener('keyup', handleInputEnd)

        const morseButton = document.getElementById('morseButton')
        morseButton.addEventListener('mousedown', handleInputStart)
        morseButton.addEventListener('touchstart', handleInputStart)
        morseButton.addEventListener('mouseup', handleInputEnd)
        morseButton.addEventListener('touchend', handleInputEnd)

        return function cleanup() {
            document.removeEventListener('keydown', handleInputStart)
            document.removeEventListener('keyup', handleInputEnd)
            clearHistory()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // PRACTICE MODE
        if (morseCharBuffer.slice(-1) === '/' && mode === 'practice') {
            // Remove forward slash
            let val = morseCharBuffer.slice(0,morseCharBuffer.length-1)

            setMorseWords(prev => [val, ...prev])

            if (morseWords.length >= morseHistorySize) {
                setMorseWords(prev => prev.slice(0,prev.length-1))
            }
            setMorseCharBuffer('')
        }
        console.log('morseCharBuffer:', morseCharBuffer, '|');
        // CHALLENGE MODE: leave forward slash there; to be parsed by ChallengeDisplay.js
        // else if (morseCharBuffer.slice(-1) === '/' && mode === 'challenge') {
            
        // }

        // eslint-disable-next-line
    }, [morseCharBuffer])

    return {morseCharBuffer, morseWords, clearHistory, setMorseCharBuffer, setMorseWords}
}

export default useTelegraph