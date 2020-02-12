import React, {useContext} from "react"
import morseCode from '../data/morse-reverse.json'
import {MorseBufferContext} from "../contexts/morseBufferContext"

export default (function MorseHistoryTextBox() {

    const {morseWords, setMorseWords} = useContext(MorseBufferContext)

    let text = ''

    function clearHistory() {
        setMorseWords([])
    }

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
            // span.splice(0, 0, <span key={index}>{newWord}</span>)
        }
        else if (morseCode[word] === undefined) {
            text = '[?] ' + text
            // span.splice(0, 0, <span key={index}>[?]</span>)
        } else {
            text =  morseCode[word].toUpperCase() + ' ' + text
            // span.splice(0, 0, <span key={index}>{morseCode[word].toUpperCase()}</span>)
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