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
        3: mixer.clipAction(animations[3], group.current),
        4: mixer.clipAction(animations[4], group.current),
        5: mixer.clipAction(animations[5], group.current),
        6: mixer.clipAction(animations[6], group.current),
        7: mixer.clipAction(animations[7], group.current),
        8: mixer.clipAction(animations[8], group.current),
        9: mixer.clipAction(animations[9], group.current),
        10: mixer.clipAction(animations[10], group.current),
        11: mixer.clipAction(animations[11], group.current),
        12: mixer.clipAction(animations[12], group.current),
        13: mixer.clipAction(animations[13], group.current),
        14: mixer.clipAction(animations[14], group.current),
        15: mixer.clipAction(animations[15], group.current),
        16: mixer.clipAction(animations[16], group.current),
        17: mixer.clipAction(animations[17], group.current),
        18: mixer.clipAction(animations[18], group.current),
        19: mixer.clipAction(animations[19], group.current),
        20: mixer.clipAction(animations[20], group.current),
        21: mixer.clipAction(animations[21], group.current),
        22: mixer.clipAction(animations[22], group.current),
        23: mixer.clipAction(animations[23], group.current),
        28: mixer.clipAction(animations[28], group.current)
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
        actions.current[aws_visemes[element.value]].play();
        await stopAction(aws_visemes[element.value], playTime);
      }
      endPoint = element.time;
    };
    setPlayLipsyncAnimation(false);
  }

  useFrame((state, delta) => {
    mixer.update(delta * playSpeed);
  })

  return (
    <primitive ref={group} object={scene} position={[0, -2.06, 0]} scale={[1.2, 1.2, 1.2]} >
      <ambientLight intensity={3} />
      <pointLight intensity={1.4} position={[0, 5, 10]} />
      <mesh />
    </primitive>
  )
}

useGLTF.preload("/assets/model/scene.glb");

export default Character;