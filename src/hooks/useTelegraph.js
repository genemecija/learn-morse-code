import {useState, useEffect} from 'react'

function useTelegraph(mode = 'practice') {

    const [morseCharBuffer, setMorseCharBuffer] = useState('') // e.g. '-..'
    const [morseWords, setMorseWords] = useState([]) // e.g. [['-..','.','-,'], ['...','---','...']]
    
    let charTimer = 0
    let charTime = 0
    let gapTimer = 0
    let gapTime = 0

    const timingUnit = 15 // default: 25

    const ditMaxTime = 5  // default: 3
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

    let o
    let frequency = 550.0
    
    function clearHistory() {
        setMorseWords([])
    }

    function handleInputStart(event) {
        
        event.preventDefault()
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
        
        let g = context.createGain()
        g.gain.exponentialRampToValueAtTime(0.08, context.currentTime)
        o.connect(g)
        g.connect(context.destination)
        o.start()
        
        checkGapBetweenInputs()
        clearInterval(gapTimer)

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
        event.preventDefault()
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
            if (gapTime >= wordGapMaxTime && mode === 'practice') {
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
            setMorseCharBuffer(prev => prev + ' ')
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

        // eslint-disable-next-line
    }, [morseCharBuffer])

    return {morseCharBuffer, morseWords, clearHistory, setMorseCharBuffer, setMorseWords}
}

export default useTelegraph