import React from "react"

function ChallengeWord(props) {
    console.log('ChallengeWord rendered');

    let spannedWord = props.word.split('').map((letter,index) => <span key={index} className="cLetter" id={index}>{letter}</span>)

    return (
        <div id="challengeWord">{spannedWord}</div>
    )
}

export default React.memo(ChallengeWord)