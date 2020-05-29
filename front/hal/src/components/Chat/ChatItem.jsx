import React, {useState} from 'react';
import { Avatar } from '@progress/kendo-react-layout';

const ChatItem = props => {

    let item = props.dataItem;
    const [isOpen, setIsOpen] = useState(false);

    // console.log("chatitem props",props)

    function _onFormSubmit(){
        // console.log("확인")
        setIsOpen(true);
        props.openChatWindow(true,item.receiver.name);
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
                        <img src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.receiver.profileImg}-round-40x40.png`} />
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