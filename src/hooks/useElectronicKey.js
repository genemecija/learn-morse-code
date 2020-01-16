import {useEffect, useContext, useState} from 'react'
import config from '../config.json'
import {MorseBufferContext} from '../contexts/morseBufferContext'

// SINGLE/DUAL LEVER TELEGRAPH

function useElectronicKey(mode = 'practice') {

    const {morseCharBuffer, setMorseCharBuffer, morseWords, setMorseWords} = useContext(MorseBufferContext)

    const timingUnit = config.timingUnit
    
    const ditMaxTime = 85 // ditMaxTime * 0.365 to get ms, e.g. 85 * 0.365 ~= 31ms
    const letterGapMinTime = ditMaxTime*0.36*3 //config.practiceSpeed.normal*3
    const wordGapMaxTime = ditMaxTime*0.36*7 // config.practiceSpeed.normal*7
    const morseHistorySize = config.historySize

    let leftIsPressed = false
    let rightIsPressed = false
    let queueRunning = false
    let queue = []
    let pressedFirst = null

    let depressSyncTime
    let depressSyncTimer
    let depressSyncTimerRunning = false
    let gapTimer = 0
    let gapTime = 0
    let paddlesReleasedSimultaneously = false


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
                // clearInterval(toneTimer)
                // end = toneTime
                // console.log('duration:', end-start);
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
                play(ditDah)
                .then(setTimeout(() => {
                    setMorseCharBuffer(prev => prev + ditDah)
                    resolve();
                }, delay))
            } else {
                setTimeout(() => {
                    // setMorseCharBuffer(prev => prev + ' ')
                    resolve();
                }, delay)
            }
        });
    }

    function executeQueue() {
        let localQueue = queue
        
        // Set waitTime to completion of queue (including spaces)
        let waitTime = 0
        for (let i in localQueue) {
            if (localQueue[i] === '.') {
                waitTime += ditMaxTime*2
            } else if (localQueue[i] === '-') {
                waitTime += ditMaxTime*4
            }
        }

        queueRunning = true

        // Wait till completion of queue to execute
        const clear = setTimeout(() => {
            queueRunning = false
            queue = []
            checkPressed()
        }, waitTime)
        
        // Execute queue
        for (let i = 0; i < localQueue.length; i++) {
            currentPromise = currentPromise.then(() => {
                return playWithSpaces(localQueue[i])
            });
        }
    }

    function checkPressed() {
        if (leftIsPressed && rightIsPressed) {
            // queue.push(queue.slice(-1) === '.' ? '-' : '.')
            if (pressedFirst === 'left') {
                queue.push('-')
                if (!paddlesReleasedSimultaneously) {
                    // console.log('one');
                    queue.push('.')
                }
            } else {
                queue.push('.')
                if (!paddlesReleasedSimultaneously) {
                    // console.log('two');
                    queue.push('-')
                }
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

        // if (event.keyCode === 188) {
        //     depressSyncTimeout()
        // }
        // else if (event.keyCode === 190) {
        //     testQueue.push('.')
        //     console.log('testQueue', testQueue);
        // }
        // else if (event.target.id === 'morseButton') {
        //     testQueue = []
        // }
        // while (testQueue.length > 0) {
        //     currentPromise = currentPromise.then(() => {
        //         return playWithSpaces(testQueue.shift())
        //     })
        // }
        paddlesReleasedSimultaneously = false

        if (event.repeat) { return }

        // if (!leftIsPressed && !rightIsPressed) {
        //     clearInterval(gapTimer)
        //     checkGapBetweenInputs()
        // }

        if (event.keyCode === 188) {
            leftIsPressed = true
            if (!rightIsPressed) { pressedFirst = 'left'}

            // Prevent further input if queue is executing
            if (!queueRunning) {
                checkPressed()
            }
        }
        else if (event.keyCode === 190) {
            rightIsPressed = true
            if (!leftIsPressed) { pressedFirst = 'right'}

            // Prevent further input if queue is executing
            if (!queueRunning) {
                checkPressed()
            }
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
        if (gapTime >= letterGapMinTime && gapTime < wordGapMaxTime) {
            console.log('letterGapMinTime <= gapTime < wordGapMaxTime:',letterGapMinTime, gapTime, wordGapMaxTime);
            if (mode === 'practice') {
                setMorseCharBuffer(prev => prev + ' ')
            } else if (mode === 'challenge') {
                console.log("UNDERSCORE ADDED");
                setMorseCharBuffer(prev => prev + '_')
            }
            clearInterval(gapTimer)
            gapTimer = 0
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
        else if (event.keyCode === 190) {
            rightIsPressed = false
            if (pressedFirst === 'right') { pressedFirst = null }

            if (!depressSyncTimerRunning) { startDepressSyncTimer() }
            else { stopDepressSyncTimer() }
        }
        // if (!leftIsPressed && !rightIsPressed ) { startGapTimer() }
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