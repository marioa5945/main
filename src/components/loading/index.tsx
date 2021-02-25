import React from 'react';
import style from './style.scss';

const Loading: React.FC<{ logoUrl: string }> = (props: { logoUrl: string }) => {
  return (
    <div className={style.loading}>
      <div>
        <img src={props.logoUrl} className={'logo'} />
        <img src={require('./img/loading.svg')} className={'circle'} />
      </div>
    </div>
  );
};

export default Loading;
