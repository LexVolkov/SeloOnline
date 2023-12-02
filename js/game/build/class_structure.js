function Structure(building){
    this.id = Structure.bid++;
    this.active = true;
    this.building = building;
}
Structure.bid = 0;