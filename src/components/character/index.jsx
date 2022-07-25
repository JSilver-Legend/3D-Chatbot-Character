import React, { useEffect, useState, useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { AnimationMixer } from 'three';

const aws_visemes = {
  'term1': 3,
  '@': 4,
  'O': 5,
  'a': 6,
  'term2': 7,
  't': 8,
  'E': 9,
  'e': 10,
  'f': 11,
  'term4': 12,
  'k': 13,
  'dance': 14,
  'o': 15,
  'term3': 16,
  'p': 17,
  'r': 18,
  's': 19,
  'S': 20,
  'T': 21,
  'u': 22,
  'i': 23,
  'sil': 28
}

const Character = ({ animation, startPlay }) => {

  const { scene, animations } = useGLTF("/assets/model/scene.glb");
  const group = useRef()

  const actions = useRef()
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {
    if (mixer) {
      actions.current = {
        'term1': mixer.clipAction(animations[3], group.current),
        '@': mixer.clipAction(animations[4], group.current),
        'O': mixer.clipAction(animations[5], group.current),
        'a': mixer.clipAction(animations[6], group.current),
        'term2': mixer.clipAction(animations[7], group.current),
        't': mixer.clipAction(animations[8], group.current),
        'E': mixer.clipAction(animations[9], group.current),
        'e': mixer.clipAction(animations[10], group.current),
        'f': mixer.clipAction(animations[11], group.current),
        'term4': mixer.clipAction(animations[12], group.current),
        'k': mixer.clipAction(animations[13], group.current),
        'dance': mixer.clipAction(animations[14], group.current),
        'o': mixer.clipAction(animations[15], group.current),
        'term3': mixer.clipAction(animations[16], group.current),
        'p': mixer.clipAction(animations[17], group.current),
        'r': mixer.clipAction(animations[18], group.current),
        's': mixer.clipAction(animations[19], group.current),
        'S': mixer.clipAction(animations[20], group.current),
        'T': mixer.clipAction(animations[21], group.current),
        'u': mixer.clipAction(animations[22], group.current),
        'i': mixer.clipAction(animations[23], group.current),
        'sil': mixer.clipAction(animations[28], group.current)
      }
    }
  }, [mixer, animations]);

  const [playLipsyncAnimation, setPlayLipsyncAnimation] = useState(false);

  useEffect(() => {
    if (startPlay) setPlayLipsyncAnimation(true);
  }, [startPlay]);

  useEffect(() => {
    if (playLipsyncAnimation) playLipsync();
  }, [playLipsyncAnimation]);

  const stopAction = (value, time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        actions.current[value].stop();
        resolve(true);
      }, time);
    });
  }

  const term = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
  const [playSpeed, setPlaySpeed] = useState(0);
  const playLipsync = async () => {
    var endPoint = 0;
    for (let i = 0; i < animation.length; i++) {
      const element = animation[i];
      if (i === 0) await term(element.time);
      else {
        const playTime = element.time - endPoint;
        const defaultTime = animations[aws_visemes[element.value]].duration * 1000;
        setPlaySpeed(defaultTime / playTime);
        actions.current[element.value].play();
        await stopAction(element.value, playTime);
      }
      endPoint = element.time;
    };
    setPlayLipsyncAnimation(false);
  }

  useFrame((state, delta) => {
    mixer.update(delta * playSpeed);
  })

  return (
    <primitive ref={group} object={scene} position={[0, -1.6, 0]} >
      <ambientLight intensity={2} />
      {/* <directionalLight intensity={1} /> */}
      <pointLight position={[5, 5, 5]} />
      <mesh />
    </primitive>
  )
}

useGLTF.preload("/assets/model/scene.glb");

export default Character;