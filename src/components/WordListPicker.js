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

    let wordLists = ['alphabet', 'numbers', 'boys', 'girls', 'common100', 'test', 'short']
    const metadata = {
        'alphabet': {name: 'Alphabet', description: 'Each letter of the alphabet', count: 26},
        'numbers': {name: 'Numbers', description: '0-9', count: 10},
        'boys': {name: 'Boys Names', description: 'Top 20 Boys Names', count: 20},
        'girls': {name: 'Girls Names', description: 'Top 20 Girls Names', count: 20},
        'common100': {name: 'Common 100', description: '100 most common words', count: 100},
        'test': {name: 'Test List', description: 'A test list', count: 5},
        'short': {name: 'Short List', description: 'A short list', count: 1}
    }
    let options = wordLists.map((wl, index) => (<option value={wl} key={index}>{metadata[wl]['name']}</option>))

    return (
        <div id="challengeOptions">
            <div id="wordListPicker" className="mode-picker">
                <div id="title">
                    Word List:
                </div>
                <div id="input">
                    <select id="wordlist-picker" defaultValue={wordListCategory} onChange={handleClick}>
                        {options}
                    </select>
                </div>
            </div>

            <div id="wordOrderPicker" className="mode-picker">
                <div id="title">
                    Word Order:
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

            <div id="wordlist-description" className="mode-picker">
                <div id="title">
                    Description:
                </div>
                <div id="info">
                    {metadata[wordListCategory]['description']}
                </div>
            </div>
            <div id="wordlist-count" className="mode-picker">
                <div id="title">
                    # of List Items:
                </div>
                <div id="info">
                    {metadata[wordListCategory]['count']}
                </div>
            </div>
        </div>
    )
})