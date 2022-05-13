import { useEffect, useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom'


import './styled.css'

export default function Chat ({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])


    const sendMessage = async ()=>{
       
            if(currentMessage !== ""){
                const messageData = {
                    room: room,
                    author: username,
                    message: currentMessage,
                    time: 
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                };
                
                await socket.emit("send_message", messageData);
                setMessageList((list)=>[...list, messageData]);
                setCurrentMessage("");
            }
        };


    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setMessageList((list)=>[...list, data])
        })
    },[socket])


    return(
        <main>
            <h2>Room: <span>{room}</span></h2>
                <section id="conteiner">
                    {messageList.map((messageContent)=>{
                        return(
                            <ScrollToBottom className="sectionMsg">
                                <div className="Msg"
                                style={{float:(username === messageContent.author) ? "right" : "leaft"}}>
                                    <p style={{
                                    backgroundColor:(username === messageContent.author)? "green" : "blue"}}>
                                        {messageContent.message}
                                    </p>                                    
                                    <div className="info">
                                        <span>{messageContent.time}</span>
                                        <span>{messageContent.author}</span>
                                    </div>
                                </div>
                            </ScrollToBottom>
                        ) ;
                    })}
                </section>
            <div className="inputArea">
                <input 
                type="text"
                value={currentMessage}
                placeholder="Hey..." 
                onChange={(e)=>{
                    setCurrentMessage(e.target.value)
                  }}
                onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}}
                  />
                <button 
                onClick={sendMessage}
                >
                &#9658;</button>
            </div>
        </main>
    )
}