import React from "react"

function DitDahDisplay(props) {
    if (props.dd === ' ') {
        return (
            <div className='ditDah'>&nbsp;</div>
        )
    } else {
        return (
            <div className='ditDah'>{props.dd}</div>
        )
    }
}

export default DitDahDisplay