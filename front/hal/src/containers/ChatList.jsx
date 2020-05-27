
import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import { Avatar } from '@progress/kendo-react-layout';
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import API from '../util/API'

import PropTypes from 'prop-types';
import ChatWindow from './../components/ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import '../styles';


const MyItemRender = props => {
    let item = props.dataItem;
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
            </div>
        </div>
    );
}

class ChatList extends React.Component {
    constructor(){
        super();
        this.state = {
            receiverData:[],
            isOpen: false
        }
    }


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

        console.log(userData.data.data[0].receiver.name)

        this.setState({
          ...this.state, ...{
            receiverData : userData.data.data
          }
        });
    }

    render() {  
        const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
        const classList = [
        'sc-launcher',
        (isOpen ? 'opened' : ''),
        ];
        return (
            <div>

                <ListView
                    data={this.state.receiverData} //contacts : json데이터
                    item={MyItemRender}
                    style={{ width: "100%" }}
                />


            <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={'sc-open-icon'} src={launcherIconActive} />
          <img className={'sc-closed-icon'} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          onFilesSelected={this.props.onFilesSelected}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
        />

            </div>
        );
    }
}
const MessageCount = (props) => {
    if (props.count === 0 || props.isOpen === true) { return null; }
    return (
      <div className={'sc-new-messages-count'}>
        {props.count}
      </div>
    );
  };
  

ChatList.propTypes = {
    onMessageWasReceived: PropTypes.func,
    onMessageWasSent: PropTypes.func,
    newMessagesCount: PropTypes.number,
    isOpen: PropTypes.bool,
    handleClick: PropTypes.func,
    messageList: PropTypes.arrayOf(PropTypes.object),
    mute: PropTypes.bool,
    showEmoji: PropTypes.bool,
  };
  
  ChatList.defaultProps = {
    newMessagesCount: 0,
    showEmoji: true
  };
  


export default ChatList
