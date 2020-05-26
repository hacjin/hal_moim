import React from 'react'

type CounterProps = {
  count: number
  onIncrease: () => void
  onDecrease: () => void
  onIncreaseBy: (diff: number) => void
}

function Chat() {
  return (

    <div>
            <div className="message">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                <div className="bubble">
                	Really cool stuff!
                    <div className="corner"></div>
                    <span>3 min</span>
                </div>
            </div>
            
            <div className="message right">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                <div className="bubble">
                	Can you share a link for the tutorial?
                    <div className="corner"></div>
                    <span>1 min</span>
                </div>
            </div>
            

    
    </div>        


  )
}

export default Chat
