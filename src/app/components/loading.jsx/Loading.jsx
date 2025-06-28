import React from 'react'

const Loading = ({text}) => {
    return (
        <div className="tv-container">
            <div className="tv-screen">
                <div className="static"></div>
                <div className="error-text">{text}</div>
            </div>
            <div className="tv-stand"></div>
        </div>
    )
}

export default Loading