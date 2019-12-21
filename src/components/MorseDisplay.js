import React from "react"
import MorseCard from './MorseCard'

function MorseDisplay(props) {
    
    let morseCards = props.morseWords.map((word,index) => <MorseCard key={index} morse={word} />)
    
    return (
        <div id="morseDisplay">
            <div id="cardContainer">
                <div>{morseCards}</div>
            </div>
        </div>
    )
}

export default MorseDisplay