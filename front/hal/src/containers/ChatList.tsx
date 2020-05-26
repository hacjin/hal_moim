import React from 'react'
import Chat from '../components/Chat/Chat'

type CounterProps = {
  count: number
  onIncrease: () => void
  onDecrease: () => void
  onIncreaseBy: (diff: number) => void
}

function ChatList({ count, onIncrease, onDecrease, onIncreaseBy }: CounterProps) {
  return (
 
    <div id="chatview" className="p1">    	
        <div id="profile">

            <div id="close">
                <div className="cy"></div>
                <div className="cx"></div>
            </div>
            
            <p>Miro Badev</p>
            <span>miro@badev@gmail.com</span>
        </div>
        <div id="chat-messages">
        	<label>Thursday 02</label>
            
  
            <div className="message">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                <div className="bubble">
                	Really cool stuff!
                    <div className="corner"></div>
                    <span>3 min</span>
                </div>
            </div>
            
    	
        <div id="sendmessage">
        	<input type="text" value="Send message..." />
            <button id="send"></button>
        </div>
    
    </div>        
</div>

  )
}

export default ChatList
