import React, {useContext} from "react"
import { WordListPickerContext } from "../contexts/wordListPickerContext";
import { WordFeederContext } from "../contexts/wordFeederContext";

export default React.memo(function WordListPicker() {

    const {wordListCategory, setWordListCategory} = useContext(WordListPickerContext)
    const {resetFeeder, setOrder} = useContext(WordFeederContext)

    const orderOpts = ['sequential', 'random']

    function handleClick(e) {
        resetFeeder()

        if (orderOpts.includes(e.target.id)) {
            let buttons = document.querySelector(".mode-picker#wordOrderPicker #buttons").childNodes
            buttons.forEach(button => {
                if (button.id === e.target.id) {
                    button.classList.add('selected')
                } else { button.classList.remove('selected')}
            })

            setOrder(e.target.id)
        } else {
            setWordListCategory(e.target.value)
            console.log("Switched to " + e.target.value + " word list.");
        }
    }

    return (
        <>
            <div id="wordListPicker" className="mode-picker">
                <div id="title">
                    Word List
                </div>
                <div id="input">
                    <select defaultValue={wordListCategory} onChange={handleClick}>
                        <option value="alphabet">Alphabet</option>
                        <option value="common100">100 Most Common Words</option>
                        <option value="test">Test List</option>
                    </select>
                </div>
                {/* <div id="buttons">
                    <button id="alphabet" class="selected" onClick={handleClick}>
                        Alphabet
                    </button>
                    <button id="common100" onClick={handleClick}>
                        100 Most Common Words
                    </button>
                    <button id="test" onClick={handleClick}>
                        Test List
                    </button>
                </div> */}
            </div>
            <div id="wordOrderPicker" className="mode-picker">
                <div id="title">
                    Word Order
                </div>
                <div id="buttons">
                    <button id="sequential" class="selected" onClick={handleClick}>
                        Sequential
                    </button>
                    <button id="random" onClick={handleClick}>
                        Random
                    </button>
                </div>
            </div>
        </>
    )
})