
function Offers() {
    const ruleBook = new RuleBook();
    const phoneBook = new PhoneBook();
    const offers = [];

    phoneBook.contragents.forEach((contragent) => {
        offers.push(new Offer(contragent));
    });
    this.GetOffersList = function (){
        return offers;
    }

    this.UpdateContracts = function (current_week_number) {
        const current_rules = ruleBook.getCurrentRules(current_week_number);
        const villages_rules = current_rules.villages;
        const citys_rules = current_rules.citys;

        offers.forEach((offer) => {
            offer.contracts.DecreaseContractPeriod();
            const agent = offer.contragent;
            const rules = (agent.type === CONTRAGENT_TYPE.VILLAGE) ? villages_rules : citys_rules;
            const max_contracts = rules.max_contracts;
            const arr_permited = rules.products_permited;
            const free_contract_place = max_contracts - offer.contracts.GetContractCount();
            if (free_contract_place > 0) {
                const shuffleArray = (arr) => {
                    return arr.slice().sort(() => Math.random() - 0.5);
                };
                const shuffledArray = shuffleArray(arr_permited);
                for (var i = 0; i < shuffledArray.length; i++) {
                    const product = shuffledArray[i];
                    if (offer.contracts.GetContractCount() < max_contracts && !offer.contracts.ProductExist(product)) {
                        const pass = Math.random() >= 0.5;
                        if (!pass) {
                            const period = RandomPeriod();
                            const amount = RandomAmount(rules.min_restruction, rules.max_restruction, product.base_amount)
                            offer.contracts.AddContract(product, period, amount);
                        }
                    }
                }
            }
        });
    };
    function RandomPeriod() {
        return Math.floor(Math.random() * GV.MAX_CONTRACTS_PERIOD) + 1;
    }
    function RandomAmount(min_restruction, max_restruction, product_base_amount) {
        const randomValue = Math.random() * (max_restruction - min_restruction) + min_restruction;
        return Math.floor(product_base_amount * randomValue);
    }
    this.RemoveContract = function(target_contract){
        offers.forEach((offer)=>{
            offer.contracts.GetAllContracts().forEach((contract) => {
                if (contract === target_contract) {
                    offer.contracts.RemoveContract(contract);
                }
            });
        })
    }
    this.GetContractFromCID = function(cid){
        let find_contract = undefined;
        offers.forEach((offer)=>{
            offer.contracts.GetAllContracts().forEach((contract) => {
                if (contract.cid === Number(cid)) {
                    find_contract = contract;
                }
            });
        })
        return find_contract;
    }
}