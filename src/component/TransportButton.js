import React from "react";
import Transport from "../model/Transport";

class TransportButton extends React.Component {
  constructor(props){
    super(props);
    this.bus=this.createTransport('bus', 'Bus');
    this.tube=this.createTransport('tube', 'Tube');
    this.handleClick=this.handleClick.bind(this);
  }
  createTransport(id, name){
    let station2rtrn=new Transport();
    return station2rtrn.setData(id, name);
  }
  handleClick(e){
    // console.log("e.target.dataSet.id: "+e.target.dataset.id);
    if('bus'===e.target.dataset.id) this.props.onClick(this.bus);
    else this.props.onClick(this.tube);
    return this;
  }
  render(){
    return (
      <>
        {this.bus.getButton(this.handleClick)}
        {this.tube.getButton(this.handleClick)}
      </>
    );
  }
}

export default TransportButton;
