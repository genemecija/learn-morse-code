import React, { useContext } from "react"
import DitDahDisplay from "./DitDahDisplay"
import morseCode from '../data/morse-reverse.json'
// import { MorseBufferContext } from "../contexts/morseBufferContext"

function ChallengeBufferDisplay(props) {

    // // INCREMENTING COUNTER TO MONITOR COMPONENT RELOADING
    // // console.log('ChallengeMode')
    // if (!document.getElementById('counter')) {
    //     let counter = document.createElement('h1')
    //     let holder = document.createElement('h3')
    //     counter.id = 'counter'
    //     holder.id = 'holder'
    //     counter.innerText = "0"
    //     document.querySelector('#main-content').appendChild(counter)
    //     document.querySelector('#main-content').appendChild(holder)
    // } else {
    //     let num = document.getElementById('counter').innerText
    //     document.getElementById('counter').innerText = Number(num) + 1
    //     document.getElementById('holder').innerText = buffer
    // }
    // const {morseCharBuffer, setMorseCharBuffer} = useContext(MorseBufferContext)

    const morseArray = props.morseArray
    let incorrectMorseIndexes = props.incorrectMorseIndexes
    console.log('morseArray', morseArray);

    let ditDahs = []
    let alphanumeric = []
    

    for (let i in morseArray) {
        let morseChar = morseArray[i]

        // Alphanumeric
        let alphaClass = (incorrectMorseIndexes.includes(Number(i))) ? 'strike' : ''
        alphanumeric.push(<span className={alphaClass}>{morseCode[morseChar].toUpperCase()}</span>)
        
        // DitDahs
        console.log('>>> incorrectMorseIndexes', incorrectMorseIndexes);
        let ditDahClass = (incorrectMorseIndexes.includes(Number(i))) ? 'morseError' : ''
        ditDahs.push(<span className={ditDahClass}>{morseChar}</span>)
        ditDahs.push(<span className='space'>&nbsp;</span>)
    }
    // if (incorrectIndex) {
    //     setTimeout(() => {
    //         setMorseCharBuffer(prev => prev.slice(0,prev.length-2))
    //     }, 500)
    // }

    return (
        <div id="challengeBufferDisplay">
            <div id="alphanumeric-container">
                <div id="alphanumeric">
                    {alphanumeric}
                </div>
            </div>
            <div id="ditDahs">
                {ditDahs}
            </div>
        </div>
    )
}

export default React.memo(ChallengeBufferDisplay)