import React, { useContext } from 'react'
import useElectronicKey from '../hooks/useElectronicKey';

function ElectronicKey(props) {

    return useElectronicKey(props.gameMode, props.wpm)
}

export default ElectronicKey