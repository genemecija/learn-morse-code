import config from '../config.json'

function useMorsePlayer() {

    const ditMaxTime = 85 //config.ditMaxTime

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

        return new Promise((resolve, reject) => {
            if (context.state === 'interrupted') {
                context.resume()
            }
            let o
            o = context.createOscillator()
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
            
            g.gain.setTargetAtTime(0.0001, startTime + length/1000, 0.001)
            o.stop(startTime + length/1000 + 0.05)
        })
    }

    function playMorseWord(morse) {
        let chars = Array.from(morse)
        let currentPromise = Promise.resolve();

        for (let i = 0; i < chars.length; i++) {
            currentPromise = currentPromise.then(() => {
                return playChar(chars[i]);
            });
        }

        function playChar(char) {
            let delay = (char === '.') ? ditMaxTime + ditMaxTime : ditMaxTime*3 + ditMaxTime

            return new Promise(function(resolve) {
                if (char === '.' || char === '-') {
                    play(char)
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
    }

    return { playMorseWord }
}

export default useMorsePlayer