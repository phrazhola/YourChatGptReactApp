import React from 'react';

import '../css/additional-styles/background.scss';
import background from '../images/background.svg';

const BackGround: React.FC = () => {
  return (
    <>
      <img className="background-img" src={background} alt="BackgroundSvg" />
      <div className="bubbles">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
    </>
  );
};

export default BackGround;
