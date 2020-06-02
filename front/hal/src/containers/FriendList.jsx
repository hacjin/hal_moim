import React from 'react';
import { ListView } from '@progress/kendo-react-listview';
import API from '../apis/api'
import FriendItem from '../components/Friend/FriendItem'
import ChatWindow from '../components/Chat/ChatWindow';
import incomingMessageSound from '../components/Chat/assets/sounds/notification.mp3';
import '../styles';
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import SockJsClient from 'react-stomp';


class FriendList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          friendsData:[],
          isOpen: false,
          // messageList: [],
          totalmessageList:{},
          receiver : '',
          roomId: ''
        }
        this.websocket = React.createRef();
    }
  
    // from Launcher를 사용하는 Chat.js 에서 가져옴
    _onMessageWasSent(message) {
      console.log("메시지전송")
      const chat = {message: "",
                    type:"",
                    time: new Date(),
                    roomId: this.state.roomId,
                    senderId: "1"};
      
      if(message.type === 'text'){
        chat.message = message.data.text
        chat.type = 'text'
      }else if(message.type === 'emoji'){
        chat.type = 'emoji'
        chat.message = message.data.emoji
      }
      this.websocket.current.sendMessage ('/app/sendMessage/'+this.state.roomId,JSON.stringify(chat));
    }
  

    // // Launcher.js 함수
    // componentWillReceiveProps(nextProps) {
    //   if (this.props.mute) { return; }
    //   const nextMessage = nextProps.totalmessageList[nextProps.totalmessageList.length - 1];
    //   const isIncoming = (nextMessage || {}).author === 'them';
    //   const isNew = nextProps.totalmessageList.length > this.props.totalmessageList.length;
    //   if (isIncoming && isNew) {
    //     this.playIncomingMessageSound();
    //   }
    // }
  
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
          roomId: ''
        });
      }
    }


    async componentDidMount() {
      console.log("디드마운트")
        // Load async data.
        let userData = await API.get('user/friendsByDistance', {
          params: {
            uid: 5,
            dis_filter : 10
          }
        });

        this.setState({
          ...this.state, ...{
            friendsData : userData.data.data,
          }
        });

    }

    _openChatWindow = (flag,roomId,receiver, totalChatData)=>{
      console.log("_openChatWindow")
      this.setState({
        ...this.state, ...{
          isOpen : flag,
          receiver : receiver,
          roomId: roomId,
          totalmessageList: {
            ...this.state.totalmessageList,
            [roomId] : totalChatData
          }
        }
      });

    }


    MyCustomItem = props => <FriendItem {...props} openChatWindow={this._openChatWindow}/>
    
    render() {  
      console.log("랜더")
      var topics = []
      // this.state.friendsData.forEach(function(item,index,array) {
      //   topics.push('/topic/roomId/'+item.rid)
      // })

      console.log("룸아이디");

      if(this.state.roomId.length > 0) {
        topics.push('/topic/roomId/'+this.state.roomId)
      }

        return (
          <div>

          <SockJsClient 
          url={"http://localhost:8080/webSocket" }
          topics={topics} 
          onMessage={msg => { 
            var replytext 
            if(msg.type ==='text'){
              replytext = {'text':msg.message}
            }else{
              replytext = {'emoji':msg.message}
            }

            var tmpMessageList = this.state.totalmessageList[this.state.roomId] ===undefined ? [] : this.state.totalmessageList[this.state.roomId]
            tmpMessageList.push({
              author: msg.senderId==1?'me':'them',
              type: msg.type,
              data: replytext
              })
            this.setState({
              ...this.setState,
              totalmessageList: {
                ...this.state.totalmessageList,
                [this.state.roomId] : tmpMessageList
                  
              }
            })
          }}
          ref={this.websocket} /> 


                <ListView
                    data={this.state.friendsData} //contacts : json데이터
                    item={this.MyCustomItem}
                    // item={ChatItem}
                    style={{ width: "100%" }}
                />
                
                <div id='chat-launcher'>
                  <ChatWindow
                    messageList={this.state.totalmessageList[this.state.roomId]}
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

export default FriendList
