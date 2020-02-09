import React from "react"

export default (function ChallengeControls(props) {

    return (
        <div id="challengeControls">
            <button onClick={props.stopChallenge}>Exit</button>
        </div>
    )
})