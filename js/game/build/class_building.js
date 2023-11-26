class Building {
    constructor(par) {
        this.id = 0;
        this.title = par.title;
        this.description = par.description;
        this.type = par.type;
        this.single = par.single;
        this.constructionTime = par.constructionTime;
        this.price = par.price;
        this.workerplace = par.workerplace;
        this.workerSalary = par.workerSalary;
        this.parameters = par.parameters;
        this.production = par.production;
        this.requirements = par.requirements;
        this.active = true;
    }
};