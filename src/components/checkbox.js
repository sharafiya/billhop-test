import React from 'react'
import './checkbox.scss'
const Checkbox = ({ name, checkboxId,disabled ,checked}) => {

    return (
        <div className='form-check'>
            <input className="form-check-input" type="checkbox" id={checkboxId} disabled={disabled} checked={checked} />
            <label className="form-check-label" htmlFor={checkboxId}>
                {name && name[0].toUpperCase() + name.slice(1)}
            </label>
        </div>
    )
}

export default Checkbox