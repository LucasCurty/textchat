import {useState} from 'react';
import {io} from 'socket.io-client';

import Chat from './Chat';

import './style.css'

const socket = io.connect(process.env.REACT_APP_API_URL_BACK);


function App() {
  const [username, setUsername]= useState("");
  const [room, setRoom]= useState("");
  const [show, setShow] = useState(false)

  const joinRoom = ()=>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      setShow(true)
    }
  }


    return (
      <>
      { !show ? 
          <div className='userArea'>
            <h1>Join chat</h1>
            <input 
              placeholder="User Name..." 
              onChange={(e)=>{
                setUsername(e.target.value)
            }}/>

            <input type="text" placeholder="Room ID..."
            onChange={(e)=>{
            setRoom(e.target.value)
            }}/>
            <button onClick={joinRoom}>Enter the room</button>
          </div>
       :
      
        <Chat socket={socket} username={username} room={room}/>
      
      } 
      </>
      
    )
  }

export default App;
