import React, {Component} from "react"

const KeyTypeContext = React.createContext()

class KeyTypeContextProvider extends Component {
    state = {
        keyType: "straight"
    }
    
    switchKeyType = (type = "straight") => {
        this.setState({keyType: type})
    }

    render() {
        return (
            <KeyTypeContext.Provider value={{keyType: this.state.keyType, switchKeyType: this.switchKeyType}}>
                {this.props.children}
            </KeyTypeContext.Provider>
        )
    }

}

export {KeyTypeContextProvider, KeyTypeContext}
