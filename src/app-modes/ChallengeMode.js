import React, {useContext} from 'react';
import '../css/App.css';
import { ChallengeContext } from '../contexts/challengeContext';
import { KeyTypeContext } from '../contexts/keyTypeContext';
import ChallengeBufferDisplay from '../components/ChallengeBufferDisplay';
import ChallengeControls from '../components/ChallengeControls';
import ChallengeWord from '../components/ChallengeWord'
import ElectronicKey from '../components/ElectronicKey';
import GameClock from '../components/GameClock';
import StraightKey from '../components/StraightKey';


export default React.memo(function ChallengeMode() {
    
    const {keyType} = useContext(KeyTypeContext)
    const {challengeState, cancelChallenge, morseArray, challengeWordClass} = useContext(ChallengeContext)

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
            <ChallengeBufferDisplay morseArray={morseArray} />
        </>
    )
});
