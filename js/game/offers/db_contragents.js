function PhoneBook() {
    const VILLAGE = CONTRAGENT_TYPE.VILLAGE;
    const CITY = CONTRAGENT_TYPE.CITY;
    this.contragents = []
    this.contragents.push(new Contragent(VILLAGE, "Панасівка") );
    this.contragents.push(new Contragent(VILLAGE, "Курчатинково") );
    this.contragents.push(new Contragent(VILLAGE, "Сасавалія") );
    this.contragents.push(new Contragent(VILLAGE, "Олександрівка") );
    this.contragents.push(new Contragent(VILLAGE, "Хайомугрецьке") );
    this.contragents.push(new Contragent(VILLAGE, "Невдоволенково") );
    this.contragents.push(new Contragent(VILLAGE, "Тупіко") );
    this.contragents.push(new Contragent(VILLAGE, "Засівайкіно") );
    this.contragents.push(new Contragent(VILLAGE, "Котоводнення") );
    this.contragents.push(new Contragent(VILLAGE, "Заспокійливка") );
    this.contragents.push(new Contragent(CITY, "Київ") );
    this.contragents.push(new Contragent(CITY, "Одеса") );
    this.contragents.push(new Contragent(CITY, "Львів") );
    this.contragents.push(new Contragent(CITY, "Хмельницький") );
}
function CONTRAGENT_TYPE(){}
CONTRAGENT_TYPE.VILLAGE = 0;
CONTRAGENT_TYPE.CITY = 1;