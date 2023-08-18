import React from 'react';

type SetTitleProps = {
  title: string;
  onClose: () => void;
  handleConfirmTitle: () => void;
  handleTitleChange: () => void;
};

const SetChatTitlePopup: React.FC<SetTitleProps> = ({
  title,
  onClose,
  handleTitleChange,
  handleConfirmTitle,
}) => {
  return (
    <div>
      <div className="set-title-popup">
        <div className="set-title-content">
          <h2>Set a title for this new chat</h2>
          <form onSubmit={handleConfirmTitle}>
            <label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </label>
            <div className="button-container">
              <button type="submit" className="confirm-button">
                Confirm
              </button>
              <button type="button" className="close-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetChatTitlePopup;
