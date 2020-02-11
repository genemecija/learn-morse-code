import {useEffect, useContext} from 'react'
import {MorseBufferContext} from '../contexts/morseBufferContext'
import config from '../config.json'
import { WPMContext } from '../contexts/wpmContext'
import { GameModeContext } from '../contexts/gameModeContext'
import { FrequencyContext } from '../contexts/frequencyContext'

// STRAIGHT KEY TELEGRAPH
function useStraightKey() {
    
    const {morseCharBuffer, setMorseCharBuffer, morseWords, setMorseWords} = useContext(MorseBufferContext)
    const {wpm} = useContext(WPMContext)
    const {gameMode} = useContext(GameModeContext)
    const {frequency} = useContext(FrequencyContext)

    let charTimer = 0
    let charTime = 0
    let gapTimer = 0
    let gapTime = 0
    
    const timingUnit = config.timingUnit
    
    const ditMaxTime = 1200/wpm * 0.3
    
    const letterGapMinTime = ditMaxTime*3
    const wordGapMaxTime = ditMaxTime*7
    const morseHistorySize = config.historySize
    

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

    let isRunning = false


    function handleInputStart(event) {

        if (event.keyCode === 32) {
            if (document.activeElement.id === 'morseInput') {
                return
            }
            else if (document.activeElement.tagName.toLowerCase() !== 'body') {
                event.preventDefault()
                document.activeElement.blur()
            }
        }

        if (isRunning) {
            return
        } else {
            if ((event.keyCode !== 32 &&
                event.target.id !== "morseButton" &&
                event.target.className !== "paddle") ||
                (event.repeat)) {
                return
            }
            else {
                document.getElementById('morseButton').classList.add('active')
    
                isRunning = true
    
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
        
    }
    
    function startCharTimer() {
        // Start Character Timer
        charTimer = setInterval(() => {
            charTime += 1
        }, timingUnit);
    }

    function handleInputEnd(event) {

        if (isRunning) {
            if ((event.keyCode !== 32 &&
                event.target.id !== "morseButton" &&
                event.target.className !== "paddle") ||
                (event.repeat)) {
                return
            }

            document.getElementById('morseButton').classList.remove('active')

            isRunning = false
            
            if (charTime <= ditMaxTime) {
                setMorseCharBuffer(prev => prev + '.')
            } else {
                setMorseCharBuffer(prev => prev + '-')
            }
    
            stopCharTimer()
            startGapTimer()
            
            if (o.context.state === 'running') {
                g.gain.setTargetAtTime(0.0001, context.currentTime, 0.001)
                o.stop(context.currentTime + 0.05)
            }
        } else { return }
    }

    function stopCharTimer() {    
        clearInterval(charTimer)
        charTimer = 0
        charTime = 0
    }

    function startGapTimer() {
        gapTime = 0
        gapTimer = setInterval(() => {
            gapTime += 1

            // Gap between words
            if (gameMode === 'practice' && gapTime >= wordGapMaxTime) {
                setMorseCharBuffer(prev => prev + '/')
                clearInterval(gapTimer)
                gapTimer = 0
                gapTime = 0
            }
            else if (gameMode === 'challenge' && gapTime >= letterGapMinTime) {
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
            if (gameMode === 'practice') {
                setMorseCharBuffer(prev => prev + ' ')
            } else if (gameMode === 'challenge') {
                setMorseCharBuffer(prev => prev + '_')
            }
            clearInterval(gapTimer)
            gapTimer = 0
        }
    }
    

    useEffect(() => {
        document.addEventListener('keydown', handleInputStart)
        document.addEventListener('keyup', handleInputEnd)

        const paddles = document.querySelectorAll('.paddle')
        paddles.forEach(paddle => {
            paddle.addEventListener('mousedown', handleInputStart)
            paddle.addEventListener('touchstart', handleInputStart)
            paddle.addEventListener('mouseout', handleInputEnd)
            paddle.addEventListener('mouseup', handleInputEnd)
            paddle.addEventListener('touchend', handleInputEnd)
        })

        return function cleanup() {
            document.removeEventListener('keydown', handleInputStart)
            document.removeEventListener('keyup', handleInputEnd)

            const paddles = document.querySelectorAll('.paddle')
            paddles.forEach(paddle => {
                paddle.removeEventListener('mousedown', handleInputStart)
                paddle.removeEventListener('touchstart', handleInputStart)
                paddle.removeEventListener('mouseout', handleInputEnd)
                paddle.removeEventListener('mouseup', handleInputEnd)
                paddle.removeEventListener('touchend', handleInputEnd)
            })

            clearInterval(charTimer)
            clearInterval(gapTimer)
        }
        // eslint-disable-next-line
    }, [wpm, gameMode, frequency])

    useEffect(() => {
        // PRACTICE MODE
        if (morseCharBuffer.slice(-1) === '/' && gameMode === 'practice') {
            // Remove forward slash
            let val = morseCharBuffer.slice(0,morseCharBuffer.length-1)

            setMorseWords(prev => [val, ...prev])

            if (morseWords.length >= morseHistorySize) {
                setMorseWords(prev => prev.slice(0,prev.length-1))
            }
            setMorseCharBuffer('')
        }
        // CHALLENGE MODE: leave forward slash there; to be parsed by ChallengeDisplay.js
        // else if (morseCharBuffer.slice(-1) === '/' && mode === 'challenge') {
            
        // }

        // eslint-disable-next-line
    }, [morseCharBuffer])

}

export default useStraightKey