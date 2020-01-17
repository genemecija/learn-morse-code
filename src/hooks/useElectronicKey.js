import {useEffect, useContext} from 'react'
import config from '../config.json'
import {MorseBufferContext} from '../contexts/morseBufferContext'

// SINGLE/DUAL LEVER TELEGRAPH - Iambic A

function useElectronicKey(mode = 'practice') {

    const {morseCharBuffer, setMorseCharBuffer, morseWords, setMorseWords} = useContext(MorseBufferContext)

    const timingUnit = config.timingUnit
    
    let ratio = 0.2
    const ditMaxTime = 80 // ditMaxTime * 0.365 to get ms, e.g. 85 * 0.365 ~= 31ms
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

            // // for troubleshooting ditDah length in milliseconds
            // toneTimer = setInterval(() => {
            //     toneTime += 1
            // }, 1);
            // start = toneTime
            // // </>

            g.gain.setTargetAtTime(0.0001, startTime + playDuration/1000, 0.001)
            o.stop(startTime + playDuration/1000 + 0.05)
        })
    }

    function playWithSpaces(ditDah) {
        let delay = (ditDah === '.') ? ditMaxTime + ditMaxTime : ditMaxTime*3 + ditMaxTime

        return new Promise(function(resolve) {
            if (ditDah === '.' || ditDah === '-') {

                clearInterval(gapTimer)
                checkGapBetweenInputs()
                setMorseCharBuffer(prev => prev + ditDah)

                play(ditDah)
                .then(setTimeout(() => {
                    
                    // START GAP TIMER
                    // gapTimerRunning = true
                    gapTimer = setInterval(() => {
                        gapTime += 1

                        if (gapTime >= wordGapMaxTime) {
                            setMorseCharBuffer(prev => prev + '/')
                            clearInterval(gapTimer)
                            gapTimer = 0
                            gapTime = 0
                        }
                    }, timingUnit)
                    
                    resolve();
                }, delay))
            } else {
                setTimeout(() => {
                    resolve();
                }, delay)
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

    function handleInputStart(event) {
        event.preventDefault()

        paddlesReleasedSimultaneously = false

        if (event.repeat) { return }

        if (event.keyCode === 188) {
            leftIsPressed = true
            if (!rightIsPressed) { pressedFirst = 'left'}

            // Prevent further input if queue is executing
            if (!queueRunning) {
                sendPressedToQueue()
            }
        }
        else if (event.keyCode === 190) {
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

        if (event.keyCode === 188) {
            leftIsPressed = false
            
            if (pressedFirst === 'left') { pressedFirst = null }

            if (!depressSyncTimerRunning) { startDepressSyncTimer() }
            else { stopDepressSyncTimer() }
        }
        if (event.keyCode === 190) {
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
        // console.log('gapTime', gapTime);
        // console.log('letterGapMinTime', letterGapMinTime);
        // console.log('wordGapMaxTime', wordGapMaxTime);
        if (gapTime >= letterGapMinTime && gapTime < wordGapMaxTime) {
            // console.log('letterGapMinTime <= gapTime < wordGapMaxTime:',letterGapMinTime, gapTime, wordGapMaxTime);
            if (mode === 'practice') {
                setMorseCharBuffer(prev => prev + ' ')
                gapTime = 0
            } else if (mode === 'challenge') {
                console.log("UNDERSCORE ADDED");
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
        // CHALLENGE MODE: leave forward slash there; to be parsed by ChallengeDisplay.js
        // else if (morseCharBuffer.slice(-1) === '/' && mode === 'challenge') {
            
        // }

        // eslint-disable-next-line
    }, [morseCharBuffer])
}

export default useElectronicKey