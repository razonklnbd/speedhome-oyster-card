import ZoneStationSelect from "../component/ZoneStationSelect";
import { OysterCardConfig } from "../misc/OysterCardConfig";

class TravelHandler {
  constructor(station, transport){
    this.start=station;
    this.transport=transport;
    this.initialChargedAmount=OysterCardConfig.highestAmountToCharge;
  }
  getEntryStationName(){
    return this.start.getName();
  }
  getTransportName(){
    return this.transport.getName();
  }
  getInitialChargedAmount(){ return this.initialChargedAmount; }
  getCharge(){
    if(this.chargedAmount===undefined) return this.initialChargedAmount;
    return this.chargedAmount;
  }
  getZoneCount(){
    let rtrn=1;
    if(this.destination!==undefined && this.destination.isValid()) rtrn=this.getZones().length;
    return rtrn;
  }
  getZones(){
    let zones=this.start.getZones();
    if(this.destination!==undefined && this.destination.isValid()){
      this.destination.getZones().map((zone)=>{
        let slctdZone=-1;
        zones.map((zn)=>{
          if(zn===zone) slctdZone=zone;
          return true;
        })
        if(slctdZone>0) zones[zones.length]=slctdZone;
        return true;
      });
    }
    return zones;
  }
  isZoneOneIncluded(){
    let rtrn=false;
    this.getZones().map((zone)=>{
      if(zone===1) rtrn=true;
      return true;
    });
    return rtrn;
  }
  finish(station){
    this.destination=station;
    this.chargedAmount=2.3;
    if(this.transport.isTube()){
      if(this.getZones().length>1){
        this.chargedAmount=3.2;
        if(this.getZones().length<3){
          this.chargedAmount=2.25;
          if(this.isZoneOneIncluded()) this.chargedAmount=3;
        }
      }else{
        this.chargedAmount=2;
        if(this.isZoneOneIncluded()) this.chargedAmount=2.5;
      }
    }
    console.log('desgination: '+this.destination.getName()+' | charge: '+this.chargedAmount);
    return this;
  }
  toHtml(key, setStation, finishOnClick, showFinishButton){
    let fnsh='';
    if(this.chargedAmount!==undefined) fnsh=', To: '+this.destination.getName();
    let fnshBttn='';
    if(this.chargedAmount===undefined && true===showFinishButton) fnshBttn=(
      <>
        <ZoneStationSelect setStation={setStation} />
        <button onClick={finishOnClick}>Finish</button>
      </>
    );
    return (
      <div key={key}>By: {this.transport.getName()}, From: {this.start.getName()}{fnsh}, Charged: {this.getCharge()} {fnshBttn}</div>
    );
  }
}

export default TravelHandler;
