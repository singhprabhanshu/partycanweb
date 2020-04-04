
import React from 'react';
import { connect } from 'react-redux';

class LivechatSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
      } 
    render() {
        
        return (
            <React.Fragment>
                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>LIVE CHAT</h5>               
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(LivechatSetting);