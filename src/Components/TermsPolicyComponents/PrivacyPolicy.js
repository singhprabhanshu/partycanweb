
import React from 'react';
import { connect } from 'react-redux';

class PrivacyPolicy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }

    render() {
        
        return (
            <React.Fragment>
              <div className="row">
                  <div className="col-md-6">
                      <div>
                      Welcome to DrinkPartyCan.com (“Site”), a website maintained and operated by Three Tier Solution Inc. (“Company”, “we”, “our” or “us”). Three Tier Solution offers a white-label enterprise solution for liquor brands (“our Customers”) to enable e-commerce. Three Tier Solution’s advanced API integrates directly with our Customers’ websites, connecting our Customers with localized retailers (“Retailers”) that deliver directly to consumers (“Consumers”). Our Privacy Policy (“Privacy Policy”) is designed to help you understand how we collect, use and share your personal information and to assist you in exercising the privacy rights available to you. By using or accessing the Site, you signify your agreement to be bound by this Privacy Policy.
                      </div>
                  </div>
                  <div className="col-md-6">
                  </div>
              </div>       
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(PrivacyPolicy);