import React from "react"
import MorseCard from './MorseCard'

function MorseDisplay(props) {
    
    let morseCards = props.morseWords.map((word,index) => <MorseCard key={index} morse={word} />)
    
    return (
        <div id="morseDisplay">
            {morseCards}
        </div>
    )
}

export default MorseDisplay