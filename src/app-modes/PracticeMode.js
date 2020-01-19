import React, {useContext} from 'react';
import '../css/App.css';
import {KeyTypeContext} from "../contexts/keyTypeContext"
import StraightKey from '../components/StraightKey'
import ElectronicKey from '../components/ElectronicKey'
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistory from '../components/MorseHistory'


export default React.memo(function PracticeMode() {

    const {keyType} = useContext(KeyTypeContext)

    return (
        <>
            {/* {keyType === "straight" ? <StraightKey /> : <ElectronicKey />}
            <MorseBufferDisplay /><br/>
            <MorseHistory /><br/> */}
        </>
    );

  
})