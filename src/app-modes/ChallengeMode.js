import React from 'react';
import '../css/App.css';
import useTelegraph from '../hooks/useTelegraph';
import ChallengeWord from '../components/ChallengeWord'
import MorseBufferDisplay from '../components/MorseBufferDisplay'

function ChallengeMode() {

    const {morseCharBuffer} = useTelegraph('challenge')
    
    console.log('ChallengeMode.js rendered')
    
    return (
        <>
            <ChallengeWord word="challenge"/>
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
        </>
    );

}

export default React.memo(ChallengeMode);
