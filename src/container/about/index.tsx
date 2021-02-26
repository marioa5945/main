import React from 'react';
import style from './style.scss';

const AboutPage: React.FC = () => {
  return (
    <div className={style.about}>
      <main>
        <h1>
          Mario <span>a</span>
        </h1>
        <p>
          <a href={'https://twitter.com/marioa49886908'}>twitter</a>
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
