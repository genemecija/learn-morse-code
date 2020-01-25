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

import PracticeMode from './app-modes/PracticeMode';
import TrainingMode from './app-modes/TrainingMode'
import ChallengeMode from './app-modes/ChallengeMode'

import Header from './components/Header';
import Legend from './components/Legend';
// import GameClock from "./components/GameClock"
import WordsPerMinute from "./components/WordsPerMinute"
import MorseButtons from './components/MorseButtons'
import MorseBufferDisplay from './components/MorseBufferDisplay'
import MorseHistory from './components/MorseHistory'

import StraightKey from './components/StraightKey';
import ElectronicKey from './components/ElectronicKey';
import Footer from './components/Footer';
import { WPMContext } from './contexts/wpmContext';

export default React.memo(function App() {

    console.log('App.js rendered')
    const {gameMode} = useContext(GameModeContext)
    const {wpm} = useContext(WPMContext)
    
    const {keyType} = useContext(KeyTypeContext)
    console.log('gameMode', gameMode);
    console.log('keyType', keyType);

    return (
        <>
            <Header />
            <div id='main-content'>
                <Legend />
                <WordsPerMinute />
                <MorseBufferContextProvider>
                    <ModePicker />
                    <KeyTypePicker />
                    {gameMode === 'practice' &&
                        <>
                            {/* {keyType === "straight" ?
                                <StraightKey gameMode='practice' wpm={wpm} /> : <ElectronicKey gameMode='practice'  wpm={wpm} />} */}
                            <PracticeMode /><br/>
                            {/* <MorseBufferDisplay /><br/>
                            <MorseHistory /><br/> */}
                        </>
                    }
                    {/* {gameMode === 'timed' &&
                        <>
                        {keyType === "straight" ?
                        <StraightKey gameMode='training' /> : <ElectronicKey gameMode='training' />}
                        <TrainingMode /><br/>
                        <MorseBufferDisplay /><br/>
                        <MorseHistory /><br/>
                        </>
                    }
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
                    } */}
                    <MorseButtons />
                </MorseBufferContextProvider>    
            </div>
        <Footer />
        </>
    );

})