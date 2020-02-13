import React, {useState, useContext, useEffect} from "react"
import { ChallengeContext } from "./challengeContext"
const GameClockContext = React.createContext()

function GameClockContextProvider(props) {

    const [gameClockTime, setGameClockTime] = useState(0)
    const [clockIsRunning, setClockIsRunning] = useState(false)
    const [intervals, setIntervals] = useState([])
    const {challengeState, setChallengeState} = useContext(ChallengeContext)


    function startGameClock() {
        if (!clockIsRunning) {
            setClockIsRunning(true)
            setIntervals(prev => [...prev, (setInterval(() => {
                    if (document.getElementById('gameClock') === null) {
                        stopGameClock()
                        return
                    }
                    setGameClockTime(prev => prev + 1)
                }, 1000))
            ])
        }
    }
    function stopGameClock() {
        if (clockIsRunning) {
            cleanup()
            setClockIsRunning(false)
        }
    }

    // Clear game clock intervals
    function cleanup() {
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
    }

    // Trigger game clock changes on challenge state change
    useEffect(() => {
        switch (challengeState) {
            case 'ready':
                setGameClockTime(0)
                cleanup()
                break
            case 'started':
                startGameClock()
                break
            case 'completed':
                stopGameClock()
                break
            case 'cancelled':
                stopGameClock()
                setChallengeState('ready')
                break
            default:
                return
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [challengeState])
    

    return (
        <GameClockContext.Provider value={{
            gameClockTime: gameClockTime,
            setGameClockTime: setGameClockTime,
            startGameClock: startGameClock,
            stopGameClock: stopGameClock,
            cleanup: cleanup,
            clockIsRunning: clockIsRunning,
            intervals: intervals
            }}>
            {props.children}
        </GameClockContext.Provider>
    )
}

export {GameClockContextProvider, GameClockContext}
