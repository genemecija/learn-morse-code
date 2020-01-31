import React, {useContext} from "react"
import { WPMContext } from "../contexts/wpmContext";

export default React.memo(function WordsPerMinute(props) {
    console.log('WordsPerMinute rendered');

    const {wpm, setWPM} = useContext(WPMContext)


    function handleChange(e) {
        setWPM(Number(e.target.value))
    }
    function increment() {
        setWPM(prevWPM => prevWPM + 1)
    }
    function decrement() {
        setWPM(prevWPM => prevWPM - 1)
    }

    console.log('wpm', wpm);
    console.log('typeof wpm', typeof wpm);
    
    return (
        // <input id='wpm-input' type='text' value={wpm} onChange={handleChange} />
        <div id='wpm' className='mode-picker'>
            <div id='title'>
                WPM
            </div>
            <div id='input'>
                <button id='wpm-down' onClick={decrement}><i className="ri-arrow-down-s-line"></i></button>
                <input type="number" name="wpm" id='wpm-input' min="5" max="30" value={wpm} onChange={handleChange}></input>
                <button id='wpm-up' onClick={increment}><i className="ri-arrow-up-s-line"></i></button>
            </div>
        </div>
    )
})