import React from 'react'

import './Messages.css'

const Loading = (props) => {
    return (
        <div className="background">
            <div className='loading center-item'>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <span>{props.children}</span>
            </div>
        </div>
    )
}

export default Loading;