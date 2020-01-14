import React from 'react';
import '../css/App.css';
import useTelegraph from '../hooks/useTelegraph';
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseDisplay from '../components/MorseDisplay'

function PracticeMode() {
    console.log("PracticeMode loaded");
    const {morseCharBuffer, morseWords, clearHistory} = useTelegraph('practice')

    return (
        <>
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseDisplay morseWords={morseWords} /><br/>
            <button onClick={clearHistory}>Clear Morse History</button><br/>
        </>
    );

}

export default React.memo(PracticeMode);
