// <li class='list-group-item'>
//   Hotel One
//   <button class='btn btn-warning btn-sm pull-right'>x</button>
//   <br clear='both' />
// </li>

// Here the map obj has to get passed, because map is defined within
// the $(function(){}) jquery function, and thus it's not a global variable.
// Since drawDay is defined here, map is not in drawDay's scope.
// Now if drawDay is defined within $(function(){}), then it would have access to
// map
function drawDay(targetDay, map) {
    // console.log("Iside drawDay");
    targetDay.hotels.forEach((item) => {
        // console.log('mapObj is ' + map.mapObj);
        item.marker.setMap(map.mapObj);
    });

    targetDay.restaurants.forEach((item) => {
        item.marker.setMap(map.mapObj);
    });

    targetDay.activities.forEach((item) => {
        item.marker.setMap(map.mapObj);
    });

    return `
        <div id='day_detail' class='panel panel-default'>
          <div class='panel-heading'>
            Day
          </div>
          <div class='panel-body'>

            <div>
              Hotels
              <ul class='list-group hotels'>
                ${ makeLi(targetDay.hotels, 'hotels')}
              </ul>
            </div>

            <div>
              Restaurants
              <ul class='list-group restaurants'>
                ${ makeLi(targetDay.restaurants, 'restaurants')}
              </ul>
            </div>

            <div>
              Activities
              <ul class='list-group activities'>
                ${ makeLi(targetDay.activities, 'activities')}
              </ul>
            </div>

          </div>
        </div>
    `;
}

function makeLi(arr, type){
    var elements;
    return arr.reduce((elements, item, index) => {
        return elements + `
            <li class='list-group-item'>
              ${item.name}
              <button id='${type}_${index}' class='btn btn-warning btn-sm pull-right'>x</button>
              <br clear='both' />
            </li>
        `;
    }, '');
}
// Expect selector to be ul#classname
function dayAddLi(selector, name, index){
    var type;
    if(selector.includes('hotels')) type = 'hotels';
    else if (selector.includes('restaurants')) type = 'restaurants';
    else type = 'activities';

    var elem = `
        <li class='list-group-item'>
          ${name}
          <button id='${type}_${index}' class='btn btn-warning btn-sm pull-right'>x</button>
          <br clear='both' />
        </li>
    `;
    $(selector).append(elem);
}
