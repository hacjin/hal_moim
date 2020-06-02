
import React from 'react';
import { ListView } from '@progress/kendo-react-listview';
import API from '../apis/api'
import ChatItem from '../components/Chat/ChatItem'
// import PropTypes from 'prop-types';
import ChatWindow from '../components/Chat/ChatWindow';
import incomingMessageSound from '../components/Chat/assets/sounds/notification.mp3';
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
          messageList: [],
          receiver : '',
          roomId: ''
        }
        this.websocket = React.createRef();
    }
  
    // from Launcher를 사용하는 Chat.js 에서 가져옴
    _onMessageWasSent(message) {

      console.log(message)
      //back에 메시지 보내기 
      this.websocket.current.sendMessage ('/app/sendMessage/'+this.state.roomId,message.data.text);

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
    _openChatWindow = (flag,roomId,receiver)=>{
      // console.log("didi")
      // console.log(e, receiverName)
      this.setState({
        ...this.state, ...{
          isOpen : flag,
          receiver : receiver,
          roomId: roomId
        }
      });
    }


    MyCustomItem = props => <ChatItem {...props} openChatWindow={this._openChatWindow}/>

    
    render() {  
      // console.log(this.state.isOpen)
      console.log("props",this.state)
        return (
          <div>

          <SockJsClient 
          url={"http://localhost:8080/webSocket" }
          topics={['/topic/roomId/2']} 
          onMessage={msg => { 
            console.log ("reply",msg);
            this.setState({
              messageList: [...this.state.messageList, msg]
            })
          }} 
          ref={this.websocket} /> 


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
                      teamName: this.state.receiver.name,
                      imageUrl: this.state.receiver.profileImg //프로필 사진
                    }}
                    isOpen={this.state.isOpen}
                    onClose={this.handleClick.bind(this)}
                    showEmoji={true}
                  />
                  </div>
                </div>
        );
    }
}


export default ChatList
