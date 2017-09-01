function Map(id){
  this.id = id;
  this.mapObj = this.init();

}

Map.prototype.init = function(){
  var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
  // set the map options hash
  var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById(this.id);
  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);
  // Add the marker to the map
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
  });
  // Add the marker to the map by calling setMap()
  marker.setMap(map);
  return map;

}

Map.prototype.getMarker = function(x, y, name) {
  var targetLatlng = new google.maps.LatLng(x,y);
  var marker = new google.maps.Marker({
        position: targetLatlng,
        title: name
    });
  return marker;
}

Map.prototype.removeAllMarkers = function() {
  // console.log("removeAllMarkers called");
  // console.log(plannedDays)
  plannedDays.forEach(day => {
    // console.log(day);
    day.hotels.forEach(item => {
      // console.log('hotel marker removal');
      item.marker.setMap(null);
      // console.log(item.marker.setMap(null));
    });
    day.restaurants.forEach(item => {
      // console.log('restaurants marker removal');
      item.marker.setMap(null);
      // console.log(item.marker.setMap(null));
    });
    day.activities.forEach(item => {
      // console.log('activities marker removal');
      item.marker.setMap(null);
      // console.log(item.marker.setMap(null));
    });
    // console.log('============================')
  })

}
