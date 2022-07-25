import './App.css';
import { useState } from 'react';
import AvatarModel from './components/avatarModel';

export default function App() {

  const [audioPlay, setAudioPlay] = useState(false);
  const setEndState = () => {
    setAudioPlay(false);
  }

  return (
    <div className='main'>
      <div className='canvas-field'>
        <AvatarModel audioPlay={audioPlay} setEndState={setEndState} />
      </div>
      <div className='button-field'>
        <div className='button' onClick={() => { setAudioPlay(!audioPlay); }} >
          START
        </div>
      </div>
    </div>
  );
}