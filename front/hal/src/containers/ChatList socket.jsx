
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import API from '../util/API'

import ChatItem from '../components/Chat/ChatItem'

import PropTypes from 'prop-types';
import ChatWindow from '../components/Chat/ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import '../styles';



let sockJS = new SockJS("http://localhost:8080/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};


class ChatList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          receiverData:[],
          isOpen: false,
          messageList: [],    
        }
    }

    componentDidUpdate(){
      stompClient.connect({},()=>{
        stompClient.subscribe('/topic/roomId',{data:'dd'});
      });
    }



    async componentDidMount() {
        // Load async data.
        let userData = await API.get('chat/findRoomListById', {
          params: {
            uid: 1
          }
        });

        console.log(userData.data.data[0].receiver.name)

        this.setState({
          ...this.state, ...{
            receiverData : userData.data.data,
          }
        });
    }

    _openChatWindow = (e,receiverName)=>{
      console.log("didi")
      console.log(e, receiverName)
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
      console.log(this.state.isOpen)

        return (
            <div>

                <ListView
                    data={this.state.receiverData} //contacts : json데이터
                    item={this.MyCustomItem}
                    // item={ChatItem}
                    style={{ width: "100%" }}
                />
                
                <ChatWindow
                  //messageList={this.props.messageList}
                  messageList={this.state.messageList}
                  // onUserInputSubmit={this.props.onMessageWasSent}
                  onUserInputSubmit={this._onMessageWasSent.bind(this)}
                  // onFilesSelected={this.props.onFilesSelected}
                  // agentProfile={this.props.agentProfile}
                  agentProfile={{
                    teamName: this.state.receiverName,
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                  }}
                  isOpen={this.state.isOpen}
                  onClose={this.handleClick.bind(this)}
                  // showEmoji={this.props.showEmoji}
                  showEmoji 
                />

            </div>
        );
    }
}


export default ChatList
