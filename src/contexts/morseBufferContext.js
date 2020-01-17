import React, {useState} from "react"

const MorseBufferContext = React.createContext()

function MorseBufferContextProvider(props) {
    
    const [morseCharBuffer, setMorseCharBuffer] = useState('')
    const [morseWords, setMorseWords] = useState([])
    
    return (
        <MorseBufferContext.Provider value={{
            morseCharBuffer: morseCharBuffer,
            morseWords: morseWords,
            setMorseCharBuffer: setMorseCharBuffer,
            setMorseWords: setMorseWords
            }}>
            {props.children}
        </MorseBufferContext.Provider>
    )
}

export {MorseBufferContextProvider, MorseBufferContext}
