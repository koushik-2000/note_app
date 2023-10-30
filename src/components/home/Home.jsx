import React from 'react'
import loadImg from '../../assets/welcomeImg.png'
import enc from '../../assets/Vector.png'
import './Home.css'
import Add from '../adder/Adder'

function Main() {
  function addGrp(){
    console.log("hai");
  }
  return (
    <div className='main'>
      <div className='left'>
        <h3 className='logo'>pocket notes</h3>
        <button className='addNoteBtn' onClick={addGrp}><span className='add'>+</span>Create Notes group</button>
      </div>
      <div className='right'>
        <div className="intro">
          <img className="welcomeImg" src={loadImg} alt='welcomeimg'/>
          <h3 className='welLogo'>pocket notes</h3>
          <p className='welTxt'>Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className='encrypt'>
          <img src={enc} alt='lockImg' className='encImg'/>
          <p className='encMsg'>end-to-end encrypted</p>
        </div>
      </div>
      <Add />
    </div>
  );
}

export default Main;
