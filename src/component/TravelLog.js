import React from "react";
import Station from "../model/Station";

class TravelLog extends React.Component {
  constructor(props){
    super(props);
    this.state = {"msg": ""};
    this.handleLogFinishClick=this.handleLogFinishClick.bind(this);
    this.setStation=this.setStation.bind(this);
  }
  handleLogFinishClick(e){
    let validFinishSelected=(this.finish!==undefined && true===this.finish.isValid());
    if(true===validFinishSelected){
      this.setState({'msg': ''});
      // console.log(e);
      this.props.card.finishJourney(this.finish);
    }else{
      this.setState({'msg': 'Station NOT Selected!!!'});
      // console.log('NOT a Valid Finish Station Selected!!!');
    }
  }
  setStation(station) {
    if(station.isValid()) this.finish=station;
    else this.finish=new Station();
    return this;
  }
  render(){
    let firstElement=true;
    let hndlFnshClck=this.handleLogFinishClick;
    let sttnSet=this.setStation;
    let errMessage='';
    if(this.state.msg.length>0) errMessage=<div>ERR: {this.state.msg}</div>;
    let logTable=this.props.card.getLogs().slice().reverse().map((travelHandler, idx)=>{
      let isFirstElement=false;
      if(true===firstElement) isFirstElement=true;
      firstElement=false;
      return travelHandler.toHtml(idx, sttnSet, hndlFnshClck, isFirstElement);
    });
    return (
      <>
        {errMessage}
        {logTable}
      </>
    );
  }
}

export default TravelLog;