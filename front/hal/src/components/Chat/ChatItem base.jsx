
const MyItemRender = props => {
    let item = props.dataItem;
    const [state, setState] = useState({isOpen : false});
    
    const isOpen = false;
    // const isOpen = props.hasOwnProperty('isOpen') ? props.isOpen : setState({...state, isOpen : isOpen})
    const classList = [
    'sc-launcher',
    (isOpen ? 'opened' : ''),
    ];
    function componentWillReceiveProps(nextProps) {
        if (this.props.mute) { return; }
        const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
        const isIncoming = (nextMessage || {}).author === 'them';
        const isNew = nextProps.messageList.length > this.props.messageList.length;
        if (isIncoming && isNew) {
          this.playIncomingMessageSound();
        }
      }
    
    function playIncomingMessageSound() {
        var audio = new Audio(incomingMessageSound);
        audio.play();
    }

    function handleClick() {
        if (this.props.handleClick !== undefined) {
          this.props.handleClick();
        } else {
          this.setState({
            isOpen: !this.state.isOpen,
          });
        }
    }

    console.log("agentProfile",props.agentProfile)
    
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
            <div className={classList.join(' ')} onClick={handleClick.bind(this)}>
            <MessageCount count={props.newMessagesCount} isOpen={isOpen} />
            <img className={'sc-open-icon'} src={launcherIconActive} />
            <img className={'sc-closed-icon'} src={launcherIcon} />
            </div>
            <ChatWindow
            messageList={props.messageList}
            onUserInputSubmit={props.onMessageWasSent}
            onFilesSelected={props.onFilesSelected}
            agentProfile={props.agentProfile}
            isOpen={isOpen}
            onClose={handleClick.bind(this)}
            showEmoji={props.showEmoji}
            />
        </div>

        
    );
}
