import React from 'react';
import ContentLoader from 'react-content-loader';

const FullPizzaSkeleton:React.FC = (props:object) => (
  <ContentLoader
    speed={2}
    width={1500}
    height={825}
    viewBox="0 0 1500 825"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="0" ry="0" width="150" height="40" />
    <circle cx="250" cy="310" r="220" />
    <rect x="500" y="0" rx="0" ry="0" width="100" height="40" />
    <rect x="500" y="50" rx="0" ry="0" width="80" height="25" />
    <rect x="500" y="106" rx="0" ry="0" width="160" height="40" />
    <rect x="500" y="155" rx="0" ry="0" width="160" height="25" />
  </ContentLoader>
);

export default FullPizzaSkeleton;
