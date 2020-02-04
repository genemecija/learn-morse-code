import React, {useState, useContext, useEffect} from "react"
import { GameClockContext } from "../contexts/gameClockContext";

function GameClock(props) {
    console.log('GameClock rendered');
    // console.log('props.gameClockTime', props.gameClockTime);
    // const [clockTime, setClockTime] = useState(30)
    
    // setClockTime(props.time)

    // let gameClock
    // let clockRunning = false
    // function startClock() {
    //     if (!clockRunning) {
    //         clockRunning = true
    //         gameClock = setInterval(() => {
    //             document.getElementById('gameClock').innerText = Number(document.getElementById('gameClock').innerText) + 1
    //         }, 1000)
    //     }
    // }
    // function stopClock() {
    //     if (clockRunning) {
    //         clearInterval(gameClock)
    //         clockRunning = false
    //     }
    // }

    const {gameClockTime} = useContext(GameClockContext)


    return (
        <div id="gameClock">{gameClockTime}</div>
    )
}

export default GameClock