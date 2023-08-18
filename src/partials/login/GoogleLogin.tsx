import React from 'react';

import '../../css/additional-styles/google-login.css';
import googleLogo from '../../images/google-logo.png';

type GloginProps = {
  login: () => void;
};

const GLogin: React.FC<GloginProps> = ({ login }) => {
  return (
    <div className="login-button-container">
      {/* Google login button */}
      <button className="google-login-button" onClick={login}>
        <img src={googleLogo} alt="googleLogo" className="google-logo" />
        Sign in with Google
      </button>
    </div>
  );
};

export default GLogin;
