import React, { useContext } from "react"
import WordListPicker from "./WordListPicker"
import { ChallengeContext } from "../contexts/challengeContext"

export default (function ChallengeReady() {

    const {startChallenge} = useContext(ChallengeContext)

    return (
        <div id="challengeReady" className="notify">
            <h2>Challenge Options</h2>
            <WordListPicker />
            <button id="startChallenge" onClick={startChallenge}>Start Challenge</button>
        </div>
    )
})

