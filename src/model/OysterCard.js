import { OysterCardConfig } from "../misc/OysterCardConfig";
import TravelHandler from "./TravelHandler";

class OysterCard {
  constructor(user, initialAmount, startedStation, startedTransport){
    this.user=user;
    this.initialAmount=initialAmount;
    this.amount=initialAmount;
    this.log=[];
    this.started=new TravelHandler(startedStation, startedTransport);
    this.startJourney(this.started);
  }
  newJourney(station, transport){
    return this.addJourney(new TravelHandler(station, transport), true);
  }
  isSufficientAmountHasForNewJourney(){
    return this.amount > OysterCardConfig.highestAmountToCharge;
  }
  addJourney(travelHandler, executeBalanceClosure){
    this.amount-=travelHandler.getCharge();
    this.log[this.log.length]=travelHandler;
    if(true===executeBalanceClosure && this.balanceClosure!==undefined) this.balanceClosure(this.amount);
    return this;
  }
  startJourney(travelHandler){
    this.journeyStarted=true;
    this.addJourney(travelHandler, false);
    return this;
  }
  setBalanceClosure(balanceClosure){
    this.balanceClosure=balanceClosure;
    return this;
  }
  finishJourney(station){
    let lastIndex=this.log.length-1;
    if(lastIndex<0) throw new Error('Journey NOT Started Yet!!!');
    this.log[lastIndex].finish(station);
    this.amount=this.amount+this.log[lastIndex].getInitialChargedAmount()-this.log[lastIndex].getCharge();
    if(this.balanceClosure!==undefined) this.balanceClosure(this.amount);
    return this;
  }
  getLogs(){ return this.log; }
  getUser(){ return this.user; }
  getStartedStationName(){ return this.started.getEntryStationName(); }
  getStartedTransportationName(){ return this.started.getTransportName(); }
  getInitialAmount(){ return this.initialAmount; }
  getCurrentBalanceAmount(){ return this.amount; }
}

export default OysterCard;
