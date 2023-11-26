function Portfolio() {
    let portfolio = [];

    this.GetAllContracts = function(){
        return portfolio;
    }
    this.GetContractCount = function(){
        return portfolio.length;
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
        var filteredArray = portfolio.filter(function (obj) {
            return obj.period !== 0;
        });
        portfolio = filteredArray;
    }

    this.AddContract = function (product, period, amount){
        portfolio.push(new Contract(product, period, amount));
    }
}
