import React from "react"

export default React.memo(function ChallengeBufferDisplay(props) {

    const morseArray = props.morseArray

    let ditDahs = []

    for (let i in morseArray) {
        let morseChar = morseArray[i]
        
        ditDahs.push(<span key={i}>{morseChar}</span>)
    }

    return (
        <div id="challengeBufferDisplay">
            <div id="ditDahs">
                {ditDahs}
            </div>
        </div>
    )
})