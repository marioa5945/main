import React from 'react';
import style from './style.scss';

const status404Page: React.FC<_router> = (props: _router) => {
  const { history } = props;

  return (
    <div className={style.otherStatus}>
      <div>
        <h1>404</h1>
        <h3>File not found</h3>
        <span onClick={() => history.push('/')}>black</span>
      </div>
    </div>
  );
};

export default status404Page;
