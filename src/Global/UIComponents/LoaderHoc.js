import React from 'react';
import { Spinner } from 'reactstrap';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    debugger;
    if (!isLoading) return (<Component {...props} />);
    return (<p>Be Hold, fetching data may take some time :)</p>);
  }
}

function Loader () {
  return (
    <div>
    <Spinner color="danger" />
    </div>
  ) 
};

export {
  WithLoading,
  Loader,
};