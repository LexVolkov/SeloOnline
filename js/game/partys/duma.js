function Duma() {
    const parties = [new Party(GV.PARTY_TITLE_KOZAKS, "", "", GV.PARTY_START_MEMBERS_KOZAKS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_FARMMANS, "", "", GV.PARTY_START_MEMBERS_FARMMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_CHURCHMANS, "", "", GV.PARTY_START_MEMBERS_CHURCHMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_TRADES, "", "", GV.PARTY_START_MEMBERS_TRADES, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_FREEMANS, "", "", GV.PARTY_START_MEMBERS_FREEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0),
                    new Party(GV.PARTY_TITLE_HANDMADEMANS, "", "", GV.PARTY_START_MEMBERS_HANDMADEMANS, GV.PARTY_BASIC_HAPPINESS, GV.PARTY_PARTYMAN_BASIC_SALARY, 0)
                    ];

    this.GetPatrys = function (){
        return parties;
        }
    this.PartyHappiness = function (church_happiness) {
        return (parties.reduce((total, party) => {
            return total + this.CalculateHappiness(church_happiness, party)
        }, 0)).toFixed(2);
    }
    this.CalculateHappiness = function(church_happiness, party){
        const population = this.Population();
        let total_happiness = 0;
        const building_happiness = party.title === GV.PARTY_TITLE_CHURCHMANS ?
            Number(party.happiness + church_happiness) :
            Number(party.happiness);
        const modificator = Number(party.members / population)
        total_happiness = (GV.PARTY_BASIC_HAPPINESS - building_happiness)*modificator;
        return total_happiness;
    }
    this.Population = function() {
        return (parties.reduce((total, party) => {
            return total + party.members;
        }, 0)).toFixed(0);
    }

    this.MinistersCosts = function() {
        let total_ministers_salary = parties.reduce((total, prop) => { return total + prop.salary; }, 0);
        return (Number(total_ministers_salary) + Number(GV.PARTY_MAIMMAN_SALARY))/4;
    }
    this.UpdatePopulation = function(total_happiness){
        let levelInfo = GV.FORMULA_HAPPINESS.find(level => total_happiness >= level.lvl);
        const migrants =  levelInfo ? levelInfo.migrants : 0;
        if(migrants === 0) return;
        if(migrants > 0){
            const maxHappiness = Math.max(...parties.map(party => party.happiness));
            const happiestParties = parties.filter(party => party.happiness === maxHappiness);
            if(happiestParties.length >1){
                const maxMembers = Math.max(...happiestParties.map(party => party.members));
                const bestMembershipParties = happiestParties.filter(party => party.members === maxMembers);
                distributeMigrants(bestMembershipParties, migrants);
            }else{
                distributeMigrants(happiestParties, migrants);
            }
        }else{
            const minHappiness = Math.min(...parties.map(party => party.happiness));
            const nothappiesParties = parties.filter(party => party.happiness === minHappiness);
            distributeMigrants(nothappiesParties, migrants);
        }
        function distributeMigrants(arr_parties, migrants) {
            let remainingMigrants = Math.abs(migrants);
            // Распределяем оставшихся мигрантов случайным образом
            while (remainingMigrants > 0) {
                const randomIndex = Math.floor(Math.random() * arr_parties.length);
                if (migrants > 0) {
                    arr_parties[randomIndex].members += 1;
                } else if (migrants < 0) {
                    arr_parties[randomIndex].members -= 1;
                } else {
                    continue; // если прибавление или вычитание не возможно, пропускаем итерацию
                }
                remainingMigrants--;
            }
        }
    }
}









