$(function(){
  var map = new Map('map');

  // Option Section
  $('#right-pane').append(options);

  $('button.hotels').on('click', ()=>{
    var dayNum = $('ul.dayPicker>li.active').text();
    if (plannedDays[dayNum-1].hotels.length > 0) return;
    // console.log($('select.hotels').val());
    // console.log($('select.hotels option:selected').text());
    var hotelId = $('select.hotels').val();
    var hotel = hotels.filter(item => item.id === hotelId*1)[0];
    // console.log(hotel.place.location);
    // map.setOneMarker(hotel.place.location[0], hotel.place.location[1], hotel.name);
    var selectObj = {
        name: hotel.name,
        marker: map.getMarker(hotel.place.location[0], hotel.place.location[1], name)
    }
    selectObj.marker.setMap(map.mapObj);

    plannedDays[dayNum-1].hotels.push(selectObj);
    dayAddLi('ul.hotels', hotel.name, plannedDays[dayNum-1].hotels.length-1);
  })

  $('button.restaurants').on('click', ()=>{
    // console.log($('select.restaurants').val());
    // console.log($('select.restaurants option:selected').text());
    var restaurantId = $('select.restaurants').val();
    var restaurant = restaurants.filter(item => item.id === restaurantId*1)[0];
    // console.log(hotel.place.location);

    var selectObj = {
        name: restaurant.name,
        marker: map.getMarker(restaurant.place.location[0], restaurant.place.location[1], restaurant.name)
    }
    selectObj.marker.setMap(map.mapObj);
    // var name = $('select.restaurants option:selected').text()

    // Need to add the activities to the actual Day object
    var dayNum = $('ul.dayPicker>li.active').text();
    plannedDays[dayNum-1].restaurants.push(selectObj);

    dayAddLi('ul.restaurants', restaurant.name, plannedDays[dayNum-1].restaurants.length-1);
  })

  $('button.activities').on('click', ()=>{
    // console.log($('select.activities').val());
    // console.log($('select.activities option:selected').text());

    var activityId = $('select.activities').val();
    var activity = activities.filter(item => item.id === activityId*1)[0];
    // console.log(hotel.place.location);
    // map.setOneMarker(activity.place.location[0], activity.place.location[1], activity.name);
    var selectObj = {
        name: activity.name,
        marker: map.getMarker(activity.place.location[0], activity.place.location[1], activity.name)
    }
    selectObj.marker.setMap(map.mapObj);
    // var name = $('select.activities option:selected').text()
    // Need to add the activities to the actual Day object
    var dayNum = $('ul.dayPicker>li.active').text();
    plannedDays[dayNum-1].activities.push(selectObj);

    dayAddLi('ul.activities', activity.name, plannedDays[dayNum-1].activities.length-1);
  })

  // Day Picker Section
  $('#right-pane').append(drawDayPicker());

  $('ul.dayPicker').on('click', 'a.day_tab', function(e) {
    e.preventDefault();
    var dayNum = $(this).text();

    // this day_tab should be active
    $('ul.dayPicker').empty();
    $('ul.dayPicker').append(dayPickerTabDraw(dayNum));

    // Related Day should be displayed
    $('#day_detail').remove();
    map.removeAllMarkers();
    $('#right-pane').append(drawDay(plannedDays[dayNum-1], map));

  })

  $('#right-pane').on('click', 'button#add_day', function(){
    var newDay = new Day();
    plannedDays.push(newDay);
    $('ul.dayPicker').empty();
    $('ul.dayPicker').append(dayPickerTabDraw(plannedDays.length));
    $('div#day_detail').remove();
    map.removeAllMarkers();
    $('#right-pane').append(drawDay(newDay, map));
  });

  $('#right-pane').on('click', 'button#remove_day', function(){
    var dayNum = $('ul.dayPicker>li.active').text();
    var indexRemove = dayNum - 1;
    var activeDayNum;
    plannedDays.splice(indexRemove, 1);

    // If there are still days left
    if(plannedDays.length !== 0) {
        if(indexRemove > plannedDays.length-1){
            // Last element was removed
            activeDayNum = plannedDays.length;
        }
        else activeDayNum = indexRemove;

        $('ul.dayPicker').empty();
        map.removeAllMarkers();
        $('ul.dayPicker').append(dayPickerTabDraw(activeDayNum));
    }
    else{
        console.log('in else');
        $('ul.dayPicker').empty();
        $('div#day_detail').remove();
        map.removeAllMarkers();
    }
  });





  // Day Section
  $('#right-pane').append(drawDay(plannedDays[0], map));
  // $('ul.restaurants').append('hello');

  $('#right-pane').on('click', 'ul.hotels>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.hotels[index].marker.setMap(null);
    activeDay.hotels.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    // map.removeAllMarkers();
    $('#right-pane').append(drawDay(activeDay, map));
  });

  $('#right-pane').on('click', 'ul.restaurants>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.restaurants[index].marker.setMap(null);
    activeDay.restaurants.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    // map.removeAllMarkers();
    $('#right-pane').append(drawDay(activeDay, map));
  });

  $('#right-pane').on('click', 'ul.activities>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.activities[index].marker.setMap(null);
    activeDay.activities.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    $('#right-pane').append(drawDay(activeDay, map));
  });
});
