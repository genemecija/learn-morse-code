import React, {useContext} from 'react';
import './css/App.css';

import { GameModeContext } from "./contexts/gameModeContext"
import { MorseBufferContextProvider } from "./contexts/morseBufferContext"
import { WordFeederContextProvider } from './contexts/wordFeederContext';
import { WordListPickerContextProvider } from './contexts/wordListPickerContext';
import { GameClockContextProvider } from './contexts/gameClockContext';
import { WPMContextProvider } from './contexts/wpmContext';
import { FrequencyContextProvider } from './contexts/frequencyContext';
import { KeyTypeContextProvider } from './contexts/keyTypeContext';
import { ChallengeContextProvider } from './contexts/challengeContext';

import PracticeMode from './app-modes/PracticeMode';
import ChallengeMode from './app-modes/ChallengeMode'

import ModePicker from './components/ModePicker'
import KeyTypePicker from './components/KeyTypePicker'
import Header from './components/Header';
import WordsPerMinute from "./components/WordsPerMinute"
import MorseButtons from './components/MorseButtons'
import Footer from './components/Footer';
import ChallengeOverlay from './components/ChallengeOverlay';
import SidebarLeft from './components/SidebarLeft';
import FrequencyPicker from './components/FrequencyPicker';

export default React.memo(function App() {

    console.log('App.js rendered')

    const {gameMode} = useContext(GameModeContext)

    return (
        <>
            <Header />
            <div id='main-content'>
                <KeyTypeContextProvider>
                <WPMContextProvider>
                <FrequencyContextProvider>
                <MorseBufferContextProvider>
                <WordListPickerContextProvider>
                <WordFeederContextProvider>
                <ChallengeContextProvider>
                <GameClockContextProvider>
                    <SidebarLeft />
                    <div id="main-interface">
                        <div id="mainOptions">
                            <div id="options-left">
                                <ModePicker />
                                <KeyTypePicker />
                            </div>
                            <div id="options-right">
                                <WordsPerMinute />
                                <FrequencyPicker />
                            </div>
                        </div>
                        {gameMode === 'practice' && <PracticeMode />}
                        {gameMode === 'challenge' &&
                            <>
                                <ChallengeOverlay />
                                <ChallengeMode />
                            </>
                        }
                        <MorseButtons />
                    </div>
                </GameClockContextProvider>
                </ChallengeContextProvider>
                </WordFeederContextProvider>
                </WordListPickerContextProvider>
                </MorseBufferContextProvider>
                </FrequencyContextProvider>
                </WPMContextProvider>
                </KeyTypeContextProvider>
            </div>
        <Footer />
        </>
    );
})