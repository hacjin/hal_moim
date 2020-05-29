
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import API from '../util/API'

import ChatItem from '../components/Chat/ChatItem'

import PropTypes from 'prop-types';
import ChatWindow from './../components/ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import '../styles';


class ChatList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          receiverData:[],
          isOpen: false    
        }
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

    _openChatWindow = (e,uid)=>{
      console.log("didi")
      console.log(e, uid)
      this.setState({
        ...this.state, ...{
          isOpen : e,
        }
      });
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
                  // messageList={this.props.messageList}
                  // onUserInputSubmit={this.props.onMessageWasSent}
                  // onFilesSelected={this.props.onFilesSelected}
                  // agentProfile={this.props.agentProfile}
                  agentProfile={{
                    teamName: 'react-chat-window',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                  }}
                  isOpen={this.state.isOpen}
                  // onClose={this.handleClick.bind(this)}
                  // showEmoji={this.props.showEmoji}
                />

            </div>
        );
    }
}


export default ChatList
