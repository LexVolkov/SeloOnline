function Game(){
	let selo = {};
    let f_initGame = false;
    const display = new Display();

    this.InitGame = function (startBalance, startBuildings) {
        selo = new Selo(startBalance, new Builder(), new Duma(), new Portfolio(),  new Offers());
        startBuildings.forEach((b) => {selo.buildings.AddBuilding(b);})

        f_initGame = true;
    }
    this.Start = function (){
        UpdateData();
        UpdateInfo();
    }
    function NextWeek() {
        selo.week++;
        $("#page_title").html(selo.week + " тиждень");
        selo.balance = CalculateBalance(selo, arr_planned_build);
        Build(selo, arr_planned_build);
        arr_planned_build = [];
        CheckBuildWorker(selo.buildings, Work(TotalWorkerplace(selo.buildings), Number(Population(Parties))).workers);
        ScrollContractPeriod(selo.contracts);
        UpdateData();
        UpdateInfo();
    }
    function CheckBuildWorker(buildings, workers) {
        for (var building in buildings) {
            if (building.active) {
                if (workers >= building.workerplace) {
                    workers = workers - building.workerplace;
                } else {
                    building.active = false;
                }
            }
        }
        //-- Доделать!!! Чтобы он считал каждое жилье по разному
    }
    function CalculateBalance() {

        let result = selo.balance;
        const build_costs = TotalPrice(planned_buildings);
        result -= build_costs;

        const population = selo.partys.Population();
        const totalWorkerplaces = TotalWorkerplace(selo.buildings);
        const workersCosts = WorkersCosts(selo.buildings, Work(totalWorkerplaces, population).workers);
        result -= workersCosts;
        const ministersCosts = MinistersCosts(Parties);
        result -= ministersCosts;
        const contract_sum = arr_contracts.reduce((sum, contract) => sum + (contract.amount * contract.product.price), 0);
        result += contract_sum;
        //console.log(result);

        return result;
    }




    function UpdateData() {
        selo.offers.UpdateContracts(selo.week);
    }

    function UpdateInfo() {
        ShowPeopleInfo();
        ShowHomeownersInfo();
        ShowArmyInfo();
        ShowJoyInfo();
        ShowBalanceInfo();
        ShowCostsInfo();
        ShowContractInfo();
        ShowProductionInfo();
        ShowPartysInfo();
        ShowBuildingInfo();
        ShowOffersInfo();

    }
    function ShowPeopleInfo() {
        const population = selo.partys.Population();
        const work = selo.buildings.Work(population);
        const workers = work.workers;
        const unemployment = (work.unemployment / population * 100).toFixed(0) + "%";
        const homeowners = selo.buildings.Homeowners(population);
        const homeowners_total = homeowners.total;
        const homeless = ((homeowners.homeless / population) * 100).toFixed(0);
        display.DisplayPeople(population, workers, unemployment, homeowners_total, homeless);
    }
    function ShowHomeownersInfo() {
        const population = selo.partys.Population();
        const homeowners = selo.buildings.Homeowners(population);
        const kopanka = homeowners.homeless
        const barraks = homeowners.barraks
        const elite = homeowners.eliteplaces
        const kopanka_percent = kopanka+" ("+((homeowners.homeless / population) * 100).toFixed(0)+"%)";
        const barraks_percent = barraks + " (" + ((homeowners.barraks / population) * 100).toFixed(0) + "%)";
        const elite_percent = elite + " (" + ((homeowners.eliteplaces / population) * 100).toFixed(0) + "%)";
        const header = kopanka + "/" + barraks + "/" + elite;
        display.DisplayHomeowners(header, kopanka_percent, barraks_percent, elite_percent);
    }
    function ShowArmyInfo() {
        const protection = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_PROTECTION);
        const cossacks = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_COSSACKS);
        const guns = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_GUNS);
        const header = protection + "/" + cossacks + "/" + guns;
        display.DisplayArmy(header, protection, cossacks, guns);
    }
    function ShowJoyInfo() {
        const joylvl_buildings = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_HAPPINESS);
        const church_happiness = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CHURCH_HAPPINESS)
        const joylvl_parties = selo.partys.PartyHappiness(church_happiness);
        const population = selo.partys.Population();
        const homeowners = selo.buildings.Homeowners(population);
        const homeless = Number(((homeowners.homeless / population) * 100).toFixed(0));
        const joylvl_homeless = CalculateHomelessJoyLvl(homeless);
        const work = selo.buildings.Work(population);
        const unemployment = Number((work.unemployment / population * 100).toFixed(0));
        const joylvl_unemployeds = CalculateUnemploymentJoyLvl(unemployment);
        const joylvl_total = Number(GV.BASIC_HAPPINESS) +
                                        Number(joylvl_unemployeds) +
                                        Number(joylvl_homeless) +
                                        Number(joylvl_parties) +
                                        Number(joylvl_buildings);
        display.DisplayJoy(joylvl_total, joylvl_unemployeds, joylvl_homeless, joylvl_parties, joylvl_buildings);
    }
    function ShowBalanceInfo() {
        display.DisplayBalance(selo.balance);
    }
    function CalculateHomelessJoyLvl(homeless) {
        return homeless > 90 ? -1 : homeless > 75 ? -0.75 : homeless > 50 ? -0.5 : homeless > 25 ? -0.25 : homeless > 1 ? 0 : 1.5;
    }
    function CalculateUnemploymentJoyLvl(unemployment) {
        return unemployment > 90 ? -1 : unemployment > 75 ? -0.75 : unemployment > 50 ? -0.5 : unemployment > 25 ? -0.25 : unemployment > 1 ? 0 : 1.5;
    }

    function ShowCostsInfo() {
        const population = selo.partys.Population();
        const costs_construction = selo.buildings.PlannedBuildPrice();
        const costs_mainmans = selo.partys.MinistersCosts();
        const costs_workers = selo.buildings.WorkersCosts(population);
        const costs_total = costs_construction+costs_mainmans+costs_workers;
        display.DisplayCosts(costs_total, costs_workers, costs_mainmans, costs_construction);
    }

    function ShowContractInfo() {
        const contracts = selo.contracts.GetAllContracts();
        display.DisplayContracts(contracts);
    }
    function ShowProductionInfo() {
        let arr_data = [];
        for (var prod in PRODUCTIONS) {
            const total = selo.buildings.CalculateTotalProd(PRODUCTIONS[prod]);
            const title =  PRODUCTIONS[prod].tittle;
            if (total > 0)arr_data.push({title:title, value:total});
        }
        display.DisplayProductions(arr_data);
    }
    function ShowPartysInfo() {
        const population = selo.partys.Population();
        const partys = selo.partys.GetPatrys();
        const church_happiness = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CHURCH_HAPPINESS);
        display.DisplayPartys(partys, population, church_happiness);
    }
    function  ShowBuildingInfo(){
        const built_buildings = selo.buildings.GetBiuld();
        display.DisplayActiveBuildings(built_buildings);
        display.DisplayDeActiveBuildings(built_buildings);
        const planned_buildings = selo.buildings.GetPlanned();
        display.DisplayPlannedBuildings(planned_buildings);

    }
    this.OnOpenBuildingList = function(){
        const db_buildings = selo.buildings.GetGroupedArray();
        display.UpdateBuildingList(db_buildings, CheckProductRequirements, CheckIfSingleBuildingExist);
        $.mobile.navigate(GV.ID_PAGE_ADD_BUILDING, {
            transition: "slide"
        });
    }
    function CheckIfSingleBuildingExist(building, f_planned = false){
        return selo.buildings.CheckIfSingleBuildingExist(building, f_planned);
    }
    function CheckProductRequirements(requirements){
        return selo.buildings.CheckRequirements(requirements);
    }
    this.OnAddPlannedBuilding = function(building_key){
        selo.buildings.AddPlannedBuilding(building_key);
        ShowCostsInfo();
        ShowBuildingInfo();
    }
    this.OnDeActivateBuilding = function (i){
        selo.buildings.DeactivateBuilding(i);
        ShowBuildingInfo();
    }
    this.OnActivateBuilding = function (i){
        selo.buildings.ActivateBuilding(i);
        ShowBuildingInfo();
    }
    this.OnDeletePlannedBuilding = function (i){
        selo.buildings.DeletePlannedBuild(i);
        ShowBuildingInfo();
    }

    function ShowOffersInfo(){
        const built_buildings = selo.buildings.GetBiuld();
        display.DisplayActiveBuildings(built_buildings);
        display.DisplayDeActiveBuildings(built_buildings);
        const offers = selo.offers.GetOffersList();
        const contract_count = selo.contracts.GetContractCount();
        const caravans_count = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CARAVAN);
        const caravans_available = contract_count< caravans_count;
        const have_mail = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_MAIL) > 0;
        display.DisplayOffersList(offers, caravans_available, have_mail);
    }
    this.OnOpenAddContractPopup = function(product_name,amount){
        display.ShowAddContractPopUp(product_name,amount)

    }
    this.OnAddContract = function (product_name,amount){
        const period = $(GV.ID_CONTRACT_SLIDER).val();
        selo.contracts.AddContract(Warehouse.GetProductFromName(product_name),period,amount);
        ShowContractInfo();
        ShowOffersInfo();
    }
    this.OnNextWeek = function (){

    }
    this.OnNextWeekCalculate = function (){

    }



    Game.isGameInit = function () {
        return f_initGame;
    }

}
