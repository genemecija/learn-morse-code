import React, {useContext} from "react"
import { FrequencyContext } from "../contexts/frequencyContext";

export default React.memo(function FrequencyPicker(props) {

    const {frequency, setFrequency} = useContext(FrequencyContext)

    const minFreq = 300
    const maxFreq = 1500

    function handleChange(e) {
        if (Number(e.target.value) > maxFreq) {
            setFrequency(maxFreq)
        } else if (Number(e.target.value) < minFreq) {
            setFrequency(minFreq)
        } else {
            setFrequency(Number(e.target.value))
        }
    }

    function increment() {
        setFrequency(prevFreq => {
            if (prevFreq + 10 <= maxFreq) {
                return (prevFreq + 10)
            } else {
                return maxFreq
            }
        })
    }

    function decrement() {
        setFrequency(prevFreq => {
            if (prevFreq - 10 >= minFreq) {
                return (prevFreq - 10)
            } else {
                return minFreq
            }
        })
    }
    
    return (
        <div id='frequency' className='mode-picker'>
            <div id='title'>
                Frequency <span id="range">({minFreq}-{maxFreq})</span>
            </div>
            <div id='input'>
                <button id='freq-down' onClick={decrement}><i className="ri-arrow-down-s-line"></i></button>
                <input type="number" name="frequency" id='frequency-input' value={frequency} onChange={handleChange}></input>
                <button id='freq-up' onClick={increment}><i className="ri-arrow-up-s-line"></i></button>
            </div>
        </div>
    )
})