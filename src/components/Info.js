import React from "react"
import useMorsePlayer from "../hooks/useMorsePlayer"
import straight_key from "../images/straight_key.jpg"
import electronic_key from "../images/electronic_key.jpg"

export default React.memo(function Info() {

    const {playMorseWord} = useMorsePlayer()

    return (
        <div id="info">
            <h1>Morse Code</h1>
            <p>Morse code is a method of communication via short and long tones with standard spacing between each tone.</p>

            <h2>Dits and Dahs</h2>
            <p>
                <h3>Dit</h3> <i className="ri-volume-up-fill" onClick={() => playMorseWord('.')}></i><br />
                Denoted as a dot (.), dits are short tones and are base unit of morse code.<br />
                <h3>Dah</h3> <i className="ri-volume-up-fill" onClick={() => playMorseWord('-')}></i><br />
                Denoted as a dash (-), dahs are long tones the length of three dits.
            </p>

            <h2>Spacing</h2 >
            <p>
                <h3>Intra-character Spacing</h3> <i className="ri-volume-up-fill" onClick={() => playMorseWord('...')}></i><br />
                Silence between dits and dahs the length of one dit. Three dits separated by dit-long spaces is an "S".<br />
                <h3>Inter-character Spacing</h3> <i className="ri-volume-up-fill" onClick={() => playMorseWord('. . .')}></i><br />
                Silence the length of 3 dits. Three dits separated by three-dit-long spaces is "EEE".<br />
                <h3>Inter-word Spacing</h3> <i className="ri-volume-up-fill" onClick={() => playMorseWord('././.')}></i><br />
                Silence the length of 7 dits. Three dits separated by seven-dit-long spaces is "E E E".
            </p>

            <h2>Speed</h2   >
            <p>
                Adjusting the <b>WPM</b> (Words Per Minute) in the Options Menu on the right sidebar will adjust the lengths of the dits, dahs, and spacing accordingly.
            </p>

            <h2>Telegraph Key Types</h2 >
            <p>The instrument used to send morse code is called the key.</p>
            
            <center><img src={straight_key} alt="Straight Key" /></center>
            <p><b>Straight Keys</b> use a single button and generates tones when pressed down. Straight keys require greater accuracy as you control the dits, dahs, and spacing manually.</p>
            <center><img src={electronic_key} alt="Electronic Key"></img></center>
            <p><b>Electronic Keys</b> automatically generate dits or dahs of appropriate length. The Electronic Keyer used here is an Iambic keyer. It uses two paddles, one for dits, one for dahs. Switch between the two at the appropriate times to build letters.</p>
        </div>
    )
})