import {useEffect} from "react"
import useTelegraph from './hooks/useTelegraph'

function usePracticeMode() {
    const {morseCharBuffer, setMorseWords, morseWords, setMorseCharBuffer} = useTelegraph()

    const morseHistorySize = 5

    useEffect(() => {
        if (morseCharBuffer.slice(-1) === '/') {
            // Remove forward slash
            let val = morseCharBuffer.slice(0,morseCharBuffer.length-1)

            setMorseWords(prev => [val, ...prev])

            if (morseWords.length >= morseHistorySize) {
                setMorseWords(prev => prev.slice(0,prev.length-1))
            }
            
            setMorseCharBuffer('')
        }

        // eslint-disable-next-line
    }, [morseCharBuffer])
}

export default usePracticeMode