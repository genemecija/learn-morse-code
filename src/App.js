import React, {useContext, useState} from 'react';
import './css/App.css';
import MorseButtons from './components/MorseButtons'
import ModePicker from './components/ModePicker'
import KeyTypePicker from './components/KeyTypePicker'
// import MorseDisplay from './components/MorseDisplay'
// import MorseBufferDisplay from './components/MorseBufferDisplay'
// import GameClock from "./components/GameClock"
// import ChallengeWord from "./components/ChallengeWord"
import {GameModeContext} from "./contexts/gameContext"
import {KeyTypeContext} from "./contexts/keyTypeContext"
import {MorseBufferContextProvider} from "./contexts/morseBufferContext"
import PracticeMode from './app-modes/PracticeMode';
import TimedMode from './app-modes/TimedMode'
import ChallengeMode from './app-modes/ChallengeMode'
import Legend from './components/Legend';

import MorseBufferDisplay from './components/MorseBufferDisplay'
import MorseHistory from './components/MorseHistory'
import StraightKey from './components/StraightKey';
import ElectronicKey from './components/ElectronicKey';

function App() {

    console.log('App.js rendered')
    const {gameMode} = useContext(GameModeContext)
    
    const {keyType} = useContext(KeyTypeContext)

    // const [keyType, setKeyType] = useState('straight')
    
    // function handleClick(e) {
    //     setKeyType(e.target.id)
    //     console.log("Switched to " + e.target.id + " keyType.");
    // }

    return (
        <div id='main-content'>
            <Legend />
            <ModePicker />
            <MorseBufferContextProvider>
                    <KeyTypePicker />
                    {gameMode === 'practice' &&
                        <>
                            {keyType === "straight" ?
                                <StraightKey gameMode={gameMode} /> : <ElectronicKey gameMode={gameMode} />}
                            <PracticeMode /><br/>
                            <MorseBufferDisplay /><br/>
                            <MorseHistory /><br/>
                        </>
                    }
                    {/* {gameMode === 'timed' && <TimedMode />} */}
                    {gameMode === 'challenge' &&
                        <>
                            {keyType === "straight" ?
                                <StraightKey gameMode={gameMode} /> : <ElectronicKey gameMode={gameMode} />}
                            <ChallengeMode />}
                        </>
                    }
                    <MorseButtons />
            </MorseBufferContextProvider>
            
        </div>
    );

}

export default React.memo(App);
