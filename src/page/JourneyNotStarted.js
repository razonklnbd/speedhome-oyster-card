import React,{Component} from "react";
import NewJourney from "../component/NewJourney";
class JourneyNotStarted extends Component {
  constructor(props){
    super(props);
    this.startJourney=this.startJourney.bind(this);
  }
  startJourney(station, transport) {
    this.props.startJourney(station, transport);
    return this;
  }
  render() {
    return (
      <div>
        <h1>Journey Not Started Yet!!!</h1>
        <p><NewJourney startJourney={this.startJourney} /></p>
      </div>
    );
  }
}
export default JourneyNotStarted;
