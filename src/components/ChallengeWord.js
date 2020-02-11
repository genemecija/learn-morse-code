import React, { useContext } from "react"
import { WordFeederContext } from "../contexts/wordFeederContext"
import { ChallengeContext } from "../contexts/challengeContext"

export default React.memo(function ChallengeWord(props) {

    const {word} = useContext(WordFeederContext)

    let challengeLetters
    if (typeof word === 'object') {
        challengeLetters = word[0].split('')
    }
    else {
        challengeLetters = word.split('')
    }

    let spannedWord = challengeLetters.map((letter,index) => {
        return (
            <span key={index} className='cLetter'>{letter}</span>
        )
    })

    return (
        <div id="challengeWord" className={props.challengeWordClass}>{spannedWord}</div>
    )
})