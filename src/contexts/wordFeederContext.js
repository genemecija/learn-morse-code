import React, {useState, useContext} from "react"
import { WordListPickerContext } from "./wordListPickerContext"
const WordFeederContext = React.createContext()

function WordFeederContextProvider(props) {

    // let wordList = ['hi', 'morse', 'code', 'hello', 'gene']
    const {wordList, wordListShuffled} = useContext(WordListPickerContext)

    const [wordIndex, setWordIndex] = useState(0)
    const [order, setOrder] = useState('sequential')
    let word 

    if (order === 'sequential') {
        // word = wordList[wordIndex]
        if (wordList[wordIndex] === undefined) {
            word = [wordList[0]]
        }
        else {
            word = wordList[wordIndex]
        }
    }
    else if (order === 'random') {
        // word = wordListShuffled[wordIndex]
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
        // if (order === 'sequential') {
        // } else if (order === 'random') {
        //     setWordIndex(prev => prev + 1)
        //     if (wordListShuffled[wordIndex] === undefined) {
        //         alert('NULL2')
        //         word = '!end'
        //     }
        //     else {
        //         word = wordListShuffled[wordIndex]
        //     }
        // }
    }
    

    return (
        <WordFeederContext.Provider value={{word: word, getNextWord: getNextWord, resetFeeder: resetFeeder, setOrder: setOrder}}>
            {props.children}
        </WordFeederContext.Provider>
    )
}

export {WordFeederContextProvider, WordFeederContext}
