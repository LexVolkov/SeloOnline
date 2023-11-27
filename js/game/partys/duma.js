function Duma() {
    const parties = [new Party(GV.PARTY_TITLE_KOZAKS, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_FARMMANS, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_CHURCHMANS, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_TRADES, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_FREEMANS, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_HANDMADEMANS, "", "", GV.PARTY_START_MEMBERS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0)
                    ];

    this.GetPatrys = function (){
        return parties;
        }
    this.PartyHappiness = function (church_happiness) {
        return (parties.reduce((total, prop) => {
            return total + this.CalculateHappyness(church_happiness, prop)
        }, 0)).toFixed(2);
    }
    this.CalculateHappyness = function(church_happiness, prop){
        const population = this.Population();
        let total_happiness = 0;
        const building_happiness = prop.title == GV.PARTY_TITLE_CHURCHMANS ?
            Number(prop.happiness + church_happiness) :
            Number(prop.happiness);
        const modificator = Number(prop.members / population)
        total_happiness = (GV.PARTY_BASIC_HAPPINESS - building_happiness)*modificator;
        return total_happiness;
    }
    this.Population = function () {
        return (parties.reduce((total, prop) => {
            return total + prop.members;
        }, 0)).toFixed(2);
    }

    this.MinistersCosts = function () {
        let total_ministers_salary = parties.reduce((total, prop) => { return total + prop.salary; }, 0);
        return (Number(total_ministers_salary) + Number(GV.PARTY_MAIMMAN_SALARY))/4;
    }

}









