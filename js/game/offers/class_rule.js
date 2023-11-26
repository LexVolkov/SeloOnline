function Rule(par) {
    this.products_permited = par.products_permited;//какие товары доступны 
    this.max_contracts = par.max_contracts;//Сколько максимально контрактов может быть
    this.min_restruction = par.min_restruction; //Минимаьлный множитель случайного количества продаваемого продукта
    this.max_restruction = par.max_restruction; //Максимальный множитель случайного количества продаваемого продукта
}