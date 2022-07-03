import React from 'react';
import style from './style.scss';
import { useNavigate } from 'react-router-dom';
const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  const navArr: Array<{ name: string; path?: string; url?: string }> = [
    {
      name: 'blog',
      path: '/blog',
      url: '',
    },
    {
      name: 'github',
      url: 'https://github.com/marioa5945',
    },
    {
      name: 'demos',
      path: '/demos',
    },
    {
      name: 'about',
      path: '/about',
    },
  ];

  return (
    <div className={style.home}>
      <main>
        <h1>
          Mario <span>a</span>
        </h1>
        <p>is a programmer</p>
        <img src={'./img/logo.png'} />
        <nav>
          {navArr.map((n) =>
            n.url ? (
              <a key={n.name} href={n.url}>
                {n.name}
              </a>
            ) : (
              <a key={n.name} onClick={() => navigate(`/${n.name}`)}>
                {n.name}
              </a>
            )
          )}
        </nav>
      </main>
    </div>
  );
};

export default HomePage;
