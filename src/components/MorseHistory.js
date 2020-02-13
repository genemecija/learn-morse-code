import React, {useContext} from "react"
import { MorseBufferContext } from "../contexts/morseBufferContext"
import morseCode from '../data/morse-reverse.json'

export default (function MorseHistoryTextBox() {

    const {morseWords, setMorseWords} = useContext(MorseBufferContext)

    let text = ''

    function clearHistory() {
        setMorseWords([])
    }

    // Generate Morse History contents
    morseWords.forEach((word, index) => {
        if (word.includes(' ')) {
            let newWord = ''
            word.split(' ').forEach(letter => {
                if (morseCode[letter] === undefined) {
                    newWord += '[?]'
                } else {
                    newWord += morseCode[letter].toUpperCase()
                }
            })
            text = newWord + ' ' + text
        }
        else if (morseCode[word] === undefined) {
            text = '[?] ' + text
        } else {
            text =  morseCode[word].toUpperCase() + ' ' + text
        }
    })

    return (
        <div id="morse-history">
            <div id="morseHistory-textbox">{text}</div>
            <div id="clear">
                <span id="message">"<span className="ditDah">[?]</span>" signifies no translation available.</span>
                <button id="clear-history" onClick={clearHistory}>Clear</button>
            </div>
        </div>
    )
})