import React, {useContext} from 'react';
import '../css/App.css';
import useStraightKey from '../hooks/useStraightKey';
import useElectronicKey from '../hooks/useElectronicKey';
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseDisplay from '../components/MorseDisplay'
import {MorseBufferContext} from "../contexts/morseBufferContext"


function PracticeMode() {
    
    // const [telegraphType, setTelegraphType] = useState('electronic')

    // useElectronicKey()
    // const {morseCharBuffer, morseWords, clearHistory} = useStraightKey('practice')
    const {morseCharBuffer, morseWords} = useContext(MorseBufferContext)

    return (
        <>
            <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseDisplay morseWords={morseWords} /><br/>
        </>
    );

  
}

export default React.memo(PracticeMode);
