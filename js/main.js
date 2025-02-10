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

    i = 1;
    isLose = false;

    l = setInterval(function(){
        if(isLose){
            clearInterval(l);
            clearInterval(t);
            gameClosed();
            result.innerHTML = 'Результат: ' + i;
            i = 0;
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

    clearInterval(l);
    clearInterval(t);
}

let i = 1;
let isLose = false;
function shootingMelon(){
    //арбуз
    let melon = document.createElement('img');
    melon.src = 'media/melon.png';
    melon.style.width = 300 + 'px';
    melon.style.height = 300 + 'px';
    melon.style.position = 'absolute';
    melon.style.top = -300 + 'px';
    let pos = Math.round(Math.random() * (window.innerWidth - 380))
    melon.style.left = pos + 'px';
    body.prepend(melon);

    //коллизия арбуза
    let melonRect = document.createElement('div');
    melonRect.style.width = 300 + 'px';
    melonRect.style.height = 300 + 'px';
    /*melonRect.style.backgroundColor = '#ff00002f';*/
    melonRect.style.position = 'absolute';
    melonRect.style.top = -300 + 'px';
    melonRect.style.left = pos + 'px';
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
        if(melonTop >= 1200 && !isRemoved){
            isRemoved = true;
            melon.remove();
            melonRect.remove();
            score.innerHTML = 'Очки: ' + i++;
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
    i = 0;
    openMainMenu()
});


let x = 250;
let timeL;
        //нажатие на 1 половину экрана
triggerLeft.addEventListener('touchstart', function(){
    ply.src = 'media/zhizha-left.png'
    timeL = setInterval(function(){
        if(x <= 0){
            x += 10;
        }
        x -= 10;
        ply.style.left = x + 'px';
    }, 10);
});
        //нажатие на 2 половину экрана
let timeR;
triggerRight.addEventListener('touchstart', function(){
    ply.src = 'media/zhizha-right.png';
    timeR = setInterval(function(){
        if(x >= window.innerWidth - ply.width){
            x -= 10;
        }
        x += 10;
        ply.style.left = x + 'px';
    }, 10);
});

        //отжатие от 1 половины экрана
triggerLeft.addEventListener('touchend', function(){
    clearInterval(timeL);
});
        //отжатие от 1 половины экрана
triggerRight.addEventListener('touchend', function(){
    clearInterval(timeR);
});

//независимые объекты
const menuMus = document.querySelector('.menu-mus');
const body = document.querySelector('body');