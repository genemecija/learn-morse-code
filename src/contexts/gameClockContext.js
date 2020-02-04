import React, {useState, useEffect, useContext} from "react"
import { KeyTypeContext } from "./keyTypeContext"
const GameClockContext = React.createContext()

function GameClockContextProvider(props) {
    
    const [gameClockTime, setGameClockTime] = useState(0)
    const [clockIsRunning, setClockIsRunning] = useState(false)
    const {keyType} = useContext(KeyTypeContext)

    let gameClock = 0
    let intervals = []
    

    function startGameClock() {
        if (!clockIsRunning) {
            setClockIsRunning(true)
            intervals.push(setInterval(() => {
                document.getElementById('gameClock').innerText = Number(document.getElementById('gameClock').innerText) + 1
            }, 1000))
        }
    }
    function stopGameClock() {
        if (clockIsRunning) {
            clearInterval(gameClock)
            setClockIsRunning(false)
        }
    }

    function cleanup() {
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
    }
    // function startChallenge(event) {
    //     console.log(event);
    //     document.removeEventListener('keydown', startChallenge)
    //     document.removeEventListener('mousedown', startChallenge)
    //     startGameClock()
    // }

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
            cleanup: cleanup
            }}>
            {props.children}
        </GameClockContext.Provider>
    )
}

export {GameClockContextProvider, GameClockContext}
