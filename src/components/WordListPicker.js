import React, {useContext} from "react"
import { WordListPickerContext } from "../contexts/wordListPickerContext";
import { WordFeederContext } from "../contexts/wordFeederContext";

export default React.memo(function WordListPicker() {

    const {setWordListCategory} = useContext(WordListPickerContext)
    const {resetFeeder} = useContext(WordFeederContext)

    function handleClick(e) {
        resetFeeder()
        setWordListCategory(e.target.id)
        console.log("Switched to " + e.target.id + " mode.");
    }

    return (
            <div id="wordListPicker" className="mode-picker">
                <button id="common100" onClick={handleClick}>
                    100 Most Common Words
                </button>
                <button id="alphabet" onClick={handleClick}>
                    Alphabet
                </button>
                <button id="test" onClick={handleClick}>
                    Test List
                </button>
            </div>
    )
})