class Game{
    static projectiles = [
        Watermelon,
        Melon,
        Tomato,
    ];

    constructor(gameScene, projectileDelay, player, pointsContainer, globalResultContainer){
        this.gameScene = gameScene,

        this.projectileDelay = projectileDelay,
        this.player = player,

        this.points = 0,
        this.pointsContainer = pointsContainer,
        this.globalResultContainer = globalResultContainer,

        this.timer = null,
        this.removed = false
    }

    startProjectileGeneration(){
        this.timer = setInterval(() => {
            const projectile = new Game.projectiles[Math.floor(Math.random() * Game.projectiles.length)]();
            const projectileElement = projectile.createProjectile();
            projectileElement.addEventListener('transitionend', () => {
                this.points += 1;
                this.pointsContainer.innerHTML = `Очки: ${this.points}`;
            });

            projectileElement.style.top = -projectile.imgHeight + 'px';
            projectileElement.style.left = Math.floor(Math.random() * (window.innerWidth - projectile.imgWidth)) + 'px';
            document.body.append(projectileElement);
        }, 2500);
    }

    gameCycle(){
        this.player.moveLogic();



        let collided = false;

        for(let el of Projectile.projectiles){
            collided = el.checkCollision(el.hitbox, this.player.hitbox);
            if('aim' in el) el.aim(this.player);

            if(collided){
                this.removeGame();
                this.player.resetPlayer();
            }
        }

        if(!collided && !this.removed) requestAnimationFrame(() => this.gameCycle());
    }

    removeGame(){
        this.globalResultContainer.innerHTML = `Результат: ${this.points}`;

        this.removed = true;
        this.points = 0;
        this.pointsContainer.innerHTML = 'Очки: 0';

        clearInterval(this.timer);
        Projectile.projectiles.forEach(el => el.projectileElement.remove());

        const menu = document.querySelector('.main-menu');
        menu.classList.remove('deleted');
        this.gameScene.classList.add('deleted');
        document.body.classList.add('body-change');
    }
}