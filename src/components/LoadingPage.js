import React from 'react';
import loaderImage from '../images/loader.gif';

export const LoadingPage = () => (
  <div className="loader">
    <img
      src={loaderImage}
      alt="loader"
      className="loader__image"
    />
  </div>
);
export default LoadingPage;
