import React from 'react';
import { Spinner } from 'reactstrap';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const WithLoading = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
        render() {
            if (this.props.isLoading) {
                return Loader();
            }
            return super.render();
        }

    };
};

function Loader () {
  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    // <div style={{ position: 'fixed', top: '50%', left: '50%'}}>
    // <Spinner color="danger" />
    // </div>
    <div className="loader-wrapper">
        <ScaleLoader
          size={100}
          margin={2}
          color="#dc3545"
          loading={true}
        />
      </div>
  ) 
};

export {
  WithLoading,
  Loader,
};

export default WithLoading;
