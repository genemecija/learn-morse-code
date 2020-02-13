import React, {useState} from "react"
import alphabet from '../data/alphabet.json'
import numbers from '../data/numbers.json'
import common100 from '../data/common100.json'
import boys from '../data/names_boys.json'
import girls from '../data/names_girls.json'
import trek from '../data/startrek.json'


const WordListPickerContext = React.createContext()

function WordListPickerContextProvider(props) {

    const [wordListCategory, setWordListCategory] = useState('alphabet')
    const [wordListCount, setWordListCount] = useState(10)

    let wordList = []
    const testList = ['gene', 'anya', 'ali', 'liam', 'last']
    const short = ['gene']


    if (wordListCategory === 'alphabet') {
        wordList = alphabet.words
    } else if (wordListCategory === 'numbers') {
        wordList = numbers.words
    } else if (wordListCategory === 'boys') {
        wordList = boys.words
    } else if (wordListCategory === 'girls') {
        wordList = girls.words
    } else if (wordListCategory === 'startrek') {
        wordList = trek.words
    } else if (wordListCategory === 'common100') {
        wordList = common100.words
    } else if (wordListCategory === 'test') {
        wordList = testList
    } else if (wordListCategory === 'short') {
        wordList = short
    }

    const wordListCountMax = wordList.length

    const metadata = {
        'alphabet': {name: 'Alphabet', description: 'All letters of the alphabet'},
        'numbers': {name: 'Numbers', description: '0-9'},
        'boys': {name: 'Boys Names', description: 'Popular Boys Names'},
        'girls': {name: 'Girls Names', description: 'Popular Girls Names'},
        'startrek': {name: 'Star Trek', description: 'Star Trek universe'},
        'common100': {name: 'Common Words', description: '100 Most Common Words'},
        'test': {name: 'Test List', description: 'A test list'},
        'short': {name: 'Short List', description: 'A short list'}
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
        <WordListPickerContext.Provider value={{
            wordList: wordList.slice(0,wordListCount), 
            wordListShuffled: randomize(wordList).slice(0,wordListCount), 
            wordListCategory: wordListCategory, 
            setWordListCategory: setWordListCategory, 
            metadata: metadata, 
            wordListCount: wordListCount, 
            setWordListCount: setWordListCount,
            wordListCountMax: wordListCountMax
        }}>
            {props.children}
        </WordListPickerContext.Provider>
    )
}

export {WordListPickerContextProvider, WordListPickerContext}
