import React from "react"

export default React.memo(function ChallengeWord(props) {
    return (
        <div id="challengeWord">{props.word}</div>
    )
})