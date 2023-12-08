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
                "watchplace",
                "smear",
                "kazarms",
                "smear",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_FARMMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_CHURCHMANS, "",
            [
                "church",
                "wall",
                "lumberyard",
                "wall",
                "smear",
                "farmstead",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_CHURCHMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_TRADES, "",
            [
                "stable",
                "sunflower",
                "smear",
                "brracks",
                "farm",
                "smear",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_TRADES, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_FREEMANS, "",
            [
                "taverna",
                "brracks",
                "lumberyard",
                "wheat",
                "smear",
                "farmstead",
                "farmstead"
            ], GV.PARTY_START_MEMBERS_FREEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
        new Party(GV.PARTY_TITLE_HANDMADEMANS, "",
            [
                "mine",
                "tartak",
                "brracks",
                "mine",
                "smear",
                "wheat",
                "mine"
            ], GV.PARTY_START_MEMBERS_HANDMADEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0)
    ];
    this.GetParties = function(){
        return parties;
    }
}