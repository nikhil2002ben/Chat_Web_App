
import './App.css';
import io from "socket.io-client";
import { useEffect, useState,useRef} from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [room, setRoom] = useState("");
  const [message,setMessage]=useState("");
  
  function joinRoom(){
  if(room!=="")
  {
  socket.emit("join_room",room)
  document.querySelector(".join").style.animation="slide-out-left .7s cubic-bezier(.55,.085,.68,.53) both";
 document.querySelector(".msg").style.animation="slide-in-right 1s cubic-bezier(.25,.46,.45,.94) both";
 document.querySelector(".msg").style.display="flex";
 
 
  }
  

}
  const sendMessage=()=>{
    socket.emit("send_message", { message, room });
    var element = document.createElement("div");
        element.className="semessage";
        const ele=document.querySelector("#container")
         ele.appendChild(element);
        element.innerHTML=message;
        document.querySelector(".message-text").value="";

  }
  
  const isMounted=useRef(false);
  useEffect(()=>{
    if(isMounted.current){
      socket.on("receive_message",(data)=>{
  var element = document.createElement("div");
        element.className="remessage";
        const ele=document.querySelector("#container")
         ele.appendChild(element);
        element.innerHTML=data.message;
        console.log("hello");
        
        
        })
    }
    else {
      isMounted.current=true;
    }
    const container=document.getElementById("container");
        container.scrollIntoView({block:"end"})
  },[socket])
  
  
  return (
   <div className="App">
     <div className="join">
     <input
     className='room-input'
    placeholder="Room Number..."
    onChange={(event) => {
      setRoom(event.target.value);
    }}
    required
  />
  <button className='room-button' onClick={joinRoom}> Join Room</button>
     </div> 
     <div className="msg">
      <div id='container'>
        </div>
      <div className='small-container'>
<input
      className='message-text'
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button className="message-button" onClick={sendMessage}> <i class='bx bxs-send'></i>
      </button>
</div>
      </div>
    </div>
  );
}

export default App;
