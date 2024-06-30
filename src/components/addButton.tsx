import React from 'react';
import '../styles/addButton.css';

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className='div-add-btn-container'>
      <button className="icon-btn add-btn" onClick={onClick}>
        <div className="add-icon"></div>
        <div className="btn-txt">Add Film</div>
      </button>
    </div>
  );
}

export default AddButton;
