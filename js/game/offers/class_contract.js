function Contract(product,period,amount) {
    this.product = product;
    this.period = period;
    this.amount = amount;
    this.cid = Contract.cid++;
}
Contract.cid = 0;