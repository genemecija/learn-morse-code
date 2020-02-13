import React, {useContext} from "react"
import { WordListPickerContext } from "../contexts/wordListPickerContext";
import { WordFeederContext } from "../contexts/wordFeederContext";

export default React.memo(function WordCountPicker(props) {

    const {setWordListCount, wordListCountMax} = useContext(WordListPickerContext)
    const {resetFeeder} = useContext(WordFeederContext)

    function handleChange(e) {
        resetFeeder()
        setWordListCount(e.target.value)
    }

    // Create Options for Select Input
    let options = []
    for (let i = 0; i < wordListCountMax; i++) {
        options.push(<option value={i+1} key={i}>{i+1}</option>)
    }
    
    return (
        <div id='word-count' className='mode-picker'>
            <div id='title'>
                Challenge Word Count: <span id="range">(1-{wordListCountMax})</span>
            </div>
            <div id="input">
                <select id="wordCount-picker" defaultValue={wordListCountMax} onChange={handleChange}>
                    {options}
                </select>
            </div>
        </div>
    )
})