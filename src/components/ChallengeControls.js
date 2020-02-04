import React from "react"


export default (function ChallengeControls(props) {

    // const {startGameClock} = useContext(GameClockContext)

    // function startChallenge(e) {
    //     let countdown
    //     let count = 3
    //     document.getElementById('challengeReady').classList.add('starting')
    //     document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
    //     countdown = setInterval(() => {
    //         count--
    //         document.getElementById('challengeReady').innerHTML = `<span id="message">Challenge starting in</span><span id="count">${count}</span>`
    //         if (count === 0) {
    //             // Do this when countdown hits 0
    //             document.getElementById('challenge-overlay').classList.add('hide')
    //             clearInterval(countdown)
    //             startGameClock()
    //         }
    //     }, 1000)
    // }

    return (
        <div id="challengeControls">
            <button onClick={props.stopChallenge}>Exit</button>
        </div>
    )
})