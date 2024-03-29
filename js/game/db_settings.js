const GV = {};
GV.VERSION = 'v0.01';
GV.COPYRIGHT = 'Розробка: © <a href="https://t.me/Lex_Volkov">Lex Volkov</a>';
GV.FOOTER = '<h4 class="ui-title h4_footer_content" role="heading" aria-level="1"></h4>';
GV.QCCOIN_PNG = '<img src="img/qccoin.png" alt="&#128176;" class="gold-coin">';

GV.DEFAULT_START_BALANCE = 10000;

GV.BASIC_HAPPINESS = 5;//Общий базовый показатель счастья
GV.MAX_CONTRACTS_PERIOD = 3;//Максимально недель сколько может держаться контракт от одного контрагента
GV.MIN_CONTRACT_OFFER = 2;//Мин кол-во предложений от агента
GV.MAX_CONTRACT_OFFER = 8;//Макс -//-
GV.TASK_WEEK = 4;
GV.FORMULA_HAPPINESS = [
    {lvl:10, migrants:15},
    {lvl:9, migrants:12},
    {lvl:8, migrants:10},
    {lvl:7, migrants:5},
    {lvl:6, migrants:3},
    {lvl:5, migrants:0},
    {lvl:4, migrants:-5},
    {lvl:3, migrants:-10},
    {lvl:2, migrants:-15},
    {lvl:1, migrants:-20},
    {lvl:0, migrants:-30}
]

GV.PARTY_BASIC_HAPPINESS = 5;//База счатья для подсчетов
GV.PARTY_START_MEMBERS_KOZAKS = 10;//Начальное кол-во членов партии
GV.PARTY_START_MEMBERS_FARMMANS = 3;//Начальное кол-во членов партии
GV.PARTY_START_MEMBERS_CHURCHMANS = 15;//Начальное кол-во членов партии
GV.PARTY_START_MEMBERS_TRADES = 5;//Начальное кол-во членов партии
GV.PARTY_START_MEMBERS_FREEMANS = 7;//Начальное кол-во членов партии
GV.PARTY_START_MEMBERS_HANDMADEMANS = 10;//Начальное кол-во членов партии
GV.PARTY_MAIMMAN_SALARY = 320;//Зп голове
GV.PARTY_PARTYMAN_BASIC_SALARY = 100;//За министрам

GV.PARTY_TITLE_MAINMAN = "Голова села";
GV.PARTY_TITLE_KOZAKS = "Козаки";
GV.PARTY_TITLE_FARMMANS = "Фермери";
GV.PARTY_TITLE_CHURCHMANS = "Церковники";
GV.PARTY_TITLE_TRADES = "Торгаші";
GV.PARTY_TITLE_FREEMANS = "Кріпаки";
GV.PARTY_TITLE_HANDMADEMANS = "Ремісники";
GV.PARTY_INCREMENT_JOY = 0.5;
GV.PARTY_DECREMENT_JOY = -1;

GV.BUILD_PAR_PRODUCTION = "production";
GV.BUILD_PAR_REQUIREMENTS = "requirements";
GV.BUILD_PAR_WORKERHOMES = "workerhomes";
GV.BUILD_PAR_FAMILYHOMES = "familyhomes";
GV.BUILD_PAR_ELITEHOMES = 'elitephomes';
GV.BUILD_PAR_CARAVAN = 'caravan';
GV.BUILD_PAR_BUILDERS = 'builders';
GV.BUILD_PAR_HAPPINESS = 'happiness';
GV.BUILD_PAR_CHURCH_HAPPINESS = 'church_happiness';
GV.BUILD_PAR_COSSACKS = 'cossacks';
GV.BUILD_PAR_PROTECTION = 'protection';
GV.BUILD_PAR_GUNS = 'guns';
GV.BUILD_PAR_MAIL = 'mail';
GV.BUILD_PAR_STEAL = 'steal';

GV.BUILD_BASE_BARRAKS_RESIDENTS = 10;
GV.BUILD_BASE_SMEAR_RESIDENTS = 5;
GV.BUILD_BASE_FARMSTEAD_RESIDENTS = 5;
GV.BUILD_BASE_SILRADA_RESIDENTS = 7;

GV.ID_NEW_GAME = "#div_new_game";
GV.ID_CONTRACT_SLIDER = "#contract_slider";
GV.ID_OFFER_INFO = "#offer_info";
GV.ID_OFFER_BUT = "#offer_but";
GV.ID_POPUP_DIALOG_MAIN = "#popup_dialog";

GV.ID_IFNO_PEOPLE = "#people_info";
GV.ID_IFNO_HOMEOWNERS = "#homeowners_info";
GV.ID_IFNO_ARMY = "#army_info";
GV.ID_IFNO_JOYLVL = "#satlvl_info";
GV.ID_IFNO_BUDGET = "#budget_info";
GV.ID_EDIT_BUDGET = "#edit_balance";
GV.ID_IFNO_COSTS = "#costs_info";
GV.ID_IFNO_CONTRACTS = "#contracts_info";
GV.ID_IFNO_PRODUCTION = "#production_info";
GV.ID_IFNO_PARTYS = "#partys_info";
GV.ID_IFNO_BUILD_ACTIVE= "#build_active_info";
GV.ID_IFNO_BUILD_DEACTIVE = "#build_deactive_info";
GV.ID_IFNO_BUILD_PLANNED = "#build_planned_info";
GV.ID_IFNO_BUILDINGS_LIST = "#buildings_list";
GV.ID_IFNO_OFFERS_LIST = "#offers_info";
GV.ID_IFNO_NEXT_WEEK = "#div_next_week_info";
GV.ID_IFNO_NEXT_WEEK_HEADER = "#next_week_header";
GV.ID_BUT_NEXT_WEEK_DONE = "#but_next_week_done";
GV.ID_PAGE_WEEK_HEADER = "#page_title";
GV.ID_INFO_POPUP = "#popup_info";
GV.ID_INFO_EVENTS = "#events_info";
GV.ID_START_BALANCE = "#start_balance";
GV.ID_INFO_EVENTS= "#events_info";

GV.ID_PAGE_NEW_GAME = "#page_new_game";
GV.ID_PAGE_WEEK = "#page_week";
GV.ID_PAGE_ADD_BUILDING = "#page_add_building";
GV.ID_PAGE_NEXT_WEEK = "#page_next_week";
GV.ID_PAGE_EVENTS= "#page_events";


GV.ACTION_BALANCE = "action_change_balance";
GV.ACTION_MIGRATION = "action_migrate";

GV.DB_NAME = "SeloDB";
GV.DB_STORE_NAME = "SeloSave";