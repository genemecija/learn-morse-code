import React, {useContext, useState} from "react"
// import MorseCard from './MorseCard'
import morseCode from '../data/morse-reverse.json'
import {MorseBufferContext} from "../contexts/morseBufferContext"

export default (function MorseHistory() {

    const {morseWords} = useContext(MorseBufferContext)

    let text = ''

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
            text = newWord + ' ' + text
        }
        else if (morseCode[word] === undefined) {
            text = '[?]' + text
            console.log('undefined', word);
        } else {
            console.log('here2');
            text =  morseCode[word].toUpperCase() + ' ' + text
        }
    })

    // try {
    //     document.getElementById('morseHistory').innerText = text
    // } catch {}
    
    return (
        <div id="morseHistory">{text}</div>
    )
})