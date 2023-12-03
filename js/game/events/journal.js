function Journal(){
    const db_events = new Destiny().GetEvents();
    this.GetEvents = function (selo_data){
        let arr_events = [];
        db_events.forEach((event)=>{
            let check_conditions = true;
            for (const cond_key in event.conditions) {
                if(event.conditions[cond_key] !== undefined) {
                   const check = CheckCondition(event.conditions[cond_key], selo_data[cond_key]);
                    if(!check)check_conditions = false;
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
            if(check_conditions && event.loop>0){
                if(Math.random() < event.random){
                    event.loop --;
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