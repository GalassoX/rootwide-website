import React from 'react'

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Messages.css'

const Error = (props) => {
    return (
        <div className='box-error'>
            <div className="icon-error">
                <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <p className='text-error'>{props.children}</p>
        </div>
    )
}

export default Error;