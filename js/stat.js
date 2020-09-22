'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 20;
const FONT_GAP = 20;
const BAR_WIDTH = 40;
const MAX_BAR_HEIGHT = CLOUD_HEIGHT - FONT_GAP * 4 - GAP - GAP / 2 - GAP / 2;
const BAR_GAP = 50;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx, text, x, y) {
  ctx.fillStyle = `#000`;
  ctx.textBaseline = `hanging`;
  ctx.font = `16px "PT Mono"`;
  ctx.fillText(text, x, y);
};

const renderBar = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

const getMaximumElement = function (array) {
  let maximumElement = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > maximumElement) {
      maximumElement = array[i];
    }
  }

  return maximumElement;
};

const randomBlueShade = function () {
  const barColor = `hsl(240, ${Math.random() * 100}%, 50%)`;
  return barColor;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP / 2, CLOUD_Y + GAP / 2, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  renderText(ctx, `Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, `Список результатов:`, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

  let maxTime = getMaximumElement(times);

  for (let i = 0; i < names.length; i++) {
    const barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

    renderText(ctx, Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - FONT_GAP * 2 - GAP / 2);
    renderText(ctx, names[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);

    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = randomBlueShade();
    }

    renderBar(ctx, CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - FONT_GAP - GAP / 2, BAR_WIDTH, barHeight);
  }
};
