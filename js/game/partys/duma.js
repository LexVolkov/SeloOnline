function Duma() {
    let parties = new Parties().GetParties();

    this.GetPatrys = function (){
        return parties;
    }
    this.SetPatrys = function (data){
        parties = data.map(party => new Party(
            party.title,
            party.nikname,
            party.tasks,
            party.members,
            party.happiness,
            party.salary,
            party.offshores));
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
            Number(church_happiness) :
            0;
        const current_happiness = Number(party.happiness)+building_happiness;
        const modificator = Number(party.members / population)
        total_happiness = (current_happiness - GV.PARTY_BASIC_HAPPINESS)*modificator;
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
    this.CheckTasks = function (arr_build_keys, week){
        parties.forEach(party => {
            arr_build_keys.forEach(key => {
                const task_key = GetTaskKey(week);
                if(party.tasks[task_key] === key){
                    party.tasks[task_key] = "";
                }
            })
        })
    }
    function GetTaskKey(week){
        let week_key = Number(Math.ceil(week / GV.TASK_WEEK)-1);
        week_key = week_key===-1?0:week_key;
        return week_key;
    }
    this.UpdateTasks = function (week){
        if (week % GV.TASK_WEEK === 0) {
            const task_key = GetTaskKey(week);
            parties.forEach(party => {
                if(party.tasks[task_key] === ""){
                    UpdateJoyLvl(party, GV.PARTY_INCREMENT_JOY);
                }else{
                    UpdateJoyLvl(party, GV.PARTY_DECREMENT_JOY);
                }
            })
        }
    }
    function UpdateJoyLvl(party, value){
        party.happiness += value;
    }

}









