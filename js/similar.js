'use strict';

(function () {

  var NUMBER_OF_SIMILAR_WIZARDS = 4;

  var wizards = [];

  var generateWizard = function () {
    var wizardName = Math.round(Math.random()) ? window.util.getRandomElement(window.mockData.firstNames) +
      ' ' + window.util.getRandomElement(window.mockData.lastNames) : window.util.getRandomElement(window.mockData.lastNames) +
      ' ' + window.util.getRandomElement(window.mockData.firstNames);

    var wizard = {
      name: wizardName,
      coatColor: window.util.getRandomElement(window.mockData.coatColors),
      eyesColor: window.util.getRandomElement(window.mockData.eyesColors)
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

})();
