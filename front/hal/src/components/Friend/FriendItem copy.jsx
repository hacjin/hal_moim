import React, {useState} from 'react';
import { Avatar } from '@progress/kendo-react-layout';
import API from "../../apis/api"

const FriendItem1 = props => {

    let item = props.dataItem;
    const [isOpen, setIsOpen] = useState(false);


    async function _onFormSubmit(){

        console.log("onform", item)
        //이친구와 방이 있나 확인(있으면 방 번호 리턴, 없으면 방 만들고 방번호 리턴)
        const roomId = await API.get('chat/addRoom',{
            params:{
                senderId: 1, //세션
                receiverId: item.uid
            }
        })

        //채팅방 메시지 불러오기
        let totalChatData = await API.get('chat/findChatListById', {
            params: {
              rid : roomId.data.data
            }
        })
        var roomMessageList = []
        
        totalChatData.data.data.forEach(function(item, index, array){
            var replytext 
            if(item.type ==='text'){
              replytext = {'text':item.message}
            }else{
              replytext = {'emoji':item.message}
            }
            roomMessageList.push({
                author: item.sender.uid==1?'me':'them',
                type: item.type,
                data: replytext
                })
        })

        
        setIsOpen(true);
        props.openChatWindow(true,roomId.data.data,item,roomMessageList);
    }


    const classList = [
    'chat-launcher',
    'row',
    'p-2',
    'border-bottom',
    'align-middle',
    (isOpen ? 'opened' : ''),
   ];


    return (
        
            <div className={classList.join(' ')} style={{ margin: 0}} onClick={_onFormSubmit}>

                <div className='col-2'>
                    <Avatar shape='circle' type='img'>
                        <img src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.profileImg}-round-40x40.png`} />
                    </Avatar>
                </div>
                <div className='col-4'>
                    <h2 style={{fontSize: 14, color: '#454545', marginBottom: 0}} className="text-uppercase">{item.name}</h2>
                    <div style={{fontSize: 12, color: "#a0a0a0"}}>ㅇㅣ러감</div>
                </div>
                <div className='col-6'>
                            {} 여기에 소개글
                </div>
            </div>


    )
    

}
export default FriendItem1