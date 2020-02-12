import React, { useContext } from "react"
import { GameClockContext } from "../contexts/gameClockContext"
import { ChallengeContext } from "../contexts/challengeContext"

export default (function ChallengeComplete(props) {

    const {gameClockTime} = useContext(GameClockContext)
    const {setChallengeState} = useContext(ChallengeContext)

    function _continue() {
        setChallengeState('ready')
    }

    const minutes = Math.floor(gameClockTime / 60)
    const seconds = gameClockTime % 60

    let time = (minutes === 0) ? `${seconds} seconds` : `${minutes} minutes and ${seconds} seconds`

    return (
        <div id="challengeComplete" className="notify">
            <span id="notify-title">Challenge Complete</span>
            <span id="message">Challenge completed in {time}!</span>
            <button id="continue" onClick={_continue}>Continue</button>

        </div>
    )
})

