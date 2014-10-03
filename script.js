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
