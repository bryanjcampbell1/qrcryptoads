import React, { Component } from 'react';
import web3Obj from './helper'
import ReactPlayer from 'react-player'
import { Button, Dimmer, Image, Segment,Loader, } from 'semantic-ui-react'

/*
export default class DimmerExampleBlurring extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    return (
      <div>
        <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
          <Dimmer active={active} onClickOutside={this.handleHide} />

          <p>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </p>
          <p>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </p>
        </Dimmer.Dimmable>

        <Button.Group>
          <Button icon='plus' onClick={this.handleShow} />
          <Button icon='minus' onClick={this.handleHide} />
        </Button.Group>
      </div>
    )
  }
}

*/
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
          this.props.history.push('/celar/')
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
                
              />
            
            <div style={{backgroundColor: '#282c34', height:150, textAlign:'center' }}></div>
          </div>
        );
      }
      else{
        return (
          <div>
          <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
          
            <Topbar title="Thanks for Watching!"/>

            
                <ReactPlayer
                  url={ urls[x] } 
                  width='100%'
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

