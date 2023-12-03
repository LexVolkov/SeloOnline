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
    events.push(new SeloEvent(new Conditions({
            migration:1
        }),new EventAction(GV.ACTION_MIGRATION, 0),
        "До села приєдналися нові люди!",
        100000));
    events.push(new SeloEvent(new Conditions({
            migration:-1
        }),new EventAction(),
        "Прикро, але деякі люди пішли з села!",
        100000));
    events.push(new SeloEvent(new Conditions({
            money:-1
        }),new EventAction(),
        "Ваше село збанкротіло! Візміть кредит, або вас викупить друге село!",
        100000));
    events.push(new SeloEvent(new Conditions({
            money:-10000
        }),new EventAction(),
        "Ви програли!",
        100000));
    events.push(new SeloEvent(new Conditions({
            week:1,
            protection:0
        }),new EventAction(GV.ACTION_BALANCE, -10),
        "На вас напали розбійники та пограбували!",
        3,
        0.1));
}

