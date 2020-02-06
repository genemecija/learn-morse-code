import config from '../config.json'
import { WPMContext } from '../contexts/wpmContext.js';
import { useContext } from 'react';

function useMorsePlayer() {

    const {wpm} = useContext(WPMContext)
    // const ditMaxTime = 85 //config.ditMaxTime
    const ditMaxTime = 1200/wpm

    // Tone Setup
    let AudioContext = window.AudioContext || window.webkitAudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let context
    if (AudioContext) {
        context = new AudioContext()
    } else {
        context = null
    }

    let frequency = config.frequency

    function play(ditDah) {
        let length = ((ditDah === '.') ? ditMaxTime : ditMaxTime*3)
        // length = 1

        // return new Promise((resolve, reject) => {
        if (context.state === 'interrupted') {
            context.resume()
        }
        let o
        o = context.createOscillator()
        o.frequency.value = frequency
        o.type = "sine"
        // o.onended = () => {
        //     resolve()
        // }
        
        let startTime = context.currentTime;

        let g = context.createGain()
        g.gain.exponentialRampToValueAtTime(config.mainVolume, startTime)
        g.gain.setValueAtTime(config.mainVolume, startTime)
        o.connect(g)
        g.connect(context.destination)
        o.start(startTime)
        
        // g.gain.setTargetAtTime(0.0001, startTime + length/1000, 0.001)
        // o.stop(startTime + length/1000 + 0.05)
        setTimeout(() => {
            g.gain.setTargetAtTime(0.0001, context.currentTime, 0.009)
            o.stop(context.currentTime + 0.05)
        }, length)
        // })
    }

    let queue = []
    let timeouts = []
    function playMorseWord(morse) {

        // Empty morse queue and cancel all sounds (timeouts)
        queue = []
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }

        queue = Array.from(morse)
        // let currentPromise = Promise.resolve();

        let delay = 0
        let firstWord = true
        for (let i = 0; i < queue.length; i++) {
            // currentPromise = currentPromise.then(() => {
            //     return playChar(queue[i]);
            // });
            
            let char = queue[i]
            if (char === '.') {
                if (firstWord) {
                    firstWord = false
                    // soundQueue.push(
                        timeouts.push(setTimeout(() => {
                            play(char)
                        }, 0))
                    // )
                } else {
                    // soundQueue.push(
                        timeouts.push(setTimeout(() => {
                            play(char)
                        }, delay))
                    // )
                }
                delay += ditMaxTime*2
            } else if (char === '-') {
                if (firstWord) {
                    firstWord = false
                    // soundQueue.push(
                        timeouts.push(setTimeout(() => {
                            play(char)
                        }, 0))
                    // )
                } else {
                    // soundQueue.push(
                        timeouts.push(setTimeout(() => {
                            play(char)
                        }, delay))
                    // )
                }
                delay += ditMaxTime*4
            } else if (char === ' ') {
                timeouts.push(setTimeout(() => {
                    
                }, delay))
                delay += ditMaxTime*3
            } else if (char === '/') {
                timeouts.push(setTimeout(() => {
                    
                }, delay))
                delay += ditMaxTime*7
            }
        }
        
        

        // function playChar(char) {
        //     let delay = (char === '.') ? ditMaxTime + ditMaxTime : ditMaxTime*3 + ditMaxTime

        //     return new Promise(function(resolve) {
        //         if (char === '.' || char === '-') {
        //             play(char)
        //             .then(setTimeout(() => {
        //                 resolve();
        //             }, delay))
        //         } else {
        //             setTimeout(() => {
        //                 resolve();
        //             }, delay)
        //         }
        //     });
        // }
    }

    return { playMorseWord, play }
}

export default useMorsePlayer