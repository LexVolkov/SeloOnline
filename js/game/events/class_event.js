function SeloEvent(conditions, action, message, random = 1){
    this.conditions = conditions;
    this.event_action  = action;
    this.message =  message;
    this.random = random;
    this.data = {title:"", value:""};
}