import React from 'react';
import styles from './error.module.scss';
const Error:React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Произошла ошибка</h2>
      <p>Попробуйте перезагрузить страницу</p>
    </div>
  );
};

export default Error;
