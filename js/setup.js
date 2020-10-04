'use strict';

const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

const NUMBER_OF_WIZARDS = 4;

const similarListElement = document.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = document.querySelector('.setup-close');
const setupUsername = document.querySelector('.setup-user-name');
const wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
const wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
const fireball = document.querySelector('.setup-fireball-wrap');
const wizardCoatInput = document.querySelector('.coat-color-input');
const wizardEyesInput = document.querySelector('.eyes-color-input');
const fireballInput = document.querySelector('.fireball-color-input');

const getRandomValueFromRange = (minimumValue, maximumValue) => Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomValueFromRange(0, array.length - 1);

  return array[randomIndex];
};

// Открытие/закрытие окна настроек

const onPopupEscPress = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.setup-user-name')) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupCloseClick = () => {
  closePopup();
};

const onPopupCloseEnterPress = (evt) => {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('click', onPopupCloseClick);
  setupClose.addEventListener('keydown', onPopupCloseEnterPress);
};

const closePopup = () => {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', onPopupCloseClick);
  setupClose.removeEventListener('keydown', onPopupCloseEnterPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupUsername.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
  }
});

// Изменение цвета мантии/глаз/фаербола

wizardCoat.addEventListener('click', function () {
  const coatColor = getRandomArrayElement(COAT_COLORS);
  wizardCoat.setAttribute('style', `fill: ${coatColor}`);
  wizardCoatInput.setAttribute('value', `${coatColor}`);
});

wizardEyes.addEventListener('click', function () {
  const eyesColor = getRandomArrayElement(EYES_COLORS);
  wizardEyes.setAttribute('style', `fill: ${eyesColor}`);
  wizardEyesInput.setAttribute('value', `${eyesColor}`);
});

fireball.addEventListener('click', function () {
  const fireballColor = getRandomArrayElement(FIREBALL_COLORS);
  fireball.setAttribute('style', `background-color: ${fireballColor}`);
  fireballInput.setAttribute('value', `${fireballColor}`);
});

// Заполнение списка похожих волшебников

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
