import React, {useContext} from 'react';
import './css/App.css';
import MorseButton from './components/MorseButton'
import ModePicker from './components/ModePicker'
import KeyTypePicker from './components/KeyTypePicker'
// import MorseDisplay from './components/MorseDisplay'
// import MorseBufferDisplay from './components/MorseBufferDisplay'
// import GameClock from "./components/GameClock"
// import ChallengeWord from "./components/ChallengeWord"
import {GameModeContext} from "./contexts/gameContext"
import {KeyTypeContextProvider} from "./contexts/keyTypeContext"
import {MorseBufferContextProvider} from "./contexts/morseBufferContext"
import PracticeMode from './app-modes/PracticeMode';
import TimedMode from './app-modes/TimedMode'
import ChallengeMode from './app-modes/ChallengeMode'
import Legend from './components/Legend';

function App() {

    console.log('App.js rendered')
    const {gameMode} = useContext(GameModeContext)
    

    return (
        <div id='main-content'>
            <Legend />
            <ModePicker />
            <MorseBufferContextProvider>
                <KeyTypeContextProvider>
                    <KeyTypePicker />
                    {gameMode === 'practice' && <PracticeMode />}
                    {gameMode === 'timed' && <TimedMode />}
                    {gameMode === 'challenge' && <ChallengeMode />}
                </KeyTypeContextProvider>
            </MorseBufferContextProvider>
            
            <MorseButton />
        </div>
    );

}

export default React.memo(App);
