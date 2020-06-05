import React, {useState} from 'react';
import { Avatar } from '@progress/kendo-react-layout';
import API from "../../apis/api"

const ChatItem = props => {

    let item = props.dataItem;
    const [isOpen, setIsOpen] = useState(false);


    async function _onFormSubmit(){
        let totalChatData = await API.get('chat/findChatListById', {
            params: {
              rid : item.rid
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
        props.openChatWindow(true,item.rid,item.receiver,roomMessageList);
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
                        <img src={`https://gist.github.com/${item.receiver.profileImg}`} />
                    </Avatar>
                </div>
                <div className='col-6'>
                    <h2 style={{fontSize: 14, color: '#454545', marginBottom: 0}} className="text-uppercase">{item.receiver.name}</h2>
                    <div style={{fontSize: 12, color: "#a0a0a0"}}>{}</div>
                </div>
                <div className='col-4'>
                    <div className='k-chip k-chip-filled'>
                        <div className='k-chip-content'>
                            {} new
                        </div>
                    </div>
                </div>
            </div>


    )
    

}
export default ChatItem