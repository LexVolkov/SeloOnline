//TODO первоначальная страница (ники министров)
// виды жилья
// кредит
// уровни сложности
// реалізувати лехварню
// реалізувати смерть та кладовище
// добавить событие, для завершения игры. Когда построена Ратуша
// добавить кнопку распечатки зданий
// если рабочий получает больлше 50, тогда он не может жить в бараках
// статистика, сколько рабочих получают больше 50 и больше 100
// Задания нумеровать и выдавать по порядку
// Редактировать бюджет и людей
// Інші села можуть запросити допомогу, та від рішення може здійснюватися різний сценарій
// Больше ур несчатья от безх і безроб
// Нападаючи забирають гроші та людей
// Добавить в события Болезни, наводнение, засухи и т.д.
// Механіка територій, у кожного будинку є кільк місяця які він займає та щоб ці территорії можна біло захоплювати
//
function Game(){
	let selo = {};
    let f_initGame = false;
    const display = new Display();
    const events = new Journal();
    let previous_population = 0;
    this.load_data = {};
    this.InitGame = function (startBalance, startBuildings) {
        selo = new Selo(startBalance, new Builder(), new Duma(), new Portfolio(),  new Offers());
        startBuildings.forEach((b) => {selo.buildings.AddBuildingFromKey(b);})
        f_initGame = true;
    }
    this.Start = function (){
        //window.history.pushState({}, document.title, "/index.html");
        $.mobile.navigate(GV.ID_PAGE_WEEK);
        previous_population = selo.partys.Population();
        UpdateWeek();
    }
    function NextWeek() {

        const population = selo.partys.Population();

        selo.week++;
        selo.balance = CalculateBalance();
        const build_keys = selo.buildings.Build();
        selo.partys.CheckTasks(build_keys, selo.week);
        selo.partys.UpdateTasks(selo.week);
        selo.contracts.DecreaseContractPeriod();
        const joylvl_total = CalculateTotalHappiness().joylvl_total;
        selo.partys.UpdatePopulation(joylvl_total);
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        UpdateWeek();
        SaveGame();
        previous_population = selo.partys.Population();

    }
    function UpdateWeek() {
        UpdateData();
        MakeDestiny();
        UpdateInfo();

    }
    function MakeDestiny(){
        const population = selo.partys.Population();
        const selo_data = {};
        selo_data.week = selo.week;
        selo_data.money = selo.balance;
        selo_data.prod_iron = selo.buildings.CalculateTotalProd(PRODUCTIONS.IRON)
        const army = GetCurrentArmy();
        selo_data.protection = army.protection;
        selo_data.cossacks = army.cossacks;
        selo_data.guns = army.guns;
        selo_data.migration = population - previous_population;
        selo_data.joylvl = CalculateTotalHappiness();
        const current_events = events.GetEvents(selo_data);
        $(GV.ID_INFO_EVENTS).html(display.DisplayEvents(current_events));
        current_events.forEach((event)=>{
            RunAction(event.event_action.action, event.event_action.value);
        })
    }
    function RunAction(action, value){
        if(action === GV.ACTION_BALANCE){
            selo.balance += value;
        }
    }
    this.OnCloseEventDialog =  function (){
        $(GV.ID_POPUP_DIALOG_MAIN).popup("close");
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
    function SaveGame() {
        let data = {};
        data.selo = PackSavedData(selo);
        localforage.setItem(GV.DB_STORE_NAME, data)
            .then(() => {
                console.log('Игра успешна сохранена.');
            })
            .catch(err => {
                console.error('Ошибка при сохранении игры:', err);
            });
    }
    function PackSavedData(selo_data) {
        let save_data = {};
        save_data.week = selo_data.week;
        save_data.balance = selo_data.balance;
        save_data.buildings = selo_data.buildings.GetConstructs();
        save_data.parties = selo_data.partys.GetPatrys();
        save_data.contracts = selo_data.contracts.GetAllContracts();

        return save_data;
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
    this.ShowStartSettings = function(){
        //const db_buildings = selo.buildings.GetGroupedArray();
        $(GV.ID_NEW_GAME).html(display.DisplayStartSettings());
        //$(GV.ID_NEW_GAME).html(display.DisplayStartSettings(display.UpdateBuildingList(db_buildings, CheckProductRequirements, CheckIfSingleBuildingExist, this.OnAddStartBuilding)));
        $.mobile.navigate(GV.ID_PAGE_NEW_GAME);
    }
    this.OnStartGame = function (){
        const startBalance =  Number($(GV.ID_START_BALANCE).val());
        const startBuildings = ["silrada","house_of_builders", "stable", "wheat"];
        this.InitGame(startBalance, startBuildings);
        this.Start();
    }
    this.OnAddStartBuilding = function (building_key){
        selo.buildings.AddPlannedBuilding(building_key);
    }
    this.LoadGame = function (){
        this.InitGame(0, []);
        if(Object.keys(this.load_data).length !== 0){
            UnPackSaveData(this.load_data);
            this.Start();
        } else {
            console.error("Нет данных для загрузки!");
        }
    }
    function UnPackSaveData(data) {
        let selo_data = data.selo;
        selo.week  = selo_data.week;
        selo.balance  = selo_data.balance;
        selo.buildings.SetConstructs(selo_data.buildings);
        selo.partys.SetPatrys(selo_data.parties);
        selo.contracts.SetContracts(selo_data.contracts);
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
        $(GV.ID_IFNO_BUDGET).html(display.DisplayBalance(selo.balance, false));
    }
    function CalculateHomelessJoyLvl(homeless) {
        return homeless > 90 ? -1 : homeless > 75 ? -0.75 : homeless > 50 ? -0.5 : homeless > 25 ? -0.25 : homeless > 1 ? 0 : 0;
    }
    function CalculateUnemploymentJoyLvl(unemployment) {
        return unemployment > 90 ? -1 : unemployment > 75 ? -0.75 : unemployment > 50 ? -0.5 : unemployment > 25 ? -0.25 : unemployment > 1 ? 0 : 0;
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
        for (const prod in PRODUCTIONS) {

            const total = selo.buildings.CalculateTotalProd(PRODUCTIONS[prod]);
            //console.log(prod,total)
            const title =  PRODUCTIONS[prod].tittle;
            if (total > 0)arr_data.push({title:title, value:total});
        }
        return arr_data;
    }
    function ShowPartysInfo() {
        const population = selo.partys.Population();
        const partys = selo.partys.GetPatrys();
        const church_happiness = selo.buildings.CalculateTotalBuildPar(GV.BUILD_PAR_CHURCH_HAPPINESS);
        const week = selo.week;
        $(GV.ID_IFNO_PARTYS).html(display.DisplayPartys(partys, population, church_happiness, week, GetTaskTitle));
        UpdateCollapsible();
    }
    function GetTaskTitle(task){
        return  selo.buildings.GetTaskTitle(task);
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

        $(GV.ID_IFNO_BUILDINGS_LIST).html(display.UpdateBuildingList(db_buildings, CheckProductRequirements, CheckIfSingleBuildingExist,"OnAddPlannedBuilding"));
        UpdateCollapsible();

        console.log()
    }
    function CheckIfSingleBuildingExist(building, f_planned = false){
        return selo.buildings.CheckIfSingleBuildingExist(building, f_planned);
    }
    function CheckProductRequirements(requirements){
        return selo.buildings.CheckRequirements(requirements);
    }

    this.OnAddPlannedBuilding = function(building_key){
        selo.buildings.AddPlannedBuilding(building_key);
        UpdateInfo();
    }
    this.OnDeActivateBuilding = function (i){
        selo.buildings.DeactivateBuilding(i);
        const population = selo.partys.Population();
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        UpdateInfo();

    }
    this.OnActivateBuilding = function (i){
        selo.buildings.ActivateBuilding(i);
        const population = selo.partys.Population();
        selo.buildings.DisableBuildingsWithoutWorkers(population);
        UpdateInfo()
    }
    this.OnDeletePlannedBuilding = function (i){
        selo.buildings.DeletePlannedBuild(i);
        UpdateInfo();
        this.OnNextWeek();
    }
    this.OnEditBalance = function () {
        $(GV.ID_IFNO_BUDGET).html(display.DisplayBalance(selo.balance, true));
    }
    this.OnSaveBalance = function () {
        selo.balance = Number($(GV.ID_EDIT_BUDGET).val());
        $(GV.ID_IFNO_BUDGET).html(display.DisplayBalance(selo.balance, false));
        SaveGame();
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
        const total_contract_amount = selo.contracts.CalculateTotalProdFromContracts(req_product);
        //console.log(amount,total_product_amount,total_contract_amount)
        return amount <= total_product_amount-total_contract_amount;
    }
    this.OnOpenAddContractPopup = function(cid){
        const contract = selo.offers.GetContractFromCID(cid);
        if(contract !== undefined){
            $(GV.ID_INFO_POPUP).html(display.ShowAddContractPopUp(contract));
            $(GV.ID_PAGE_WEEK ).trigger('create');
            $(GV.ID_POPUP_DIALOG_MAIN).popup("open");
        }else{
            console.error("Wrong cid:"+cid);
        }
    }
    this.OnAddContract = function(cid){
        const contract = selo.offers.GetContractFromCID(cid);
        const period = $(GV.ID_CONTRACT_SLIDER).val();
        selo.contracts.AddContract(contract.product,period,contract.amount);
        selo.offers.RemoveContract(contract);
        UpdateInfo();
        this.OnCloseEventDialog();

    }
    this.OnNextWeek = function (){
        UpdateInfo();
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
        if(costs_construction > selo.balance + contract_profit){
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
