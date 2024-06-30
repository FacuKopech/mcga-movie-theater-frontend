import React from 'react';
import '../styles/star.css'

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "yellow" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 8 21 9 17 13 18 20 12 17 6 20 7 13 3 9 9 8 12 2" />
  </svg>
);

export default Star;
