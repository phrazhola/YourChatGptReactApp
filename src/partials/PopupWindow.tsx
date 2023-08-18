import React from 'react';

import '../css/additional-styles/popup.css';
import logo from '../images/logo.png';

type PopupWindowProps = {
  onClose: () => void;
};

const PopupWindow: React.FC<PopupWindowProps> = ({ onClose }) => {
  return (
    <div>
      <div className="popup">
        <div className="popup-content">
          <h2>
            <img className="popup-logo" src={logo} alt="logo" />
          </h2>
          <p>Thank you for reaching out to us! If you have any questions or thoughts, please feel free to send an email to <strong>phrazhola@gmail.com</strong>. Your feedback is highly valued.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
