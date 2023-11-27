function Portfolio() {
    let portfolio = [];

    this.GetAllContracts = function(){
        return portfolio;
    }
    this.GetContractCount = function(){
        return portfolio.length;
    }
    this.GetProfitOnThisWeek = function(){
        return portfolio.reduce((total, contract) => total + (contract.amount*contract.product.price), 0);
    }
    this.ProductExist = function (product){
        return portfolio.includes(product);
    }
    this.DecreaseContractPeriod = function() {
        portfolio.forEach((contract) => {
            if (contract.period > 0) {
                contract.period--;
            }
        });
        this.removeObjectsWithZeroPeriod();
    }
    this.removeObjectsWithZeroPeriod = function () {
        // Фильтрация массива, оставляя только объекты, у которых period не равен 0
        portfolio = portfolio.filter(function (obj) {
            return obj.period !== 0;
        });
    }

    this.AddContract = function (product, period, amount){
        portfolio.push(new Contract(product, period, amount));
    }

    this.CalculateTotalProd = function (target_product) {
        return portfolio.reduce((total, prop) => {
            let sum = 0;
            if (prop.product === target_product) {
                sum += prop.amount;
            }
            return total + sum;
        }, 0);
    }
    this.RemoveContract = function(contract){
        portfolio = portfolio.filter(function (contract) {
            return contract !== contract;
        });
    }
}
