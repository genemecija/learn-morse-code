import React, {useState, useContext} from "react"
import { WordListPickerContext } from "./wordListPickerContext"
const WordFeederContext = React.createContext()

function WordFeederContextProvider(props) {

    // let wordList = ['hi', 'morse', 'code', 'hello', 'gene']
    const {wordList} = useContext(WordListPickerContext)

    const [wordIndex, setWordIndex] = useState(0)
    const [order, setOrder] = useState('sequential')
    let indexCache = []

    let word = wordList[wordIndex]

    function resetFeeder() {
        setWordIndex(0)
        indexCache = []
    }
    
    function getNextWord() {
        if (order === 'sequential') {
            setWordIndex(prev => prev + 1)
            word = wordList[wordIndex] || null
        } else if (order === 'random') {
            let index = Math.floor(Math.random*wordList.length)
            indexCache.push(index)
            // Need to account for what to do when all words in wordList have been exhausted
            while (indexCache.includes(index) && wordList.length !== indexCache.length) {
                index = Math.floor(Math.random*wordList.length)
                indexCache.push(index)
            }
            setWordIndex(index)

            word = wordList[wordIndex]
        }
    }

    return (
        <WordFeederContext.Provider value={{word: word, getNextWord: getNextWord, resetFeeder: resetFeeder}}>
            {props.children}
        </WordFeederContext.Provider>
    )
}

export {WordFeederContextProvider, WordFeederContext}
