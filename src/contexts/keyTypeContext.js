import React, {useState} from "react"

const KeyTypeContext = React.createContext()

function KeyTypeContextProvider(props) {

    const [keyType, setKeyType] = useState('')

    return (
        <KeyTypeContext.Provider value={{
            keyType: keyType,
            setKeyType: setKeyType
            }}>
            {props.children}
        </KeyTypeContext.Provider>
    )
}

export {KeyTypeContextProvider, KeyTypeContext}
