import React from 'react'

const Note = ({ note }) => {
    return (
        <div className="note">
            <div className="time">{note?.time}</div>
            <div className="content">{note?.content}</div>
        </div>
    )
}

export default Note