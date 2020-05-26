import React from 'react'

type CounterProps = {
  count: number
  onIncrease: () => void
  onDecrease: () => void
  onIncreaseBy: (diff: number) => void
}

function ChatRoomList() {
  return (
    <div>

<div id="chatbox">
	<div id="friendslist">
    	<div id="topmenu">
        	<span className="friends"></span>
            <span className="chats"></span>
            <span className="history"></span>
        </div>
        
        <div id="friends">
        	<div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                <p>
                	<strong>Miro Badev</strong>
	                <span>mirobadev@gmail.com</span>
                </p>
                <div className="status available"></div>
            </div>
            
            <div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                <p>
                	<strong>Martin Joseph</strong>
	                <span>marjoseph@gmail.com</span>
                </p>
                <div className="status away"></div>
            </div>
            
            <div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3_copy.jpg" />
                <p>
                	<strong>Tomas Kennedy</strong>
	                <span>tomaskennedy@gmail.com</span>
                </p>
                <div className="status inactive"></div>
            </div>
            
            <div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/4_copy.jpg" />
                <p>
                	<strong>Enrique	Sutton</strong>
	                <span>enriquesutton@gmail.com</span>
                </p>
                <div className="status inactive"></div>
            </div>
            
            <div className="friend">
            	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
                <p>
                <strong>	Darnell	Strickland</strong>
	                <span>darnellstrickland@gmail.com</span>
                </p>
                <div className="status inactive"></div>
            </div>
            
            <div id="search">
	            <input type="text" id="searchfield" value="Search contacts..." />
            </div>
            
        </div>                
        
    </div>	

</div>	
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</div>
  )
}

export default ChatRoomList
