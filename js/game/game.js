//TODO события в мире после перелистывания недели
//TODO первоначальная страница
//TODO нападение бандитов
//TODO виды жилья
//TODO сохранение данных
function Game(){
	let selo = {};
    let f_initGame = false;
    const display = new Display();
    const events = new Journal();
    let previous_population = 0;
    this.InitGame = function (startBalance, startBuildings) {
        selo = new Selo(startBalance, new Builder(), new Duma(), new Portfolio(),  new Offers());
        startBuildings.forEach((b) => {selo.buildings.AddBuildingFromKey(b);})
        previous_population = selo.partys.Population();
        f_initGame = true;
    }
    this.Start = function (){
        UpdateWeek();
    }
    function NextWeek() {
        const population = selo.partys.Population();
        previous_population = population;
        selo.week++;
        selo.balance = CalculateBalance();
        selo.buildings.Build();
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        selo.contracts.DecreaseContractPeriod();
        const joylvl_total = CalculateTotalHappiness().joylvl_total;
        selo.partys.UpdatePopulation(joylvl_total);
        UpdateWeek()
    }
    function UpdateWeek() {
        UpdateData();
        UpdateInfo();
        MakeDestiny();
    }
    function MakeDestiny(){
        const population = selo.partys.Population();
        const selo_data = {};
        selo_data.week = selo.week;
        selo_data.money = selo.balance;
        selo_data.production = GetCurrentProduction();
        selo_data.army = GetCurrentArmy();
        selo_data.migration = population - previous_population;
        selo_data.joylvl = CalculateTotalHappiness();
        const current_events = events.GetEvents(selo_data);
        if(current_events.length > 0){
            current_events.forEach((event)=>{
                console.log(event.message)
            })
        }

    }
    function CalculateBalance() {
        let result = selo.balance;
        const population = selo.partys.Population();
        const contract_profit = selo.contracts.GetProfitOnThisWeek();
        const costs_construction = selo.buildings.TotalPlannedBuildPrice();
        const costs_mainmans = selo.partys.MinistersCosts();
        const costs_workers = selo.buildings.WorkersCosts(population);
        const costs_total = costs_construction+costs_mainmans+costs_workers;
        result = result + contract_profit - costs_total;
        return result;
    }



    function UpdateData() {
        selo.offers.UpdateContracts(selo.week);
    }
    function UpdateInfo() {
        ShowHeader();
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
    function ShowHeader() {
        $(GV.ID_PAGE_WEEK_HEADER).html(display.DisplayMainPageTitle(selo.week));
    }
    function ShowPeopleInfo() {
        const population = selo.partys.Population();
        const workerplaces = selo.buildings.TotalWorkerplace()
        const work = selo.buildings.Work(population);
        const workers = work.workers;
        const unemployment = (work.unemployment / population * 100).toFixed(0) + "%";
        const homeowners = selo.buildings.Homeowners(population);
        const homeowners_total = homeowners.total;
        const homeless = ((homeowners.homeless / population) * 100).toFixed(0) + "%";
        $(GV.ID_IFNO_PEOPLE).html(display.DisplayPeople(population, workerplaces, workers, unemployment, homeowners_total, homeless));
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
        const army = GetCurrentArmy();
        const header = army.protection + "/" + army.cossacks + "/" + army.guns;
        $(GV.ID_IFNO_ARMY).html(display.DisplayArmy(header, army.protection, army.cossacks, army.guns));
        UpdateCollapsible()
    }
    function GetCurrentArmy() {
        const protection = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_PROTECTION);
        const cossacks = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_COSSACKS);
        const guns = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_GUNS);

        return {protection:protection, cossacks:cossacks, guns:guns}
    }
    function ShowJoyInfo() {
        const total_happiness = CalculateTotalHappiness()
        $(GV.ID_IFNO_JOYLVL).html(display.DisplayJoy(
            total_happiness.joylvl_total,
            total_happiness.joylvl_unemployeds,
            total_happiness.joylvl_homeless,
            total_happiness.joylvl_parties,
            total_happiness.joylvl_buildings));
        UpdateCollapsible()
    }
    function CalculateTotalHappiness() {
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
        return {joylvl_total:joylvl_total, joylvl_unemployeds:joylvl_unemployeds, joylvl_homeless:joylvl_homeless, joylvl_parties:joylvl_parties, joylvl_buildings:joylvl_buildings};
    }
    function ShowBalanceInfo() {
        $(GV.ID_IFNO_BUDGET).html(display.DisplayBalance(selo.balance));
    }
    function CalculateHomelessJoyLvl(homeless) {
        return homeless > 90 ? -1 : homeless > 75 ? -0.75 : homeless > 50 ? -0.5 : homeless > 25 ? -0.25 : homeless > 1 ? 0 : 1;
    }
    function CalculateUnemploymentJoyLvl(unemployment) {
        return unemployment > 90 ? -1 : unemployment > 75 ? -0.75 : unemployment > 50 ? -0.5 : unemployment > 25 ? -0.25 : unemployment > 1 ? 0 : 1;
    }

    function ShowCostsInfo() {
        const population = selo.partys.Population();
        const costs_construction = selo.buildings.TotalPlannedBuildPrice();
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
        $(GV.ID_IFNO_PRODUCTION).html(display.DisplayProductions(GetCurrentProduction()));
        UpdateCollapsible();
    }
    function GetCurrentProduction() {
        let arr_data = [];
        for (var prod in PRODUCTIONS) {
            const total = selo.buildings.CalculateTotalProd(PRODUCTIONS[prod]);
            const title =  PRODUCTIONS[prod].tittle;
            if (total > 0)arr_data.push({title:title, value:total});
        }
        return arr_data;
    }
    function ShowPartysInfo() {
        const population = selo.partys.Population();
        const partys = selo.partys.GetPatrys();
        const church_happiness = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CHURCH_HAPPINESS);
        $(GV.ID_IFNO_PARTYS).html(display.DisplayPartys(partys, population, church_happiness));
        UpdateCollapsible();
    }
    function  ShowBuildingInfo(){
        const constructs = selo.buildings.GetConstructs();
        $(GV.ID_IFNO_BUILD_ACTIVE).html(display.DisplayBuildings(constructs, true));
        $(GV.ID_IFNO_BUILD_DEACTIVE).html(display.DisplayBuildings(constructs, false));
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
        const population = selo.partys.Population();
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        ShowPeopleInfo();
        ShowBuildingInfo();
        ShowJoyInfo();

    }
    this.OnActivateBuilding = function (i){
        selo.buildings.ActivateBuilding(i);
        const population = selo.partys.Population();
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        ShowPeopleInfo();
        ShowBuildingInfo();
        ShowJoyInfo();
    }
    this.OnDeletePlannedBuilding = function (i){
        selo.buildings.DeletePlannedBuild(i);
        ShowBuildingInfo();
        this.OnNextWeek();
    }

    function ShowOffersInfo(){
        const offers = selo.offers.GetOffersList();
        const contract_count = selo.contracts.GetContractCount();
        const caravans_count = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CARAVAN);
        const caravans_available = contract_count < caravans_count;
        const have_mail = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_MAIL) > 0;
        $(GV.ID_IFNO_OFFERS_LIST).html(display.DisplayOffersList(offers, caravans_available, have_mail, CheckProductAmountRequirements));
        UpdateCollapsible();
    }
    function CheckProductAmountRequirements(req_product, amount){
        const total_product_amount = selo.buildings.CalculateTotalProd(req_product);
        const total_contract_amount = selo.contracts.CalculateTotalProd(req_product);
        //console.log(amount,total_product_amount,total_contract_amount)
        return amount <= total_product_amount-total_contract_amount;
    }
    this.OnOpenAddContractPopup = function(cid){
        const contract = selo.offers.GetContractFromCID(cid);
        if(contract !== undefined){
            display.ShowAddContractPopUp(contract);
            $(GV.ID_OFFER_POPUP_DIALOG).popup("open");
        }else{
            console.error("Wrong cid:"+cid);
        }
    }
    this.OnAddContract = function(cid){
        const contract = selo.offers.GetContractFromCID(cid);
        const period = $(GV.ID_CONTRACT_SLIDER).val();
        selo.contracts.AddContract(contract.product,period,contract.amount);
        selo.offers.RemoveContract(contract);
        ShowContractInfo();
        ShowOffersInfo();
    }
    this.OnNextWeek = function (){
        let content = '';
        $(GV.ID_IFNO_NEXT_WEEK_HEADER).html(display.DisplayNWPHeader(selo.week));

        const contracts = selo.contracts.GetAllContracts();
        const txt_contracts = display.DisplayContracts(contracts, false);

        const contract_profit = selo.contracts.GetProfitOnThisWeek();

        const txt_balance = display.DisplayBalance(selo.balance);

        const population = selo.partys.Population();
        const costs_construction = selo.buildings.TotalPlannedBuildPrice();
        const time_construction = selo.buildings.TotalPlannedBuildTime();
        const costs_mainmans = selo.partys.MinistersCosts();
        const costs_workers = selo.buildings.WorkersCosts(population);
        const costs_total = costs_construction+costs_mainmans+costs_workers;
        const txt_costs = display.DisplayCosts(costs_total, costs_workers, costs_mainmans, costs_construction, false);
        const builders_count = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_BUILDERS);
        const planned_buildings = selo.buildings.GetPlanned();
        const txt_planned = display.DisplayPlannedBuildings(planned_buildings, false);
        const next_week_balance = selo.balance + contract_profit - costs_total;
        const txt_next_week_balance = display.DisplayNWPNextWeekBalance(next_week_balance)
        let txt_error = "";
        DisableNextWeekBut(false)
        if(costs_construction > selo.balance - costs_mainmans - costs_workers){
            txt_error += display.DisplayErrorCosts();
            DisableNextWeekBut(true);
        }
        const days_of_week = 7;
        const max_build_days = days_of_week * builders_count;
        if(time_construction > max_build_days){
            txt_error += display.DisplayNWPErrorBuilders(builders_count, time_construction, max_build_days);
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
        NextWeek();
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
