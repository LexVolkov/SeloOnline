function Destiny() {
    const events = []
    this.GetEvents = function (){
        return events;
    }
    events.push(new SeloEvent({
            week:[0,0]
        },new EventAction(),
        "Моє вітаннячко. Бажаю гарної гри!"));
    events.push(new SeloEvent({
            migration:[1,100]
        },new EventAction(GV.ACTION_MIGRATION, 0),
        "До села приєдналися нові люди!"));
    events.push(new SeloEvent({
            migration:[-100,-1]
        },new EventAction(),
        "Прикро, але деякі люди пішли з села!"));
    events.push(new SeloEvent({
            money:[-10000,-1]
        },new EventAction(),
        "Ваше село збанкротіло! Візміть кредит, або вас викупить друге село!"));
    events.push(new SeloEvent({
            money:[-1000000,-10000]
        },new EventAction(),
        "Ви програли!"));
    events.push(new SeloEvent({
            week:[1,100],
            protection:[0,0]
        },new EventAction(GV.ACTION_BALANCE, -100),
        "На вас напали розбійники та пограбували!",
        0.1));
    events.push(new SeloEvent({
            prod_iron:[1,10000000],
            protection:[0,3],
            cossacks:[0,1]
        },new EventAction(GV.ACTION_BALANCE, -1000),
        "До вас прийшов мер міста подивитися на копальні, та забрав частину бюджету!",
        0.1));
}

