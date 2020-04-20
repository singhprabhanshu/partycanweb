/* eslint-disable no-undef */

import React from 'react';

import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import iconImage from '../../assets/images/check-white.png';

// slider

// import ScrollMenu from 'react-horizontal-scrolling-menu';
// import '../assets/stylesheets/partylocator.css';

// // list of items
// const list = [
//     { name: 'item1' },
//     { name: 'item2' },
//     { name: 'item3' },
//     { name: 'item4' },
//     { name: 'item5' },
//     { name: 'item6' },
//     { name: 'item7' },
//     { name: 'item8' },
//     { name: 'item10' },
//     { name: 'item11' },
//     { name: 'item12' },
//     { name: 'item13' },
//     { name: 'item14' },
//     { name: 'item15' },
//   ];
  
//   // One item component
//   // selected prop will be passed
//   const MenuItem = ({text, selected}) => {
//     return <div
//       className={`menu-item ${selected ? 'active' : ''}`}
//       >{text}</div>;
//   };

//   // All items component
// // Important! add unique key
// const Menu = (list, selected) =>
//     list.map(el => {
//     const {name} = el;

//     return <MenuItem text={name} key={name} selected={selected} />;
// });

// const selected = 'item13';
// // end slider


const mapStyles = {
    width: '100%',
    height: '60%',
  };

class PartyLocatorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [{lat: 47.49855629475769, lng: -122.14184416996333, id: 11, content: 'check1'},
                    {latitude: 47.359423, longitude: -122.021071, id: 12, content: 'check2'},
                    {latitude: 47.2052192687988, longitude: -121.988426208496, id: 13, content: 'check3'},
                    {latitude: 47.6307081, longitude: -122.1434325, id: 14, content: 'check4'},
                    {latitude: 47.3084488, longitude: -122.2140121, id: 15, content: 'check5'},
                    {latitude: 47.5524695, longitude: -122.0425407, id: 16, content: 'check6'}],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            title: '',
            selectedMarkerId: null,
            // selected,
          };
        // this.menuItems = Menu(list, selected);
        
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props, 'props');
        console.log(marker, 'market');
        console.log(e, 'e');
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            title: props.name,
            selectedMarkerId: props.id,
          });
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
        if (this.state.selectedMarkerId && this.state.selectedMarkerId === store.id) {
            return <Marker key={index} id={store.id} position={{
                lat: store.latitude,
                lng: store.longitude
              }}
              icon={{
                 url: iconImage,
                 anchor: new google.maps.Point(32,32),
                 scaledSize: new google.maps.Size(32,32)
               }}
              name={store.content}
              onClick={this.onMarkerClick} 
              />
        } else {
            return <Marker key={index} id={store.id} position={{
                lat: store.latitude,
                lng: store.longitude
              }}
              name={store.content}
              onClick={this.onMarkerClick} 
              />
        }
          
        })
      }
    
    // horizontal slider
    // onSelect = key => {
    //     this.setState({ selected: key });
    //   }

    // end slider
      

    render() {

        // // slider
        // const { selected } = this.state;
        // // Create menu from items
        // const menu = this.menuItems;
        // // slider end
        
        return (
            <React.Fragment>
                <Map google={this.props.google} zoom={10} initialCenter={{ lat: 47.444, lng: -122.176}} style={mapStyles}>

                    {this.displayMarkers()}

                    <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    >
                        <div>
                <h1 style={{ color: 'black'}}>{this.state.title}</h1>
                        </div>
                    </InfoWindow>
                </Map>               
            </React.Fragment>
            // slider
            // <React.Fragment>
            //     <div className="App">
            //         <ScrollMenu
            //         data={menu}
            //         selected={selected}
            //         onSelect={this.onSelect}
            //         />
            //     </div>
            // </React.Fragment>


        );
    }
}



// function mapStateToProps(state) {
//     return {
//     };
// }
// export default connect(mapStateToProps)(PartyLocatorContainer);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB9c1VApe14R3fgjDJmxnlnrAv9uEoHHV0'
  })(PartyLocatorContainer)