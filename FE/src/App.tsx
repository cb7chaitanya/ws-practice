import { useEffect, useState } from "react"

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<string | null>('')
  const [input, setInput] = useState<string>('')
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080')
    newSocket.onopen = () => {
      console.log('connected')
      setSocket(newSocket)
      newSocket.send('Hello Server')
    }
    newSocket.onmessage = (message) => {
      console.log('Message Recieved: ' + message.data)
      setMessage(message.data)
    }
    return () => newSocket.close()
  },[])

  if(!socket) return <div>Connecting to Socket Server...</div>

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)}/>
      <button onClick={() => socket.send("hello")}>Send</button>
      <p>{message}</p>
    </div>
  )
}

export default App