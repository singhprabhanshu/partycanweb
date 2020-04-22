import React from 'react';
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
