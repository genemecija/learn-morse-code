import React, {useContext} from 'react';
import './css/App.css';

import { GameModeContext } from "./contexts/gameModeContext"
import { KeyTypeContext } from "./contexts/keyTypeContext"
import { MorseBufferContextProvider } from "./contexts/morseBufferContext"
import { WordFeederContextProvider } from './contexts/wordFeederContext';
import { WordListPickerContextProvider } from './contexts/wordListPickerContext';

import ModePicker from './components/ModePicker'
import KeyTypePicker from './components/KeyTypePicker'
import WordListPicker from './components/WordListPicker';

import Legend from './components/Legend';
// import GameClock from "./components/GameClock"
import MorseButtons from './components/MorseButtons'

import PracticeMode from './app-modes/PracticeMode';
import TimedMode from './app-modes/TimedMode'
import ChallengeMode from './app-modes/ChallengeMode'

import MorseBufferDisplay from './components/MorseBufferDisplay'
import MorseHistory from './components/MorseHistory'

import StraightKey from './components/StraightKey';
import ElectronicKey from './components/ElectronicKey';

export default React.memo(function App() {

    console.log('App.js rendered')
    const {gameMode} = useContext(GameModeContext)
    
    const {keyType} = useContext(KeyTypeContext)

    return (
        <div id='main-content'>
            <Legend />
            <MorseBufferContextProvider>
                <ModePicker />
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
                        <WordListPickerContextProvider>
                            <WordFeederContextProvider>
                                <WordListPicker />
                                {keyType === "straight" ?
                                    <StraightKey gameMode='challenge' /> : <ElectronicKey gameMode='challenge' />}
                                <ChallengeMode />
                            </WordFeederContextProvider>
                        </WordListPickerContextProvider>
                    </>
                }
                <MorseButtons />
            </MorseBufferContextProvider>
            
        </div>
    );

})