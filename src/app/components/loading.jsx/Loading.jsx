import React from 'react'

const Loading = ({text}) => {
    return (
        <div className="tv-container bg-[#08100c] h-screen flex justify-center items-center">
            <div className="tv-screen">
                <div className="static"></div>
                <div className="error-text">Loading...</div>
            </div>
            <div className="tv-stand"></div>
        </div>
    )
}

export default Loading