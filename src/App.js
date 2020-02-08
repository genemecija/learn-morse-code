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
import PlayMorseInput from './components/PlayMorseInput';
import SidebarLeft from './components/SidebarLeft';

export default React.memo(function App() {

    console.log('App.js rendered')

    const {gameMode} = useContext(GameModeContext)

    
    function toggleRight() {
        document.querySelector('.sidebar#right').classList.toggle('hide')
        // document.querySelector('#main-interface').classList.toggle('expandRight')
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
                    <SidebarLeft />
                    <div id="main-interface">
                        <ModePicker />
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
                        <span id='tip'>Tap the button to use the telegraph.</span>
                    </div>
                    {/* <div className="sidebar" id="right">
                        <div id="settings-icon" onClick={toggleRight}><i class="ri-settings-3-line"></i></div>
                        
                    </div> */}
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