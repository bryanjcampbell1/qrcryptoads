import React from 'react';
import { Button, Card } from 'semantic-ui-react'




function GoToCelar() {
  function handleClick1(e) {
    e.preventDefault();
    console.log('The More Videos link was clicked.');
  }

  function handleClick2(e) {
    e.preventDefault();
    console.log('Play Games link was clicked.');
    //connect to celar here
  }

  return (
  	<div style={{backgroundColor: '#282c34', height:100, textAlign:'center' }}>
      <h2 style={{padding:40, color:'white', fontSize:34}}>Congrats!</h2>
      <h2 style={{padding:40,  fontSize:30}}>$0.10 in ETH has been added to your account</h2>
      <div style={{padding:40 }} >
     	 <Button style={{ width: '50%'}} color='violet' size='huge' onClick={handleClick1}>Watch More Videos !</Button>
      </div>
      <div style={{padding:40 }} >
     	 <Button style={{ width: '50%'}} color='violet' size='huge' onClick={handleClick2}>Use $$ To Play Games!</Button>
      </div>
    </div>
  );
}

export default GoToCelar;


