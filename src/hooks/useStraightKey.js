import { useEffect, useContext } from 'react'
import { FrequencyContext } from '../contexts/frequencyContext'
import { GameModeContext } from '../contexts/gameModeContext'
import { MorseBufferContext } from '../contexts/morseBufferContext'
import { WPMContext } from '../contexts/wpmContext'
import config from '../config.json'

// STRAIGHT KEY TELEGRAPH
export default (function useStraightKey() {
    
    const {morseCharBuffer, setMorseCharBuffer, morseWords, setMorseWords} = useContext(MorseBufferContext)
    const {wpm} = useContext(WPMContext)
    const {gameMode} = useContext(GameModeContext)
    const {frequency} = useContext(FrequencyContext)

    // Spacing time and timer setup
    let charTimer = 0
    let charTime = 0
    let gapTimer = 0
    let gapTime = 0
    
    // DitDah Length
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
        if (event.type === 'touchstart') {
            event.preventDefault()
        }

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
            isRunning = true

            if ((event.keyCode !== 32 &&
                event.target.id !== "morseButton" &&
                event.target.className !== "paddle") ||
                (event.repeat)) {
                return
            }
            else {
                document.getElementById('morseButton').classList.add('active')
    
                // isRunning = true
    
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
        }, 1);
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
            
            // Account for bug triggered when pressing paddle button (e.g.) outside of body, then clicking into body, and depressing key
            if (o === undefined) { 
                return
            }
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
        }, 1);
    }

    // Check gap between letters to determin if new character or new word
    function checkGapBetweenInputs() {
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
    
    // Add paddle event listeners and update on WPM, Game Mode, or Frequency change
    // Not updating on these state changes prevents change from taking effect
    useEffect(() => {
        document.addEventListener('keydown', handleInputStart)
        document.addEventListener('keyup', handleInputEnd)

        const morseButton = document.getElementById('morseButton')
        morseButton.addEventListener('touchstart', handleInputStart)
        morseButton.addEventListener('touchend', handleInputEnd)
        morseButton.addEventListener('mousedown', handleInputStart)
        morseButton.addEventListener('mouseout', handleInputEnd)
        morseButton.addEventListener('mouseup', handleInputEnd)

        return function cleanup() {
            document.removeEventListener('keydown', handleInputStart)
            document.removeEventListener('keyup', handleInputEnd)

            const morseButton = document.getElementById('morseButton')
            morseButton.removeEventListener('touchstart', handleInputStart)
            morseButton.removeEventListener('touchend', handleInputEnd)
            morseButton.removeEventListener('mousedown', handleInputStart)
            morseButton.removeEventListener('mouseout', handleInputEnd)
            morseButton.removeEventListener('mouseup', handleInputEnd)

            clearInterval(charTimer)
            clearInterval(gapTimer)
        }
        // eslint-disable-next-line
    }, [wpm, gameMode, frequency])

    // Remove forward slash and move buffer contents to morse words array
    useEffect(() => {
        if (morseCharBuffer.slice(-1) === '/' && gameMode === 'practice') {
            let val = morseCharBuffer.slice(0,morseCharBuffer.length-1)
            setMorseWords(prev => [val, ...prev])

            // Limit history to configured history size
            if (morseWords.length >= morseHistorySize) {
                setMorseWords(prev => prev.slice(0,prev.length-1))
            }
            setMorseCharBuffer('')

            // Scroll morse history textbox to bottom (scrolling enabled on mobile screens)
            let morseHistory = document.getElementById("morseHistory-textbox");
            morseHistory.scrollTop = morseHistory.scrollHeight;
        }

        // eslint-disable-next-line
    }, [morseCharBuffer])

})