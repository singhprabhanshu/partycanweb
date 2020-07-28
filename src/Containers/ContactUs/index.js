
import React from 'react';

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <div style={{ marginTop: "50px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="col-md-12 mb-4"><h1>CONTACT US</h1></div>
                    <div className="col-md-12" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                        <div style={{ marginTop: "30px", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p>
                                DRINK PARTY CAN
                        </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p>
                                1765 N Elston Ave, Suite 107
                        </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p>
                                CHICAGO, IL 60642
                        </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p>
                                (Cocktail Courier Storefront)
                        </p>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="col-md-12 mb-4"><h2>FOR GENERAL INQUIRIES, PLEASE EMAIL</h2></div>
                    <div className="col-md-12" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p>
                                EMAIL: INQUIRIES@DRINKPARTYCAN.COM
                        </p>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="col-md-12 mb-4"><h2>FOR CUSTOMER CARE ASSISTANCE PLEASE EMAIL</h2></div>
                    <div className="col-md-12" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <p style={{ marginRight: "30px" }}>
                                EMAIL: HI@DRINKPARTYCAN.COM
                        </p>
                            <p>
                                PHONE: 917-969-9180
                        </p>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px", display: "flex", flexDirection: "row", justifyContent: "center" }} className="col-md-12 mb-4"><h2>CUSTOMER CARE AGENTS ARE AVAILABLE FROM 9AM-5PM CST, MONDAY-FRIDAY</h2></div>
                </div>
            </React.Fragment>
        );
    }
}

export default ContactUs;