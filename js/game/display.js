function Display() {
    function CreateCollapsible(header, arr_col_data) {//[{title:"",value:0}]
        let content = "";
        content += '<div class="col" data-role="collapsible" data-collapsed="true" align="left">';
        content += '<h4>' + header + '</h4>';

        content += '<div class="ui-grid-a">';
        content += arr_col_data.map(data =>
            `<div class="ui-block-a"><div class="ui-bar ui-bar-b"><b>${data.title}</b></div></div> <div class="ui-block-b"><div class="ui-bar ui-bar-b">${data.value}</div></div> `).join('');

        content += '</div >';
        content += '</div >';

        return content;
    }

    function CreateCollapsibleset(col_content, header = ""){//[{title:"",arr_data:[]}]
        let content = "";
        if(header !== ""){
            content += `<div class="col" data-role="collapsible" data-collapsed="true">`
            content += `<h3 class="ui-bar ui-bar-b">${header}</h3>`;
        }
        content += `<div class="colset" data-role="collapsibleset" data-iconpos="left">`;
        content += col_content;
        content += '</div >';
        if(header !== ""){
            content += '</div >';
        }
        return content;
    }
    this.DisplayPeople = function (population, workers, unemployment, homeowners, homeless) {
        const header = `Населення: ${population}`;
        const arr_data = [
            { title: "Працюють: ", value: workers },
            { title: "Безробіття: ", value: unemployment},
            { title: "Мають дім: ", value: homeowners },
            { title: "Безхатьки: ", value: homeless }
        ];

        $(GV.ID_IFNO_PEOPLE).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayHomeowners = function (homeowners_total, kopanka, barraks, sadiba) {
        const header = `Проживання: ${homeowners_total}`;
        const arr_data = [
            { title: "Копанка: ", value: kopanka},
            { title: "Бараки: ", value: barraks},
            { title: "Садиба: ", value: sadiba }
        ];
        $(GV.ID_IFNO_HOMEOWNERS).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayArmy = function (army_total, protection, cossacks, guns) {
        const header = `Армія: ${army_total}`;
        const arr_data = [
            { title: "Захист міста: ", value: protection },
            { title: "Козаки: ", value: cossacks },
            { title: "Гармати: ", value: guns }
        ];
        $(GV.ID_IFNO_ARMY).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayJoy = function (joylvl_total, joylvl_unemployeds, joylvl_homeless, joylvl_parties, joylvl_buildings) {
        const header = `Рівень задоволення: ${joylvl_total}`;
        const arr_data = [
            { title: "Невдоволення безробітних: ", value: joylvl_unemployeds },
            { title: "Невдоволення безхатьків: ", value: joylvl_homeless },
            { title: "Середній рівень задоволення партій: ", value: joylvl_parties },
            { title: "Бонус від будинків: ", value: joylvl_buildings }
        ];
        $(GV.ID_IFNO_JOYLVL).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayBalance = function (balance) {
        $(GV.ID_IFNO_BUDGET).html(`<h3>Поточний бюджет села: ${GV.QCCOIN_PNG}${balance}</h3>`);
    }
    this.DisplayCosts = function (costs_total, costs_workers, costs_mainmans, costs_construction) {
        const header = `Витрати на наступний тиждень: ${costs_total}`;
        const arr_data = [
            { title: "З/П робітникам: ", value: costs_workers },
            { title: "З/П міністрам: ", value: costs_mainmans },
            { title: "Витрати на будівництво: ", value: costs_construction }
        ];
        $(GV.ID_IFNO_COSTS).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayContracts = function (contracts) {
        let arr_data = [];
        let total_sum = 0;
        contracts.forEach((contract) => {
            const title = contract.product.tittle+` [${contract.amount}]`;
            const contract_sum = contract.product.price * contract.amount;
            const val = `${GV.QCCOIN_PNG} ${contract_sum} на ${contract.period} тижні`;
            arr_data.push({title:title, value:val});
            total_sum += contract_sum;
        })

        const header = `Поточні контракти: ${GV.QCCOIN_PNG}${total_sum} (${contracts.length})`;
        if(contracts.length <= 0) arr_data.push({title:"Немає жодного контракту", value:""});
        $(GV.ID_IFNO_CONTRACTS).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayProductions = function (arr_data) {
        const header = `Видобуток:`;
       $(GV.ID_IFNO_PRODUCTION).html(CreateCollapsible(header, arr_data));
        $(".col").collapsible();
    }
    this.DisplayPartys = function (partys,population, church_happiness) {
        $(GV.ID_IFNO_PARTYS).empty();
        const header = "Партії";
        let arr_colset_data = [];
        partys.forEach((party) => {
            const arr_data = [];
            const popularity = (party.members / population * 100).toFixed(0);
            const party_happiness = party.title === GV.PARTY_TITLE_CHURCHMANS ? party.happiness + church_happiness : party.happiness;
            const party_happiness_mod = ((party_happiness - GV.PARTY_BASIC_HAPPINESS) * (party.members / population)).toFixed(2);
            const happiness = party_happiness + " (" + party_happiness_mod + ")";

            arr_data.push({title:"Рівень щастя:", value:happiness});
            arr_data.push({title:"Відсоток населення:", value:popularity+"%"});
            arr_data.push({title:"Відповідальний:", value:party.nikname});
            arr_data.push({title:"Завдання:", value:party.task});
            arr_data.push({title:"Зарплатня:", value:party.salary});
            arr_data.push({title:"Офшори:", value:party.offshores });
            arr_colset_data.push({title:party.title, arr_data:arr_data})
        })
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        $(GV.ID_IFNO_PARTYS).html(CreateCollapsibleset(col_content, header));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    this.DisplayActiveBuildings = function (buildings) {
        let count = 0;
        let arr_colset_data = [];
        for (let i = 0; i <buildings.length; i++) {
            const building = buildings[i];
            if(building.active === true){
                const but = `<a onclick="game.OnDeActivateBuilding(${i})" href="#" class="ui-btn ui-mini ui-btn-inline ui-icon-back ui-btn-icon-left">Відключити</a>`;
                arr_colset_data.push(GetBuildingDescritopn(building, but))
                count++;
            }
        }
        const header = `Активні (${count})`;
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        $(GV.ID_IFNO_BUILD_ACTIVE).html(CreateCollapsibleset(col_content, header));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    this.DisplayDeActiveBuildings = function (buildings) {
        let count = 0;
        let arr_colset_data = [];
        for (let i = 0; i <buildings.length; i++) {
            const building = buildings[i];
            if(building.active === false){
                const but = `<a onclick="game.OnActivateBuilding(${i})" href="#" class="ui-btn ui-mini ui-btn-inline ui-icon-back ui-btn-icon-left">Запустити</a>`;
                arr_colset_data.push(GetBuildingDescritopn(building, but))
                count++;
            }
        }
        const header = `Відключені (${count})`;
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        $(GV.ID_IFNO_BUILD_DEACTIVE).html(CreateCollapsibleset(col_content, header));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    this.DisplayPlannedBuildings = function (buildings) {
        let count = 0;
        let arr_colset_data = [];
        for (let i = 0; i <buildings.length; i++) {
            const building = buildings[i];
            const but = `<a onclick="game.OnDeletePlannedBuilding(${i})" href="#" class="ui-btn ui-mini ui-btn-inline ui-icon-back ui-btn-icon-left">Відмінити</a>`;
            arr_colset_data.push(GetBuildingDescritopn(building, but))
            count++;
        }
        const header = `Заплановані (${count})`;
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        $(GV.ID_IFNO_BUILD_PLANNED).html(CreateCollapsibleset(col_content, header));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    function GetBuildingDescritopn(building, but = ""){
        const arr_data = [];
        arr_data.push({title:"Категорія:", value:building.type});
        arr_data.push({title:"Що дає:", value:building.description});
        arr_data.push({title:"Місць роботи:", value:building.workerplace});
        arr_data.push({title:"з/п працівникам:", value:building.workerSalary});
        arr_data.push({title:"Час зведення (днів):", value:building.constructionTime});
        arr_data.push({title:"Ціна зведення:", value:building.price });
        arr_data.push({title:"Одна будова на село:", value:building.single ? "Так" : "Ні" });
        if(but !== ""){
            arr_data.push({title:"Дія:", value:but });
        }
        return {title:building.title, arr_data:arr_data};
    }
    this.UpdateBuildingList = function(arr_grouped_buildings, func_CheckRequirements, func_CheckIfSingleBuildingExist) {
        let col_content = '';
        for (const type in arr_grouped_buildings) {
            const buildings = arr_grouped_buildings[type];
            let building_content = "";
            buildings.forEach((building, index) => {
                let error_text = "";
                let error = false;
                if (!func_CheckRequirements(building.requirements)) {
                    error_text += ErrorDiv("Не виконані умови!");
                    error = true;
                }
                if (building.single) {
                    if(func_CheckIfSingleBuildingExist(building.key)){
                        error_text += ErrorDiv("Така будова вже є!");
                        error = true;
                    }
                }
                if (building.single) {
                    if(func_CheckIfSingleBuildingExist(building.key, true)) {
                        error_text += ErrorDiv("Така будова вже запланована!");
                        error = true;
                    }
                }
                const but = '<a href="#" class="ui-btn ui-icon-plus ui-btn-icon-left ' + (error ? 'ui-state-disabled' : '') + '" onclick="game.OnAddPlannedBuilding(\'' + building.key + '\')"  data-rel="back">Додати</a>';
                const building_des = GetBuildingDescritopn(building, but)
                error?building_des.arr_data.push({title:"Помилка:", value:error_text }):"";
                building_content += CreateCollapsible(building_des.title, building_des.arr_data);
            });

            col_content += CreateCollapsibleset(building_content, type);
        }
        $(GV.ID_IFNO_BUILDINGS_LIST).html(CreateCollapsibleset(col_content));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    //[{title:"",arr_data:[{title:"",value:0, but:""}]}]
    function CreateOffersCollapsible(header, arr_offers_data) {
        let content = "";
        content += '<div class="col" data-role="collapsible" data-collapsed="true" align="left">';
        content += '<h4>' + header + '</h4>';
        arr_offers_data.forEach((contragent)=>{
            content += '<h4>' + contragent.title + '</h4>';
            content += '<div class="ui-grid-b">';
            content += contragent.arr_data.map(data =>
                `<div class="ui-block-a"><div class="ui-bar ui-bar-b"><b>${data.title}</b></div></div>
            <div class="ui-block-b"><div class="ui-bar ui-bar-b">${data.value}</div></div> 
            <div class="ui-block-c"><div class="ui-bar ui-bar-b">${data.but}</div></div> `).join('');
            content += '</div >';
        })
        content += '</div >';
        return content;
    }
    this.DisplayOffersList = function (arr_offers, caravans_available, have_mail) {
        const addContract_butText = 'Прийняти';
        let arr_data_villages = [];
        let arr_data_citys = [];
        for (let i = 0; i <arr_offers.length; i++) {
            const offer = arr_offers[i];
            const arr_contracts = offer.contracts.GetAllContracts();
            const contragent = offer.contragent;
            const agent_title = contragent.title;
            let arr_data = [];
            let arr_colset_data = [];
           // console.log(arr_contracts)
            if (arr_contracts.length > 0) {
                //[{title:agent_title,arr_data:[{title:"",value:0, but:""}]}]
                for (let i = 0; i < arr_contracts.length; i++) {
                    const contract = arr_contracts[i];
                    const product_title = contract.product.tittle;
                    const amount = contract.amount;
                    const price = contract.product.price;
                    const product_name = Warehouse.GetProductName(contract.product);
                    let but = `<a href="#" onclick="game.OnOpenAddContractPopup('${product_name}',${amount})">${addContract_butText}</a>`;
                    if (caravans_available) {
                        if (contragent.type === CONTRAGENT_TYPE.CITY && !have_mail) {
                            but = '<span style="color: rgb(128,128,128);">' + addContract_butText + '</span>';
                        }
                    } else {
                        but = '<span style="color: rgb(128,128,128);">' + addContract_butText + '</span>';
                    }

                    arr_data.push({title:product_title,value:`${amount} (${GV.QCCOIN_PNG}${(price*amount)})`, but:but});
                }
                arr_colset_data = {title:agent_title,arr_data:arr_data};
                contragent.type == CONTRAGENT_TYPE.VILLAGE?arr_data_villages.push(arr_colset_data):arr_data_citys.push(arr_colset_data);
            }

        }
        let col_content = "";
        col_content += CreateOffersCollapsible("Села", arr_data_villages);
        col_content += CreateOffersCollapsible("Міста", arr_data_citys);
        $(GV.ID_IFNO_OFFERS_LIST).html(CreateCollapsibleset(col_content));
        $(".col").collapsible();
        $(".colset").collapsibleset();
    }
    this.ShowAddContractPopUp = function(product_name,amount) {
        let product = Warehouse.GetProductFromName(product_name);

        $(GV.ID_OFFER_INFO).html('Ви хочете заключити контракт на: <h4>' + product.tittle + '</h4> в розмірі: </br><h3>' + amount + '</h3>');

        $(GV.ID_CONTRACT_SLIDER).attr("min", GV.MIN_CONTRACT_OFFER);
        $(GV.ID_CONTRACT_SLIDER).attr("max", GV.MAX_CONTRACT_OFFER);
        $(GV.ID_CONTRACT_SLIDER).attr("value", GV.MIN_CONTRACT_OFFER);

        $(GV.ID_OFFER_BUT).html('<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Відміна</a>' +
            `<a href="#" onclick="game.OnAddContract('${product_name}',${amount})" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b"  data-rel="back">Додати</a>`
        );

        $(GV.ID_OFFER_POPUP_DIALOG).popup("open");


    }
    function ErrorDiv(error_text){
        return `<b style="color:#ff0000;">${error_text}</b>`;
    }
}

    function PrepareNextWeek(selo) {

        const content = "#next_week_popup_content";

        $("#but_next_week_done").removeClass("ui-state-disabled");
        $("#next_week_popup_header").html(selo.week + " &gt; " + (selo.week + 1) + " тиждень");
        $(content).empty();


        //=== info money ===

        $(content).append("<p><b>Доходи на наступний тиждень</b></p>");

        //=== info contracts ===

        $(content).append("<h4>Поточні контракти:</h4>");

        let contacts_content = '';

        contacts_content += ('<div class="ui-grid-a">');
        contract_sum = 0;
        for (let i = 0; i < selo.contracts.length; i++) {
            const contract = selo.contracts[i];
            contacts_content += ('<div class="ui-block-a"><div class="ui-bar ui-bar-b">' + contract.product.tittle + '</div></div>');
            contacts_content += ('<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + (contract.product.price * contract.amount) + '</div></div>');
            contract_sum += contract.product.price * contract.amount;
        };
        contacts_content += ('<div class="ui-block-a"><div class="ui-bar ui-bar-b">Всього:</div></div>');
        contacts_content += ('<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + contract_sum + '</div></div>');
        contacts_content += ('</div></br>');
        $(content).append(contacts_content);

        //=== info costs ===

        $(content).append("<p><b>Витрати на наступний тиждень</b></p>");

        //=== info salary ===

        $(content).append("<h4>Ви заплатите зарплатню:</h4>");

        let salaryCosts = 0;

        const population = Number(Population(Parties));
        const totalWorkerplaces = TotalWorkerplace(selo.buildings);
        const workersCosts = WorkersCosts(selo.buildings, Work(totalWorkerplaces, population).workers);

        const ministersCosts = MinistersCosts(Parties);
        salaryCosts = workersCosts + ministersCosts;

        let salaryContent = "";

        salaryContent += ('<div class="ui-grid-a">');
        salaryContent += ('<div class="ui-block-a"><div class="ui-bar ui-bar-b">Робітникам</div></div>');
        salaryContent += ('<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + workersCosts + '</div></div>');
        salaryContent += ('<div class="ui-block-a"><div class="ui-bar ui-bar-b">Міністрам</div></div>');
        salaryContent += ('<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + ministersCosts + '</div></div>');
        salaryContent += ('<div class="ui-block-a"><div class="ui-bar ui-bar-b">Всього:</div></div>');
        salaryContent += ('<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + salaryCosts + '</div></div>');
        salaryContent += ('</div></br>');
        $(content).append(salaryContent);

        //=== info build ===

        let buildCosts = 0;

        if (arr_planned_build.length > 0) {
            const builders = CalculateTotalBuildPar(selo.buildings, B_PAR_BUILDERS);
            const days_of_week = 7;
            const max_build_days = days_of_week * builders;
            let build_list = '<div class="ui-grid-b">';
            arr_planned_build.forEach((building) => {
                build_list += '<div class="ui-block-a"><div class="ui-bar ui-bar-b">' + building.title + '</div></div>';
                build_list += '<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + building.price + '</div></div>';
                build_list += '<div class="ui-block-c"><div class="ui-bar ui-bar-b">' + building.constructionTime + 'дн</div></div>';
            });
            const build_days = TotalConstructTime(arr_planned_build);
            const build_costs = TotalPrice(arr_planned_build);

            build_list += '<div class="ui-block-a"><div class="ui-bar ui-bar-b">Всього:</div></div>';
            build_list += '<div class="ui-block-b"><div class="ui-bar ui-bar-b">' + build_costs + '</div></div>';
            build_list += '<div class="ui-block-c"><div class="ui-bar ui-bar-b">' + build_days + 'дн</div></div>';

            build_list += '</div>';

            $(content).append("<h4>Ви хочете построїти:</h4>" + build_list);

            $(content).append("<p>Будівельників в наявності: " + builders + " (" + max_build_days + " дн)</p>");
            $(content).append("<p>Кошти в казні: " + selo.balance + "</p>");




            if (build_costs > selo.balance) {
                $(content).append("<b style='color:red;'>Не вистачає Коштів!</b></br>");
                DisableNextWeekBut();
            } else {
                if (build_days > max_build_days) {
                    $(content).append("<b style='color:red;'>Не вистачає будівеьлників!</b></br>");
                    DisableNextWeekBut();
                } else {
                    buildCosts = build_costs;
                }
            }
        }

        $(content).append("<p><b>Залишок на наступному тижні: " + (selo.balance - buildCosts - salaryCosts + contract_sum) + "</b></p>");
    }
    function DisableNextWeekBut() {
        $("#but_next_week_done").addClass("ui-state-disabled");
    }


