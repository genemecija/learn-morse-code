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

    let wordLists = ['alphabet', 'numbers', 'common100', 'test', 'short']
    let options = wordLists.map(wl => (<option value={wl}>{wl.substr(0,1).toUpperCase() + wl.substr(1)}</option>))

    return (
        <div id="challengeOptions">
            <div id="wordListPicker" className="mode-picker">
                <div id="title">
                    Word List
                </div>
                <div id="input">
                    <select id="wordlist-picker" defaultValue={wordListCategory} onChange={handleClick}>
                        {options}
                    </select>
                </div>
            </div>
            <div id="wordOrderPicker" className="mode-picker">
                <div id="title">
                    Word Order
                </div>
                <div id="buttons">
                    <button id="sequential" className="selected" onClick={handleClick}>
                        Sequential
                    </button>
                    <button id="random" onClick={handleClick}>
                        Random
                    </button>
                </div>
            </div>
        </div>
    )
})