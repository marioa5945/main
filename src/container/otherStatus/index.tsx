import React from 'react';
import style from './style.scss';

const status404Page: React.FC = () => {
  return (
    <div className={style.otherStatus}>
      <h1>404</h1>
      <h3>File not found</h3>
      <a href={'/'}>black</a>
    </div>
  );
};

export default status404Page;
