//музыка
const music = document.querySelector('.menu-mus');

//главное меню
const menu = document.querySelector('.main-menu');
const play = document.querySelector('.play-button');
const result = document.querySelector('.result');

//игровая сцена
const gameScene = document.querySelector('.game-scene');
const score = document.querySelector('.score');
const quit = document.querySelector('.quit-game');
const triggerRight = document.querySelector('.trigger-right');
const triggerLeft = document.querySelector('.trigger-left');

//создание игрока
const ply = new Player('media/zhizha-left.png', triggerLeft, triggerRight, 250, 700, 3, 290, 500, 200, 350);
const plyElement = ply.createPlayer();
gameScene.append(plyElement);

//класс игрового процесса
const game = new Game(gameScene, 2500, ply, score, result);


play.addEventListener('click', () => {
    music.play();
    menu.classList.add('deleted');
    gameScene.classList.remove('deleted');
    document.body.classList.remove('body-change');

    game.removed = false;
    game.startProjectileGeneration();
    game.gameCycle();
});

quit.addEventListener('click', () => {
    gameScene.classList.add('deleted');
    menu.classList.remove('deleted');
    document.body.classList.add('body-change');

    game.removeGame();
    result.innerHTML = 'Результат: 0';
});