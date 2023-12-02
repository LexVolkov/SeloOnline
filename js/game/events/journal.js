function Journal(){
    const db_events = new Destiny().GetEvents();
    this.GetEvents = function (selo_data){
        let arr_events = [];
        db_events.forEach((event)=>{
            let check_conditions = true;
            if(event.conditions.week !== undefined) {
                if (event.conditions.week < selo_data.week) {
                    check_conditions = false;
                }
            }
            if(check_conditions){
                arr_events.push(event);
            }
        })
        return arr_events;
    }
}