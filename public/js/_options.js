// console.log(activities);
var options = `
              <div class='panel panel-default'>
                <div class='panel-heading'>
                  Options
                </div>
                <div class='panel-body'>
                  <ul class='list-group'>
                    <li class='list-group-item'>
                      Hotels
                      <br />
                      <select style='width: 80%' class='form-control input-sm pull-left hotels'>
                      ${ makeOptions(hotels) }
                      </select>
                      <button class='btn btn-primary btn-sm pull-right hotels'>+</button>
                      <br clear='all' />
                    </li>

                    <li class='list-group-item'>
                      Restaurants
                      <br />
                      <select style='width: 80%' class='form-control input-sm pull-left restaurants'>
                      ${ makeOptions(restaurants) }
                      </select>
                      <button class='btn btn-primary btn-sm pull-right restaurants'>+</button>
                      <br clear='all' />
                    </li>

                    <li class='list-group-item'>
                      Activities
                      <br />
                      <select style='width: 80%' class='form-control input-sm pull-left activities'>
                      ${ makeOptions(activities) }
                      </select>
                      <button class='btn btn-primary btn-sm pull-right activities'>+</button>
                      <br clear='all' />
                    </li>
                  </ul>

                </div>
              </div>
`;

function makeOptions(arr){
  return arr.reduce((result, item ) => {
    // console.log(item);
    result += `
      <option value="${item.id}">${item.name}</option>
    `;
    // console.log(result);
    return result;
  }, '');
}
