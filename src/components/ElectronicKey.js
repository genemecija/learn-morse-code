import React from 'react'
// import useStraightKey from '../hooks/useStraightKey';
import useElectronicKey from '../hooks/useElectronicKey';

export default React.memo(function StraightKey() {
    useElectronicKey()
})