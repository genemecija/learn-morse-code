import React, { useContext } from 'react'
import useStraightKey from '../hooks/useStraightKey';
import { GameModeContext } from '../contexts/gameModeContext';
import { WPMContext } from '../contexts/wpmContext';

export default React.memo(function StraightKey(props) {
    console.log('props.gameMode',props.gameMode);

    // const {gameMode} = useContext(GameModeContext)
    // const {wpm} = useContext(WPMContext)

    useStraightKey(props.gameMode, props.wpm)
})