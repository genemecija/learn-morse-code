import React, {useState} from "react"

const MorseBufferContext = React.createContext()

function MorseBufferContextProvider(props) {
    // state = {
    //     morseCharBuffer: '',
    //     morseWords: []
    //     //morseCharBuffer, morseWords, clearHistory, setMorseCharBuffer, setMorseWords
    // }
    console.log('MorseBufferContextProvider LOADED');
    const [morseCharBuffer, setMorseCharBuffer] = useState('')
    const [morseWords, setMorseWords] = useState([])
    
    
    // switchKeyType = (type = "straight") => {
    //     this.setState({keyType: type})
    // }

    // setMorseCharBuffer = (value) => {
    //     this.setState({morseCharBuffer: value})
    // }
    // setMorseWords = (value) => {
    //     this.setState({morseWords: value})
    // }

    // render() {
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
    // }

}

export {MorseBufferContextProvider, MorseBufferContext}
