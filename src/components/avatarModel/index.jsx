import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Html, OrbitControls } from '@react-three/drei';
import Character from '../character';
import './style.css';

const viesemData = [
  { "time": 125, "type": "viseme", "value": "i" },
  { "time": 200, "type": "viseme", "value": "S" },
  { "time": 300, "type": "viseme", "value": "@" },
  { "time": 337, "type": "viseme", "value": "p" },
  { "time": 450, "type": "viseme", "value": "t" },
  { "time": 625, "type": "viseme", "value": "sil" },
  { "time": 712, "type": "viseme", "value": "@" },
  { "time": 1000, "type": "viseme", "value": "k" },
  { "time": 1062, "type": "viseme", "value": "E" },
  { "time": 1137, "type": "viseme", "value": "t" },
  { "time": 1187, "type": "viseme", "value": "t" },
  { "time": 1250, "type": "viseme", "value": "r" },
  { "time": 1312, "type": "viseme", "value": "i" },
  { "time": 1375, "type": "viseme", "value": "t" },
  { "time": 1462, "type": "viseme", "value": "i" },
  { "time": 1512, "type": "viseme", "value": "k" },
  { "time": 1562, "type": "viseme", "value": "k" },
  { "time": 1625, "type": "viseme", "value": "i" },
  { "time": 1637, "type": "viseme", "value": "k" },
  { "time": 1762, "type": "viseme", "value": "t" },
  { "time": 1875, "type": "viseme", "value": "O" },
  { "time": 1937, "type": "viseme", "value": "r" },
  { "time": 1962, "type": "viseme", "value": "T" },
  { "time": 2125, "type": "viseme", "value": "i" },
  { "time": 2137, "type": "viseme", "value": "s" },
  { "time": 2262, "type": "viseme", "value": "t" },
  { "time": 2387, "type": "viseme", "value": "a" },
  { "time": 2462, "type": "viseme", "value": "f" },
  { "time": 2625, "type": "viseme", "value": "r" },
  { "time": 2637, "type": "viseme", "value": "@" },
  { "time": 2687, "type": "viseme", "value": "k" },
  { "time": 2787, "type": "viseme", "value": "@" },
  { "time": 2950, "type": "viseme", "value": "u" },
  { "time": 3000, "type": "viseme", "value": "i" },
  { "time": 3062, "type": "viseme", "value": "T" },
  { "time": 3125, "type": "viseme", "value": "T" },
  { "time": 3150, "type": "viseme", "value": "@" },
  { "time": 3212, "type": "viseme", "value": "p" },
  { "time": 3312, "type": "viseme", "value": "i" },
  { "time": 3375, "type": "viseme", "value": "t" },
  { "time": 3487, "type": "viseme", "value": "t" },
  { "time": 3587, "type": "viseme", "value": "i" },
  { "time": 3725, "type": "viseme", "value": "s" },
  { "time": 3887, "type": "viseme", "value": "t" },
  { "time": 4000, "type": "viseme", "value": "sil" },
  { "time": 4037, "type": "viseme", "value": "t" },
  { "time": 4412, "type": "viseme", "value": "e" },
  { "time": 4500, "type": "viseme", "value": "t" },
  { "time": 4562, "type": "viseme", "value": "s" },
  { "time": 4625, "type": "viseme", "value": "t" },
  { "time": 4712, "type": "viseme", "value": "u" },
  { "time": 4750, "type": "viseme", "value": "T" },
  { "time": 4812, "type": "viseme", "value": "@" },
  { "time": 4875, "type": "viseme", "value": "t" },
  { "time": 4950, "type": "viseme", "value": "a" },
  { "time": 5150, "type": "viseme", "value": "p" },
  { "time": 5262, "type": "viseme", "value": "@" },
  { "time": 5312, "type": "viseme", "value": "f" },
  { "time": 5337, "type": "viseme", "value": "T" },
  { "time": 5375, "type": "viseme", "value": "@" },
  { "time": 5462, "type": "viseme", "value": "f" },
  { "time": 5562, "type": "viseme", "value": "E" },
  { "time": 5612, "type": "viseme", "value": "r" },
  { "time": 5750, "type": "viseme", "value": "o" },
  { "time": 5850, "type": "viseme", "value": "s" },
  { "time": 6062, "type": "viseme", "value": "sil" }
]

const AvatarModel = ({ audioPlay }) => {

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
