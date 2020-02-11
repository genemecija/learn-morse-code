import React, {useState} from "react"

const KeyTypeContext = React.createContext()

function KeyTypeContextProvider(props) {
    console.log('KeyTypeContextProvider');

    const [keyType, setKeyType] = useState('straight')

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
