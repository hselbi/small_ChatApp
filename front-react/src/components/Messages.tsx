import React from 'react'

function Messages({messages}:{messages: string[] }) {
  return (
    <div>
        {messages.map((message, i) => (
            <div key={i}>{message}</div>
        ))}
    </div>
  )
}

export default Messages