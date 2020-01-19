import React, {useContext} from "react"
import MorseCard from './MorseCard'
import {MorseBufferContext} from "../contexts/morseBufferContext"

export default (function MorseHistory() {

    const {morseWords} = useContext(MorseBufferContext)

    let morseCards = morseWords.map((word,index) => <MorseCard key={index} morse={word} />)
    
    return (
        <div id="morseHistory">
            {morseCards}
        </div>
    )
})