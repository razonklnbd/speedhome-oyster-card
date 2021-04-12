import React from "react";
import Station from "../model/Station";
import TransportButton from "./TransportButton";
import ZoneStationSelect from "./ZoneStationSelect";

class NewJourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"station": new Station(), "msg": ""};
    this.startJourney = this.startJourney.bind(this);
    this.setStation = this.setStation.bind(this);
  }
  setStation(station) {
    this.setState({"msg": "", "station": station});
    return this;
  }
  startJourney(transport) {
    if(this.state.station.isValid()) this.props.startJourney(this.state.station, transport);
    else this.setState({"msg": "NO Valid Station Selected!!!"});
    return this;
  }
  render(){
    let msg2show='';
    if(this.state.msg.length>0) msg2show=<span>ERROR: <strong>{this.state.msg}</strong></span>;
    return (
      <>
        {msg2show}
        <ZoneStationSelect selectedStation={this.state.station} setStation={this.setStation} />
        <TransportButton onClick={this.startJourney} />
      </>
    );
  }
}

export default NewJourney;
