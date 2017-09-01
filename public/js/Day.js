function Day(){
    // Each array element is { name: 'xyz', marker: google map marker obj}
    this.hotels = [];
    this.restaurants = [];
    this.activities = [];
}

Day.addNewDay = function() {
    plannedDays.push(new Day());
}
