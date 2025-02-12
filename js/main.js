//функции
function openMainMenu(){
    play.classList.remove('deleted');
    menu.classList.remove('deleted');
    result.classList.remove('deleted');
    body.style.background = "url('./media/images.jfif')";
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'top';
    body.style.backgroundSize = '150em 135em';
}

function closeMainMenu(){
    play.classList.add('deleted');
    menu.classList.add('deleted');
    result.classList.add('deleted');
    body.style.background = 'none';
}

let l;
let t;
function gameAppend(){
    floor.classList.remove('deleted');
    ply.classList.remove('deleted');
    margin.classList.remove('deleted');
    score.classList.remove('deleted');
    quitButton.classList.remove('deleted');
    triggerLeft.classList.remove('deleted');
    triggerRight.classList.remove('deleted');

    //ресет жижи
    x = 250;
    ply.src = 'media/zhizha-right.png';
    ply.style.top = 700 + 'px';
    ply.style.left = 250 + 'px';

    isLose = false;
    scoreNum = 0 //при проигрыше все очки обнуляются
    score.innerHTML = 'Очки: 0';
    roundBegin = true;

    //таймеры для постоянного выполнения действий и проверок
    l = setInterval(function(){
        if(isLose){
            clearInterval(l);
            clearInterval(t);
            gameClosed();
            openMainMenu();
        }
    }, 1);

    t = setInterval(function(){
        shootingMelon();
    }, 2500);
}

function gameClosed(){
    floor.classList.add('deleted');
    ply.classList.add('deleted');
    margin.classList.add('deleted');
    score.classList.add('deleted');
    quitButton.classList.add('deleted');
    triggerLeft.classList.add('deleted');
    triggerRight.classList.add('deleted');

    roundBegin = false;
}

let scoreNum = 0;
let isLose = false; //меняется когда арбуз сталкивается с жижой
let roundBegin = false;
function shootingMelon(){ //оптимизировать
    //арбуз
    let melon = document.createElement('img');
    melon.src = 'media/melon.png';
    melon.style.width = 300 + 'px';
    melon.style.height = 300 + 'px';
    melon.style.position = 'absolute';
    let posX = Math.round(Math.random() * (window.innerWidth - 380));
    melon.style.top = 10 + 'px';
    melon.style.left = posX + 'px'; 
    body.prepend(melon);

    //коллизия арбуза
    let melonRect = document.createElement('div');
    melonRect.style.width = 250 + 'px';
    melonRect.style.height = 225 + 'px';
    //melonRect.style.backgroundColor = '#ff00002f';
    melonRect.style.position = 'absolute';
    melonRect.style.top = -300 + 50 + 'px'; //тут и ниже +25, чтобы хитбокс был посередине спрайта арбуза
    melonRect.style.left = posX + 25 + 'px';
    body.prepend(melonRect);

    function checkCollision(){
        const Rect = melonRect.getBoundingClientRect();
        const targetRect = ply.getBoundingClientRect();
        if(Rect.bottom >= targetRect.top && // Проверка по Y
            Rect.top <= targetRect.bottom && // Проверка по Y
            Rect.left <= targetRect.right && // Проверка по X
            Rect.right >= targetRect.left){
            isLose = true;
        }
    }

    let angle = 0;
    function rotate() {
        angle = (angle + 3) % 360;
        melon.style.transform = 'rotate(' + angle + 'deg)';
        requestAnimationFrame(rotate);
    }
    rotate();

    let x = -300;
    let isRemoved = false;
    function falling(){
        x += 7;
        melon.style.top = x + 'px';
        melonRect.style.top = x + 'px';

        //логика пропадания арбузов
        let melonTop = parseInt(melon.style.top, 10);
        if(melonTop >= 950 && !isRemoved){
            isRemoved = true;
            melon.remove();
            melonRect.remove();
            clearInterval(deletingAfterGame);
            scoreNum++;
            score.innerHTML = 'Очки: ' + scoreNum;
        }
        //проигрышная логика
        if(isLose){
            melon.remove();
            melonRect.remove();
        }
        checkCollision();
        requestAnimationFrame(falling);
    }
    falling();

    const deletingAfterGame = setInterval(function(){
        if(!roundBegin){
            isRemoved = true;
            melon.remove();
            melonRect.remove();
            clearInterval(deletingAfterGame);
        }
    }, 50);
}

//в главном меню
const play = document.querySelector('.play-button');
const menu = document.querySelector('.menu');
const result = document.querySelector('.result');

        //нажатие на кнопку play
play.addEventListener('click', function(){
    menuMus.play();
    closeMainMenu();
    gameAppend();
});

//игра
const floor = document.querySelector('.floor');
const ply = document.querySelector('.zhizha');
const margin = document.querySelector('.margin-roof');
const score = document.querySelector('.score');
const quitButton = document.querySelector('.quit-game');

const triggerRight = document.querySelector('.trigger-right');
const triggerLeft = document.querySelector('.trigger-left');

        //нажатие на выход из игры
quitButton.addEventListener('click', function(){
    menuMus.pause()
    menuMus.currentTime = 0;
    gameClosed()
    result.innerHTML = 'Результата пока нет.';
    openMainMenu()
});


let x = 250;
let timeL;
        //нажатие на 1 половину экрана
triggerLeft.addEventListener('touchstart', function(){
    ply.src = 'media/zhizha-left.png'
    clearInterval(timeR);
    timeL = setInterval(function(){
        if(x <= 0){
            clearInterval(timeL);
            ply.style.left = 0 + 'px';
        }
        x -= 10;
        ply.style.left = x + 'px';
    }, 10);
});
        //нажатие на 2 половину экрана
let timeR;
triggerRight.addEventListener('touchstart', function(){
    ply.src = 'media/zhizha-right.png';
    clearInterval(timeL);
    timeR = setInterval(function(){
        if(x >= (window.innerWidth - ply.width - 10)){
            clearInterval(timeR);
            ply.style.left = (window.innerWidth - ply.width - 10) + 'px';
        }
        x += 10;
        ply.style.left = x + 'px';
    }, 10);
});

//независимые объекты
const menuMus = document.querySelector('.menu-mus');
const body = document.querySelector('body');
const html = document.querySelector('html');