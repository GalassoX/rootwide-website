import React from 'react'

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Messages.css'

const Success = (props) => {
    return (
        <div className='box-success'>
            <div className="icon-success">
                <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <p className='text-sucess'>{props.children}</p>
        </div>
    )
}

export default Success;