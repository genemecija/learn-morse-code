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

    const legend = Object.keys(morseCode).map((morse, index) =>
        <div key={"legend_item_"+index} className="item">
            <button key={"legend_btn_"+index} onClick={handleClick}>{morse.toUpperCase()}</button>
            <span key={"legend_spn_"+index}>{morseCode[morse]}</span>
        </div>
    )

    return (
            <div id="legend">
                <div id="title">
                    <h2>Legend</h2>
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