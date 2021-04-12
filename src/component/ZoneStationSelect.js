import React from "react";
import Station from "../model/Station";


class ZoneStationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.stations=[];
    this.stations[0]=this.createStation('holborn', 'Holborn', [1]);
    this.stations[1]=this.createStation('earl-court', 'Earl\'s Court', [1, 2]);
    this.stations[2]=this.createStation('wimbledon', 'Wimbledon', [3]);
    this.stations[3]=this.createStation('hammersmith', 'Hammersmith', [2]);
    if(props.selectedStation!==undefined && props.selectedStation.isValid()) this.setSelectedStation(props.selectedStation);
    this.setStation = this.setStation.bind(this);
    // console.log('zone station select constructor method execute completed');
  }
  createStation(id, name, zones){
    let station2rtrn=new Station();
    return station2rtrn.setData(id, name, zones);
  }
  setStation(e) {
    let newSelectedStation=new Station();
    this.stations.map((station)=>{
      if(station.getId()===e.target.value){
        newSelectedStation=station;
        return false;
      }
      return true;
    });
    this.props.setStation(newSelectedStation);
    return this;
  }
  setSelectedStation(station) {
    this.selectedStation=station;
    return this;
  }
  render() {
    return (
      <select onChange={this.setStation}>
        <option value="null">Please Select...</option>
        {this.stations.map((station)=>station.toOption())}
      </select>
    );
  }
}


export default ZoneStationSelect;
