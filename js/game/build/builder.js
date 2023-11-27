function Builder() {
    const db_buildings  = new Buildings().GetBuildings();
    let built = [];
    let planned = [];

    this.GetBiuld = function (){
        return built;
    }
    this.GetPlanned = function (){
        return planned;
    }

    this.AddBuilding = function (building_key){
        built.push(db_buildings[building_key]);
    }

    this.TotalWorkerplace = function() {
        return built.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                sum = prop.workerplace;
            }
            return total + sum;
        }, 0);
    }
    this.TotalWorkerSalary = function() {
        return built.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                sum = prop.workerSalary;
            }
            return total + sum;
        }, 0);
    }
    this.PlannedBuildPrice = function() {
        return planned.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                sum = prop.price;
            }
            return total + sum;
        }, 0);
    }
    this.PlannedBuildTime = function() {
        return planned.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                sum = prop.constructionTime;
            }
            return total + sum;
        }, 0);
    }
    this.CalculateTotalBuildPar = function(property) {
        return built.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                sum = prop.parameters[property];
            }
            return total + sum;
        }, 0);
    }
    this.Work = function(population) {
        totalWorkerplaces = this.TotalWorkerplace();

        population = Utility.CheckNumber(population);
        let workers = totalWorkerplaces;
        if (totalWorkerplaces > population) {
            workers = population;
        }
        let unemployment = population - workers;
        return { workers: workers, unemployment: unemployment };
    }
    this.HomePlaces = function () {
        const totalWorkerHomePlace = built.reduce((total, building) => {
            return total + building.parameters.workerhomes;
        }, 0);
        const totalFamilyHomePlace = built.reduce((total, building) => {
            return total + building.parameters.familyhomes;
        }, 0);
        const totalEliteHomePlace = built.reduce((total, building) => {
            return total + building.parameters.elitephomes;
        }, 0);

        return { workerplaces: totalWorkerHomePlace, familyplaces: totalFamilyHomePlace, eliteplaces: totalEliteHomePlace };
    }
    this.WorkersCosts = function (population) {
        const work = this.Work(this.TotalWorkerplace(), population);
        let workers = work.workers;
        return built.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                if (workers >= prop.workerplace) {
                    sum = prop.workerplace * prop.workerSalary;
                    workers = workers - prop.workerplace;
                }
            }
            return total + sum / 4;
        }, 0);
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
        //TODO Сделать подсчет в зависимости от зп
        return { total: homeowners, homeless: homeless, barraks: barraks, eliteplaces: eliteplaces };
    }
    this.Build = function (selo, planned_buildings) {
        if (planned_buildings.length > 0) {
            for (var a in planned_buildings) {
                this.AddBuilding(planned_buildings[a]);
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
    this.CheckIfSingleBuildingExist = function (building_key, f_planned = false){
        return f_planned?planned.includes(db_buildings[building_key]):built.includes(db_buildings[building_key]);

    }
    this.AddPlannedBuilding = function (key) {
        planned.push(db_buildings[key]);
    }

    this.DeactivateBuilding = function(index) {
        built[index].active = false;
    }
    this.ActivateBuilding = function(index) {
        built[index].active = true;
    }

    this.DeletePlannedBuild = function(index) {
        if (planned.length > 0) {
            planned.splice(index, 1);
        }
    }

    this.CalculateTotalReq = function (buildings, property) {
        return this.CalculateTotalProd(buildings, property, requirements = true);
    }
    this.CalculateTotalProd = function (target_product, requirements = false) {
        let par_name = GV.BUILD_PAR_PRODUCTION ;
        if (requirements) {
            par_name = GV.BUILD_PAR_REQUIREMENTS;
        }
        return built.reduce((total, prop) => {
            let sum = 0;
            if (prop.active) {
                prop[par_name].forEach(function (self_product) {
                    if (self_product === target_product) {

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
}
