import React from "react"

function ChallengeWord(props) {

    return (
        <div id="challengeWord">{spannedWord}</div>
    )
}

export default React.memo(ChallengeWord)