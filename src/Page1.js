import React from 'react'
import web3Obj from './helper'
import ReactPlayer from 'react-player'

function Topbar(props) {
  return (
    <div style={{backgroundColor: '#282c34', height:100, textAlign:'center' }}>
      <h2 style={{padding:40, color:'white', fontSize:34}}>{props.title}</h2>
    </div>
  );
}

class Bottombar extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      if(!this.props.played){
        return (
          <div style={{backgroundColor: '#282c34', height:150, textAlign:'center' }}>
            
          </div>
        );
      }
      else{
        
        return (
          <div style={{backgroundColor: '#282c34', height:150, textAlign:'center', color:'white', fontSize:34 }}>
            Click for Payout
          </div>
        );
      }

    }
}

class Page1 extends React.Component {
  state = {
    account: '',
    balance: '',
    videoPlayed: false,
  }

  componentDidMount() {
    const isTorus = sessionStorage.getItem('pageUsingTorus')

    if (isTorus) {
      web3Obj.initialize().then(() => {
        this.setStateInfo()
      })
    }
  }

  setStateInfo = () => {
    web3Obj.web3.eth.getAccounts().then(accounts => {
      this.setState({ account: accounts[0] })
      web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
        this.setState({ balance: balance })
      })
    })
  }

  enableTorus = async () => {
    try {
      await web3Obj.initialize()
      this.setStateInfo()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
      if(!this.state.videoPlayed){
        return (
          <div>
            <Topbar title="Play to Earn $"/>
            
              <ReactPlayer
                url='https://www.youtube.com/watch?v=TAZYqXwW5lA' 
                playing
                width='100%'
                onEnded={() => {
                    console.log('onEnded')
                    this.setState({
                      videoPlayed: true
                    });
                  }}
                
              />
            
            <Bottombar played={false}/>
          </div>
        );
      }
      else{
        return (
          <div>
            <Topbar title="Thanks for Watching!"/>
            
              <ReactPlayer
                url='https://www.youtube.com/watch?v=TAZYqXwW5lA' 
                playing
                width='100%'
                onEnded={() => {
                    console.log('onEnded')
                    this.setState({
                      videoPlayed: true
                    });
                  }}
              />
              
            <Bottombar played={true}/>
          </div>
        );
      }
  }
}

export default Page1
