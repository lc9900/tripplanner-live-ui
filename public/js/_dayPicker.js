if(plannedDays.length === 0) Day.addNewDay(); // Initialize at least one day to start
Day.addNewDay();

function drawDayPicker(activeDay){
    return `
        <div class='panel panel-default'>
          <div class='panel panel-heading'>
            <button id='add_day' class='btn btn-primary btn-sm'>Add Day</button>
            <button id='remove_day' class='btn btn-warning btn-sm'>Remove Day</button>
          </div>
          <div class='panel-body'>
            <ul class='nav nav-tabs dayPicker'>
                ${ dayPickerTabDraw(activeDay) }
            </ul>
          </div>
        </div>
    `;
}

function dayPickerTabDraw(activeDay) {
    // console.log(plannedDays.length);
    let result, active = '';
    if(activeDay === undefined) activeDay = plannedDays.length;

    return plannedDays.reduce((result, day, index, array) => {
        active = ''; // reset active
        if(index === activeDay-1) active = 'active';
        return result + `
            <li class='${active}'>
                <a class='day_tab' href='#'>${index+1}</a>
            </li>
        `;
        // console.log('result is ' + result);
    }, '');
}

function dayPickerTabEmtpy(){
    $('ul.dayPicker').empty();
}
