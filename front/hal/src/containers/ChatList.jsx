
import React from 'react';
import { ListView } from '@progress/kendo-react-listview';
import API from '../util/API'
import ChatItem from '../components/Chat/ChatItem'
// import PropTypes from 'prop-types';
import ChatWindow from '../components/Chat/ChatWindow';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import '../styles';
import '../styles/all.css'
import '../styles/bootstrap.min.css'

import SockJsClient from 'react-stomp';



class ChatList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          receiverData:[],
          isOpen: false,
          messageList: []
        }
        this.websocket = React.createRef();
    }
  
    // from Launcher를 사용하는 Chat.js 에서 가져옴
    _onMessageWasSent(message) {
      this.setState({
        messageList: [...this.state.messageList, message]
      })
    }
  
    _sendMessage(text) {
      if (text.length > 0) {
        this.setState({
          messageList: [...this.state.messageList, {
            author: 'them',
            type: 'text',
            data: { text }
          }]
        })
      }
    }

    // Launcher.js 함수
    componentWillReceiveProps(nextProps) {
      if (this.props.mute) { return; }
      const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
      const isIncoming = (nextMessage || {}).author === 'them';
      const isNew = nextProps.messageList.length > this.props.messageList.length;
      if (isIncoming && isNew) {
        this.playIncomingMessageSound();
      }
    }
  
    playIncomingMessageSound() {
      var audio = new Audio(incomingMessageSound);
      audio.play();
    }
  
    handleClick() {
      if (this.props.handleClick !== undefined) {
        this.props.handleClick();
      } else {
        this.setState({
          isOpen: !this.state.isOpen,
        });
      }
    }

    handleMsg = msg => { console.log (msg); }; 
    handleClickSendTo = () => { console.log("handleto",this.websocket)
     this.websocket.current.sendMessage ('/app/sendMessage'); }
    handleClickSendTemplate = () => { 
      console.log("handleClickSendTemplate")
      this.websocket.current.sendMessage ('/sendMessage'); };

    async componentDidMount() {
        // Load async data.
        let userData = await API.get('chat/findRoomListById', {
          params: {
            uid: 1
          }
        });

        // console.log(userData.data.data[0].receiver.name)

        this.setState({
          ...this.state, ...{
            receiverData : userData.data.data,
          }
        });
    }
    _openChatWindow = (e,receiverName)=>{
      // console.log("didi")
      // console.log(e, receiverName)
      this.setState({
        ...this.state, ...{
          isOpen : e,
          receiverName : receiverName
        }
      });
    }

    handleClick() {
      if (this.props.handleClick !== undefined) {
        this.props.handleClick();
      } else {
        this.setState({
          isOpen: !this.state.isOpen,
        });
      }
    }

    _onMessageWasSent(message) {
      console.log("onmessageWasSent",message);
      //back에 메시지 보내기 
      // API.get('chat/findRoomListById', {
      //   params: {
      //     message: message.text
      //   }
      // });

      this.setState({
        messageList: [...this.state.messageList, message]
      })
    }


    MyCustomItem = props => <ChatItem {...props} openChatWindow={this._openChatWindow}/>

    render() {  
      // console.log(this.state.isOpen)
        return (
            <div>

          <SockJsClient 
          url={"http://localhost:8080/webSocket" }
          topics={['/topic/roomId']} 
          onMessage={msg => { console.log (msg); }} 
          ref={this.websocket} /> 
          <button onClick={this.handleClickSendTo.bind(this)}>SendTo</button> 
          <button onClick={this.handleClickSendTemplate.bind(this)}>SendTemplate</button>


                <ListView
                    data={this.state.receiverData} //contacts : json데이터
                    item={this.MyCustomItem}
                    // item={ChatItem}
                    style={{ width: "100%" }}
                />
                
                <div id='chat-launcher'>
                  <ChatWindow
                    messageList={this.state.messageList}
                    onUserInputSubmit={this._onMessageWasSent.bind(this)}
                    onFilesSelected={this.props.onFilesSelected}
                    agentProfile={{
                      teamName: this.state.receiverName,
                      imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    isOpen={this.state.isOpen}
                    onClose={this.handleClick.bind(this)}
                    // onClose={this._openChatWindow.bind(this)}
                    showEmoji={this.props.showEmoji}
                  />
                  </div>
                </div>
        );
    }
}


export default ChatList
