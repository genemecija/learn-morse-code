import React from 'react'
import useStraightKey from '../hooks/useStraightKey';

export default React.memo(function StraightKey(props) {
    console.log('props.gameMode',props.gameMode);
    useStraightKey(props.gameMode)
})