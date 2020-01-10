import React from "react"

function DitDahDisplay(props) {
    return (
        <div className={`ditDah ${props.className}`}>
            {props.dd}
        </div>
    )
}

export default DitDahDisplay