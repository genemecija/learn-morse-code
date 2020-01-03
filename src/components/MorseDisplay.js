import React from "react"
import MorseCard from './MorseCard'

function MorseDisplay(props) {
    console.log('MorseDisplay rendered');
    let morseCards = props.morseWords.map((word,index) => <MorseCard key={index} morse={word} />)
    
    return (
        <div id="morseDisplay">
            {morseCards}
        </div>
    )
}

export default React.memo(MorseDisplay)