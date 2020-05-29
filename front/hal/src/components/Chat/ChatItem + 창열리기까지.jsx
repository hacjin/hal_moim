import React, {useState} from 'react';
import { Avatar } from '@progress/kendo-react-layout';
import ChatWindow from './ChatWindow';


const ChatItem = props => {
    let item = props.dataItem;

    // const [state, setState] = useState({isOpen : false});
    const [isOpen, setisOpen] = useState(false);
    
    // const isOpen = false;
    // const isOpen = props.hasOwnProperty('isOpen') ? props.isOpen : setState({...state, isOpen : isOpen})
    const classList = [
    'sc-launcher',
    (isOpen ? 'opened' : ''),
    ];
    function componentWillReceiveProps(nextProps) {
        if (this.props.mute) { return; }
        const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
        const isIncoming = (nextMessage || {}).author === 'them';
        const isNew = nextProps.messageList.length > this.props.messageList.length;
        if (isIncoming && isNew) {
          this.playIncomingMessageSound();
        }
      }
    

    function handleClick() {
        console.log("click")
        console.log(item)
        setisOpen(true)
        // if (this.props.handleClick !== undefined) {
        //   this.props.handleClick();
        // } else {
        //   this.setState({
        //     isOpen: !this.state.isOpen,
        //   });
        // }
    }

    function openChatWindow(id){
        console.log("open",id)
    }
    
    return (

        <div className='row p-2 border-bottom align-middle' style={{ margin: 0}} onClick={handleClick}>
            <div className='col-2'>
                <Avatar shape='circle' type='img'>
                    <img src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.receiver.profileImg}-round-40x40.png`} />
                </Avatar>
            </div>
            <div className='col-6'>
                <h2 style={{fontSize: 14, color: '#454545', marginBottom: 0}} className="text-uppercase">{item.receiver.name}</h2>
                <div style={{fontSize: 12, color: "#a0a0a0"}}></div>
            </div>
            <div className='col-4'>
                <div className='k-chip k-chip-filled'>
                    <div className='k-chip-content'>
                        new
                    </div>

                </div>
            </div>
            
            <div>ckd</div>
            <ChatWindow
                // messageList={this.props.messageList}
                // onUserInputSubmit={this.props.onMessageWasSent}
                // onFilesSelected={this.props.onFilesSelected}
                // agentProfile={this.props.agentProfile}
                isOpen={isOpen}
                // onClose={this.handleClick.bind(this)}
                // showEmoji={this.props.showEmoji}
                />




        </div>

    );
}

export default ChatItem