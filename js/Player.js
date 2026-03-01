class Player{

    constructor(imgSrc, triggerL, triggerR, startPosX, startPosY, speed, imgWidth, imgHeight, hitboxWidth, hitboxHeight){
        this.imgSrc = imgSrc,
        this.triggerL = triggerL,
        this.triggerR = triggerR,
        this.startPosX = startPosX,
        this.startPosY = startPosY,
        this.speed = speed,
        this.imgWidth = imgWidth,
        this.imgHeight = imgHeight,
        this.hitboxWidth = hitboxWidth,
        this.hitboxHeight = hitboxHeight,

        this.player = null,
        this.hitbox = null,

        this.timerL = null,
        this.timerR = null
    }

    createPlayer(){
        const container = document.createElement('div');
        container.classList.add('player-container');
        container.style.left = this.startPosX + 'px';
        container.style.top = this.startPosY + 'px';

        const img = document.createElement('img');
        img.src = this.imgSrc;
        img.style.width = this.imgWidth + 'px';
        img.style.height = this.imgHeight + 'px';
        container.append(img);
        img.classList.add('player-image');

        const hitbox = document.createElement('div');
        hitbox.style.width = this.hitboxWidth + 'px';
        hitbox.style.height = this.hitboxHeight + 'px';
        container.append(hitbox);
        hitbox.classList.add('player-hitbox');
        hitbox.style.top = (this.imgHeight / 2) - (this.hitboxHeight / 2) + 'px';
        hitbox.style.left = (this.imgWidth / 2) - (this.hitboxWidth / 2) + 'px';

        //обработчики событий для ходьбы
        this.triggerL.addEventListener('touchstart', () => {
            img.src = 'media/zhizha-left.png';
            clearInterval(this.timerR);
            this.timerR = null;

            if(this.timerL){
                clearInterval(this.timerL);
                this.timerL = null;
            }

            this.timerL = setInterval(() => {
                let posX = parseInt(container.style.left);
                container.style.left = `${posX - 10}px`;
            }, 10);
        });
        this.triggerR.addEventListener('touchstart', () => {
            img.src = 'media/zhizha-right.png';
            clearInterval(this.timerL);
            this.timerL = null;
            
            if(this.timerR){
                clearInterval(this.timerR);
                this.timerR = null;
            }

            this.timerR = setInterval(() => {
                let posX = parseInt(container.style.left);
                container.style.left = `${posX + 10}px`;
            }, 10);
        });


        this.hitbox = hitbox;
        this.player = container;
        
        return container;
    }

    moveLogic(){
        const margin = 10;
        const posX = parseInt(this.player.style.left);
        const maxX = window.innerWidth;

        if(posX + this.imgWidth >= maxX - margin/2){
            clearInterval(this.timerR);
            this.player.style.left = (maxX - this.imgWidth - margin) + 'px';
            console.log(1)
        }
        else if(posX <= 0){
            clearInterval(this.timerL);
            this.player.style.left = margin + 'px';
            console.log(0)
        }
    }

    resetPlayer(){
        clearInterval(this.timerL);
        clearInterval(this.timerR);

        this.player.style.left = this.startPosX + 'px';
        this.player.style.top = this.startPosY + 'px';
    }
}