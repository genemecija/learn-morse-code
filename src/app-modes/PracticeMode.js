import React, {useContext} from 'react';
import '../css/App.css';
import {KeyTypeContext} from "../contexts/keyTypeContext"
import StraightKey from '../components/StraightKey'
import ElectronicKey from '../components/ElectronicKey'
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseHistory from '../components/MorseHistory'
import { WPMContext } from '../contexts/wpmContext';
import { GameModeContext } from '../contexts/gameModeContext';
import useStraightKey from '../hooks/useStraightKey';


export default React.memo(function PracticeMode() {

    const {keyType} = useContext(KeyTypeContext)
    const {gameMode} = useContext(GameModeContext)
    const {wpm} = useContext(WPMContext)


    return (
        <>
            {keyType === "straight" ? <StraightKey gameMode={gameMode} wpm={wpm} /> : <ElectronicKey gameMode={gameMode} wpm={wpm} />}
            <MorseBufferDisplay /><br/>
            <MorseHistory /><br/>
        </>
    );

  
})