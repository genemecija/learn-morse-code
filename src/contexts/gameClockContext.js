import React, {useState} from "react"
// import { KeyTypeContext } from "./keyTypeContext"
const GameClockContext = React.createContext()

function GameClockContextProvider(props) {
    
    const [gameClockTime, setGameClockTime] = useState(0)
    const [clockIsRunning, setClockIsRunning] = useState(false)
    // const [gameClockTimer, setGameClockTimer] = useState(0)

    // let intervals = []
    const [intervals, setIntervals] = useState([])


    function startGameClock() {
        if (!clockIsRunning) {
            setClockIsRunning(true)
            setIntervals(prev => [...prev, (setInterval(() => {
                    if (document.getElementById('gameClock') === null) {
                        stopGameClock()
                        return
                    }
                    setGameClockTime(prev => prev + 1)
                    // document.getElementById('gameClock').innerText = Number(gameClockTime) //Number(document.getElementById('gameClock').innerText) + 1
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

    function cleanup() {
        // clearInterval(gameClockTimer)
        // setGameClockTimer(0)
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
    }
    

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
