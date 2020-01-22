import React from "react"
import morseCode from '../data/morse-reverse.json'

export default React.memo(function ChallengeBufferDisplay(props) {

    const morseArray = props.morseArray
    let incorrectMorseIndexes = props.incorrectMorseIndexes

    let ditDahs = []
    let alphanumeric = []

    for (let i in morseArray) {
        let morseChar = morseArray[i]

        // Alphanumeric
        let alpha = morseCode[morseChar] || '[?]'
        let alphaClass = (incorrectMorseIndexes.includes(Number(i))) ? 'strike morseError' : ''
        alphanumeric.push(<span key={i} className={alphaClass}>{alpha.toUpperCase()}</span>)
        
        // DitDahs
        let ditDahClass = (incorrectMorseIndexes.includes(Number(i))) ? 'morseError' : ''
        ditDahs.push(<span key={i} className={ditDahClass}>{morseChar}</span>)
        ditDahs.push(<span key={i+100} className='space'>&nbsp;</span>)
    }

    return (
        <div id="challengeBufferDisplay">
            <div id="alphanumeric-container">
                <div id="alphanumeric">
                    {alphanumeric}
                </div>
            </div>
            <div id="ditDahs">
                {ditDahs}
            </div>
        </div>
    )
})