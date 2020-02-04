import React, {useState, useEffect, useContext} from "react"
import { KeyTypeContext } from "./keyTypeContext"
const GameClockContext = React.createContext()

function GameClockContextProvider(props) {
    
    const [gameClockTime, setGameClockTime] = useState(0)
    const [clockIsRunning, setClockIsRunning] = useState(false)
    const [gameClockTimer, setGameClockTimer] = useState(0)
    const {keyType} = useContext(KeyTypeContext)

    let intervals = []
    

    function startGameClock() {
        if (!clockIsRunning) {
            setClockIsRunning(true)
            setGameClockTimer(setInterval(() => {
                document.getElementById('gameClock').innerText = Number(document.getElementById('gameClock').innerText) + 1
            }, 1000))
        }
    }
    function stopGameClock() {
        if (clockIsRunning) {
            clearInterval(gameClockTimer)
            setClockIsRunning(false)
        }
    }

    function cleanup() {
        clearInterval(gameClockTimer)
        setGameClockTimer(0)
        // for (let i = 0; i < intervals.length; i++) {
        //     clearInterval(intervals[i]);
        // }
    }

    useEffect(() => {
        console.log('KEYTYPE CHANGE');
        
        return function () {
            cleanup()
        }
    }, [keyType])
    

    return (
        <GameClockContext.Provider value={{
            gameClockTime: gameClockTime,
            setGameClockTime: setGameClockTime,
            startGameClock: startGameClock,
            stopGameClock: stopGameClock,
            cleanup: cleanup,
            clockIsRunning: clockIsRunning
            }}>
            {props.children}
        </GameClockContext.Provider>
    )
}

export {GameClockContextProvider, GameClockContext}
