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
        $(GV.ID_IFNO_PEOPLE).html(display.DisplayPeople(population, workers, unemployment, homeowners_total, homeless));
        UpdateCollapsible();
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
        $(GV.ID_IFNO_HOMEOWNERS).html(display.DisplayHomeowners(header, kopanka_percent, barraks_percent, elite_percent));
        UpdateCollapsible();
    }
    function ShowArmyInfo() {
        const protection = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_PROTECTION);
        const cossacks = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_COSSACKS);
        const guns = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_GUNS);
        const header = protection + "/" + cossacks + "/" + guns;
        $(GV.ID_IFNO_ARMY).html(display.DisplayArmy(header, protection, cossacks, guns));
        UpdateCollapsible()
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
        $(GV.ID_IFNO_JOYLVL).html(display.DisplayJoy(joylvl_total, joylvl_unemployeds, joylvl_homeless, joylvl_parties, joylvl_buildings));
        UpdateCollapsible()
    }
    function ShowBalanceInfo() {
        $(GV.ID_IFNO_BUDGET).html(display.DisplayBalance(selo.balance));
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
        $(GV.ID_IFNO_COSTS).html(display.DisplayCosts(costs_total, costs_workers, costs_mainmans, costs_construction));
        UpdateCollapsible();
    }

    function UpdateCollapsible() {
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }

    function ShowContractInfo() {
        const contracts = selo.contracts.GetAllContracts();
        $(GV.ID_IFNO_CONTRACTS).html(display.DisplayContracts(contracts));
        UpdateCollapsible();
    }
    function ShowProductionInfo() {
        let arr_data = [];
        for (var prod in PRODUCTIONS) {
            const total = selo.buildings.CalculateTotalProd(PRODUCTIONS[prod]);
            const title =  PRODUCTIONS[prod].tittle;
            if (total > 0)arr_data.push({title:title, value:total});
        }
        $(GV.ID_IFNO_PRODUCTION).html(display.DisplayProductions(arr_data));
        UpdateCollapsible();
    }
    function ShowPartysInfo() {
        const population = selo.partys.Population();
        const partys = selo.partys.GetPatrys();
        const church_happiness = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CHURCH_HAPPINESS);
        $(GV.ID_IFNO_PARTYS).html(display.DisplayPartys(partys, population, church_happiness));
        UpdateCollapsible();
    }
    function  ShowBuildingInfo(){
        const built_buildings = selo.buildings.GetBiuld();
        $(GV.ID_IFNO_BUILD_ACTIVE).html(display.DisplayActiveBuildings(built_buildings));
        $(GV.ID_IFNO_BUILD_DEACTIVE).html(display.DisplayDeActiveBuildings(built_buildings));
        const planned_buildings = selo.buildings.GetPlanned();
        $(GV.ID_IFNO_BUILD_PLANNED).html(display.DisplayPlannedBuildings(planned_buildings));
        UpdateCollapsible();
    }
    this.OnOpenBuildingList = function(){
        const db_buildings = selo.buildings.GetGroupedArray();
        $(GV.ID_IFNO_BUILDINGS_LIST).html(display.UpdateBuildingList(db_buildings, CheckProductRequirements, CheckIfSingleBuildingExist));
        UpdateCollapsible();
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
        $(GV.ID_IFNO_OFFERS_LIST).html(display.DisplayOffersList(offers, caravans_available, have_mail));
        UpdateCollapsible();
    }
    this.OnOpenAddContractPopup = function(product_name,amount){
        display.ShowAddContractPopUp(product_name,amount);
        $(GV.ID_OFFER_POPUP_DIALOG).popup("open");
    }
    this.OnAddContract = function (product_name,amount){
        const period = $(GV.ID_CONTRACT_SLIDER).val();
        selo.contracts.AddContract(Warehouse.GetProductFromName(product_name),period,amount);
        ShowContractInfo();
        ShowOffersInfo();
    }
    this.OnNextWeek = function (){
        let content = '';
        $(GV.ID_IFNO_NEXT_WEEK_HEADER).html(display.ShowNWPHeader(selo.week));

        const contracts = selo.contracts.GetAllContracts();
        const txt_contracts = display.DisplayContracts(contracts, false);

        const contract_profit = selo.contracts.GetProfitOnThisWeek();

        const txt_balance = display.DisplayBalance(selo.balance);

        const population = selo.partys.Population();
        const costs_construction = selo.buildings.PlannedBuildPrice();
        const time_construction = selo.buildings.PlannedBuildTime();
        const costs_mainmans = selo.partys.MinistersCosts();
        const costs_workers = selo.buildings.WorkersCosts(population);
        const costs_total = costs_construction+costs_mainmans+costs_workers;
        const txt_costs = display.DisplayCosts(costs_total, costs_workers, costs_mainmans, costs_construction, false);
        const builders_count = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_BUILDERS);
        const planned_buildings = selo.buildings.GetPlanned();
        const txt_planned = display.DisplayPlannedBuildings(planned_buildings, false);
        const next_week_balance = selo.balance + contract_profit - costs_total;
        const txt_next_week_balance = display.ShowNWPNextWeekBalance(next_week_balance)
        let txt_error = "";
        DisableNextWeekBut(false)
        if(costs_construction > selo.balance - costs_mainmans - costs_workers){
            txt_error += display.ShowErrorCosts();
            DisableNextWeekBut(true);
        }
        const days_of_week = 7;
        const max_build_days = days_of_week * builders_count;
        if(time_construction > max_build_days){
            txt_error += display.ShowNWPErrorBuilders(builders_count, time_construction, max_build_days);
            DisableNextWeekBut(true);
        }
        content += txt_balance;
        content += txt_error;
        content += txt_next_week_balance;
        content += contracts.length>0?txt_contracts:"";
        content += txt_costs;
        content += planned_buildings.length > 0?txt_planned:"";
        $(GV.ID_IFNO_NEXT_WEEK).html(content)
        UpdateCollapsible();
    }
    this.OnNextWeekCalculate = function (){

    }
    function DisableNextWeekBut(disable) {
        if(disable){
            $(GV.ID_BUT_NEXT_WEEK_DONE ).addClass("ui-state-disabled")
        }else{
            $(GV.ID_BUT_NEXT_WEEK_DONE ).removeClass("ui-state-disabled")
        }
    }

    Game.isGameInit = function () {
        return f_initGame;
    }

}
