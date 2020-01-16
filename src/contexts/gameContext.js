import React, {Component} from "react"
const GameModeContext = React.createContext()

class GameModeContextProvider extends Component {
    state = {
        gameMode: "practice"
    }
    
    switchGameModeTo = (mode = "practice") => {
        this.setState({gameMode: mode})
    }

    render() {
        return (
            <GameModeContext.Provider value={{gameMode: this.state.gameMode, switchGameModeTo: this.switchGameModeTo}}>
                {this.props.children}
            </GameModeContext.Provider>
        )
    }

}

export {GameModeContextProvider, GameModeContext}
