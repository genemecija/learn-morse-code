import React from "react"
import morseCode from '../data/morse-code.json'

import useMorsePlayer from "../hooks/useMorsePlayer";

function Legend() {

    const { playMorseWord } = useMorsePlayer()

    function handleClick(e) {
        e.preventDefault()

        let word = e.target.innerHTML
        let newWord = convertWordToMorse(word)
        console.log(newWord);

        let name = '--._._-._.'
        playMorseWord(newWord)        

    }
    function convertWordToMorse(word) {
        let morse = ''
        for (let i in word) {
            morse += morseCode[word[i].toLowerCase()]
            morse += ' '
        }
        return morse
    }

    return (
            <div id="legend">
                <button id="test" onClick={handleClick}>Gene</button>
                <button id="test" onClick={handleClick}>Anya</button>
                <button id="test" onClick={handleClick}>Alexandra</button>
            </div>
    )
}

export default React.memo(Legend)