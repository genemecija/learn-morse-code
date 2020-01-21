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

    let wordList = ['morse', 'code', 'hello', 'gene']
    let wordIndex = 0
    function getNextWord() {
        let word = wordList[wordIndex]
        wordIndex += 1
        return word
    }

    return (
        <div id='main-content'>
            <Legend />
            <ModePicker />
            <MorseBufferContextProvider>
                    <KeyTypePicker />
                    {gameMode === 'practice' &&
                        <>
                            {keyType === "straight" ?
                                <StraightKey gameMode='practice' /> : <ElectronicKey gameMode='practice' />}
                            <PracticeMode /><br/>
                            <MorseBufferDisplay /><br/>
                            <MorseHistory /><br/>
                        </>
                    }
                    {/* {gameMode === 'timed' && <TimedMode />} */}
                    {gameMode === 'challenge' &&
                        <>
                            {keyType === "straight" ?
                                <StraightKey gameMode='challenge' /> : <ElectronicKey gameMode='challenge' />}
                            <ChallengeMode getNextWord={getNextWord} />
                        </>
                    }
                    <MorseButtons />
            </MorseBufferContextProvider>
            
        </div>
    );

}

export default React.memo(App);
