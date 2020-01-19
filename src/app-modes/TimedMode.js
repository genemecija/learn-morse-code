import React from 'react';
import '../css/App.css';
import useStraightKey from '../hooks/useStraightKey';
import GameClock from '../components/GameClock'
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistory from '../components/MorseHistory'

function TimedMode() {

    const {morseCharBuffer, morseWords} = useStraightKey('timed')
    
    console.log('TimedMode.js rendered')
    
    return (
        <>
            <GameClock time={30} />
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseHistory morseWords={morseWords} />
        </>
    );

}

export default React.memo(TimedMode);
