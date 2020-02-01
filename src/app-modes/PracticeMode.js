import React from 'react';
import '../css/App.css';
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistoryTextBox from '../components/MorseHistory_textbox'
import MorseHistory from '../components/MorseHistory'


export default (function PracticeMode(props) {

    return (
        <>
            <MorseBufferDisplay /><br/>
            <MorseHistoryTextBox />
        </>
    );

  
})