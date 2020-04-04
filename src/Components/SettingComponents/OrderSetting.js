
import React from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class OrderSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
      } 
    render() {
        let renderItems= (items) => items.map((item,index)=> {
            return(<React.Fragment  key={item+index}>
                        <div className=" d-flex flex-column flex-wrap" style={{fontSize: '1.5rem', marginLeft: '18px'}}>
                            <div>
                                <span style={{ color: 'blue'}}>{item.name}</span>
                                <span style={{color: 'cadetblue', marginLeft: '55px'}}>{item.quatity}</span>
                                <span style={{ color: 'blue', marginLeft: '153px'}}>{item.price}</span>
                            </div>
                        </div><br/>
            </React.Fragment>)
        })

        let renderOrder = this.props.ordersInfo.map((data, index)=> {
            return (<React.Fragment key={data+index}> 
                        <ExpansionPanel style={{maxWidth: '55%', marginLeft: '22px'}} 
                            defaultExpanded={index === 0 ? true : false}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <div className="d-flex flex-wrap title" style={{color: '#00BFB2', fontSize: '2.5rem'}}>
                                            ORDER #{data.orderNumber}
                            </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className="row" style={{width: '550px'}}>
                                    {renderItems(data.items)}
                                </div>
                                <div className="row">
                                    <span style={{color: 'cadetblue', fontSize: '1.5rem'}}>DELIVERY {data.delivery}</span>
                                </div>
                                <div className="row" style={{color: '#00BFB2', fontSize: '1.5rem'}}>
                                        <span>SHIPPED</span>
                                        <span style={{color: 'cadetblue'}}>TOTAL</span>
                                        <span style={{ color: 'blue'}}>{data.total}</span>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
            </React.Fragment> )
        });

        return (
            <React.Fragment>
                <h5 style={{marginLeft: '21px', marginTop: '13px'}}>YOUR ORDERS</h5>               
                    {this.props.ordersInfo && renderOrder}
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(OrderSetting);