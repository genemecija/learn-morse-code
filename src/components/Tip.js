import React, { useContext } from "react"
import { KeyTypeContext } from "../contexts/keyTypeContext"

export default(function Tip() {

    const {keyType} = useContext(KeyTypeContext)

    let tip = (keyType === 'straight') ? "Tap the button to use the telegraph." : "Tap each button to use the telegraph."

    return (
        <span id='tip'>{tip}</span>
    )
})