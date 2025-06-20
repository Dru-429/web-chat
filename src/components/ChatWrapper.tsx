"use client"

import { useChat } from 'ai/react'
import React from 'react'

const ChatWrapper = ({ sessionId } : { sessionId : string} ) => {

  const {messages, handleInputChange, input, handleSubmit} = useChat({
    api: "/api/chat-stream",
    body: { sessionId }
  })

  return (
    <div className= "min-h-full relative bg-zinc-900 text-zinc-100 flex flex-col justify-between gap-2 divide-y divide-zinc-800">
        <div className='flex-1 text-black bg-zinc-800 flex justify-between flex-col'>
            {JSON.stringify(messages)}
        </div>

        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={input}
                onChange={handleInputChange}
                className="w-full p-2 bg-zinc-700 text-white border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder='Type your message here...'
            />
            <button 
                type="submit" 
                className="mt-2 w-full bg-zinc-600 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >Send </button>
        </form>

        
    </div>
  )
}

export default ChatWrapper