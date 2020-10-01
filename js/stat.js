'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const GAP = 20;
const FONT_GAP = 20;
const BAR_GAP = 50;
const CLOUD_X = 100;
const CLOUD_SHADOW_X = CLOUD_X + GAP / 2;
const CLOUD_Y = 10;
const CLOUD_SHADOW_Y = CLOUD_Y + GAP / 2;
const INTRO_TEXT_X = CLOUD_X + GAP;
const INTRO_TEXT_Y = CLOUD_Y + GAP;
const INTRO_SECOND_LINE_Y = INTRO_TEXT_Y + FONT_GAP;
const BAR_WIDTH = 40;
const MAX_BAR_HEIGHT = CLOUD_HEIGHT - FONT_GAP * 4 - GAP - GAP / 2 - GAP / 2;
const NAME_Y = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = (ctx, text, x, y) => {
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.font = '16px "PT Mono"';
  ctx.fillText(text, x, y);
};

const renderBar = (ctx, color, x, y, width, height) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const getMaximumElement = (array) => {
  let maximumElement = array[0];

  for (let i = 1; i < array.length; i += 1) {
    if (array[i] > maximumElement) {
      maximumElement = array[i];
    }
  }

  return maximumElement;
};

const getRandomBlueShade = () => {
  const blueBarColor = `hsl(240, ${Math.random() * 100}%, 50%)`;
  return blueBarColor;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', INTRO_TEXT_X, INTRO_TEXT_Y);
  renderText(ctx, 'Список результатов:', INTRO_TEXT_X, INTRO_SECOND_LINE_Y);

  let maxTime = getMaximumElement(times);

  for (let i = 0; i < names.length; i += 1) {
    const barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    const barX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    const barY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP / 2 - barHeight;
    const scoreY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - GAP / 2 - barHeight;

    renderText(ctx, Math.round(times[i]), barX, scoreY);
    renderText(ctx, names[i], barX, NAME_Y);

    let barColor = getRandomBlueShade();

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    renderBar(ctx, barColor, barX, barY, BAR_WIDTH, barHeight);
  }
};
