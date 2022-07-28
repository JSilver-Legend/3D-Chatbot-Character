import React, { useEffect, useState, useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { AnimationMixer } from 'three';

const aws_pose = {
  'anger': 24,
  'disgust': 25,
  'fear': 26,
  'happy': 27,
  'neutral': 28,
  'sad': 29,
  'surprize': 30
}

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

const FACE_TIME = 500;

const Character = ({ animation, startPlay }) => {

  const { scene, animations } = useGLTF("/assets/model/scene.glb");
  const group = useRef()

  const lypActions = useRef();
  const poseActions = useRef();
  const [lypMixer] = useState(() => new AnimationMixer());
  const [poseMixer] = useState(() => new AnimationMixer());

  useEffect(() => {
    if (lypMixer && poseMixer) {
      poseActions.current = {
        24: poseMixer.clipAction(animations[24], group.current),
        25: poseMixer.clipAction(animations[25], group.current),
        26: poseMixer.clipAction(animations[26], group.current),
        27: poseMixer.clipAction(animations[27], group.current),
        28: poseMixer.clipAction(animations[28], group.current),
        29: poseMixer.clipAction(animations[29], group.current),
        30: poseMixer.clipAction(animations[30], group.current),
      };
      lypActions.current = {
        3: lypMixer.clipAction(animations[3], group.current),
        4: lypMixer.clipAction(animations[4], group.current),
        5: lypMixer.clipAction(animations[5], group.current),
        6: lypMixer.clipAction(animations[6], group.current),
        7: lypMixer.clipAction(animations[7], group.current),
        8: lypMixer.clipAction(animations[8], group.current),
        9: lypMixer.clipAction(animations[9], group.current),
        10: lypMixer.clipAction(animations[10], group.current),
        11: lypMixer.clipAction(animations[11], group.current),
        12: lypMixer.clipAction(animations[12], group.current),
        13: lypMixer.clipAction(animations[13], group.current),
        14: lypMixer.clipAction(animations[14], group.current),
        15: lypMixer.clipAction(animations[15], group.current),
        16: lypMixer.clipAction(animations[16], group.current),
        17: lypMixer.clipAction(animations[17], group.current),
        18: lypMixer.clipAction(animations[18], group.current),
        19: lypMixer.clipAction(animations[19], group.current),
        20: lypMixer.clipAction(animations[20], group.current),
        21: lypMixer.clipAction(animations[21], group.current),
        22: lypMixer.clipAction(animations[22], group.current),
        23: lypMixer.clipAction(animations[23], group.current),
        28: lypMixer.clipAction(animations[28], group.current)
      }
    }
  }, [lypMixer, animations]);

  const [playLipsyncAnimation, setPlayLipsyncAnimation] = useState(false);

  useEffect(() => {
    if (startPlay) setPlayLipsyncAnimation(true);
  }, [startPlay]);

  useEffect(() => {
    if (playLipsyncAnimation) {
      playLipsync();
    }
  }, [playLipsyncAnimation]);

  const stopAction = (value, time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        lypActions.current[value].stop();
        resolve(true);
      }, time);
    });
  }

  const stopPoseAction = (value, time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        poseActions.current[value].stop();
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
  const [posePlaySpeed, setPosePlaySpeed] = useState(0);
  const playLipsync = async () => {
    var endPoint = 0;
    for (let i = 0; i < animation.length; i++) {
      const element = animation[i];
      if (element.type === "viseme") {
        if (i === 0) await term(element.time);
        else {
          const playTime = element.time - endPoint;
          const defaultTime = animations[aws_visemes[element.value]].duration * 1000;
          setPlaySpeed(defaultTime / playTime);
          lypActions.current[aws_visemes[element.value]].play();
          await stopAction(aws_visemes[element.value], playTime);
        }
        endPoint = element.time;
      } else if (element.type === "ssml") {
        const playTime = element.time - endPoint;
        const defaultTime = animations[aws_pose[element.value]].duration * 1000;
        setPosePlaySpeed(defaultTime / 1500);
        poseActions.current[aws_pose[element.value]].play();
        stopPoseAction(aws_pose[element.value], FACE_TIME);
      }
    };
    setPlayLipsyncAnimation(false);
  }

  useFrame((state, delta) => {
    lypMixer.update(delta * playSpeed);
    poseMixer.update(delta * posePlaySpeed);
  });

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