function Day(){
    this.hotels = [];
    this.restaurants = [];
    this.activities = [];
}

Day.addNewDay = function() {
    plannedDays.push(new Day());
}
