function Buildings(){
  this.GetBuildings = function(){
    return buildings;
  };

  let buildings = {};
  buildings.silrada = new Building({
    title:"Сільрада",
    type:"Інфроструктура",
    single:true,
    constructionTime:0,
    price:0,
    workerplace:7,
    workerSalary:60,
    description:"Головний будинок де живуть та працюють міністри. Дає один рівень щастя партій та 7 елітних місць для проживання міністрам.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.silrada.parameters.elitehomes = GV.BUILD_BASE_SILRADA_RESIDENTS;
  buildings.silrada.parameters.happiness = 1;


  buildings.brracks = new Building({
    title:"Бараки",
    type:"Житло",
    single:false,
    constructionTime:3,
    price:500,
    workerplace:3,
    workerSalary:10,
    description:`Житло для робітників. Вмісткість ${GV.BUILD_BASE_BARRAKS_RESIDENTS} чол.`,
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.brracks.parameters.workerhomes = GV.BUILD_BASE_BARRAKS_RESIDENTS;


  buildings.smear = new Building({
    title:"Мазанка",
    type:"Житло",
    single:false,
    constructionTime:3,
    price:1000,
    workerplace:3,
    workerSalary:15,
    description:`Житло для сімей з достатком 50+. Проживають ${GV.BUILD_BASE_SMEAR_RESIDENTS} чол.`,
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.smear.parameters.familyhomes = GV.BUILD_BASE_SMEAR_RESIDENTS;


  buildings.farmstead = new Building({
    title:"Садиба",
    type:"Житло",
    single:false,
    constructionTime:3,
    price:1500,
    workerplace:3,
    workerSalary:50,
    description:`Житло для сімей з достатком 100+. Проживають ${GV.BUILD_BASE_FARMSTEAD_RESIDENTS} чол.`,
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.farmstead.parameters.elitehomes = GV.BUILD_BASE_FARMSTEAD_RESIDENTS;


  buildings.stable = new Building({
    title:"Конюшня",
    type:"Інфроструктура",
    single:false,
    constructionTime:7,
    price:3000,
    workerplace:10,
    workerSalary:20,
    description:"Дає змогу заключати + ще один контракт",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.stable.parameters.caravan = 1;


  buildings.house_of_builders = new Building({
    title:"Дім будівельників",
    type:"Інфроструктура",
    single:false,
    constructionTime:3,
    price:1000,
    workerplace:10,
    workerSalary:20,
    description:"Можна будувати одночасно ще одну будівлю",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.house_of_builders.parameters.builders = 1;



  buildings.lumberyard = new Building({
    title:"Лісорубня",
    type:"Видобуток",
    single:false,
    constructionTime:7,
    price:1100,
    workerplace:8,
    workerSalary:20,
    description:"Виробляє "+PRODUCTIONS.WOOD.base_amount+" кг колод.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.WOOD],
    requirements:[]});


  buildings.tartak = new Building({
    title:"Тартак",
    type:"Видобуток",
    single:false,
    constructionTime:2,
    price:600,
    workerplace:4,
    workerSalary:10,
    description:"Виробляє "+PRODUCTIONS.BOARDS.base_amount+" кг дошок з колод. Потребує лісорубню.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.BOARDS],
    requirements:[PRODUCTIONS.WOOD]});



  buildings.wheat = new Building({
    title:"Поле пшениці",
    type:"Видобуток",
    single:false,
    constructionTime:3,
    price:750,
    workerplace:4,
    workerSalary:10,
    description:"Виробляє "+PRODUCTIONS.WHEAT.base_amount+" кг пшениці.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.WHEAT],
    requirements:[]});


  buildings.beetroot = new Building({
    title:"Поле буряків",
    type:"Видобуток",
    single:false,
    constructionTime:3,
    price:750,
    workerplace:4,
    workerSalary:10,
    description:"Виробляє "+PRODUCTIONS.BEETROOT.base_amount+" кг буряків.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.BEETROOT],
    requirements:[]});


  buildings.sunflower = new Building({
    title:"Поле соняшників",
    type:"Видобуток",
    single:false,
    constructionTime:3,
    price:750,
    workerplace:4,
    workerSalary:10,
    description:"Виробляє "+PRODUCTIONS.SUNFLOWER.base_amount+" кг соняшників.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.SUNFLOWER],
    requirements:[]});


  buildings.farm = new Building({
    title:"Ферма",
    type:"Видобуток",
    single:false,
    constructionTime:3,
    price:700,
    workerplace:4,
    workerSalary:12,
    description:"Виробляє "+PRODUCTIONS.MEAT.base_amount+" кг м'яса та "
        +PRODUCTIONS.COTTON.base_amount+" кг бавовни.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.MEAT,PRODUCTIONS.COTTON],
    requirements:[]});


  buildings.mine = new Building({
    title:"Копальня",
    type:"Видобуток",
    single:false,
    constructionTime:3,
    price:850,
    workerplace:5,
    workerSalary:40,
    description:"Виробляє "+PRODUCTIONS.AMBER.base_amount+" кг бурштина та "
        +PRODUCTIONS.IRON.base_amount+" кг заліза. Підвищується рівень небезпеки зі сторони великих міст.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.AMBER,PRODUCTIONS.IRON],
    requirements:[]});


  buildings.oilmill = new Building({
    title:"Маслобойня",
    type:"Гільдії",
    single:false,
    constructionTime:7,
    price:3000,
    workerplace:8,
    workerSalary:40,
    description:"Виробляє "+PRODUCTIONS.OIL.base_amount+" кг олії. Потребує поле буряків.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.OIL],
    requirements:[PRODUCTIONS.BEETROOT]});


  buildings.moonshine_apparatus = new Building({
    title:"Самогонний апарат",
    type:"Гільдії",
    single:false,
    constructionTime:7,
    price:500,
    workerplace:8,
    workerSalary:100,
    description:"Виробляє "+PRODUCTIONS.VODKA.base_amount+" кг горілки. Потребує поле пшениці та буряків.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.VODKA],
    requirements:[PRODUCTIONS.BEETROOT,PRODUCTIONS.WHEAT]});


  buildings.mill = new Building({
    title:"Млин",
    type:"Гільдії",
    single:false,
    constructionTime:7,
    price:3500,
    workerplace:8,
    workerSalary:100,
    description:"Виробляє "+PRODUCTIONS.FLOUR.base_amount+" кг борошна. Потребує поле пшениці.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.FLOUR],
    requirements:[PRODUCTIONS.WHEAT]});


  buildings.furniture_makers = new Building({
    title:"Гільдія меблярів",
    type:"Гільдії",
    single:false,
    constructionTime:7,
    price:4000,
    workerplace:12,
    workerSalary:100,
    description:"Виробляє "+PRODUCTIONS.FURNITURE.base_amount+" кг меблів. Потребує тартак.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.FURNITURE],
    requirements:[PRODUCTIONS.BOARDS]});


  buildings.jewelry_workshop = new Building({
    title:"Ювелірна майстерня",
    type:"Гільдії",
    single:false,
    constructionTime:7,
    price:5000,
    workerplace:20,
    workerSalary:100,
    description:"Виробляє "+PRODUCTIONS.DECORATIONS.base_amount+" кг прикрас. Потребує копальню.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.DECORATIONS],
    requirements:[PRODUCTIONS.AMBER]});


  buildings.smithy = new Building({
    title:"Кузня",
    type:"Гільдії",
    single:false,
    constructionTime:14,
    price:7000,
    workerplace:15,
    workerSalary:100,
    description:"Виробляє "+PRODUCTIONS.WEAPONS.base_amount+" кг зброї. Потребує копалню.",
    parameters:new Building_parameters(),
    production:[PRODUCTIONS.WEAPONS],
    requirements:[PRODUCTIONS.IRON]});


  buildings.korchma = new Building({
    title:"Корчма",
    type:"Розваги",
    single:true,
    constructionTime:2,
    price:600,
    workerplace:4,
    workerSalary:10,
    description:"Піднімає рівень щастя населення на +1. Потребує самогонний аппарат.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[PRODUCTIONS.VODKA]});

  buildings.korchma.parameters.happiness = 1;


  buildings.taverna = new Building({
    title:"Таверна",
    type:"Розваги",
    single:true,
    constructionTime:3,
    price:700,
    workerplace:4,
    workerSalary:12,
    description:"Піднімає рівень щастя населення на +1. Потребує ферму.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[PRODUCTIONS.MEAT]});

  buildings.taverna.parameters.happiness = 1;


  buildings.holiday_home = new Building({
    title:"Святковий дім",
    type:"Розваги",
    single:true,
    constructionTime:4,
    price:750,
    workerplace:4,
    workerSalary:50,
    description:"Піднімає рівень щастя населення на +2. Потребує гільдію меблярів.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[PRODUCTIONS.FURNITURE]});

  buildings.holiday_home.parameters.happiness = 2;


  buildings.fair = new Building({
    title:"Ярмарок",
    type:"Розваги",
    single:true,
    constructionTime:14,
    price:3000,
    workerplace:35,
    workerSalary:30,
    description:"Піднімає рівень щастя населення на +3.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.fair.parameters.happiness = 2;



  buildings.watchplace = new Building({
    title:"Сторожа",
    type:"Захист",
    single:false,
    constructionTime:3,
    price:500,
    workerplace:0,
    workerSalary:0,
    description:"Дає +1 до захисту міста.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.watchplace.parameters.protection = 1;


  buildings.wall = new Building({
    title:"Частоколові стіни",
    type:"Захист",
    single:false,
    constructionTime:7,
    price:1000,
    workerplace:0,
    workerSalary:0,
    description:"Дає +3 до захисту міста.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[PRODUCTIONS.WOOD]});

  buildings.wall.parameters.protection = 3;


  buildings.kazarms = new Building({
    title:"Казарма",
    type:"Захист",
    single:false,
    constructionTime:3,
    price:2500,
    workerplace:5,
    workerSalary:150,
    description:"Дає +5 козаків.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.kazarms.parameters.cossacks = 5;

  buildings.fort = new Building({
    title:"Форт",
    type:"Захист",
    single:true,
    constructionTime:7,
    price:25000,
    workerplace:50,
    workerSalary:200,
    description:"Дає +50 козаків.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.fort.parameters.cossacks = 30;

  buildings.sich = new Building({
    title:"Січ",
    type:"Захист",
    single:false,
    constructionTime:7,
    price:10000,
    workerplace:10,
    workerSalary:70,
    description:"Дає гармати, які можуть пробити захист села на 10.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.sich.parameters.guns = 1;


  buildings.chapel = new Building({
    title:"Капличка",
    type:"Духовенство",
    single:true,
    constructionTime:3,
    price:1000,
    workerplace:4,
    workerSalary:10,
    description:"Назавжди піднімає рівень щастя партії Церковників на +2.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.chapel.parameters.church_happiness = 2;


  buildings.church = new Building({
    title:"Церква",
    type:"Духовенство",
    single:true,
    constructionTime:7,
    price:3000,
    workerplace:6,
    workerSalary:10,
    description:"Назавжди піднімає рівень щастя партії Церковників на +3.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.church.parameters.church_happiness = 3;


  buildings.mail = new Building({
    title:"Пошта",
    type:"Інфроструктура",
    single:true,
    constructionTime:7,
    price:1000,
    workerplace:4,
    workerSalary:100,
    description:"Дозволяє заключати договори з містами.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.mail.parameters.mail = 1;


  buildings.stealplace = new Building({
    title:"Лихварня",
    type:"Інфроструктура",
    single:true,
    constructionTime:3,
    price:500,
    workerplace:4,
    workerSalary:200,
    description:"Дозволяє красти гроші з казни.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.stealplace.parameters.steal = 1;


  buildings.townhall = new Building({
    title:"Ратуша",
    type:"Інфроструктура",
    single:true,
    constructionTime:21,
    price:100000,
    workerplace:250,
    workerSalary:25,
    description:"Дає можливість зробити з села місто",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});

  buildings.dugout = new Building({
    title:"Землянка",
    type:"Захист",
    single:true,
    constructionTime:7,
    price:1000,
    workerplace:10,
    workerSalary:100,
    description:"Вербує партизанів, які повідомляють який захист міста та скільки козаків у інших гравців.",
    parameters:new Building_parameters(),
    production:[],
    requirements:[]});
}







