import React, { useContext } from "react"
import { GameClockContext } from "../contexts/gameClockContext"


export default (function ChallengeOverlay() {

    const {startGameClock} = useContext(GameClockContext)

    function startChallenge(e) {
        let countdown
        let count = 3
        document.getElementById('challengeReady').innerText = `Challenge starting in ${count}`
        countdown = setInterval(() => {
            count--
            document.getElementById('challengeReady').innerText = `Challenge starting in ${count}`
            if (count === 0) {
                // Do this when countdown hits 0
                document.getElementById('challenge-overlay').classList.add('hide')
                clearInterval(countdown)
                startGameClock()
            }
        }, 1000)
    }

    return (
        <div id="challenge-overlay">
            <div id="challengeReady" className="notify" onClick={startChallenge}>Click to Start Challenge!</div>
        </div>
    )
})