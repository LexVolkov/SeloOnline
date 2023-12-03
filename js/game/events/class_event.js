function SeloEvent(conditions, action, message, loop, random = 1){
    this.conditions = conditions;
    this.loop = loop;
    this.event_action  = action;
    this.message =  message;
    this.random = random;
    this.data = {title:"", value:""};
}