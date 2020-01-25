import {useEffect, useContext} from 'react'
import {MorseBufferContext} from '../contexts/morseBufferContext'
import config from '../config.json'
import { WPMContext } from '../contexts/wpmContext'

// ELECTRONIC KEY TELEGRAPH - Iambic A

function useElectronicKey(gameMode, wpm) {

    const {morseCharBuffer, setMorseCharBuffer, morseWords, setMorseWords} = useContext(MorseBufferContext)
    // const {wpm} = useContext(WPMContext)
    // console.log('useStraightKey-WPM:', wpm);

    const timingUnit = config.timingUnit
    
    let ratio = .2
    const ditMaxTime = 1200/wpm // ditMaxTime * 0.365 to get ms, e.g. 85 * 0.365 ~= 31ms

    const letterGapMinTime = ditMaxTime*ratio*3 //config.practiceSpeed.normal*3
    const wordGapMaxTime = ditMaxTime*ratio*7 // config.practiceSpeed.normal*7
    const morseHistorySize = config.historySize

    let leftIsPressed = false
    let rightIsPressed = false
    let queueRunning = false
    let queue = []
    let pressedFirst = null

    let depressSyncTime
    let depressSyncTimer
    let depressSyncTimerRunning = false
    let gapTime = 0
    let gapTimer = 0
    // let gapTimerRunning = false
    let paddlesReleasedSimultaneously = false


    // function consoleLogVars() {
    //     // Log variables (Debug tool)
    //     console.log('<VARS>');
    //     console.log('leftIsPressed', leftIsPressed);
    //     console.log('rightIsPressed', rightIsPressed);
    //     console.log('queueRunning', queueRunning);
    //     console.log('queue', queue);
    //     console.log('pressedFirst', pressedFirst);
    //     console.log('gapTime', gapTime);
    //     console.log('paddlesReleasedSimultaneously', paddlesReleasedSimultaneously);
    //     console.log('</VARS>');
    // };

    let currentPromise = Promise.resolve()

    // Audio Setup
    let AudioContext = window.AudioContext || window.webkitAudioContext || false
    let context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        context = new AudioContext()
    } else {
        context = null
    }
    let frequency = config.frequency

    
    let toneTimer = 0
    let toneTime = 0
    let start = 0
    let end = 0

    function getTime() {
        let today = new Date()
        return today.getMilliseconds()
    }

    // Promisify playing Dits and Dahs
    function play(ditDah) {
        let playDuration = ((ditDah === '.') ? ditMaxTime : ditMaxTime*3)

        return new Promise((resolve, reject) => {
            if (context.state === 'interrupted') {
                context.resume()
            }
            
            let o = context.createOscillator()
            o.frequency.value = frequency
            o.type = "sine"
            o.onended = () => {
                resolve()
            }
            
            let startTime = context.currentTime;
    
            let g = context.createGain()
            g.gain.exponentialRampToValueAtTime(config.mainVolume, startTime)
            g.gain.setValueAtTime(config.mainVolume, startTime)
            o.connect(g)
            g.connect(context.destination)
            
            o.start(startTime)
            
            setTimeout(() => {
                g.gain.setTargetAtTime(0.0001, context.currentTime, 0.001)
                o.stop(context.currentTime + 0.05)
                
                // start = getTime()
            }, playDuration)
            // g.gain.setTargetAtTime(0.0001, startTime + playDuration/1000, 0.001)
            // o.stop(startTime + playDuration/1000 + 0.05)
        })
    }

    function clearHistory() {
        setMorseWords([])
    }

    function stopToneTimer() {
        clearInterval(toneTimer)
        end = toneTime
        console.log('toneTime:', start, end);
        toneTime = 0
    }

    function playWithSpaces(ditDah) {
        let delay = (ditDah === '.') ? ditMaxTime + ditMaxTime : ditMaxTime*3 + ditMaxTime

        return new Promise(function(resolve) {
            if (ditDah === '.' || ditDah === '-') {

                clearInterval(gapTimer)
                checkGapBetweenInputs()
                setMorseCharBuffer(prev => prev + ditDah)

                // // for troubleshooting ditDah length in milliseconds
                // toneTimer = setInterval(() => {
                //     toneTime += 1
                // }, 1);
                // start = toneTime

                
                play(ditDah)
                .then(setTimeout(() => {
                    // START GAP TIMER
                    gapTimer = setInterval(() => {
                        gapTime += 1
    
                        // if (gapTime >= wordGapMaxTime) {
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
                    }, timingUnit)
                    
                    resolve();
                }, delay)
                )
            } else {
                setTimeout(() => {
                    resolve();
                }, ditMaxTime*3)
            }
        });
    }

    function executeQueue() {
        let localQueue = queue
        
        // Set waitTime to completion of queue (ditDah time + following silences)
        let waitTime = 0
        for (let i in localQueue) {
            if (localQueue[i] === '.') {
                waitTime += ditMaxTime*2
            } else if (localQueue[i] === '-') {
                waitTime += ditMaxTime*4
            }
        }
        
        // Cleanup
        function cleanup() {
            queueRunning = false
            queue = []
            sendPressedToQueue() // Check if anything still pressed down on queue finish
        }
        
        // Wait till completion of queue to execute
        const clear = setTimeout(() => {
            cleanup()
        }, waitTime)
        
        // Execute queue
        queueRunning = true
        for (let i = 0; i < localQueue.length; i++) {
            if (paddlesReleasedSimultaneously === true) {
                localQueue.pop()
                clearTimeout(clear)
                cleanup()
            }
            currentPromise = currentPromise.then(() => {
                return playWithSpaces(localQueue[i])
            });
        }
    }

    function sendPressedToQueue() {
        if (leftIsPressed && rightIsPressed) {
            if (pressedFirst === 'left') {
                queue.push('-')
                pressedFirst = null

            } else {
                queue.push('.')
                queue.push('-')
            }
        }
        else if (leftIsPressed && !rightIsPressed) {
            queue.push('.')
        }
        else if (rightIsPressed && !leftIsPressed) {
            queue.push('-')
        }
        if (queue.length > 0) {
            executeQueue()
        }
    }

    const bufferDisplay = ['morseBufferDisplay', 'challengeBufferDisplay', 'ditDahs', 'alphanumeric-container']

    function handleInputStart(event) {
        event.preventDefault()
        
        paddlesReleasedSimultaneously = false

        if (event.repeat) { return }

        if (event.keyCode === 188 || event.target.id === "left") {
            leftIsPressed = true
            if (!rightIsPressed) { pressedFirst = 'left'}

            // Prevent further input if queue is executing
            if (!queueRunning) {
                sendPressedToQueue()
            }
        }
        else if (event.keyCode === 190 || event.target.id === "right") {
            rightIsPressed = true
            if (!leftIsPressed) { pressedFirst = 'right'}

            // Prevent further input if queue is executing
            if (!queueRunning) {
                sendPressedToQueue()
            }
        }
    }

    function handleInputEnd(event) {
        event.preventDefault()

        // if (!insideBufferDisplay) {return}

        if (event.keyCode === 188 || event.target.id === "left") {
            leftIsPressed = false
            
            if (pressedFirst === 'left') { pressedFirst = null }

            if (!depressSyncTimerRunning) { startDepressSyncTimer() }
            else { stopDepressSyncTimer() }
        }
        if (event.keyCode === 190 || event.target.id === "right") {
            rightIsPressed = false
            if (pressedFirst === 'right') { pressedFirst = null }

            if (!depressSyncTimerRunning) { startDepressSyncTimer() }
            else { stopDepressSyncTimer() }
        }
    }
    
    function startDepressSyncTimer() {
        depressSyncTimerRunning = true
        // Reset depressSyncTime
        depressSyncTime = 0
        // Start depressSyncTimer
        depressSyncTimer = setInterval(() => {
            depressSyncTime += 1
            if (depressSyncTime > 20) {
                depressSyncTimerRunning = false
                clearInterval(depressSyncTimer)
                depressSyncTime = 0
            }
        }, 1);
    }
    function stopDepressSyncTimer() {
        depressSyncTimerRunning = false
        clearInterval(depressSyncTimer)
        if (depressSyncTime < 10) {
            paddlesReleasedSimultaneously = true
            queue.pop()
            console.log('paddles released', queue);
        }
        depressSyncTime = 0
    }
    function checkGapBetweenInputs() {
        // Check Gap between letters
        if (gapTime >= letterGapMinTime && gapTime < wordGapMaxTime) {
            // setMorseCharBuffer(prev => prev + ' ')
            if (gameMode === 'practice') {
                setMorseCharBuffer(prev => prev + ' ')
            } else if (gameMode === 'challenge') {
                setMorseCharBuffer(prev => prev + '_')
            }
            gapTime = 0
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
            clearHistory()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // PRACTICE MODE
        // if (morseCharBuffer.slice(-1) === '/') {
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

export default useElectronicKey