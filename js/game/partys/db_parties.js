function Parties() {
    let parties = [
        new Party(GV.PARTY_TITLE_KOZAKS, "",
            [
                "watchplace",
                "watchplace",
                "wall",
                "wall",
                "kazarms",
                "kazarms",
                "sich"
            ], GV.PARTY_START_MEMBERS_KOZAKS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_FARMMANS, "",
            [
                "beetroot",
                "farm",
                "mill",
                "oilmill",
                "moonshine_apparatus",
                "smear",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_FARMMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_CHURCHMANS, "",
            [
                "chapel",
                "church",
                "wall",
                "smear",
                "smear",
                "farmstead",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_CHURCHMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_TRADES, "",
            [
                "sunflower",
                "stable",
                "mail",
                "stealplace",
                "fair",
                "smear",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_TRADES, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_FREEMANS, "",
            [
                "lumberyard",
                "taverna",
                "korchma",
                "holiday_home",
                "house_of_builders",
                "brracks",
                "smear"
            ], GV.PARTY_START_MEMBERS_FREEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_HANDMADEMANS, "",
            [
                "mine",
                "tartak",
                "furniture_makers",
                "mine",
                "jewelry_workshop",
                "smithy",
                "mine"
            ], GV.PARTY_START_MEMBERS_HANDMADEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0)
    ];
    this.GetParties = function(){
        return parties;
    }
}