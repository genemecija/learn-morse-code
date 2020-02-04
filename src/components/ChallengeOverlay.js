import React, { useContext, useEffect } from "react"
import { GameClockContext } from "../contexts/gameClockContext"
import WordListPicker from "./WordListPicker"
// import { GameModeContext } from "../contexts/gameModeContext"


export default (function ChallengeOverlay() {

    const {startGameClock} = useContext(GameClockContext)
    // const {gameMode} = useContext(GameModeContext)


    function startChallenge(e) {
        let countdown
        let count = 3
        document.getElementById('challengeReady').classList.add('starting')
        document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        countdown = setInterval(() => {
            count--
            if (count === 0) {
                // Do this when countdown hits 0
                document.getElementById('challenge-overlay').classList.add('hide')
                clearInterval(countdown)
                startGameClock()
            }
            document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        }, 1000)
    }


    return (
        <div id="challenge-overlay">
            <div id="challengeReady" className="notify">
                <WordListPicker />
                <button id="startChallenge" onClick={startChallenge}>Click to Start Challenge!</button>
            </div>
        </div>
    )
})