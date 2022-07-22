import React, { useEffect, useState, useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { AnimationMixer } from 'three';

const Character = ({ animation, startPlay }) => {

  const { scene, animations } = useGLTF("/assets/model/scene.gltf");
  const group = useRef()

  const actions = useRef()
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {
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
  }, []);

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

  var endPoint = 0;

  const playLipsync = async () => {
    for (let i = 0; i < animation.length; i++) {
      const element = animation[i];
      if (i == 0) await term(element.time);
      else {
        actions.current[element.value].play();
        await stopAction(element.value, element.time - endPoint);
      }
      endPoint = element.time;
    };
    setPlayLipsyncAnimation(false);
  }

  useFrame((state, delta) => {
    mixer.update(delta * 0.1)
  })

  return (
    <primitive ref={group} object={scene} position={[-1.6, -1.6, 0]} >
      <ambientLight intensity={1} />
      {/* <directionalLight intensity={2.5} /> */}
      <pointLight position={[5, 5, 5]} />
      <mesh />
    </primitive>
  )
}

useGLTF.preload("/assets/model/scene.gltf");

export default Character;