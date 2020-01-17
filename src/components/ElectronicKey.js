import React from 'react'
import useElectronicKey from '../hooks/useElectronicKey';

export default React.memo(function ElectronicKey(props) {
    useElectronicKey(props.gameMode)
})