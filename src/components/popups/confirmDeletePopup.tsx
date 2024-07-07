import React, { useState } from 'react';
import '../../styles/confirmDeletePopup.css'
import { useLoading } from '../../context/loadingContext';

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ movieId, closePopup, onResult }) => {
  const [errorMessage, setMessageError] = useState('');
  const { setLoading } = useLoading();

  const handleClosePopup = () => {
    closePopup();
  };

  const deleteMovie = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!movieId) {
        setLoading(false);
        setMessageError('Missing movie ID');
      } else {
        const response = await fetch('/api/delete-movie', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movieId }),
          credentials: 'include',
        });

        if (!response.ok) {
          response.status == 401 ? setMessageError('Access Denied') : setMessageError('');
          throw new Error('Failed to delete movie');
        }
        setLoading(false);
        handleClosePopup();
        onResult('Movie deleted successfully');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during movie deletion:', error);
      setMessageError('Error during movie deletion');
      onResult(errorMessage);
    }
  }

  return (
    <div className='warning-popup-overlay'>
      <div className="warning-popup-content">
        <div className='div-warning-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className='warning-svg-icon' viewBox="0 0 24 24">
            <path className='icon-path' d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div className='div-warning-message'>
          <p>Are you sure you want to delete this film?</p>
        </div>
        <div className='div-action-btns'>
          <button onClick={handleClosePopup} title='Close'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='close-svg-icon'>
              <path className='icon-path' d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <button title='Delete' onClick={deleteMovie}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='delete-svg-icon'>
              <path className='icon-path' d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;
