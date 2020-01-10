import React from 'react';
import '../css/App.css';
import useTelegraph from '../hooks/useTelegraph';
import GameClock from '../components/GameClock'
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseDisplay from '../components/MorseDisplay'

function TimedMode() {

    const {morseCharBuffer, morseWords} = useTelegraph('timed')
    
    console.log('TimedMode.js rendered')
    
    return (
        <>
            <GameClock time={30} />
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseDisplay morseWords={morseWords} />
        </>
    );

}

export default React.memo(TimedMode);
