import React, { useContext } from 'react';
import '../css/App.css';
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistoryTextBox from '../components/MorseHistory_textbox'
import { KeyTypeContext } from '../contexts/keyTypeContext';
import StraightKey from '../components/StraightKey';
import ElectronicKey from '../components/ElectronicKey';


export default (function PracticeMode(props) {

    const {keyType} = useContext(KeyTypeContext)

    return (
        <>
            {keyType === "straight" ?
                <StraightKey /> : <ElectronicKey />
            }
            <MorseBufferDisplay /><br/>
            <MorseHistoryTextBox />
        </>
    );

  
})