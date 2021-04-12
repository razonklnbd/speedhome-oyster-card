class Transport {
  setData(id, name){
    this.id=id;
    this.name=name;
    return this;
  }
  isBus(){ return 'bus'===this.id; }
  isTube(){ return false===this.isBus(); }
  getId(){ return this.id; }
  getName(){ return this.name; }
  isValid(){
    return (this.id !== undefined);
  }
  getButton(onClickHandler){
    return <button onClick={onClickHandler} data-id={this.getId()}>by {this.getName()}</button>;
  }
}
export default Transport;