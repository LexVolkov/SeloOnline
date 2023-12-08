function Builder() {
    const db_buildings  = new Buildings().GetBuildings();
    let built = [];
    let planned = [];

    this.GetActiveBuildings = function (){
        return built.filter(structure => structure.active).map(structure => structure.building);
    }
    this.GetDeActiveBuildings = function (){
        return built.filter(structure => !structure.active).map(structure => structure.building);
    }
    this.GetConstructs = function (){
        return built;
    }
    this.SetConstructs = function (built_data){
        built = built_data.map(structure => {
            let copy = new Structure(structure.building);
            copy.id = structure.id; // Копирование id
            copy.active = structure.active; // Копирование active
            return copy;
        });
    }
    this.GetPlanned = function (){
        return planned;
    }

    this.AddBuildingFromKey = function (building_key){
        this.AddBuilding(db_buildings[building_key]);
    }
    this.AddBuilding = function (building){
        built.push(new Structure(building));
    }
    this.TotalWorkerplace = function() {
        return built.reduce((total, structure) => {
            let sum = 0;
            if (structure.active) {
                sum = structure.building.workerplace;
            }
            return total + sum;
        }, 0);
    }
    this.TotalPlannedBuildPrice = function() {
        let sum = 0;
        return planned.reduce((total, building) => {
            sum = building.price;
            return total + sum;
        }, 0);
    }
    this.TotalPlannedBuildTime = function() {
        let sum = 0;
        return planned.reduce((total, building) => {
            sum = building.constructionTime;
            return total + sum;
        }, 0);
    }
    this.CalculateTotalBuildPar = function(property) {
        return built.reduce((total, structure) => {
            let sum = 0;
            if (structure.active) {
                sum = structure.building.parameters[property];
            }
            return total + sum;
        }, 0);
    }
    this.Work = function(population) {
        totalWorkerplaces = this.TotalWorkerplace();
        let workers = totalWorkerplaces;
        if (totalWorkerplaces > population) {
            workers = population;
        }
        let unemployment = population - workers;
        return { workers: workers, unemployment: unemployment };
    }
    this.HomePlaces = function () {
        const totals = built.reduce((total, structure) => {
            const params = structure.building.parameters;
            total.workerplaces += params.workerhomes;
            total.familyplaces += params.familyhomes;
            total.eliteplaces += params.elitehomes;
            return total;
        }, { workerplaces: 0, familyplaces: 0, eliteplaces: 0 });

        return totals;
    };
    this.WorkersCosts = function (population) {
        const work = this.Work(population);
        let workers = work.workers;
        let total_sum = built.reduce((total, structure) => {
            const building = structure.building;
            let sum = 0;
            if (structure.active) {
                if (workers >= building.workerplace) {
                    sum = building.workerplace * building.workerSalary;
                    workers = workers - building.workerplace;
                }
            }
            return total + sum;
        }, 0);
        return total_sum / 4;
    }
    this.Homeowners = function (population) {
        const homeplace = this.HomePlaces();
        const work = this.Work(population);
        const workers = work.workers;

        let totalHomaPlace = homeplace.workerplaces + homeplace.familyplaces + homeplace.eliteplaces;

        let homeowners = totalHomaPlace;
        if (totalHomaPlace > population) {
            homeowners = population;
        }
        let homeless = population - homeowners;

        let barraks = homeplace.workerplaces;
        if (homeplace.workerplaces > workers) {
            barraks = workers;
        }

        let eliteplaces = homeplace.eliteplaces;
        if (homeplace.eliteplaces > population) {
            eliteplaces = population;
        }
        //TODO-- Доделать!!! Чтобы он считал каждое жилье по разному
        return { total: homeowners, homeless: homeless, barraks: barraks, eliteplaces: eliteplaces };
    }
    this.Build = function () {

        let arr_build = [];
        planned.forEach(pl_b =>
        {
            for (const db_bKey in db_buildings) {
                if(db_buildings[db_bKey] === pl_b){
                    arr_build.push(db_bKey);
                }
            }
        });
        planned.forEach(building => this.AddBuilding(building));
        planned.length = 0;

        return arr_build;
    }
    this.DisableBuildingsWithoutWorkers = function(population) {
        const work = this.Work(population);
        let workers = work.workers;
        for (const i in built) {
            const structure = built[i];
            const building = structure.building;
            if (structure.active) {
                if (workers >= building.workerplace) {
                    workers = workers - building.workerplace;
                } else {
                    structure.active = false;
                }
            }
        }
    }
    this.CheckRequirements = function (requirements) {
        for (let i = 0; i < requirements.length; i++) {
            const requirements_product = requirements[i];
            const total_requirement_product_amount = this.CalculateTotalProd(requirements_product);
            if (total_requirement_product_amount === 0) {
                return false;
            }
        }
        return true;
    }
    this.CheckIfSingleBuildingExist = function (building_key, f_planned = false) {
        const building = db_buildings[building_key];
        if (f_planned) {
            return planned.includes(building);
        } else {
            return built.some(structure => structure.building === building);
        }
    };
    this.AddPlannedBuilding = function (key) {
        planned.push(db_buildings[key]);
    }

    this.DeactivateBuilding = function(bid) {
        built.forEach((structure)=>{if(structure.id===bid)structure.active=false});
    }
    this.ActivateBuilding = function(bid) {
        built.forEach((structure)=>{if(structure.id===bid)structure.active=true});
    }

    this.DeletePlannedBuild = function(index) {
        if (planned.length > 0) {
            planned.splice(index, 1);
        }
    }
    this.CalculateTotalProd = function (target_product, requirements = false) {
        let par_name = GV.BUILD_PAR_PRODUCTION ;
        if (requirements) {
            par_name = GV.BUILD_PAR_REQUIREMENTS;
        }
        return built.reduce((total, structure) => {
            let sum = 0;
            if (structure.active) {
                structure.building[par_name].forEach(function (self_product) {
                    //console.log(self_product, target_product)
                    if (self_product.tittle === target_product.tittle) {

                        sum += self_product.base_amount;
                    }
                });
            }
            return total + sum;
        }, 0);
    }
    this.GetGroupedArray = function(){
        const result = {};
        // Преобразование объекта в массив пар [ключ, значение]
        const buildingArray = Object.entries(db_buildings);
        buildingArray.sort((a, b) => a[1].type.localeCompare(b[1].type));

        buildingArray.forEach(([key, value]) => {
            // Если тип ещё не был добавлен в результат, создаём новый массив
            if (!result[value.type]) {
                result[value.type] = [];
            }
            // Добавляем текущий элемент в массив для его типа
            result[value.type].push({ key, ...value });
        });

        // Сортировка каждого массива по title
        for (const type in result) {
            result[type].sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }
    this.GetTaskTitle = function (task){
        if(task === "" || undefined){
            return "Виконано";
        }else{
            return db_buildings[task].title;
        }

    };
}
