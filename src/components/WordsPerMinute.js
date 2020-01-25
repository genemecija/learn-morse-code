import React, {useContext} from "react"
import { WPMContext } from "../contexts/wpmContext";

export default React.memo(function WordsPerMinute(props) {
    console.log('WordsPerMinute rendered');

    const {wpm, setWPM} = useContext(WPMContext)

    function handleChange(e) {
        setWPM(e.target.value)
    }
    
    return (
        <input id='wpm-input' type='text' value={wpm} onChange={handleChange} />
    )
})