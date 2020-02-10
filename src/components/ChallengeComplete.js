import React, { useContext } from "react"
import { GameClockContext } from "../contexts/gameClockContext"
import { ChallengeContext } from "../contexts/challengeContext"

export default (function ChallengeComplete(props) {

    const {gameClockTime} = useContext(GameClockContext)
    const {cancelChallenge} = useContext(ChallengeContext)

    function _continue() {
        // setGameClockTime(0)
        // props.setChallengeState('ready')
        cancelChallenge()
    }

    return (
        <div id="challengeComplete" className="notify">
            <h2>Challenge Complete</h2>
            Challenge completed in {gameClockTime} seconds!
            <button id="continue" onClick={_continue}>Continue</button>

        </div>
    )
})

