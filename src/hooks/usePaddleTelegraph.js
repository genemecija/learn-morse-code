import {useEffect} from 'react'
import config from '../config.json'

// SINGLE/DUAL LEVER TELEGRAPH

function usePaddleTelegraph() {

    const ditMaxTime = 85
    let leftIsPressed = false
    let rightIsPressed = false
    let queueRunning = false
    let queue = []

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
        console.log('localQueue',localQueue);
        
        // Set wait time to completion of queue (including spaces)
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
        setTimeout(() => {
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
        if (leftIsPressed) {
            queue.push('.')
        }
        if (rightIsPressed) {
            queue.push('-')
        }
        if (queue.length > 0) {
            executeQueue()
        }
    }

    function handleInputStart(event) {
        event.preventDefault()
        
        if (event.repeat) { return }

        if (event.keyCode === 188) {
            leftIsPressed = true
            console.log("LEFT DOWN");

            // Prevent further input if queue is executing
            if (!queueRunning) {
                checkPressed()
            }
        }
        else if (event.keyCode === 190) {
            rightIsPressed = true
            console.log("RIGHT DOWN");

            // Prevent further input if queue is executing
            if (!queueRunning) {
                checkPressed()
            }
        }
    }

    function handleInputEnd(event) {
        event.preventDefault()

        if (event.keyCode === 188) {
            leftIsPressed = false
            console.log("LEFT UP");
        }
        else if (event.keyCode === 190) {
            rightIsPressed = false
            console.log("RIGHT UP");
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

}

export default usePaddleTelegraph