//input areas
var mainPanel = document.querySelector('#index'),
    addPanel = document.querySelector('#add-car');
document.querySelector('#btn-add-car').addEventListener ('click', function () {
  addPanel.className = 'current';
  addPanel.removeAttribute('aria-hidden');
  mainPanel.className = 'left';
  mainPanel.setAttribute('aria-hidden', 'true');
});
document.querySelector('#btn-add-car-back').addEventListener ('click', function () {
  addPanel.className = 'right';
  addPanel.setAttribute('aria-hidden', 'true');
  mainPanel.className = 'current';
  mainPanel.removeAttribute('aria-hidden');
});


var cars = JSON.parse(localStorage.getItem('cars')) || [],
    intro = document.querySelector('#intro'),
    list = document.querySelector('#car-list'),
    template = document.querySelector('.template');

function showCars(){
  intro.style.display = 'none';
  intro.setAttribute('aria-hidden', true);
  list.style.display = 'block';
  list.removeAttribute('aria-hidden');
  for(var i = 0, l = cars.length; i < l; i++){
    var row = template.cloneNode(true);
    row.className = '';
    row.querySelector('p.large').innerHTML = cars[i]['car-plate'];
    var buttons = row.querySelectorAll('button');
    for(var j = 0, bl = buttons.length; j < bl; j++){
      buttons[j].dataset.car = cars[i]['car-plate']
    }
    list.appendChild(row);
  }
}

if(typeof cars == 'object' && cars.length > 0){
  showCars();
}
else{
  document.querySelector('#btn-start').addEventListener ('click', function () {
    addPanel.className = 'current';
    addPanel.removeAttribute('aria-hidden');
    mainPanel.className = 'left';
    mainPanel.setAttribute('aria-hidden', 'true');
  });
}

document.getElementById('form-add-car').addEventListener ('submit', function (e) {
  e.preventDefault();
  var car = {};
  for(i = 0, l = this.elements.length; i < l; i++){
    if(this.elements[i].name && this.elements[i].value){
      car[this.elements[i].name] = this.elements[i].value;
    }
  }
  cars.push(car);
  localStorage.setItem('cars', JSON.stringify(cars));
  showCars();
  addPanel.className = 'right';
  addPanel.setAttribute('aria-hidden', 'true');
  mainPanel.className = 'current';
  mainPanel.removeAttribute('aria-hidden');
});


list.addEventListener("click", function(e) {
  console.log(e.target.className);
  var b = e.target,
      phone = '',
      plate = b.dataset.car;
  if(b.nodeName == 'BUTTON'){
    if(b.className == 'blue-zone'){
      phone = '1303';
    }
    else if (b.className == 'green-zone'){
      phone = '1302';
    }
    if(navigator.mozApps && MozActivity){
      new MozActivity({
        name: "new", // Possible compose-sms in future versions
        data: {
          type: "websms/sms",
          number: phone,
          body: plate
        }
      });
    }
    else{
      window.open('','sms://'+phone+'?body='+plate);
    }
  }
}, true);
