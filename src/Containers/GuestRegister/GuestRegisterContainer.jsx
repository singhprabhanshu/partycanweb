

import React from 'react';

import { connect } from 'react-redux';
import GuestWithoutLoginComponent from '../../Components/GuestRegisterComponents/GuestWithoutLoginComponent';
// import PartyLocatorMapComponent from '../../Components/PartyLocator/GoogleMapComponent';
// import MapStoreComponent from '../../Components/PartyLocator/MapStoreComponent';



class GuestRegisterContainer extends React.Component {

    constructor(props) {
        super(props); 
    }

    

    

    render() {

        
        return (
            <React.Fragment>
                    <div >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", height: '500px'}}>
                            <GuestWithoutLoginComponent/>
                        </div>
                    </div>
                    
                    
                
                
                
                
            </React.Fragment>


        );
    }
}



function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps)(GuestRegisterContainer);