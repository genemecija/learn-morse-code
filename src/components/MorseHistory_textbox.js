import React, {useContext, useState} from "react"
// import MorseCard from './MorseCard'
import morseCode from '../data/morse-reverse.json'
import {MorseBufferContext} from "../contexts/morseBufferContext"

export default (function MorseHistoryTextBox() {

    const {morseWords} = useContext(MorseBufferContext)

    let text = ''
    let span = []

    console.log('morseWords', morseWords);

    morseWords.forEach((word) => {
        if (word.includes(' ')) {
            let newWord = ''
            word.split(' ').forEach(letter => {
                if (morseCode[letter] === undefined) {
                    newWord += '[?]'
                    console.log('undefined', letter);
                } else {
                    console.log('here1');
                    newWord += morseCode[letter].toUpperCase()
                }
            })
            // text = newWord + ' ' + text
            span.splice(0, 0, <span>{newWord}</span>)
        }
        else if (morseCode[word] === undefined) {
            // text = '[?] ' + text
            span.splice(0, 0, <span>[?]</span>)
        } else {
            // text =  morseCode[word].toUpperCase() + ' ' + text
            span.splice(0, 0, <span>{morseCode[word].toUpperCase()}</span>)
        }
    })

    // try {
    //     document.getElementById('morseHistory').innerText = text
    // } catch {}
    
    return (
        <div id="morseHistory-textbox">{span}</div>
    )
})