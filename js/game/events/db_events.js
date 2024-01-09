function Destiny() {
    const events = []
    this.GetEvents = function (){
        return events;
    }
    events.push(new SeloEvent({
            week:[0,0]
        },new EventAction(),
        "Моє вітаннячко. Ваша мета зробити з села місто. Бажаю гарної гри!"));
    events.push(new SeloEvent({
            migration:[1,100]
        },new EventAction(GV.ACTION_MIGRATION, 0),
        "До села приєдналися нові люди!"));
    events.push(new SeloEvent({
            migration:[-100,-1]
        },new EventAction(GV.ACTION_MIGRATION, 0),
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
        },new EventAction(GV.ACTION_BALANCE, -500),
        "На вас напали розбійники та пограбували!",
        0.5));
    events.push(new SeloEvent({
            week:[3,100],
            protection:[0,2]
        },new EventAction(GV.ACTION_BALANCE, -600),
        "До вас прийшли 3 козаки з сусідньогь села та пограбували! Треба захист 3 чи більше.",
        0.3));
    events.push(new SeloEvent({
            week:[5,100],
            protection:[0,4]
        },new EventAction(GV.ACTION_BALANCE, -1000),
        "До вас прийшли 5 козаків з сусідньогь села та пограбували! Треба захист 5 чи більше.",
        0.2));
    events.push(new SeloEvent({
            week:[10,100],
            protection:[0,9]
        },new EventAction(GV.ACTION_BALANCE, -2000),
        "До вас прийшли 10 козаків з сусідньогь села та пограбували! Треба захист 5 чи більше.",
        0.1));
    events.push(new SeloEvent({
            week:[10,100],
            protection:[0,4],
            cossacks:[0,4]
        },new EventAction(GV.ACTION_BALANCE, -5000),
        "До вас в село пробралися якудза та пограбували! Треба захист 5 чи більше та козаків 5 чи більше.",
        0.5));
    events.push(new SeloEvent({//TODO если есть лихварня то не сможет забрать
            week:[1,9],
            prod_iron:[1,10000000],
            protection:[0,4]
        },new EventAction(GV.ACTION_BALANCE, -1000),
        "На вас напало місто та забрало частину бюджету! Треба захист 5 чи більше.",
        0.5));
    events.push(new SeloEvent({
            week:[10,10],
            prod_iron:[1,10000000],
            protection:[0,9]
        },new EventAction(GV.ACTION_BALANCE, -10000),
        "На вас напало місто та забрало частину бюджету! Треба захист 10 чи більше.",
        1));
    events.push(new SeloEvent({
            week:[20,20],
            prod_iron:[1,10000000],
            protection:[0,14]
        },new EventAction(GV.ACTION_BALANCE, -25000),
        "На вас напало місто та забрало частину бюджету! Треба захист 15 чи більше.",
        1));
}

