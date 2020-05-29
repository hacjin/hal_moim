import React, {useState} from 'react';
// import React, { Component } from 'react';
import { Avatar } from '@progress/kendo-react-layout';
import ChatWindow from './ChatWindow';
import Launcher from '../Launcher'

//Chat -> Chatitem
const ChatItem = props => {
// class ChatItem extends Component {
    let item = props.dataItem;
    
    // const [launcherIcon, setLauncherIcon]  = useState('');
    // const [isOpen, setIsOpen]  = useState('false');

    const [messageList,setMessageList] = useState();

    const _onMessageWasSent = message => {
        console.log('onmessagewaswent')
        setMessageList(message);
        // this.setState({
        //   messageList: [...this.state.messageList, message]
        // })
    };
    
    const _sendMessage = text => {
        console.log("SENDmessage")
        // if (text.length > 0) {
        //   this.setState({
        //     messageList: [...this.state.messageList, {
        //       author: 'them',
        //       type: 'text',
        //       data: { text }
        //     }]
        //   })
        // }
    };
    


    return (
        <div className='row p-2 border-bottom align-middle' style={{ margin: 0}}>
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
                <div>런처
                <Launcher
                    agentProfile={{
                    teamName: 'react-chat-window',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    // onMessageWasSent={this._onMessageWasSent.bind(this)}
                    onMessageWasSent={messageList}
                    messageList={messageList}
                    showEmoji
                />
                </div>
            </div>

        </div>

        
    );
}

export default ChatItem