import React from "react"

export default React.memo(function Info() {

    return (
        <div id="info">
            <h2>Info</h2>
            <p>Morse code is a method of communication via tones and silences of various lengths.</p>
            <ul>
                <h3>Dits and Dahs</h3>
                <li><b>Dit</b> - Denoted as a dot (.), the base unit of morse code.</li>
                <li><b>Dah</b> - Denoted as a dash (-), the length of 3 dits</li>
                <h3>Spacing</h3>
                <li><b>Intra-character Spacing</b> - Silence the length of 1 dit</li>
                <li><b>Inter-character Spacing</b> - Silence the length of 3 dits</li>
                <li><b>Inter-word Spacing</b> - Silence the length of 7 dits</li>
            </ul>

            <h3>Telegraph Key Types</h3>
            <p>The instrument used to send morse code is called the key. <b>Straight Keys</b> use a single button and generates tones when pressed down. Straight keys require greater accuracy as you control the dits, dahs, and spacing manually. <b>Electronic Keys</b> automatically generate dits or dahs of appropriate length. The Electronic Keyer used here is an Iambic keyer. It uses two paddles, one for dits, one for dahs. Switch between the two at the appropriate times to build letters.</p>
        </div>
    )
})