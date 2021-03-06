import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="129" cy="150" r="125" />
    <rect x="0" y="292" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="341" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="448" rx="10" ry="10" width="95" height="30" />
    <rect x="0" y="440" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);
