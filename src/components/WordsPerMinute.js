import React, {useContext} from "react"
import { WPMContext } from "../contexts/wpmContext";
import useMorsePlayer from "../hooks/useMorsePlayer";

export default React.memo(function WordsPerMinute(props) {
    console.log('WordsPerMinute rendered');

    const {wpm, setWPM} = useContext(WPMContext)
    const {playMorseWord} = useMorsePlayer()
    const maxWPM = 30
    const minWPM = 5

    function handleChange(e) {
        // setWPM(Number(e.target.value))
        if (Number(e.target.value) > maxWPM) {
            setWPM(maxWPM)
        } else if (Number(e.target.value) < minWPM) {
            setWPM(minWPM)
        } else {
            setWPM(Number(e.target.value))
        }
    }
    function increment() {
        // setWPM(prevWPM => prevWPM + 1)
        setWPM(prevWPM => {
            if (prevWPM + 1 <= maxWPM) {
                return (prevWPM + 1)
            } else {
                return maxWPM
            }
        })
    }
    function decrement() {
        // setWPM(prevWPM => prevWPM - 1)
        setWPM(prevWPM => {
            if (prevWPM - 1 >= minWPM) {
                return (prevWPM - 1)
            } else {
                return minWPM
            }
        })
    }

    
    return (
        // <input id='wpm-input' type='text' value={wpm} onChange={handleChange} />
        <div id='wpm' className='mode-picker'>
            <div id='title'>
                WPM <span id="range">({minWPM}-{maxWPM})</span>
            </div>
            <div id='input'>
                <button id='wpm-down' onClick={decrement}><i className="ri-arrow-down-s-line"></i></button>
                <input type="number" name="wpm" id='wpm-input' min="5" max="30" value={wpm} onChange={handleChange}></input>
                <button id='wpm-up' onClick={increment}><i className="ri-arrow-up-s-line"></i></button>
                Test Speed&nbsp;<i className="ri-volume-up-fill" onClick={() => playMorseWord('.....')}></i>
            </div>
        </div>
    )
})