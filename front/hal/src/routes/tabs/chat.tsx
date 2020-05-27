import React from 'react'
// import ChatRoomList from '../containers/ChatRoomList'
// import '../Chat.css'
import ChatList from '../../containers/ChatList'
import Chat from '../../components/Chat'

const chat = () => {
  return <div>이 페이지는 채팅 페이지 입니다.

    {/* <ChatRoomList></ChatRoomList> */}
    <ChatList/>
    <Chat/>
  </div>
}

export default chat
