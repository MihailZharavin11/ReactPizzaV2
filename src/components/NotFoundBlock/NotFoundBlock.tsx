import React from 'react';
import styles from './notFoundBlock.module.scss';

const NotFoundBlock:React.FC = () => {
  return (
    <div className={styles.wrapperNotFound}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>К сожалению, данная страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
