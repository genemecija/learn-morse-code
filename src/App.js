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
import Footer from './components/Footer';
import StraightKey from './components/StraightKey';
import ElectronicKey from './components/ElectronicKey';
import Info from './components/Info';

export default React.memo(function App() {

    console.log('App.js rendered')

    const {keyType} = useContext(KeyTypeContext)
    const {gameMode} = useContext(GameModeContext)

    return (
        <>
            <Header />
            <div id='main-content'>
                <MorseBufferContextProvider>
                <WordListPickerContextProvider>
                <WordFeederContextProvider>
                    <div id="sidebar">
                        <Info />
                        <div id="mainOptions">
                            <h2>Options</h2>
                            <ModePicker />
                            <KeyTypePicker />
                            <WordsPerMinute />
                            {gameMode === 'challenge' &&
                                <WordListPicker />
                            }
                        </div>
                        <Legend />
                    </div>
                    <div id="main-interface">
                        {keyType === "straight" ?
                            <StraightKey /> : <ElectronicKey />
                        }

                        {gameMode === 'practice' &&
                            <PracticeMode />
                        }
                        
                        {/* {gameMode === 'timed' &&
                            <>
                            {keyType === "straight" ?
                            <StraightKey gameMode='training' /> : <ElectronicKey gameMode='training' />}
                            <TrainingMode /><br/>
                            <MorseBufferDisplay /><br/>
                            <MorseHistory /><br/>
                            </>
                        } */}

                        {gameMode === 'challenge' &&
                            <ChallengeMode />
                        }

                        <MorseButtons />
                    </div>
                </WordFeederContextProvider>
                </WordListPickerContextProvider>
                </MorseBufferContextProvider>    
            </div>
        <Footer />
        </>
    );

})