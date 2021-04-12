import React,{Component} from "react";
import OysterCard from "./model/OysterCard";
import JourneyNotStarted from './page/JourneyNotStarted';
import TravelInProgress from "./page/TravelInProgress";
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {journeyStarted: false};
    this.startJourney = this.startJourney.bind(this);
    this.endJourney = this.endJourney.bind(this);
  }
  startJourney(station, transport) {
    this.card=new OysterCard('Mr. X', 30, station, transport);
    this.setState({journeyStarted: true});
    return this;
  }
  endJourney() {
    this.setState({journeyStarted: false});
    return this;
  }
  render() {
    if (true === this.state.journeyStarted) {
      return (
        <TravelInProgress startOver={this.endJourney} card={this.card} />
      );
    }
    return (
      <JourneyNotStarted startJourney={this.startJourney} />
    );
  }
}

export default App;
