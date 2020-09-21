'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = CLOUD_HEIGHT - FONT_GAP * 4 - GAP - GAP / 2 - GAP / 2;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, 100, 10, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.textBaseline = `hanging`;
  ctx.font = `16px "PT Mono"`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - FONT_GAP * 2 - GAP / 2);
    ctx.fillText(names[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);

    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, ${Math.random() * 100}%, 50%)`;
    }

    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - FONT_GAP - GAP / 2, BAR_WIDTH, barHeight);

    ctx.fillStyle = `#000`;
  }
};
