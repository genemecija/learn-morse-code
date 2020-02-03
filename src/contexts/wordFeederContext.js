import React, {useState, useContext} from "react"
import { WordListPickerContext } from "./wordListPickerContext"
const WordFeederContext = React.createContext()

function WordFeederContextProvider(props) {
    // let wordList = ['hi', 'morse', 'code', 'hello', 'gene']
    const {wordList, wordListShuffled, wordListCategory} = useContext(WordListPickerContext)

    const [wordIndex, setWordIndex] = useState(0)
    const [order, setOrder] = useState('sequential')
    let word

    if (order === 'sequential') {
        word = wordList[wordIndex]
    }
    else if (order === 'random') {
        word = wordListShuffled[wordIndex]
    }

    function resetFeeder() {
        setWordIndex(0)
    }
    
    function getNextWord() {
        if (order === 'sequential') {
            setWordIndex(prev => prev + 1)
            word = wordList[wordIndex] || null
        } else if (order === 'random') {
            setWordIndex(prev => prev + 1)
            word = wordListShuffled[wordIndex] || null
        }
    }

    return (
        <WordFeederContext.Provider value={{word: word, getNextWord: getNextWord, resetFeeder: resetFeeder, setOrder: setOrder}}>
            {props.children}
        </WordFeederContext.Provider>
    )
}

export {WordFeederContextProvider, WordFeederContext}
