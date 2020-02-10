import React, {useState, useContext} from "react"
import { GameClockContext } from "./gameClockContext"
import { WordFeederContext } from "./wordFeederContext"
// import { KeyTypeContext } from "./keyTypeContext"
const ChallengeContext = React.createContext()

function ChallengeContextProvider(props) {
    
    const [challengeState, setChallengeState] = useState('ready')
    const {startGameClock, stopGameClock, setGameClockTime, intervals} = useContext(GameClockContext)
    const {resetFeeder} = useContext(WordFeederContext)

    function startChallenge() {
        setGameClockTime(0)
        let countdown
        let count = 3

        document.getElementById('challengeReady').classList.add('starting')
        document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        countdown = setInterval(() => {
            count--
            if (count === 0) {
                // Do this when countdown hits 0
                document.getElementById('challenge-overlay').classList.add('fade')
                clearInterval(countdown)
                setTimeout(() => {
                    document.getElementById('challenge-overlay').classList.add('hide')
                    startGameClock()
                    setChallengeState('started')
                }, 900);
            }
            document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
        }, 1000)
    }

    function completeChallenge() {
        stopGameClock()
        setChallengeState('completed')
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
        resetFeeder()

        const challengeOverlay = document.getElementById('challenge-overlay')
        challengeOverlay.classList.remove('fade')
        challengeOverlay.classList.remove('hide')
    }

    function cancelChallenge() {
        stopGameClock()
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
        setChallengeState('ready')
        resetFeeder()
        setGameClockTime(0)

        const challengeOverlay = document.getElementById('challenge-overlay')
        challengeOverlay.classList.remove('fade')
        challengeOverlay.classList.remove('hide')
    }
    
    return (
        <ChallengeContext.Provider value={{
            challengeState: challengeState,
            setChallengeState: setChallengeState,
            startChallenge: startChallenge,
            completeChallenge: completeChallenge,
            cancelChallenge: cancelChallenge
            }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}

export {ChallengeContextProvider, ChallengeContext}
