'use strict';

const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

const NUMBER_OF_WIZARDS = 4;

const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

const similarListElement = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

const getRandomValueFromRange = (minimumValue, maximumValue) => Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomValueFromRange(0, array.length - 1);

  return array[randomIndex];
};

const generateWizard = () => {
  const wizard = {};
  wizard.name = `${getRandomArrayElement(WIZARD_NAMES)} ${getRandomArrayElement(WIZARD_SURNAMES)}`;
  wizard.coatColor = getRandomArrayElement(COAT_COLORS);
  wizard.eyesColor = getRandomArrayElement(EYES_COLORS);
  return wizard;
};

const generateWizardsList = (numberOfWizards) => {
  const wizards = [];
  for (let i = 0; i < numberOfWizards; i += 1) {
    const wizard = generateWizard();
    wizards.push(wizard);
  }
  return wizards;
};

const wizards = generateWizardsList(NUMBER_OF_WIZARDS);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('fill', `${wizard.coatColor}`);
  wizardElement.querySelector('.wizard-eyes').setAttribute('fill', `${wizard.eyesColor}`);

  return wizardElement;
};

const createWizardsFragment = (wizardsList) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizardsList.length; i += 1) {
    fragment.appendChild(renderWizard(wizardsList[i]));
  }
  return fragment;
};

similarListElement.appendChild(createWizardsFragment(wizards));

document.querySelector('.setup-similar').classList.remove('hidden');
