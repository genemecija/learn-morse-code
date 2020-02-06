import React, {useContext} from 'react';
import './css/App.css';

import { GameModeContext } from "./contexts/gameModeContext"
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
import Info from './components/Info';
import { GameClockContextProvider } from './contexts/gameClockContext';
import ChallengeOverlay from './components/ChallengeOverlay';
import { KeyTypeContextProvider } from './contexts/keyTypeContext';
import { WPMContextProvider } from './contexts/wpmContext';

export default React.memo(function App() {

    console.log('App.js rendered')

    const {gameMode} = useContext(GameModeContext)

    function toggleRight() {
        document.querySelector('.sidebar#right').classList.toggle('hide')
    }
    function toggleLeft() {
        document.querySelector('.sidebar#left').classList.toggle('hide')
    }

    return (
        <>
            <Header />
            <div id='main-content'>
                <KeyTypeContextProvider>
                <WPMContextProvider>
                <MorseBufferContextProvider>
                <WordListPickerContextProvider>
                <WordFeederContextProvider>
                <GameClockContextProvider>
                    <div className="sidebar" id="left" onClick={toggleLeft}>
                        <Info />
                    </div>
                    <div id="main-interface">

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
                            <>
                                <ChallengeOverlay />
                                <ChallengeMode />
                            </>
                        }

                        <MorseButtons />
                    </div>
                    <div className="sidebar" id="right">
                        <div id="settings" onClick={toggleRight}><i class="ri-settings-3-fill"></i></div>
                        <div id="mainOptions">
                            <h2>Options</h2>
                            <ModePicker />
                            <KeyTypePicker />
                            <WordsPerMinute />
                            {/* {gameMode === 'challenge' &&
                                <WordListPicker />
                            } */}
                        </div>
                        <Legend />
                    </div>
                </GameClockContextProvider>
                </WordFeederContextProvider>
                </WordListPickerContextProvider>
                </MorseBufferContextProvider>
                </WPMContextProvider>
                </KeyTypeContextProvider>
            </div>
        <Footer />
        </>
    );

})