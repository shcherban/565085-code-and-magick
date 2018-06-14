'use strict';

var NUMBER_OF_SIMILAR_WIZARDS = 4;

var wizards = [];

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomElement = function (elements) {
  var randomIndex = Math.round(Math.random() * (elements.length - 1));
  return elements[randomIndex];
};

var generateWizard = function () {
  var wizardName = Math.round(Math.random()) ? getRandomElement(firstNames) +
    ' ' + getRandomElement(lastNames) : getRandomElement(lastNames) +
    ' ' + getRandomElement(firstNames);

  var wizard = {
    name: wizardName,
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };

  return wizard;
};

var renderSimilarWizards = function (arrayOfWizards) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= arrayOfWizards.length - 1; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = arrayOfWizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = arrayOfWizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arrayOfWizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
  similarListElement.appendChild(fragment);
};

for (var i = 1; i <= NUMBER_OF_SIMILAR_WIZARDS; i++) {
  wizards.push(generateWizard());
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

renderSimilarWizards(wizards);

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserName = setup.querySelector('.setup-user-name');

var documentEscKeydownHandler = function (evt) {
  if (evt.keyCode === 27) {
    closeSetup();
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', documentEscKeydownHandler);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', documentEscKeydownHandler);
};

var setupOpenClickHandler = function () {
  openSetup();
};

var setupCloseClickHandler = function () {
  closeSetup();
};

setupOpen.addEventListener('click', setupOpenClickHandler);
setupClose.addEventListener('click', setupCloseClickHandler);
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeSetup();
  }
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
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

var coatColor = coatColors[0];
var eyesColor = eyesColors[0];
var fireballColor = fireballColors[0];

coatElement.addEventListener('click', function () {
  if (++coatColorIndex > coatColors.length - 1) {
    coatColorIndex = 0;
  }
  coatColor = coatColors[coatColorIndex];
  coatColorInput.value = coatColor;
  coatElement.style.fill = coatColor;
});
eyesElement.addEventListener('click', function () {
  if (++eyesColorIndex > eyesColors.length - 1) {
    eyesColorIndex = 0;
  }
  eyesColor = eyesColors[eyesColorIndex];
  eyesColorInput.value = eyesColor;
  eyesElement.style.fill = eyesColor;
});
fireballElement.addEventListener('click', function () {
  if (++fireballColorIndex > fireballColors.length - 1) {
    fireballColorIndex = 0;
  }
  fireballColor = fireballColors[fireballColorIndex];
  fireballColorInput.value = fireballColor;
  fireballElement.style.backgroundColor = fireballColor;
});
