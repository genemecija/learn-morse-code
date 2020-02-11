import React, { useContext } from "react"
import { GameClockContext } from "../contexts/gameClockContext"
import { ChallengeContext } from "../contexts/challengeContext"

export default (function ChallengeComplete(props) {

    const {gameClockTime} = useContext(GameClockContext)
    const {setChallengeState} = useContext(ChallengeContext)

    function _continue() {
        // setGameClockTime(0)
        // props.setChallengeState('ready')
        setChallengeState('ready')
    }

    return (
        <div id="challengeComplete" className="notify">
            <span id="notify-title">Challenge Complete</span>
            <span id="message">Challenge completed in {gameClockTime} seconds!</span>
            <button id="continue" onClick={_continue}>Continue</button>

        </div>
    )
})

