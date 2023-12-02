const scriptPaths = [
    'js/game/db_settings.js',

    'js/game/build/builder.js',
    'js/game/build/class_building.js',
    'js/game/build/class_building_parameters.js',
    'js/game/build/db_buildings.js',
    'js/game/build/class_structure.js',
    'js/game/offers/class_contract.js',
    'js/game/offers/class_contragent.js',
    'js/game/offers/class_rule.js',
    'js/game/offers/db_contracts_rules.js',
    'js/game/offers/db_contragents.js',
    'js/game/offers/offers.js',
    'js/game/offers/portfolio.js',
    'js/game/offers/class_offer.js',
    'js/game/partys/class_party.js',
    'js/game/partys/duma.js',
    'js/game/productions/class_product.js',
    'js/game/productions/db_productions.js',
    'js/game/productions/warehouse.js',
    'js/game/events/class_event.js',
    'js/game/events/db_events.js',
    'js/game/events/journal.js',
    'js/game/events/conditions.js',
    'js/game/events/class_action.js',
    'js/game/class_selo.js',
    'js/game/display.js',
    'js/game/game.js',
    'js/game/utility.js',
    'js/game/welcome.js',
];
function loadScripts(scriptPaths, callback) {
    let loadedScripts = 0;
    scriptPaths.forEach(function(path) {
        let script = document.createElement('script');
        script.src = path;
        script.async = false; // Чтобы сохранить порядок выполнения скриптов
        script.onload = function() {
            loadedScripts++;
            $('#div_new_game').html(`Загрузка скриптов: (${loadedScripts}/${scriptPaths.length})`);
            if (loadedScripts === scriptPaths.length) {
                callback(); // Все скрипты загружены, вызываем callback
            }
        };
        script.onerror = function() {
            $('#div_new_game').html('Ошибка загрузки скрипта: ' + path);
            console.error('Ошибка загрузки скрипта: ' + path);
        };
        document.head.appendChild(script);
    });
}
// --- Initialization ---
let game = {};
$(document).ready(function(){
    if(window.location.pathname !== "/index.html") {

        //$.mobile.navigate("#page_new_game");
        $.mobile.navigate("#page_week");

    }
    loadScripts(scriptPaths, function() {
        $('#div_new_game').html(`Загрузка скриптов завершена`);
        InitApp();
        PRODUCTIONS();
        game = new Game();
        //const welcome = new Welcome(game);


        const startBalance = 10000;
        const startBuildings = ["silrada","house_of_builders", "stable", "wheat"];
        game.InitGame(startBalance, startBuildings);
        game.Start();

        //welcome.NewGamePage();
        //Welcome.StartGame();
    });
});
function InitApp() {
    $(".footer_links").append(GV.FOOTER);
    $(".h4_footer_content").append(GV.COPYRIGHT).append('<br>').append(GV.VERSION);
}

