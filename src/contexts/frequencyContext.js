import React, {useState} from "react"

const FrequencyContext = React.createContext()

function FrequencyContextProvider(props) {
    
    const [frequency, setFrequency] = useState(650)

    return (
        <FrequencyContext.Provider value={{
            frequency: Number(frequency),
            setFrequency: setFrequency}
        }>
            {props.children}
        </FrequencyContext.Provider>
    )
}

export {FrequencyContextProvider, FrequencyContext}
