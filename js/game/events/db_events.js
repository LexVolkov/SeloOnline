function Destiny() {
    const events = []
    this.GetEvents = function (){
        return events;
    }
    events.push(new SeloEvent(new Conditions({
        week:0
    }),new EventAction(),
        "Моє вітаннячко. Бажаю гарної гри!",
        1));
}

