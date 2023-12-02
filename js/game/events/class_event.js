function SeloEvent(conditions, action, message, loop){
    this.conditions = {};
    this.loop = loop;
    this.action  = action;
    this.message =  message;
}