function Journal(){
    let db_events = new Destiny().GetEvents();
    this.GetEventsDbData = function (){
        return db_events;
    }
    this.SetEventsDbData = function (data) {
        db_events = data;
    }
    this.GetEvents = function (selo_data){
        let arr_events = [];
        db_events.forEach((event)=>{
            let check_conditions = true;
            for (const cond_key in event.conditions) {
                if(event.conditions[cond_key] !== undefined) {
                    if(cond_key === "week"){
                        let f_week = false;
                        event.conditions[cond_key].forEach((w) => {
                            const check = event.conditions[cond_key][w] === selo_data[cond_key];
                            if(check)f_week = true;
                        });
                        if(!f_week)check_conditions = false;
                    }else{
                        const check = CheckCondition(event.conditions[cond_key], selo_data[cond_key]);
                        if(!check)check_conditions = false;
                    }

                }
            }
            if(check_conditions && event.event_action.action === GV.ACTION_MIGRATION ){
                if (selo_data.migration > 0){
                    event.data.title = "Долучилися до села: ";
                }else{
                    event.data.title = "Втікли з села: ";
                }
                event.data.value = selo_data.migration+" чол";
            }
            if(check_conditions && event.event_action.action  === GV.ACTION_BALANCE){
                if (event.event_action.value > 0){
                    event.data.title = "Казна поповнилась на: ";
                }else{
                    event.data.title = "Бюджет зменьшився на: ";
                }
                event.data.value = GV.QCCOIN_PNG+event.event_action.value;
            }
            if(check_conditions){
                if(Math.random() < event.random){
                    arr_events.push(event);
                }
            }
        })
        return arr_events;
    }
    function CheckCondition(event_cond, data_cond){
        if(event_cond >= 0){
            if (data_cond >= event_cond) {
                return true;
            }
        }
        if(event_cond < 0){
            if (data_cond <= event_cond) {
                return true;
            }
        }
        return false;
    }
}