function Welcome(game){
    this.NewGamePage = function () {
        $(GV.ID_NEW_GAME).empty();
        $(GV.ID_NEW_GAME).append('<h3>Введіть початковий бюджет села:</h3>');
        $(GV.ID_NEW_GAME).append(`<input type="number" name="balance" id="balance" value="${GV.DEFAULT_START_BALANCE}">`);
        $(GV.ID_NEW_GAME).append('<h3>Виберіть будівлі доступні на початку гри:</h3>');
        $(GV.ID_NEW_GAME).append(`<a href="#page_week" onclick="" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b"  data-rel="page_week">Створити</a>`)


    }
    Welcome.StartGame = function(){
        //startBalance = Number($('#balance').val());



        //$.mobile.navigate(GV.ID_PAGE_WEEK);
    }
}