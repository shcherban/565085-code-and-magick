'use strict';

(function () {

  var DEFAULT_SETUP_POSITION = {
    LEFT: '50%',
    TOP: '80px'
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');

  var documentEscKeydownHandler = function (evt) {
    if (window.util.isEscapeKeyCode(evt.keyCode)) {
      closeSetup();
    }
  };


  var openSetup = function () {
    setup.style.left = DEFAULT_SETUP_POSITION.LEFT;
    setup.style.top = DEFAULT_SETUP_POSITION.TOP;
    setup.classList.remove('hidden');
    document.addEventListener('keydown', documentEscKeydownHandler);
    coatElement.addEventListener('click', coatElementClickHandler);
    eyesElement.addEventListener('click', eyesElementClickHandler);
    fireballElement.addEventListener('click', fireballElementClickHandler);
    setupClose.addEventListener('click', setupCloseClickHandler);
    setupClose.addEventListener('keydown', setupCloseEnterKeydownHandler);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', documentEscKeydownHandler);
    coatElement.removeEventListener('click', coatElementClickHandler);
    eyesElement.removeEventListener('click', eyesElementClickHandler);
    fireballElement.removeEventListener('click', fireballElementClickHandler);
    setupClose.removeEventListener('click', setupCloseClickHandler);
    setupClose.removeEventListener('keydown', setupCloseEnterKeydownHandler);
  };

  var setupOpenClickHandler = function () {
    openSetup();

  };

  var setupCloseClickHandler = function () {
    closeSetup();
  };

  var setupCloseEnterKeydownHandler = function (evt) {
    if (window.util.isEnterKeyCode(evt.keyCode)) {
      closeSetup();
    }
  };

  setupOpen.addEventListener('click', setupOpenClickHandler);

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (window.util.isEnterKeyCode(evt.keyCode)) {
      openSetup();
    }
  });

  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', documentEscKeydownHandler);
  });
  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', documentEscKeydownHandler);
  });

  var coatElement = setup.querySelector('.wizard-coat');
  var eyesElement = setup.querySelector('.wizard-eyes');
  var fireballElement = setup.querySelector('.setup-fireball-wrap');

  var coatColorInput = setup.querySelector('input[name=coat-color]');
  var eyesColorInput = setup.querySelector('input[name=eyes-color]');
  var fireballColorInput = setup.querySelector('input[name=fireball-color]');

  var coatColorIndex = 0;
  var eyesColorIndex = 0;
  var fireballColorIndex = 0;

  var coatColor = window.mockData.coatColors[0];
  var eyesColor = window.mockData.eyesColors[0];
  var fireballColor = window.mockData.fireballColors[0];

  var coatElementClickHandler = function () {
    if (++coatColorIndex > window.mockData.coatColors.length - 1) {
      coatColorIndex = 0;
    }
    coatColor = window.mockData.coatColors[coatColorIndex];
    coatColorInput.value = coatColor;
    coatElement.style.fill = coatColor;
  };
  var eyesElementClickHandler = function () {
    if (++eyesColorIndex > window.mockData.eyesColors.length - 1) {
      eyesColorIndex = 0;
    }
    eyesColor = window.mockData.eyesColors[eyesColorIndex];
    eyesColorInput.value = eyesColor;
    eyesElement.style.fill = eyesColor;
  };
  var fireballElementClickHandler = function () {
    if (++fireballColorIndex > window.mockData.fireballColors.length - 1) {
      fireballColorIndex = 0;
    }
    fireballColor = window.mockData.fireballColors[fireballColorIndex];
    fireballColorInput.value = fireballColor;
    fireballElement.style.backgroundColor = fireballColor;
  };

})();
