import React, {useState} from "react"
const GameModeContext = React.createContext()

function GameModeContextProvider(props) {
    const [gameMode, setGameMode] = useState('practice')

    return (
        <GameModeContext.Provider value={{gameMode: gameMode, setGameMode: setGameMode}}>
            {props.children}
        </GameModeContext.Provider>
    )
}

export {GameModeContextProvider, GameModeContext}
