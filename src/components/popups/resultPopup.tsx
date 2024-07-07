import React, { useEffect, useState } from 'react';
import CheckmarkAnimation from '../succesfullCheckmarkAnimation';
import '../../interfaces/ResultPopupProps'
import CrossAnimation from '../failCrossMark';
import '../../styles/resultPopup.css'
import { useUpdate } from '../../context/updateContext';

const ResultPopup: React.FC<ResultPopupProps> = ({ resultMessage, closePopup }) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const { triggerUpdate } = useUpdate();

  useEffect(() => {
    if (resultMessage.includes('successfully')) {
      setShowCheckmark(true);
      setShowCross(false);
    } else {
      setShowCheckmark(false);
      setShowCross(true);
    }
  }, [resultMessage]);

  const handleCloseResultPopup = () => {
    triggerUpdate();
    closePopup();
  };

  return (
    <div className={`result-popup-overlay ${showCheckmark ? 'show-checkmark-border' : 'show-cross-border'}`}>
      <div className="result-popup-content">
        <div className='div-result-message'>
          <p>{resultMessage}</p>
        </div>
        <div className='div-result-icon'>
          {showCheckmark && <CheckmarkAnimation />}
          {showCross && <CrossAnimation />}
        </div>
        <div className='div-close-btn'>
          <button onClick={handleCloseResultPopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ResultPopup;
