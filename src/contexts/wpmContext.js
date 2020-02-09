import React, {useState} from "react"

const WPMContext = React.createContext()

function WPMContextProvider(props) {
    
    const [wpm, setWPM] = useState(10)

    return (
        <WPMContext.Provider value={{
            wpm: Number(wpm),
            setWPM: setWPM}
        }>
            {props.children}
        </WPMContext.Provider>
    )
}

export {WPMContextProvider, WPMContext}
