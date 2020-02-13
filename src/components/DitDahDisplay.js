import React from "react"

export default (function DitDahDisplay(props) {

    return (props.dd === ' ') ? <div className='ditDah'>&nbsp;</div> : <div className='ditDah'>{props.dd}</div>
})