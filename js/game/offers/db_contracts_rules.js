function RuleBook() {
    this.rules = [];
    this.arr_prod_city = Object.values(PRODUCTIONS);
    this.getCurrentRules = function(current_week_number) {
        return this.rules.find(rule => rule.number_of_week >= current_week_number);
    };
    this.rules.push({
        number_of_week: 0,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT],
            max_contracts: 1,
            min_restruction: 0.4,
            max_restruction: 0.45
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 1,
            min_restruction: 0.5,
            max_restruction: 1
        })
    });
    this.rules.push({
        number_of_week: 3,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT,
                                PRODUCTIONS.BEETROOT,
                                PRODUCTIONS.SUNFLOWER],
            max_contracts: 1,
            min_restruction: 0.3,
            max_restruction: 0.6
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 1,
            min_restruction: 0.5,
            max_restruction: 1
        })
    });
    this.rules.push({
        number_of_week: 8,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT,
                                PRODUCTIONS.BEETROOT,
                                PRODUCTIONS.SUNFLOWER,
                                PRODUCTIONS.WOOD,
                                PRODUCTIONS.COTTON,
                                PRODUCTIONS.MEAT],
            max_contracts: 2,
            min_restruction: 0.2,
            max_restruction: 0.8
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 1,
            min_restruction: 0.5,
            max_restruction: 1
        })
    });
    this.rules.push({
        number_of_week: 13,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT,
                                PRODUCTIONS.BEETROOT,
                                PRODUCTIONS.SUNFLOWER,
                                PRODUCTIONS.WOOD,
                                PRODUCTIONS.COTTON,
                                PRODUCTIONS.MEAT,
                                PRODUCTIONS.BOARDS,
                                PRODUCTIONS.AMBER,
                                PRODUCTIONS.IRON],
            max_contracts: 3,
            min_restruction: 0.1,
            max_restruction: 0.9
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 2,
            min_restruction: 0.5,
            max_restruction: 1.5
        })
    });
    this.rules.push({
        number_of_week: 20,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT,
                PRODUCTIONS.BEETROOT,
                PRODUCTIONS.SUNFLOWER,
                PRODUCTIONS.WOOD,
                PRODUCTIONS.COTTON,
                PRODUCTIONS.MEAT,
                PRODUCTIONS.BOARDS,
                PRODUCTIONS.AMBER,
                PRODUCTIONS.IRON],
            max_contracts: 3,
            min_restruction: 0.1,
            max_restruction: 1
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 3,
            min_restruction: 1,
            max_restruction: 2
        })
    });
    this.rules.push({//TODO Зачем?
        number_of_week: 1000,
        villages: new Rule({
            products_permited: [PRODUCTIONS.WHEAT,
                                PRODUCTIONS.BEETROOT,
                                PRODUCTIONS.SUNFLOWER,
                                PRODUCTIONS.WOOD,
                                PRODUCTIONS.COTTON,
                                PRODUCTIONS.MEAT,
                                PRODUCTIONS.BOARDS,
                                PRODUCTIONS.AMBER,
                                PRODUCTIONS.IRON],
            max_contracts: 3,
            min_restruction: 0.1,
            max_restruction: 0.6
        }),
        citys: new Rule({
            products_permited: this.arr_prod_city,
            max_contracts: 3,
            min_restruction: 1,
            max_restruction: 1.5
        })
    });
}

