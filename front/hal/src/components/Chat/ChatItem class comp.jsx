import React, {useState} from 'react';
import { Route , Link } from 'react-router-dom';

import { Avatar } from '@progress/kendo-react-layout';
// import ChatWindow from './hhChatWindow';

import ChatWindow from './ChatWindow';
import { render } from '@testing-library/react';

// import '../styles';


class ChatItem extends React.Component {
// const ChatItem = props => {

    constructor(props){
        super(props);
        this.state = {
          receiverData:[],
          isOpen: false,
          text: ''
            
        }
    }
    // let item = props.dataItem;

    // console.log("chatitem props",props)

    // const [isOpen, setIsOpen] = useState(false);

    _openChatWindow(){
        // console.log(item.receiver.name)
        // setIsOpen(true);
        this.setState({isOpen:true})
        console.log(this.state.isOpen)
    }

    _onFormSubmit = e => {
        console.log("확인")
        this.props.openChatWindow(this.state.isOpen);
    }

    render(){
        console.log("pppppppp",this.props)
        let item = this.props.dataItem
    return (
        <div className='row p-2 border-bottom align-middle' style={{ margin: 0}} onClick={this._openChatWindow}>
            <form openChatWindow={this._onFormSubmit}>클릭클릭
       			<button>버튼</button>
            </form>

            <div className='col-2'>
                <Avatar shape='circle' type='img'>
                    <img src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.image}-round-40x40.png`} />
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


            {/* <Route path="/ChatWindow" componenet={ChatWindow}/> */}
        </div>


    )
    }

}
export default ChatItem