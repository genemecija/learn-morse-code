import React, {useState} from "react"
import alphabet from '../data/alphabet.json'
import common100 from '../data/common100.json'


const WordListPickerContext = React.createContext()

function WordListPickerContextProvider(props) {

    const [wordListCategory, setWordListCategory] = useState('alphabet')
    let wordList = []
    const testList = ['gene', 'anya', 'ali', 'liam', 'last']
    wordList = testList

    if (wordListCategory === 'alphabet') {
        wordList = alphabet.words
    } else if (wordListCategory === 'common100') {
        wordList = common100.words
    } else if (wordListCategory === 'test') {
        wordList = testList
    }

    return (
        <WordListPickerContext.Provider value={{wordList: wordList, setWordListCategory: setWordListCategory}}>
            {props.children}
        </WordListPickerContext.Provider>
    )
}

export {WordListPickerContextProvider, WordListPickerContext}
