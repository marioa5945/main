import React from 'react';
import style from './style.scss';
import { useNavigate } from 'react-router-dom';

const Status404Page = () => {
  const navigate = useNavigate();

  return (
    <div className={style.otherStatus}>
      <div>
        <h1>404</h1>
        <h3>File not found</h3>
        <span onClick={() => navigate('/')}>black</span>
      </div>
    </div>
  );
};

export default Status404Page;
