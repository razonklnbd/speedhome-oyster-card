import React from "react";
import NewJourney from "../component/NewJourney";
import TravelLog from "../component/TravelLog";

class TravelInProgress extends React.Component {
  constructor(props){
    super(props);
    this.state = {"balance": this.props.card.getCurrentBalanceAmount(), "msg": ""};
    this.fireBalanceChange=this.fireBalanceChange.bind(this);
    this.props.card.setBalanceClosure(this.fireBalanceChange);
    this.newJourney=this.newJourney.bind(this);
  }
  newJourney(station, transport){
    this.props.card.newJourney(station, transport);
    // this.setState({"balance": this.props.card.getCurrentBalanceAmount()});
    return this;
  }
  fireBalanceChange(balance){
    this.setState({"balance": balance});
    return this;
  }
  render(){
    let nJourney='';
    if(this.props.card.isSufficientAmountHasForNewJourney()) nJourney=<h2>New Journey: <NewJourney startJourney={this.newJourney} /></h2>;
    return (
      <>
        <h1>
          {this.props.card.getUser()} Started his/er journey from {this.props.card.getStartedStationName()} by {this.props.card.getStartedTransportationName()}
        </h1>
        <h2>Initial Amount: {this.props.card.getInitialAmount()}, Current Balance: {this.state.balance} <button onClick={this.props.startOver}>Start Over</button></h2>
        {nJourney}
        <div>
          <h2>Travel Log</h2>
          <TravelLog card={this.props.card} />
        </div>
      </>
    );
  }
}

export default TravelInProgress;