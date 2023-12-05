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
        $.mobile.navigate("#page_new_game");
    }
    loadScripts(scriptPaths, function() {
        $(GV.ID_NEW_GAME).html(`Загрузка скриптов завершена`);
        InitApp();
        PRODUCTIONS();
        game = new Game();

        localforage.getItem(GV.DB_STORE_NAME)
            .then(data => {
                if (data !== null) {
                    const but_new = `<a href="${GV.ID_PAGE_NEW_GAME}" onClick="game.ShowStartSettings()" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b ui-icon-plus ui-btn-icon-left">Нова гра</a>`
                    const but_load = `<a href="${GV.ID_PAGE_WEEK}" onClick="game.LoadGame()" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b ui-icon-arrow-r ui-btn-icon-right">Продовжити</a>`
                    $(GV.ID_NEW_GAME).html(`${but_new}</br>${but_load}`);
                    // Если данные найдены, вызываем функцию LoadGame
                    game.load_data = data;
                } else {
                    // Если данных нет, вызываем функцию ShowStartSettings
                    game.ShowStartSettings();
                }
            })
            .catch(err => {
                console.error('Ошибка при попытке загрузить игру:', err);
                // В случае ошибки также можно вызвать ShowStartSettings или обработать ошибку по-другому
                game.ShowStartSettings();
            });
    });
});

function InitApp() {
    $(".footer_links").append(GV.FOOTER);
    $(".h4_footer_content").append(GV.COPYRIGHT).append('<br>').append(GV.VERSION);
}

