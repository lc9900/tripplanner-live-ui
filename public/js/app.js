$(function(){
  var map = new Map('map');

  // Option Section
  $('#right-pane').append(options);

  $('button.hotels').on('click', ()=>{
    // console.log($('select.hotels').val());
    // console.log($('select.hotels option:selected').text());
    var name = $('select.hotels option:selected').text();

    // Need to add the activities to the actual Day object
    var dayNum = $('ul.dayPicker>li.active').text();
    if (plannedDays[dayNum-1].hotels.length > 0) return;

    plannedDays[dayNum-1].hotels.push(name);

    dayAddLi('ul.hotels', name, plannedDays[dayNum-1].hotels.length-1);
  })

  $('button.restaurants').on('click', ()=>{
    // console.log($('select.restaurants').val());
    // console.log($('select.restaurants option:selected').text());
    var name = $('select.restaurants option:selected').text()

    // Need to add the activities to the actual Day object
    var dayNum = $('ul.dayPicker>li.active').text();
    plannedDays[dayNum-1].restaurants.push(name);

    dayAddLi('ul.restaurants', name, plannedDays[dayNum-1].restaurants.length-1);
  })

  $('button.activities').on('click', ()=>{
    // console.log($('select.activities').val());
    // console.log($('select.activities option:selected').text());
    var name = $('select.activities option:selected').text()
    // Need to add the activities to the actual Day object
    var dayNum = $('ul.dayPicker>li.active').text();
    plannedDays[dayNum-1].activities.push(name);

    dayAddLi('ul.activities', name, plannedDays[dayNum-1].activities.length-1);
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
    $('#right-pane').append(drawDay(plannedDays[dayNum-1]));

  })

  $('#right-pane').on('click', 'button#add_day', function(){
    var newDay = new Day();
    plannedDays.push(newDay);
    $('ul.dayPicker').empty();
    $('ul.dayPicker').append(dayPickerTabDraw(plannedDays.length));
    $('div#day_detail').remove();
    $('#right-pane').append(drawDay(newDay));
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
        $('ul.dayPicker').append(dayPickerTabDraw(activeDayNum));
    }
    else{
        console.log('in else');
        $('ul.dayPicker').empty();
        $('div#day_detail').remove();
    }
  });





  // Day Section
  $('#right-pane').append(drawDay(plannedDays[0]));
  // $('ul.restaurants').append('hello');

  $('#right-pane').on('click', 'ul.hotels>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.hotels.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    $('#right-pane').append(drawDay(activeDay));
  });

  $('#right-pane').on('click', 'ul.restaurants>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.restaurants.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    $('#right-pane').append(drawDay(activeDay));
  });

  $('#right-pane').on('click', 'ul.activities>li>button', function(){
    // console.log('clicked')
    var index = $(this).attr('id').split('_')[1];
    // console.log(index);
    var dayNum = $('ul.dayPicker>li.active').text();
    var activeDay = plannedDays[dayNum-1];

    activeDay.activities.splice(index, 1);
    // console.log(activeDay.hotels);

    $('#day_detail').remove();
    $('#right-pane').append(drawDay(activeDay));
  });
});
