import React from 'react';
import web3Obj from './helper'
import ReactPlayer from 'react-player'
import { Button, Dimmer, Image, Segment,Loader, } from 'semantic-ui-react'

import './Page1.css';


//could query for this list
const urls = ['http://ipfs.io/ipfs/QmWdXR8xZvA2r21xP6sAkfUAfGSQDqPqquomxs7JJPswBM',
              'https://www.youtube.com/watch?v=TAZYqXwW5lA',
              'https://vimeo.com/265363100'];

const x = Math.floor(Math.random() * urls.length);

function Topbar(props) {
  return (
    <div style={{backgroundColor: '#282c34', height:100, textAlign:'center' }}>
      <h2 style={{padding:40, color:'white', fontSize:34}}>{props.title}</h2>
    </div>
  );
}


class Page1 extends React.Component {
  state = {
    account: '',
    balance: '',
    videoPlayed: false,
    active: false
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

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
        if(this.state.videoPlayed){
          this.props.history.push('/page2/')
        }
      })
    })
  }

  enableTorus = async () => {
    this.handleShow()
    try {
      await web3Obj.initialize()
      this.setStateInfo()
    } catch (error) {
      console.error(error)
    }
  }

  render() {

    const { active } = this.state

      if(!this.state.videoPlayed){
        return (
          <div >
            <Topbar title="Play Video to Earn $"/>
            
              <ReactPlayer
                url={ urls[x] } 
                playing
                width='100%'
                onEnded={() => {
                    console.log('onEnded')
                    this.setState({
                      videoPlayed: true
                    });
                  }}
              className="Player"  
              />
            
            <div style={{backgroundColor: '#282c34', height:150, textAlign:'center' }}></div>
          </div>
        );
      }
      else{
        return (
          <div>
          <Dimmer.Dimmable as={Segment} blurring dimmed={active} style={{padding:0 }}>
          
            <Topbar title="Thanks for Watching!"/>

            
                <ReactPlayer
                  url={ urls[x] } 
                  width='100%'
                  style={{pointeEvents: 'none'}}
                />
              
              
            <div style={{padding:40, backgroundColor: '#282c34', height:150, textAlign:'center' }}>
              <Button  color='violet' size='huge' onClick={this.enableTorus}>Get Payout with Tourus!</Button>
            </div>
            </Dimmer.Dimmable>
            
            
              <Dimmer active={this.state.active}>
                <Loader inverted>Loading</Loader>
              </Dimmer>

          </div>
        );
      }
  }
}

export default Page1

