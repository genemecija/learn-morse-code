import React, {useContext} from 'react';
import '../css/App.css';
import ChallengeWord from '../components/ChallengeWord'
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import GameClock from '../components/GameClock';
import { KeyTypeContext } from '../contexts/keyTypeContext';
import StraightKey from '../components/StraightKey';
import ElectronicKey from '../components/ElectronicKey';
import ChallengeControls from '../components/ChallengeControls';
import { ChallengeContext } from '../contexts/challengeContext';


export default React.memo(function ChallengeMode() {
    
    const {keyType} = useContext(KeyTypeContext)
    const {challengeState, cancelChallenge, morseArray, incorrectMorseIndexes, challengeWordClass} = useContext(ChallengeContext)

    return (
        <>
            {challengeState === 'started' ? (keyType === "straight" ?
                <StraightKey /> : <ElectronicKey />) : <></>
            }
            <div id="challenge-header">
                <GameClock />
                <ChallengeControls cancelChallenge={cancelChallenge} />
            </div>
            <ChallengeWord challengeWordClass={challengeWordClass} />
            <ChallengeBufferDisplay morseArray={morseArray} incorrectMorseIndexes={incorrectMorseIndexes} />
        </>
    )
});
