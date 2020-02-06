import React, { useContext } from "react"
import morseCode from '../data/morse-code.json'
import useMorsePlayer from "../hooks/useMorsePlayer";
import { WPMContext } from "../contexts/wpmContext.js";

function Legend() {

    const { playMorseWord } = useMorsePlayer()

    function handleClick(e) {
        e.preventDefault()

        let word = e.target.innerText

        // let newWord = word

        if (e.target.className === 'alpha') {
            word = convertWordToMorse(word)
        }

        if (e.target.id === 'test') {
            word = convertWordToMorse(e.target.innerText)
        }

        console.log(word);
        playMorseWord(word)
    }

    function convertWordToMorse(word) {
        let morse = ''
        for (let i in word) {
            morse += morseCode[word[i].toLowerCase()]
            morse += ' '
        }
        return morse
    }

    const legend = Object.keys(morseCode).map((morse, index) =>
        <button key={"legend_item_"+index} className="item" onClick={handleClick}>
            <span className="alpha" key={"legend_btn_"+index}>{morse.toUpperCase()}</span>
            <span className="morse" key={"legend_spn_"+index}>{morseCode[morse]}</span>
        </button>
    )

    return (
            <div id="legend">
                <div id="title">
                    <h1>Morse Code</h1>
                </div>
                <div id="legend-items">
                    {legend}
                    <div>
                        <button id="test" onClick={handleClick}>Anya</button>
                        <button id="test" onClick={handleClick}>Alexandra</button>
                        <button id="test" onClick={handleClick}>Paris</button>
                    </div>
                </div>
            </div>
    )
}

export default React.memo(Legend)