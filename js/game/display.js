function Display() {
    function CreateCollapsibleset(col_content, header = "", collapsed = true){//[{title:"",arr_data:[]}]
        let content = "";
        if(header !== ""){
            content += `<div class="col" data-role="collapsible" data-collapsed="${collapsed}">`
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
    function CreateCollapsible(header, arr_col_data, collapsed = true) {//[{title:"",value:0}]
        let content = "";
        content += `<div class="col" data-role="collapsible" data-collapsed="${collapsed}" align="left">`;
        content += '<h4>' + header + '</h4>';

        content += '<div class="ui-grid-a">';
        content += arr_col_data.map(data =>
            `<div class="ui-block-a"><div class="ui-bar ui-bar-b"><b>${data.title}</b></div></div> <div class="ui-block-b"><div class="ui-bar ui-bar-b">${data.value}</div></div> `).join('');

        content += '</div >';
        content += '</div >';

        return content;
    }

    this.DisplayPeople = function (population, workerplaces, workers, unemployment, homeowners, homeless) {
        const header = `Населення: ${population}`;
        const arr_data = [
           //TODO { title: "Робочих місць: ", value: workerplaces },
            { title: "Працюють: ", value: workers },
            { title: "Вільні: ", value: (population-workers) },
            { title: "Безробіття: ", value: unemployment },
            { title: "Мають дім: ", value: homeowners },
            { title: "Безхатьки: ", value: homeless }
        ];

        return CreateCollapsible(header, arr_data);
    }
    this.DisplayHomeowners = function (homeowners_total, kopanka, barraks, sadiba) {
        const header = `Проживання: ${homeowners_total}`;
        const arr_data = [
            { title: "Копанка: ", value: kopanka},
            { title: "Бараки: ", value: barraks},
            { title: "Садиба: ", value: sadiba }
        ];
        return CreateCollapsible(header, arr_data)

    }
    this.DisplayArmy = function (army_total, protection, cossacks, guns) {
        const header = `Армія: ${army_total}`;
        const arr_data = [
            { title: "Захист міста: ", value: protection },
            { title: "Козаки: ", value: cossacks },
            { title: "Гармати: ", value: guns }
        ];
        return CreateCollapsible(header, arr_data)
    }
    this.DisplayJoy = function (joylvl_total, joylvl_unemployeds, joylvl_homeless, joylvl_parties, joylvl_buildings) {
        const header = `Рівень задоволення: ${joylvl_total.toFixed(2)}`;
        const arr_data = [
            { title: "Безробітні: ", value: joylvl_unemployeds },
            { title: "Безхатьки: ", value: joylvl_homeless },
            { title: "Партії: ", value: joylvl_parties },
            { title: "Бонус від будинків: ", value: joylvl_buildings }
        ];
        return CreateCollapsible(header, arr_data);
    }
    this.DisplayBalance = function (balance) {
        return `<h3>Поточний бюджет села: ${GV.QCCOIN_PNG}${balance}</h3>`;
    }
    this.DisplayCosts = function (costs_total, costs_workers, costs_mainmans, costs_construction, collapsed = true) {
        const header = `Витрати на наступний тиждень: ${GV.QCCOIN_PNG}-${costs_total}`;
        const arr_data = [
            { title: "З/П робітникам: ", value: costs_workers },
            { title: "З/П міністрам: ", value: costs_mainmans },
            { title: "Витрати на будівництво: ", value: costs_construction }
        ];
        return CreateCollapsible(header, arr_data, collapsed);
    }
    this.DisplayContracts = function (contracts, collapsed = true) {
        let arr_data = [];
        let total_sum = 0;
        contracts.forEach((contract) => {
            const title = contract.product.tittle+` [${contract.amount}]`;
            const contract_sum = contract.product.price * contract.amount;
            const val = `${GV.QCCOIN_PNG} ${contract_sum} на ${contract.period} тижні`;
            arr_data.push({title:title, value:val});
            total_sum += contract_sum;
        })

        const header = `Поточні контракти: ${GV.QCCOIN_PNG}+${total_sum} (${contracts.length})`;
        if(contracts.length <= 0) arr_data.push({title:"Немає жодного контракту", value:""});

        return CreateCollapsible(header, arr_data, collapsed);
    }
    this.DisplayProductions = function (arr_data) {
        const header = `Видобуток:`;
        return CreateCollapsible(header, arr_data);
    }
    this.DisplayPartys = function (partys,population, church_happiness, week, funcGetTaskTitle) {
        $(GV.ID_IFNO_PARTYS).empty();
        const header = "Партії";
        let arr_colset_data = [];
        let week_key = Number(Math.ceil(week / GV.TASK_WEEK)-1)
        week_key = week_key===-1?0:week_key;
        partys.forEach((party) => {
            const arr_data = [];
            const popularity = (party.members / population * 100).toFixed(0);
            const party_happiness = party.title === GV.PARTY_TITLE_CHURCHMANS ? party.happiness + church_happiness : party.happiness;
            const party_happiness_mod = ((party_happiness - GV.PARTY_BASIC_HAPPINESS) * (party.members / population)).toFixed(2);
            const happiness = party_happiness + " (" + party_happiness_mod + ")";

            arr_data.push({title:"Рівень щастя:", value:happiness});
            arr_data.push({title:"Відсоток населення:", value:popularity+"%"});
            arr_data.push({title:"Відповідальний:", value:party.nikname});
            arr_data.push({title:"Завдання:", value:funcGetTaskTitle(party.tasks[week_key])});
            arr_data.push({title:"Зарплатня:", value:party.salary});
            arr_data.push({title:"Офшори:", value:party.offshores });
            arr_colset_data.push({title:party.title, arr_data:arr_data})
        })
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        return CreateCollapsibleset(col_content, header);
    }
    this.DisplayBuildings = function (constructs, actived) {
        let arr_colset_data = [];
        for (let i = 0; i <constructs.length; i++) {
            const construct = constructs[i];
            const building = construct.building;
            const func = actived?"OnDeActivateBuilding":"OnActivateBuilding";
            const txt = actived?"Відключити":"Запустити";
            const but = `<a onclick="game.${func}(${construct.id})" href="#" 
                class="ui-btn ui-mini ui-btn-inline ui-icon-back ui-btn-icon-left">
                ${txt}</a>`;
            if(construct.active === actived){
                arr_colset_data.push(GetBuildingDescritopn(building, but))
            }
        }
        const count = arr_colset_data.length;
        const header = actived?`Активні (${count})`:`Відключені (${count})`;
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        return CreateCollapsibleset(col_content, header);
    }
    this.DisplayPlannedBuildings = function (buildings, collapsed = true) {
        let count = 0;
        let arr_colset_data = [];
        let construction_price = 0;
        for (let i = 0; i <buildings.length; i++) {
            const building = buildings[i];
            const but = `<a onclick="game.OnDeletePlannedBuilding(${i})" href="#" class="ui-btn ui-mini ui-btn-inline ui-icon-back ui-btn-icon-left">Відмінити</a>`;
            let b_des = GetBuildingDescritopn(building, but);
            b_des.title = building.title+` ${GV.QCCOIN_PNG}-${building.price}`;
            arr_colset_data.push(b_des)
            construction_price += building.price;
            count++;
        }
        const header = `Заплановані (${count}) ${GV.QCCOIN_PNG}-${construction_price}`;
        let col_content = "";
        arr_colset_data.forEach((data)=>col_content += CreateCollapsible(data.title, data.arr_data))
        return CreateCollapsibleset(col_content, header, collapsed);
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
    this.UpdateBuildingList = function(arr_grouped_buildings, func_CheckRequirements, func_CheckIfSingleBuildingExist, onFunc) {
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
                const but = `<a href="#" class="ui-btn ui-icon-plus ui-btn-icon-left ${(error ? 'ui-state-disabled' : '')}" onclick="game.${onFunc}('${building.key}')"  data-rel="back">Додати</a>`;
                const building_des = GetBuildingDescritopn(building, but)
                error?building_des.arr_data.push({title:"Помилка:", value:error_text }):"";
                building_content += CreateCollapsible(building_des.title, building_des.arr_data);
            });

            col_content += CreateCollapsibleset(building_content, type);
        }
        return CreateCollapsibleset(col_content);
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
    this.DisplayOffersList = function (arr_offers, caravans_available, have_mail, func_CheckProductAmountRequirements) {
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
                   let but = `<a href="#" data-role="none" onclick="game.OnOpenAddContractPopup(${contract.cid})">${addContract_butText}</a>`;
                    if (caravans_available) {
                        if (contragent.type === CONTRAGENT_TYPE.CITY && !have_mail) {
                            but = '<span style="color: rgb(128,128,128);">' + addContract_butText + '</span>';
                        }
                        const have_product_amount = func_CheckProductAmountRequirements(contract.product, amount);
                        if(!have_product_amount){
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
        return CreateCollapsibleset(col_content)
    }
    this.ShowAddContractPopUp = function(contract) {
        let content = `<h3>Договір</h3>`;
        let product = contract.product;
        content += `Ви хочете заключити контракт на: <h4> \"${product.tittle}\" </h4> в розмірі: </br><h3> ${contract.amount} [${GV.QCCOIN_PNG}${(contract.amount*contract.product.price)}] </h3>`;
        content += `<p>На період:</p>`;
        content += `<form>`;
        content += `<label for="${GV.ID_CONTRACT_SLIDER.substring(1)}" >Slider:</label>`;
        content += `<input type="range" name="${GV.ID_CONTRACT_SLIDER.substring(1)}" id="${GV.ID_CONTRACT_SLIDER.substring(1)}" min="${GV.MIN_CONTRACT_OFFER}" max="${GV.MAX_CONTRACT_OFFER}" value="${GV.MIN_CONTRACT_OFFER}" />`;
        content += `</form>`;
        content += `<a href="#" onclick="game.OnCloseEventDialog();" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" >Відміна</a>`;
        content += `<a href="#" onclick="game.OnAddContract(${contract.cid})" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" >Додати</a>`;

        return content;
    }
    function ErrorDiv(error_text){
        return `<b style="color:#ff0000;">${error_text}</b>`;
    }
    this.DisplayNWPHeader = function(week){//Next Week Page Header
        return week + " &gt; " + (week+ 1) + " тиждень";
    }
    this.DisplayNWPNextWeekBalance = function (next_week_balance){
        return `<p><b>Залишок на наступному тижні: ${GV.QCCOIN_PNG}${next_week_balance}  </b></p>`;
    }
    this.DisplayErrorCosts = function (){
        return "<p><b style='color:red;'>Не вистачає коштів!</b></p>";
    }
    this.DisplayNWPErrorBuilders= function (builders, construct_time, max_build_days){
        let txt = "";
        txt += "<p><b style='color:red;'>Не вистачає будівеьлників!</b></p>";
        txt += "<p>Треба днів для побудови:"+construct_time+"</p>";
        txt += "<p>Будівельників в наявності: " + builders + " (" + max_build_days + " дн)</p>";
        return txt;
    }
    this.DisplayMainPageTitle = function(week){
        return (week + " тиждень");
    }
    this.DisplayEvents = function (current_events){
        let content = "";
        let collapse = current_events.length >0?false:true
        content += `<div class="col" data-role="collapsible" data-collapsed="${collapse}" align="left">`;
        content += `<h4>Журнал подій (${current_events.length})</h4>`;

        content += '<div class="ui-grid-a">';
        current_events.forEach((event)=>{
            content += DisplayEvent(event.message, event.data);
        })
        content += '</div >';
        content += '</div >';

        return content;
    }
    function DisplayEvent(text, data){
        let content = `<h4>${text}</h4>`;
        if(data.value !== ""){
            content += '<div class="ui-grid-a">';
            content +=
                `<div class="ui-block-a"><div class="ui-bar ui-bar-b"><b>${data.title}</b></div></div> 
                <div class="ui-block-b"><div class="ui-bar ui-bar-b">${data.value}</div></div> `;

            content += '</div >';
        }
        return content;
    }
    this.DisplayStartSettings = function (){
        let content = "";
        content += `<h3>Введіть початковий бюджет села:</h3>`;
        content += `<input type="number" name="balance" id="${GV.ID_START_BALANCE.substring(1)}" value="${GV.DEFAULT_START_BALANCE}">`;
        //content += `<h3>Виберіть будівлі доступні на початку гри:</h3>`;
        //content += `${building_list}`;
        content += `<p><a href="#" onclick="game.OnStartGame();" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b"  data-rel="page_week">Створити</a></p>`;
        content += ``;
        return content;
    }

}