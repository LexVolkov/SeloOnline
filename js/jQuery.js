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
    'js/game/partys/db_parties.js',
    'js/game/productions/class_product.js',
    'js/game/productions/db_productions.js',
    'js/game/productions/warehouse.js',
    'js/game/events/class_event.js',
    'js/game/events/db_events.js',
    'js/game/events/journal.js',
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
                    const but_print = `<a href="" onClick="printBuildings();" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b ui-icon-action ui-btn-icon-right">Друк</a>`
                    $(GV.ID_NEW_GAME).html(`${but_new}</br>${but_load}</br>${but_print}`);
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

function printBuildings() {
    // Создание нового окна
    var printPage = window.open('', '_blank');

    // Начало HTML-страницы с таблицей
    printPage.document.write('<html><head><title>Print Buildings</title></head><body>');
    printPage.document.write('<h1>Будівлі</h1>');
    printPage.document.write('<table border="1"><tr><th>Назва</th><th>Тип</th><th>Час</th><th>Коштує</th><th>Робочих місць</th><th>з/п</th><th>Опис</th></tr>');

    // Добавление данных о каждом здании в таблицу
    const buildings  = new Buildings().GetBuildings();
    for (var key in buildings) {
        if (buildings.hasOwnProperty(key)) {
            var building = buildings[key];
            printPage.document.write('<tr>');
            printPage.document.write('<td>' + building.title + '</td>');
            printPage.document.write('<td>' + building.type + '</td>');
            printPage.document.write('<td>' + building.constructionTime + '</td>');
            printPage.document.write('<td>' + building.price + '</td>');
            printPage.document.write('<td>' + building.workerplace + '</td>');
            printPage.document.write('<td>' + building.workerSalary + '</td>');
            printPage.document.write('<td>' + building.description + '</td>');
            printPage.document.write('</tr>');
        }
    }

    // Завершение HTML-страницы
    printPage.document.write('</table></body></html>');

    // Отображение страницы для печати
    printPage.document.close();
    printPage.focus();
    printPage.print();
    printPage.close();
}
function printBuildings() {
    const buildings  = new Buildings().GetBuildings();
    // Преобразование объекта buildings в массив
    var buildingsArray = Object.keys(buildings).map(function(key) {
        return buildings[key];
    });

    // Сортировка массива по типу здания
    buildingsArray.sort(function(a, b) {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
    });

    // Создание нового окна
    var newWin = window.open('', '_blank');

    // Начало HTML-страницы с таблицей
    newWin.document.write('<html><head><title>Print Buildings</title><style>table, th, td { border: 1px solid black; border-collapse: collapse; } th, td { padding: 5px; }</style></head><body>');
    newWin.document.write('<h1>Будівлі</h1>');
    newWin.document.write('<table border="1"><tr><th>Назва</th><th>Тип</th><th>Час</th><th>Коштує</th><th>Робочих місць</th><th>з/п</th><th>Опис</th></tr>');

    // Добавление данных о каждом здании в таблицу
    buildingsArray.forEach(function(building) {
        newWin.document.write('<tr>');
        newWin.document.write('<td>' + building.title + '</td>');
        newWin.document.write('<td>' + building.type + '</td>');
        newWin.document.write('<td>' + building.constructionTime + '</td>');
        newWin.document.write('<td>' + building.price + '</td>');
        newWin.document.write('<td>' + building.workerplace + '</td>');
        newWin.document.write('<td>' + building.workerSalary + '</td>');
        newWin.document.write('<td>' + building.description + '</td>');
        newWin.document.write('</tr>');
    });

    // Завершение HTML-страницы
    newWin.document.write('</table></body></html>');

    // Отображение страницы для печати
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
}
