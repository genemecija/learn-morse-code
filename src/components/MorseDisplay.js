import React, {useContext} from "react"
import MorseCard from './MorseCard'
import {MorseBufferContext} from "../contexts/morseBufferContext"

function MorseDisplay() {
    console.log('COMPONENT LOAD: MorseDisplay');

    const {morseWords} = useContext(MorseBufferContext)
    console.log('morseWords', morseWords);
    let morseCards = morseWords.map((word,index) => <MorseCard key={index} morse={word} />)
    
    return (
        <div id="morseDisplay">
            {morseCards}
        </div>
    )
}

export default MorseDisplay