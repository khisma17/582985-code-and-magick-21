'use strict';

const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

const similarListElement = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

const getRandomValue = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

const wizards = [];

const generateWizard = function () {
  const wizard = {};
  wizard.name = getRandomValue(WIZARD_NAMES) + ' ' + getRandomValue(WIZARD_SURNAMES);
  wizard.coatColor = getRandomValue(COAT_COLORS);
  wizard.eyesColor = getRandomValue(EYES_COLORS);
  return wizard;
};

for (let i = 0; i < 4; i++) {
  wizards.push(generateWizard());
}

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('fill', `${wizard.coatColor}`);
  wizardElement.querySelector('.wizard-eyes').setAttribute('fill', `${wizard.eyesColor}`);

  return wizardElement;
};

const fillSimilarWizards = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }
  similarListElement.appendChild(fragment);
};

fillSimilarWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
