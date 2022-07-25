import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Html, OrbitControls } from '@react-three/drei';
import Character from '../character';
import './style.css';

const viesemData = [
  { "time": 137, "type": "viseme", "value": "k" },
  { "time": 312, "type": "viseme", "value": "a" },
  { "time": 700, "type": "ssml", "start": 11, "end": 31, "value": "happy" },
  { "time": 700, "type": "viseme", "value": "sil" },
  { "time": 1217, "type": "viseme", "value": "p" },
  { "time": 1280, "type": "viseme", "value": "a" },
  { "time": 1342, "type": "viseme", "value": "t" },
  { "time": 1405, "type": "viseme", "value": "e" },
  { "time": 1505, "type": "viseme", "value": "p" },
  { "time": 1592, "type": "viseme", "value": "i" },
  { "time": 1655, "type": "viseme", "value": "s" },
  { "time": 1717, "type": "viseme", "value": "S" },
  { "time": 1842, "type": "viseme", "value": "o" },
  { "time": 2030, "type": "viseme", "value": "i" },
  { "time": 2180, "type": "viseme", "value": "sil" },
  { "time": 2760, "type": "viseme", "value": "a" },
  { "time": 2822, "type": "viseme", "value": "u" },
  { "time": 2885, "type": "viseme", "value": "i" },
  { "time": 2910, "type": "viseme", "value": "t" },
  { "time": 3022, "type": "viseme", "value": "r" },
  { "time": 3135, "type": "viseme", "value": "i" },
  { "time": 3210, "type": "viseme", "value": "t" },
  { "time": 3322, "type": "viseme", "value": "E" },
  { "time": 3410, "type": "viseme", "value": "t" },
  { "time": 3510, "type": "viseme", "value": "i" },
  { "time": 3572, "type": "viseme", "value": "t" },
  { "time": 3635, "type": "viseme", "value": "E" },
  { "time": 3760, "type": "viseme", "value": "k" },
  { "time": 3772, "type": "viseme", "value": "s" },
  { "time": 3822, "type": "viseme", "value": "t" },
  { "time": 3885, "type": "viseme", "value": "i" },
  { "time": 3947, "type": "viseme", "value": "u" },
  { "time": 4010, "type": "viseme", "value": "t" },
  { "time": 4135, "type": "viseme", "value": "a" },
  { "time": 4197, "type": "viseme", "value": "p" },
  { "time": 4297, "type": "viseme", "value": "k" },
  { "time": 4335, "type": "viseme", "value": "i" },
  { "time": 4447, "type": "viseme", "value": "r" },
  { "time": 4597, "type": "viseme", "value": "sil" },
  { "time": 5127, "type": "viseme", "value": "a" },
  { "time": 5227, "type": "viseme", "value": "t" },
  { "time": 5327, "type": "viseme", "value": "a" },
  { "time": 5440, "type": "viseme", "value": "t" },
  { "time": 5552, "type": "viseme", "value": "t" },
  { "time": 5615, "type": "viseme", "value": "a" },
  { "time": 5677, "type": "viseme", "value": "k" },
  { "time": 5740, "type": "ssml", "start": 96, "end": 114, "value": "sad" },
  { "time": 5740, "type": "viseme", "value": "s" },
  { "time": 5827, "type": "viseme", "value": "u" },
  { "time": 5927, "type": "viseme", "value": "i" },
  { "time": 5990, "type": "viseme", "value": "p" },
  { "time": 6027, "type": "viseme", "value": "i" },
  { "time": 6127, "type": "viseme", "value": "k" },
  { "time": 6265, "type": "viseme", "value": "sil" },
  { "time": 6795, "type": "viseme", "value": "a" },
  { "time": 6907, "type": "viseme", "value": "a" },
  { "time": 6957, "type": "viseme", "value": "p" },
  { "time": 7045, "type": "viseme", "value": "O" },
  { "time": 7107, "type": "viseme", "value": "t" },
  { "time": 7157, "type": "viseme", "value": "u" },
  { "time": 7220, "type": "viseme", "value": "e" },
  { "time": 7295, "type": "viseme", "value": "s" },
  { "time": 7407, "type": "ssml", "start": 137, "end": 156, "value": "fear" },
  { "time": 7407, "type": "viseme", "value": "@" },
  { "time": 7470, "type": "viseme", "value": "f" },
  { "time": 7495, "type": "viseme", "value": "r" },
  { "time": 7595, "type": "viseme", "value": "e" },
  { "time": 7657, "type": "viseme", "value": "t" },
  { "time": 7720, "type": "viseme", "value": "@" },
  { "time": 7782, "type": "viseme", "value": "f" },
  { "time": 7907, "type": "viseme", "value": "a" },
  { "time": 8032, "type": "viseme", "value": "t" },
  { "time": 8095, "type": "viseme", "value": "@" },
  { "time": 8145, "type": "viseme", "value": "p" },
  { "time": 8220, "type": "viseme", "value": "t" },
  { "time": 8332, "type": "viseme", "value": "s" },
  { "time": 8495, "type": "viseme", "value": "sil" },
  { "time": 9012, "type": "viseme", "value": "a" },
  { "time": 9025, "type": "viseme", "value": "t" },
  { "time": 9087, "type": "viseme", "value": "t" },
  { "time": 9187, "type": "viseme", "value": "a" },
  { "time": 9287, "type": "viseme", "value": "u" },
  { "time": 9337, "type": "viseme", "value": "i" },
  { "time": 9362, "type": "viseme", "value": "t" },
  { "time": 9387, "type": "viseme", "value": "p" },
  { "time": 9462, "type": "viseme", "value": "i" },
  { "time": 9575, "type": "viseme", "value": "s" },
  { "time": 9637, "type": "viseme", "value": "E" },
  { "time": 9700, "type": "viseme", "value": "p" },
  { "time": 9725, "type": "viseme", "value": "r" },
  { "time": 9887, "type": "viseme", "value": "a" },
  { "time": 9925, "type": "viseme", "value": "s" },
  { "time": 10012, "type": "viseme", "value": "t" },
  { "time": 10087, "type": "ssml", "start": 201, "end": 224, "value": "surprize" },
  { "time": 10087, "type": "viseme", "value": "i" },
  { "time": 10137, "type": "viseme", "value": "f" },
  { "time": 10200, "type": "viseme", "value": "i" },
  { "time": 10262, "type": "viseme", "value": "u" },
  { "time": 10375, "type": "viseme", "value": "a" },
  { "time": 10450, "type": "viseme", "value": "r" },
  { "time": 10512, "type": "viseme", "value": "t" },
  { "time": 10562, "type": "viseme", "value": "a" },
  { "time": 10737, "type": "viseme", "value": "t" },
  { "time": 10787, "type": "viseme", "value": "sil" }
]

const AvatarModel = ({ audioPlay, setEndState }) => {

  const audio = new Audio('/assets/audio/speech.mp3');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [startPlay, setStartPlay] = useState(false);

  useEffect(() => {
    if (audioPlay && !isAudioPlaying) {
      setIsAudioPlaying(true);
      audio.play();
      setStartPlay(true);
    }
  }, [audioPlay]);

  audio.onended = function () {
    setIsAudioPlaying(false);
    setStartPlay(false);
    setEndState();
  }

  const loading = () => {
    return (
      <Html >
        <div className='loading' >
          loading..
        </div>
      </Html>
    );
  }

  return (
    <>
      <Canvas className='canvas' >
        <OrbitControls
          target={[0, -0.01, 0]}
          enableDamping={true}
          enableRotate={false}
          minDistance={0.45}
          maxDistance={0.45}
        />
        <Suspense fallback={loading()}>
          <Character animation={viesemData} startPlay={startPlay} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default AvatarModel;
