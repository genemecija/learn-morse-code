import React, {useState} from "react"
import alphabet from '../data/alphabet.json'
import numbers from '../data/numbers.json'
import common100 from '../data/common100.json'


const WordListPickerContext = React.createContext()

function WordListPickerContextProvider(props) {

    const [wordListCategory, setWordListCategory] = useState('alphabet')
    let wordList = []
    const testList = ['gene', 'anya', 'ali', 'liam', 'last']
    const short = ['gene']

    if (wordListCategory === 'alphabet') {
        wordList = alphabet.words
    } else if (wordListCategory === 'numbers') {
        wordList = numbers.words
    } else if (wordListCategory === 'common100') {
        wordList = common100.words
    } else if (wordListCategory === 'test') {
        wordList = testList
    } else if (wordListCategory === 'short') {
        wordList = short
    }


    function randomize(arr) {
        let array = [...arr]
        let currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }

    return (
        <WordListPickerContext.Provider value={{wordList: wordList, wordListShuffled: randomize(wordList), wordListCategory: wordListCategory, setWordListCategory: setWordListCategory}}>
            {props.children}
        </WordListPickerContext.Provider>
    )
}

export {WordListPickerContextProvider, WordListPickerContext}
