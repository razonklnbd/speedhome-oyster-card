class Station {
  setData(id, name, zones){
    this.id=id;
    this.name=name;
    this.zones=zones;
    return this;
  };
  getId(){ return this.id; }
  getName(){ return this.name; }
  isValid(){
    return (this.id !== undefined);
  }
  getZones(){
    return this.zones;
  }
  toOption(){
    return (
      <option key={this.id} value={this.id}>{this.name}</option>
    );
  }
}

export default Station;

