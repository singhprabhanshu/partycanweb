import React from 'react';
function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    debugger;
    if (!isLoading) return (<Component {...props} />);
    return (<p>Be Hold, fetching data may take some time :)</p>);
  }
}
export default WithLoading;