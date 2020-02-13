import React, { useContext } from "react"
import { ChallengeContext } from "../contexts/challengeContext"
import ChallengeReady from "./ChallengeReady"
import ChallengeComplete from "./ChallengeComplete"

export default (function ChallengeOverlay() {

    const {challengeState, setChallengeState} = useContext(ChallengeContext)
    
    return (
        <div id="challenge-overlay">
            {challengeState === 'ready' && <ChallengeReady />}
            {challengeState === 'completed' && <ChallengeComplete setChallengeState={setChallengeState} />}
        </div>
    )
})