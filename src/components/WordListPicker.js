import React, {useContext} from "react"
import { WordListPickerContext } from "../contexts/wordListPickerContext";
import { WordFeederContext } from "../contexts/wordFeederContext";

export default React.memo(function WordListPicker() {

    const {setWordListCategory} = useContext(WordListPickerContext)
    const {resetFeeder, setOrder} = useContext(WordFeederContext)

    const orderOpts = ['sequential', 'random']

    function handleClick(e) {
        resetFeeder()

        if (orderOpts.includes(e.target.id)) {
            let buttons = document.querySelector(".mode-picker#wordOrderPicker").childNodes
            buttons.forEach(button => {
                if (button.id === e.target.id) {
                    button.classList.add('selected')
                } else { button.classList.remove('selected')}
            })

            setOrder(e.target.id)
        } else {
            let buttons = document.querySelector(".mode-picker#wordListPicker").childNodes
            buttons.forEach(button => {
                if (button.id === e.target.id) {
                    button.classList.add('selected')
                } else { button.classList.remove('selected')}
            })

            setWordListCategory(e.target.id)
            console.log("Switched to " + e.target.id + " mode.");
        }

        
    }

    return (
        <>
            <div id="wordListPicker" className="mode-picker">
                <button id="alphabet" class="selected" onClick={handleClick}>
                    Alphabet
                </button>
                <button id="common100" onClick={handleClick}>
                    100 Most Common Words
                </button>
                <button id="test" onClick={handleClick}>
                    Test List
                </button>
            </div>
            <div id="wordOrderPicker" className="mode-picker">
                <button id="sequential" class="selected" onClick={handleClick}>
                    Sequential
                </button>
                <button id="random" onClick={handleClick}>
                    Random
                </button>
            </div>
        </>
    )
})