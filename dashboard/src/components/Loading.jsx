import React from 'react';
import { Container } from './Container';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
  return (
    <Container height="h-screen">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Container>
  );
};

export default Loading;
