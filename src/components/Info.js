import React from "react"
import useMorsePlayer from "../hooks/useMorsePlayer"
import straight_key from "../images/straight_key.jpg"
import electronic_key from "../images/electronic_key.jpg"

export default React.memo(function Info() {

    const {playMorseWord} = useMorsePlayer()

    return (
        <div id="info">
            <h1>Morse Code</h1>
            <p>Morse code is a method of communication that uses short and long tones. This tool will help beginners learn Morse code.</p>

            <h2>Dits and Dahs</h2>
            <p>
                <span className="bold">Dit</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('.')}></i> (<span className="ditdah">.</span>) Short tones and the base unit length of Morse code communication.<br />
                <span className="bold">Dah</span> <i className="ri-volume-up-fill" onClick={() => playMorseWord('-')}></i> (<span className="ditdah">-</span>) Long tones, each the length of three dits.
            </p>

            <h2>Spacing</h2 >
            <p>The spacing between dits and dahs matters in Morse Code. Spacing of various lengths signify different things.<br/>

                <span className="bold">Intra-character Spacing</span> A letter in Morse code can be made up of multiple dits and dahs. The spaces between the dits and dahs that make up a single letter are each the length of one dit. E.g., three dits, each separated by one-dit-long spaces, is an "S". (<span className="ditdah">...</span>) <i className="ri-volume-up-fill" onClick={() => playMorseWord('...')}></i><br />

                <span className="bold">Inter-character Spacing</span> The space between consecutive letters is three dits long. E.g., three dits, each separated by a three-dit-long spaces is "EEE". (<span className="ditdah">. . .</span>) <i className="ri-volume-up-fill" onClick={() => playMorseWord('. . .')}></i><br />
                
                <span className="bold">Inter-word Spacing</span> The space between words is seven dits long. E.g., three dits, each separated by seven-dit-long spaces (denoted by a forward slash in this example: <span className="ditdah">././.</span>), is "E E E". <i className="ri-volume-up-fill" onClick={() => playMorseWord('././.')}></i>
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
            <p><b>Electronic Keys</b> use paddles that automatically generate dits and dahs when pressed. The Electronic Keyer used here is an Iambic keyer that uses two paddles–left paddle for dits, right paddle for dahs. Pressing both paddles simultaneously alternates between dit and dah. Switch between the two at the appropriate times to build letters in Morse Code.</p>

            <p>Check out <a href='https://www.youtube.com/watch?v=uEy4Wvy6uUg' target='_blank' rel="noopener noreferrer">this video</a> for a demonstration of the difference between Straight and Electronic keys.</p>
        </div>
    )
})