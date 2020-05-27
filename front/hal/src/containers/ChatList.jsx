
import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import { Avatar } from '@progress/kendo-react-layout';
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import API from '../util/API'

import contacts from './contacts.json';


const MyItemRender = props => {
    let item = props.dataItem;
    console.log("item",item)
    return (
        <div className='row p-2 border-bottom align-middle' style={{ margin: 0}}>
            <div className='col-2'>
                <Avatar shape='circle' type='img'>
                    <img src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.image}-round-40x40.png`} />
                </Avatar>
            </div>
            <div className='col-6'>
                <h2 style={{fontSize: 14, color: '#454545', marginBottom: 0}} className="text-uppercase">{item.receiver}</h2>
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

        // Parse the results for ease of use.
  

        // Update state with new data and re-render our component.
        // const name = `${userData.name.first} ${userData.name.last}`;
        // const avatar = userData.picture.large;
        // const email = userData.email;

        this.setState({
          ...this.state, ...{
            receiverData : userData.data.data
          }
        });
    }

    render() {  
        return (
            <div>
                <ListView
                    data={this.state.receiverData} //contacts : json데이터
                    item={MyItemRender}
                    style={{ width: "100%" }}
                />
            </div>
        );
    }
}


export default ChatList