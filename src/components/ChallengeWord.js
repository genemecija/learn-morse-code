import React from "react"

export default React.memo(function ChallengeWord(props) {

    let challengeWordClass= props.className
    const word = props.word

    let challengeLetters = word.split('')

    let spannedWord = challengeLetters.map((letter,index) => {

        let className = 'cLetter'
        
        return (
            <span key={index} className={className} id={"chal"+index}>{letter}</span>
        )
    })

    return (
        <div id="challengeWord" className={challengeWordClass}>{spannedWord}</div>
    )
})