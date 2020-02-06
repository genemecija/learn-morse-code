import React from "react"
import useMorsePlayer from "../hooks/useMorsePlayer"

export default React.memo(function Info() {

    const {playMorseWord} = useMorsePlayer()

    return (
        <div id="info">
            <h2>Info</h2>
            <p>Morse code is a method of communication via short and long tones with standard spacing between each tone.</p>

            <h3>Dits and Dahs</h3>
            <p>
                <b>Dit</b> <i className="ri-volume-up-fill" onClick={() => playMorseWord('.')}></i><br />
                Denoted as a dot (.), dits are short tones and are base unit of morse code.<br />
                <b>Dah</b> <i className="ri-volume-up-fill" onClick={() => playMorseWord('-')}></i><br />
                Denoted as a dash (-), dahs are long tones the length of three dits.
            </p>

            <h3>Spacing</h3>
            <p>
                <b>Intra-character Spacing</b> <i className="ri-volume-up-fill" onClick={() => playMorseWord('...')}></i><br />
                Silence between dits and dahs the length of one dit. Three dits separated by dit-long spaces is an "S".<br />
                <b>Inter-character Spacing</b> <i className="ri-volume-up-fill" onClick={() => playMorseWord('. . .')}></i><br />
                Silence the length of 3 dits. Three dits separated by three-dit-long spaces is "EEE".<br />
                <b>Inter-word Spacing</b> <i className="ri-volume-up-fill" onClick={() => playMorseWord('././.')}></i><br />
                Silence the length of 7 dits. Three dits separated by seven-dit-long spaces is "E E E".
            </p>

            <h3>Speed</h3>
            <p>
                Adjusting the <b>WPM</b> (Words Per Minute) in the Options Menu on the right sidebar will adjust the lengths of the dits, dahs, and spacing accordingly.
            </p>

            <h3>Telegraph Key Types</h3>
            <p>The instrument used to send morse code is called the key.</p>
            <img src='./media/images/straight_key.jpg' alt="Straight Key"></img>
            <p><b>Straight Keys</b> use a single button and generates tones when pressed down. Straight keys require greater accuracy as you control the dits, dahs, and spacing manually.</p>
            <img src={"../media/images/electronic_key.jpg"} alt="Electronic Key"></img>
            <p><b>Electronic Keys</b> automatically generate dits or dahs of appropriate length. The Electronic Keyer used here is an Iambic keyer. It uses two paddles, one for dits, one for dahs. Switch between the two at the appropriate times to build letters.</p>
        </div>
    )
})