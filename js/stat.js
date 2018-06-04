'use strict';

// координаты верхней левой точки области отрисовки "облака"
var CLOUD_X = 100;
var CLOUD_Y = 0;

// внешние размеры "облака"
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

// координаты и высота внутренней области "облака", где будут отображаться результаты игры
var CLOUD_INNER_AREA_X = 140;
var CLOUD_INNER_AREA_Y = 25;
var CLOUD_INNER_AREA_HEIGHT = 220;

var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP = 50;
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_HEIGHT = 16;

// отрисовывает "облако" относительно заданной точки (x0, y0) цветом color
var renderCloud = function (ctx, x0, y0, color) {

  // точки для отрисовки левой верхней четверти "облака"
  var topLeftQuarter = [
    {x: 0, y: 135},
    {x: 20, y: 100},
    {x: 10, y: 20},
    {x: 50, y: 20},
    {x: 50, y: 0},
    {x: 130, y: 20},
    {x: 130, y: 0},
    {x: 200, y: 20},
    {x: 210, y: 0}
  ];

  // заполняем массив точек для отрисовки "облака"
  var relCoords = [];
  var i;
  for (i = 0; i <= topLeftQuarter.length - 1; i++) {
    relCoords.push({x: topLeftQuarter[i].x, y: topLeftQuarter[i].y});
  }
  for (i = topLeftQuarter.length - 2; i >= 0; i--) {
    relCoords.push({x: CLOUD_WIDTH - topLeftQuarter[i].x, y: topLeftQuarter[i].y});
  }
  for (i = 1; i <= topLeftQuarter.length - 1; i++) {
    relCoords.push({x: CLOUD_WIDTH - topLeftQuarter[i].x, y: CLOUD_HEIGHT - topLeftQuarter[i].y});
  }
  for (i = topLeftQuarter.length - 2; i >= 1; i--) {
    relCoords.push({x: topLeftQuarter[i].x, y: CLOUD_HEIGHT - topLeftQuarter[i].y});
  }

  // отрисовка "облака"
  ctx.beginPath();
  ctx.moveTo(x0 + relCoords[0].x, y0 + relCoords[0].y);
  for (i = 0; i <= relCoords.length - 1; i++) {
    ctx.lineTo(x0 + relCoords[i].x, y0 + relCoords[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {

  // рисуем "облако"
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)'); // тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_INNER_AREA_X, CLOUD_INNER_AREA_Y);
  ctx.fillText('Список результатов:', CLOUD_INNER_AREA_X, CLOUD_INNER_AREA_Y + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  // рисуем гистограмму
  ctx.textBaseline = 'alphabetic';
  for (var i = 0; i <= players.length - 1; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_INNER_AREA_X + i * (BAR_WIDTH + GAP), CLOUD_INNER_AREA_Y + CLOUD_INNER_AREA_HEIGHT);
    if (!times[i]) {
      ctx.fillStyle = '#000';
      ctx.fillText('?', CLOUD_INNER_AREA_X + i * (BAR_WIDTH + GAP) + 2, CLOUD_INNER_AREA_Y + CLOUD_INNER_AREA_HEIGHT - TEXT_HEIGHT - 2);
      continue;
    }
    if (players[i] === 'Вы') {
      ctx.fillStyle = YOUR_COLOR;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (0.3 + 0.7 * Math.random()).toString();
    }
    ctx.fillRect(CLOUD_INNER_AREA_X + i * (BAR_WIDTH + GAP),
        CLOUD_INNER_AREA_Y + CLOUD_INNER_AREA_HEIGHT - HISTOGRAM_HEIGHT * times[i] / maxTime - TEXT_HEIGHT,
        BAR_WIDTH,
        HISTOGRAM_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_INNER_AREA_X + i * (BAR_WIDTH + GAP),
        CLOUD_INNER_AREA_Y + CLOUD_INNER_AREA_HEIGHT - HISTOGRAM_HEIGHT * times[i] / maxTime - TEXT_HEIGHT - 2);
  }
};
