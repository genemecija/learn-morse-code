import React from "react"
import useMorsePlayer from "../hooks/useMorsePlayer"
import straight_key from "../images/straight_key.jpg"
import electronic_key from "../images/electronic_key.jpg"

export default React.memo(function Info() {

    const {playMorseWord} = useMorsePlayer()

    return (
        <div id="info">
            <h1>Morse Code</h1>
            <p>Morse code is a method of communication that uses short and long tones. This tool will help you learn Morse Code.</p>

            <h2>Dits and Dahs</h2>
            <p>
                <span className="bold">Dit</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('.')}></i> Denoted as a period/dot (<span className="ditdah">.</span>), dits are short tones and are the base unit of Morse Code communication.<br />
                <span className="bold">Dah</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('-')}></i> Denoted as a dash (<span className="ditdah">-</span>), dahs are long tones the length of three dits.
            </p>

            <h2>Spacing</h2 >
            <p>The spacing between dits and dahs matters in Morse Code. Spacing of various lenghts signify different things.<br/>
                <span className="bold">Intra-character Spacing</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('...')}></i> Space between dits and dahs the length of one dit signify the dits and dahs are part of the same character. E.g. three dits separated by one-dit-long spaces is an "S".<br />
                <span className="bold">Inter-character Spacing</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('. . .')}></i> Space the length of three dits signify a new letter. A single dit is an "E". Three dits, each separated by three-dit-long spaces, is "EEE".<br />
                <span className="bold">Inter-word Spacing</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('././.')}></i> Space the length of seven dits signifies a new word. Three dits, each separated by seven-dit-long spaces, is "E E E".
            </p>

            <h2>Speed</h2>
            <p>
                The rate of communication is increased or decreased by adjusting the length of the dits, which in turn adjusts the length of dahs and spaces. Adjust the <b>WPM</b> (Words Per Minute) in the Options section to adjust the speed.
            </p>

            <h2>Telegraph Key Types</h2 >
            <p>The instrument used to send Morse Code is called the key.</p>
            
            <center><img src={straight_key} alt="Straight Key" /></center>
            <p><b>Straight Keys</b> use a single button and generate tones when pressed down. Straight keys require greater accuracy as the length of dits, dahs, and spacing is completely under manual control.</p>
            <center><img src={electronic_key} alt="Electronic Key"></img></center>
            <p><b>Electronic Keys</b> use two paddles (one for dit, one for dah) that automatically generate the tones when pressed. The Electronic Keyer used here is an Iambic keyer, which alternates between dit and dah when both paddles are pressed. Switch between the two at the appropriate times to build letters in Morse Code.</p>
        </div>
    )
})