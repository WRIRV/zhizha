class Projectile{
    static projectiles = [];

    constructor(imgSrc, deathCoord, imgWidth = 300, imgHeight = 300, hitboxWidth = 250, hitboxHeight = 250, rotateTiming = 2.5, fallTiming = 3){
        this.imgSrc = imgSrc,

        this.imgWidth = imgWidth,
        this.imgHeight = imgHeight,

        this.hitboxWidth = hitboxWidth,
        this.hitboxHeight = hitboxHeight,
        this.hitbox = null,

        this.rotateTiming = rotateTiming,
        this.fallTiming = fallTiming,
        this.deathCoord = deathCoord,

        this.projectileElement = null
    }

    createProjectile(){
        const container = document.createElement('div');
        container.classList.add('projectile-container');
        container.style.transition = `transform ${this.fallTiming}s linear`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.style.transform = `translateY(${Math.abs(container.getBoundingClientRect().y - this.deathCoord)}px)`;
            })
        });
        container.addEventListener('transitionend', () => {
            container.remove();

            const index = Projectile.projectiles.indexOf(this)
            if(index !== -1) Projectile.projectiles.splice(index, 1);
        });

        const img = document.createElement('img');
        img.src = this.imgSrc;
        img.style.width = this.imgWidth + 'px';
        img.style.height = this.imgHeight + 'px';
        container.append(img);
        img.classList.add('projectile-img');
        img.style.animation = `rotate ${this.rotateTiming}s linear infinite forwards`;

        const hitbox = document.createElement('div');
        hitbox.style.width = this.hitboxWidth + 'px';
        hitbox.style.height = this.hitboxHeight + 'px';
        container.append(hitbox);
        hitbox.classList.add('projectile-hitbox');
        hitbox.style.top = (this.imgHeight / 2) - (this.hitboxHeight / 2) + 'px';
        hitbox.style.left = (this.imgWidth / 2) - (this.hitboxWidth / 2) + 'px';
        this.hitbox = hitbox;

        Projectile.projectiles.push(this);
        this.projectileElement = container;

        return container;
    }

    checkCollision(hitbox, collidingElement){
        const Rect = hitbox.getBoundingClientRect();
        const targetRect = collidingElement.getBoundingClientRect();

        if(Rect.bottom >= targetRect.top && // Проверка по Y
            Rect.top <= targetRect.bottom && // Проверка по Y
            Rect.left <= targetRect.right && // Проверка по X
            Rect.right >= targetRect.left) return true;
        
        return false;
    }
}



class Watermelon extends Projectile{
    constructor(){
        super(
            'media/melon.png',
            950,
            300,
            300,
            200,
            125
        )
    }
}

class Melon extends Projectile{
    constructor(){
        super(
            'media/watermelon.png',
            950,
            300,
            300,
            200,
            125,
            1,
            1.5
        )
    }
}

class Tomato extends Projectile{
    constructor(){
        super(
            'media/tomato.png',
            1100,
            150,
            150,
            75,
            50,
            2,
            4
        ),
        this.aimStrength = 2
    }

    aim(aiming){
        const playerPosX = parseInt(aiming.player.style.left) + aiming.imgWidth/2;
        const projectilePosX = parseInt(this.projectileElement.style.left);

        if(projectilePosX){
            if(projectilePosX > playerPosX){
                this.projectileElement.style.left = (projectilePosX - this.aimStrength) + 'px';
            }
            else if(projectilePosX < playerPosX){
                this.projectileElement.style.left = (projectilePosX + this.aimStrength) + 'px';
            }
        }
    }
}