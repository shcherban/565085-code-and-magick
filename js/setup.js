'use strict';

var NUMBER_OF_SIMILAR_WIZARDS = 4;

var wizards = [];

var generateWizard = function () {
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

  var getRandomElement = function (elements) {
    var randomIndex = Math.round(Math.random() * (elements.length - 1));
    return elements[randomIndex];
  };

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

var renderSimilarWizards = function (wizards) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= wizards.length - 1; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
  similarListElement.appendChild(fragment);
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

for (var i = 1; i <= NUMBER_OF_SIMILAR_WIZARDS; i++) {
  wizards.push(generateWizard());
}

renderSimilarWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
