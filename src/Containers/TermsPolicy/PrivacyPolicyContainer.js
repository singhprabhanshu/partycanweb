import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { map as _map, findIndex as _findIndex, get as _get, set as _set  } from 'lodash';
import {Container, Row, Col} from 'reactstrap';
import { Button } from 'reactstrap';
import PrivacyPolicy from '../../Components/TermsPolicyComponents/PrivacyPolicy';

class PrivacyPolicyContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }



    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />  
                <Container className="peripheralContent">    
                      <PrivacyPolicy />
                </Container>
            </React.Fragment>
            
        );
    }
}

function mapStateToProps(state) {
    return { }
}
export default connect(mapStateToProps)(PrivacyPolicyContainer);