import React, {useState, useContext} from "react"
import { WordListPickerContext } from "./wordListPickerContext"
const WordFeederContext = React.createContext()

function WordFeederContextProvider(props) {

    const {wordList, wordListShuffled} = useContext(WordListPickerContext)

    const [wordIndex, setWordIndex] = useState(0)
    const [order, setOrder] = useState('sequential')
    let word 

    // Set word list ordered appropriately
    if (order === 'sequential') {
        if (wordList[wordIndex] === undefined) {
            word = [wordList[0]]
        }
        else {
            word = wordList[wordIndex]
        }
    }
    else if (order === 'random') {
        if (wordListShuffled[wordIndex] === undefined) {
            word = [wordListShuffled[0]]
        }
        else {
            word = wordListShuffled[wordIndex]
        }
    }

    function resetFeeder() {
        setWordIndex(0)
    }
    
    function getNextWord() {
        setWordIndex(prev => prev + 1)
    }
    
    return (
        <WordFeederContext.Provider value={{word: word, getNextWord: getNextWord, resetFeeder: resetFeeder, setOrder: setOrder}}>
            {props.children}
        </WordFeederContext.Provider>
    )
}

export {WordFeederContextProvider, WordFeederContext}
