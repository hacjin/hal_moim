import React from 'react'

type CounterProps = {
  count: number
  onIncrease: () => void
  onDecrease: () => void
  onIncreaseBy: (diff: number) => void
}

function ChatRoom({ count, onIncrease, onDecrease, onIncreaseBy }: CounterProps) {
  return (

            <div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
                <p>
                <strong>	Darnell	Strickland</strong>
	                <span>darnellstrickland@gmail.com</span>
                </p>
                <div className="status inactive"></div>
            </div>

  )
}

export default ChatRoom
