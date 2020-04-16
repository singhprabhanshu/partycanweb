import React from 'react';
import { Spinner } from 'reactstrap';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<Component {...props} />);
    return (<p>Be Hold, fetching data may take some time :)</p>);
  }
}

function Loader () {
  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ position: 'fixed', top: '50%', left: '50%'}}>
    <Spinner color="danger" />
    </div>
  ) 
};

export {
  WithLoading,
  Loader,
};