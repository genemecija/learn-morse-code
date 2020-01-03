import React from "react"

function DitDahDisplay(props) {
    console.log('DitDahDisplay rendered');
    return (
        <div className='ditDah'>
            {props.dd}
        </div>
    )
}

export default DitDahDisplay