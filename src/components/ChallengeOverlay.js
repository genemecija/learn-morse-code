import React, { useContext } from "react"
import ChallengeReady from "./ChallengeReady"
import { ChallengeContext } from "../contexts/challengeContext"
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