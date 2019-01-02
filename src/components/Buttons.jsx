import React from 'react'
import './Buttons.css'


export default props => {
    let classess = 'button '
    classess += props.operation ? 'operation' : ''
    classess += props.double ? 'double ' : ''
    classess += props.triple ? 'triple ' : ''
    return (
        <button
            className={classess}
            onClick = { e => props.click && props.click(props.label)}
            >
            {props.label}
        </button>

    )
}


