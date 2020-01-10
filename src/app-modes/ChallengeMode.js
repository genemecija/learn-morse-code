import React from 'react';
import '../css/App.css';
import useTelegraph from '../hooks/useTelegraph';
// import ChallengeWord from '../components/ChallengeWord'
// import MorseBufferDisplay from '../components/MorseBufferDisplay'
import ChallengeDisplay from '../components/ChallengeDisplay';

function ChallengeMode() {

    const {morseCharBuffer, setMorseCharBuffer} = useTelegraph('challenge')
    
    return (
        <>
            <ChallengeDisplay buffer={morseCharBuffer} word="Morse" setMorseCharBuffer={setMorseCharBuffer}/>
        </>
    );

}

export default React.memo(ChallengeMode);
