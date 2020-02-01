import React from "react"

export default React.memo(function Info() {

    return (
        <div id="info">
            <h2>Info</h2>
            Morse code is communication through various lengths of tones and silences.
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
            <p>The instrument used to send morse code is called the key. <b>Straight Keys</b> use a single button and generates tones whe pressed down. Straight keys require greater accuracy as you control the dits, dahs, and spacing. <b>Electronic Keys</b> can have two paddles that automatically generate either dits or dahs of appropriate length when pressed.</p>
        </div>
    )
})