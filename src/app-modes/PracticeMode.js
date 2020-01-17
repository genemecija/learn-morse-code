import React, {useContext} from 'react';
import '../css/App.css';
import {KeyTypeContext} from "../contexts/keyTypeContext"
import StraightKey from '../components/StraightKey'
import ElectronicKey from '../components/ElectronicKey'
import MorseBufferDisplay from '../components/MorseBufferDisplay'
import MorseDisplay from '../components/MorseDisplay'


export default React.memo(function PracticeMode(props) {
    console.log("COMPONENT LOADED: PracticeMode");
    const {keyType} = useContext(KeyTypeContext)
    // const [telegraphType, setTelegraphType] = useState('electronic')

    // useElectronicKey()
    // const {morseCharBuffer, morseWords, clearHistory} = useStraightKey('practice')
    

    return (
        <>
            {keyType === "straight" ? <StraightKey /> : <ElectronicKey />}
            <MorseBufferDisplay /><br/>
            <MorseDisplay /><br/>
            {/* <MorseBufferDisplay buffer={morseCharBuffer} /><br/>
            <MorseDisplay morseWords={morseWords} /><br/> */}
        </>
    );

  
})