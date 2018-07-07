var createFocusTrap = require('../../');

// Prevent leakage to global scope
(function (){
  var $container = document.getElementById('demo-seven');
  var $intro = document.getElementById('demo-seven-intro');
  var $revealer = document.getElementById('demo-seven-revealer');
  var $loader = document.getElementById('demo-seven-loader');
  var $counter = document.getElementById('demo-seven-counter');

  var focusTrap = createFocusTrap($container, {
    onActivate: function () {
      $container.className = 'trap is-active';
    },
    onDeactivate: function () {
      $container.className = 'trap';
      reset();
    },
  });

  var currentNumber = parseInt($counter.innerHTML);
  var originalNumber = currentNumber;
  var timer;

  document.getElementById('activate-seven').addEventListener('click', function () {
    focusTrap.activate();
    hideIntro();
    showLoader();
    startTimer(countDown);
  });

  document.getElementById('deactivate-seven').addEventListener('click', function () {
    focusTrap.deactivate();
  });

  function countDown() {
    if (currentNumber === 1){
      stopTimer();
      hideLoader();
      showRevealer();
    } else {
      decrementCounter();
    }
  }

  function startTimer(callback) {
    timer = window.setInterval(function (){
      callback.call(this);
    }, 1000);
  }

  function stopTimer(){
    clearInterval(timer);
  }

  function reset(){
    hideLoader();
    stopTimer();
    setCounter(originalNumber);
    hideRevealer();
    showIntro();
  }

  function setCounter(number){
    $counter.innerHTML = number;
    currentNumber = number;
  }

  function showIntro(){
    $intro.style.display = 'block';
  }

  function hideIntro(){
    $intro.style.display = 'none';
  }

  function showRevealer(){
    $revealer.style.display = 'block';
  }

  function hideRevealer(){
    $revealer.style.display = 'none';
  }

  function showLoader(){
    $loader.style.display = 'block';
  }

  function hideLoader(){
    $loader.style.display = 'none';
  }

  function decrementCounter() {
    setCounter(--currentNumber);
  }

})();
