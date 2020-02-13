import { useContext } from 'react';
import config from '../config.json'
import { WPMContext } from '../contexts/wpmContext.js';
import { FrequencyContext } from '../contexts/frequencyContext.js';

export default (function useMorsePlayer() {

    const {wpm} = useContext(WPMContext)
    const {frequency} = useContext(FrequencyContext)
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

    // Play dit or dah
    function play(ditDah) {
        let length = ((ditDah === '.') ? ditMaxTime : ditMaxTime*3)
        
        if (context.state === 'interrupted') {
            context.resume()
        }
        let o
        o = context.createOscillator()
        o.frequency.value = frequency
        o.type = "sine"
        
        let startTime = context.currentTime;

        let g = context.createGain()
        g.gain.exponentialRampToValueAtTime(config.mainVolume, startTime)
        g.gain.setValueAtTime(config.mainVolume, startTime)
        o.connect(g)
        g.connect(context.destination)
        o.start(startTime)
        
        setTimeout(() => {
            g.gain.setTargetAtTime(0.0001, context.currentTime, 0.009)
            o.stop(context.currentTime + 0.05)
        }, length)
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
        let delay = 0
        let firstWord = true

        // Iterate through queue, playing dits/dahs sequentially after appropriate delays
        for (let i = 0; i < queue.length; i++) {
            let char = queue[i]
            if (char === '.') {
                if (firstWord) {
                    firstWord = false
                    timeouts.push(setTimeout(() => {
                        play(char)
                    }, 0))
                } else {
                    timeouts.push(setTimeout(() => {
                        play(char)
                    }, delay))
                }
                delay += ditMaxTime*2
            } else if (char === '-') {
                if (firstWord) {
                    firstWord = false
                    timeouts.push(setTimeout(() => {
                        play(char)
                    }, 0))
                } else {
                    timeouts.push(setTimeout(() => {
                        play(char)
                    }, delay))
                }
                delay += ditMaxTime*4
            } else if (char === ' ') {
                timeouts.push(setTimeout(() => {
                    
                }, delay))
                delay += ditMaxTime*2
            } else if (char === '/') {
                timeouts.push(setTimeout(() => {
                    
                }, delay))
                delay += ditMaxTime*6
            }
        }
    }

    return { playMorseWord, play }
})