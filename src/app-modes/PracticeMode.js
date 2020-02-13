import React, { useContext } from 'react';
import '../css/App.css';
import { KeyTypeContext } from '../contexts/keyTypeContext';
import ElectronicKey from '../components/ElectronicKey';
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistoryTextBox from '../components/MorseHistory'
import StraightKey from '../components/StraightKey';


export default (function PracticeMode() {

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