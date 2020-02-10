import React, {useContext} from "react"
import { GameClockContext } from "../contexts/gameClockContext";

function GameClock(props) {
    
    const {gameClockTime} = useContext(GameClockContext)

    return (
        <div id="gameClock">{gameClockTime}</div>
    )
}

export default GameClock