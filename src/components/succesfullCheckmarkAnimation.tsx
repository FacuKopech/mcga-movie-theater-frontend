import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../public/JSONs/greenCheckmarkAnimation.json';

const CheckmarkAnimation: React.FC = () => {
  return (
    <Lottie
      loop={false}
      animationData={animationData}
      play
      style={{ width: 150, height: 150 }}
    />
  );
}

export default CheckmarkAnimation;
