import React, { useContext } from "react"
import { WordFeederContext } from "../contexts/wordFeederContext"

export default React.memo(function ChallengeWord(props) {

    let challengeWordClass= props.className
    const {word} = useContext(WordFeederContext)

    let challengeLetters = word.split('')

    let spannedWord = challengeLetters.map((letter,index) => {
        return (
            <span key={index} className='cLetter'>{letter}</span>
        )
    })

    return (
        <div id="challengeWord" className={challengeWordClass}>{spannedWord}</div>
    )
})