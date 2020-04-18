import React from 'react';
import { Spinner } from 'reactstrap';

const WithLoading = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
        render() {
            if (this.props.isLoading) {
                return Loader();
            }
            // return <WrappedComponent {...this.props}/>;
            return super.render();
        }

    };
};

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

export default WithLoading;
