import React from 'react'

function ChatBody() {
    const messages = [
        {
          sender: "Alice",
          content: "Hi Bob, how are you doing today?",
          timestamp: new Date().toISOString(), // Get the current timestamp
        },
        {
          sender: "Bob",
          content: "Hey Alice, I'm doing great! What's up?",
          timestamp: new Date(new Date().getTime() + 5000).toISOString(), // Simulate a delay
        },
        {
          sender: "Alice",
          content: "Not much, just working on a new React project. What about you?",
          timestamp: new Date(new Date().getTime() + 10000).toISOString(), // Simulate a delay
        },
      ];
  return (
    <div>
        {
            messages.map((message, i) => <div key={i}>
            <p>{message.sender}</p>
            
            </div>)
        }
    </div>
  )
}

export default ChatBody