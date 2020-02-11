/* eslint-disable array-callback-return */
import React from "react"
import morseCode from '../data/morse-code.json'
import useMorsePlayer from "../hooks/useMorsePlayer";

function Legend() {

    const { playMorseWord } = useMorsePlayer()

    function handleClick(e) {
        e.preventDefault()

        let word = e.target.innerText

        if (e.target.className === 'alpha') {
            word = convertWordToMorse(word)
        }
        if (e.target.id === 'test') {
            word = convertWordToMorse(e.target.innerText)
        }

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

    const numbers = Object.keys(morseCode).map((morse, index) =>
        {
            if (index < 10) {
                return (
                    <button key={"legend_item_"+index} className="item" onClick={handleClick}>
                        <span className="alpha" key={"legend_btn_"+index}>{morse.toUpperCase()}</span>
                        <span className="morse" key={"legend_spn_"+index}>{morseCode[morse]}</span>
                    </button>
                )
            }
        }
    )
    const letters = Object.keys(morseCode).map((morse, index) =>
        {
            if (index >= 10 && index < 36) {
                return (
                    <button key={"legend_item_"+index} className="item" onClick={handleClick}>
                        <span className="alpha" key={"legend_btn_"+index}>{morse.toUpperCase()}</span>
                        <span className="morse" key={"legend_spn_"+index}>{morseCode[morse]}</span>
                    </button>
                )
            }
        }
    )
    const special = Object.keys(morseCode).map((morse, index) =>
        {
            if (index > 36) {
                return (
                    <button key={"legend_item_"+index} className="item" onClick={handleClick}>
                        <span className="alpha" key={"legend_btn_"+index}>{morse.toUpperCase()}</span>
                        <span className="morse" key={"legend_spn_"+index}>{morseCode[morse]}</span>
                    </button>
                )
            }
        }
    )

    return (
            <div id="legend">
                <div id="legend-title">
                    Legend
                </div>
                <div id="legend-items">
                    {letters}
                    {numbers}
                    {special}
                </div>
            </div>
    )
}

export default React.memo(Legend)