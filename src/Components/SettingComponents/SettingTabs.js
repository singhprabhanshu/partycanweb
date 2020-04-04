import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import TextsmsIcon from '@material-ui/icons/Textsms';
const styles = theme => ({
    
});

class SettingTabs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "",
            renderTabs: [],
            tabData: [ { tabName : 'user', icon: <PersonOutlineIcon style={{ fontSize: 25 }}/>, label: 'User'},
                        { tabName : 'orders', icon: <ArtTrackIcon style={{ fontSize: 25 }}/>, label: 'Orders'},
                        { tabName : 'chat', icon: <TextsmsIcon style={{ fontSize: 25 }}/>, label: 'Live Chat'}
                    ]
        }
      }

    componentDidMount(){
        this.rendertabs(this.state.tabData);
    }

    rendertabs = (data) => {
        const { classes } = this.props;
        let renderTabs = []
        data && data.map((tab,index)=>{
            renderTabs.push(
            <Tab onClick={()=>this.props.handleTabChange(index, tab.tabName)} icon={tab.icon} key={index}
             className={classes.tabColor}/>)
        })
        this.setState({ renderTabs })
    }

    render() {
        const { classes } = this.props;
        const { selectedTab } = this.state;
        return (
            <React.Fragment>
              
                    <Tabs
                        value={this.props.tabValue}
                        variant="standard"
                        aria-label="tabs"
                        className="product-tabs"
                    >
                        {this.state.renderTabs}
                    </Tabs>
              
            </React.Fragment>
          );
     }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(withStyles(styles)(SettingTabs));