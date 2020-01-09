import React, {useState} from "react"

function GameClock(props) {
    console.log('GameClock rendered');

    // const [clockTime, setClockTime] = useState(30)
    
    // setClockTime(props.time)
    
    return (
    <div id="gameclock">{props.time}</div>
    )
}

export default GameClock