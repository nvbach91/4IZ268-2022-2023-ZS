var game = null;
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    const urls = ["url1", "url2", "url3"];
    const url1 = "https://community-placekitten.p.rapidapi.com/150/150";
    const url2 = "https://community-placekitten.p.rapidapi.com/100/100";
    const url3 = "https://community-placekitten.p.rapidapi.com/50/50";
    const headers = {
    "X-RapidAPI-Key": "2f4898235cmsh2ca9cd357e660e8p1d37cejsn0cd5e77ccb01",
    "X-RapidAPI-Host": "community-placekitten.p.rapidapi.com"
    };

    urls.forEach((url, index) => {
    const fetchUrl = eval(url);
    const imgElement = document.getElementById(`cat${index + 1}`);
    fetch(fetchUrl, { headers: headers })
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok");
      })
      .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        imgElement.src = imgUrl;
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
    });

    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((   (e.key === 'ArrowUp') ||
                        (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                } else if ( e.key === ' '){
                    this.game.player.shootTop();
                } else if ( e.key === 'd'){
                    this.game.debug = !this.game.debug;
                }
            });
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    class SoundController {
        constructor(){
            this.powerUpSound = document.getElementById('powerup');
            this.powerDownSound = document.getElementById('powerdown');
            this.explosionSound = document.getElementById('jachcemmir');
            this.shotSound = document.getElementById('shot');
            this.hitSound = document.getElementById('nashledanou');
        }
        powerUp(){
            this.powerUpSound.currentTime = 0;
            this.powerUpSound.play();
        }
        powerDown(){
            this.powerDownSound.currentTime = 0;
            this.powerDownSound.play();
        }
        explosion(){
            this.explosionSound.currentTime = 0;
            this.explosionSound.play();
        }
        shot(){
            this.shotSound.currentTime = 0;
            this.shotSound.play();
        }
        hit(){
            this.hitSound.currentTime = 0;
            this.hitSound.play();
        }
    }

    class Projectile {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 15;
            this.speed = Math.random() * 0.2 + 15;
            this.markedForDeletion = false;
            this.image = document.getElementById('bullet');
            this.frameX = 0;
            this.maxFrame = 2;
            this.fps = 10;
            this.timer = 0;
            this.interval = 1000/this.fps;
        }
        update(deltaTime){
            this.x += this.speed;
            if (this.timer > this.interval){
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
            if (this.x > this.game.width * 0.95) this.markedForDeletion = true;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }
    class Particle {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('blood');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 50;
            this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
            this.size = this.spriteSize * this.sizeModifier;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * -15;
            this.gravity = 0.5;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1;
            this.bounced = 0;
            this.bottomBounceBoundary = Math.random() * 80 + 60;
        }
        update(){
            this.angle += this.va;
            this.speedY += this.gravity;
            this.x -= this.speedX + this.game.speed;
            this.y += this.speedY;
            if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
            if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5){
                this.bounced++;
                this.speedY *= -0.7;
            }
        }
        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.frameX = 0;
            this.frameY = 0;
            this.speedY = 0;
            this.maxSpeed = 6;
            this.projectiles = [];
            this.image = document.getElementById('player');
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
        }
        update(deltaTime){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // vertical boundaries
            if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update(deltaTime);
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
            // power up
            if (this.powerUp){
                if (this.powerUpTimer > this.powerUpLimit){
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.game.sound.powerDown();
                } else {
                    this.powerUpTimer += deltaTime;
                    this.game.ammo += 0.1;
                }
            }
        }
        draw(context){
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        shootTop(){
            if (this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 90, this.y + 46));
                this.game.ammo--;
            }
            this.game.sound.shot();
            if (this.powerUp) this.shootBottom();
        }
        shootBottom(){
            if (this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 90, this.y + 33));
            }
        }
        enterPowerUp(){
            this.powerUpTimer = 0;
            this.powerUp = true;
            if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
            this.game.sound.powerUp();
        }
    }
    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -5 - 0.5;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.frameY = 0;
        }
        update(){
            this.x += this.speedX - this.game.speed;
            if (this.x + this.width < 0) this.markedForDeletion = true;
            // sprite animation
        }
        draw(context){
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            if (this.game.debug){
                context.font = '20px Helvetica';
                context.fillText(this.lives, this.x, this.y);
            }
        }
    }
    class Babis extends Enemy {
        constructor(game){
            super(game);
            this.width = 140;
            this.height = 171;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('babis');
            this.lives = 7;
            this.score = this.lives;
            this.type = 'babis';
        }
    }

    class Cat1 extends Enemy {
        constructor(game){
            super(game);
            this.width = 150;
            this.height = 150;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('cat1');
            this.lives = 2;
            this.score = -10;
            this.type = 'cat';
        }
    }
    class Cat2 extends Enemy {
        constructor(game){
            super(game);
            this.width = 100;
            this.height = 100;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.image = document.getElementById('cat2');
            this.lives = 3;
            this.score = -10;
            this.type = 'cat';
        }
    }
    class Cat3 extends Enemy {
        constructor(game){
            super(game);
            this.width = 50;
            this.height = 50;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('cat3');
            this.lives = 1;
            this.score = -10;
            this.type = 'cat';
        }
    }

    class Explosion {
        constructor(game, x, y){
            this.game = game;
            this.frameX = 0;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
            this.fps = 30;
            this.timer = 0;
            this.interval = 1000/this.fps;
            this.markedForDeletion = false;
            this.maxFrame = 8;
        }
        update(deltaTime){
            this.x -= this.game.speed;
            if (this.timer > this.interval){
                this.frameX++;
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
            if (this.frameX > this.maxFrame) this.markedForDeletion = true;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
    
    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Bangers';
            this.color = 'yellow';
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            // score
            context.fillText('Score: ' + this.game.score, 20, 40);
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, 20, 100);
            // game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score > this.game.winningScore){
                    message1 = 'GIGACHAD PAVEL WINS!';
                    message2 = 'Congratulations Mr. Sharpshooter!';
                } else {
                    message1 = 'GAME OVER!';
                    message2 = 'Shoot more accurately and try again!';
                }
                context.font = '60px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = '35px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
            // ammo
            if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            context.restore();
        }
    }
    class Game {
        constructor(width, height){
            this.gameStarted = false;
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.sound = new SoundController();
            this.keys = [];
            this.enemies = [];
            this.particles = [];
            this.explosions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1750;
            this.ammo = 30;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 350;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 222;
            this.gameTime = 0;
            this.timeLimit = 60000;
            this.speed = 1; 
            this.debug = false;
        }
        
        startGame() {
            this.gameStarted = true;
        }

        update(deltaTime){
        if (this.gameStarted) {
            if (!this.gameOver) {
            this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) {
                this.gameOver = true;
                this.particles = [];
                this.enemies = [];
            }
            this.player.update(deltaTime);
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                    if (enemy.type === 'babis') {
                        this.sound.hit();
                        }
                    for (let i = 0; i < enemy.score; i++){
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    }
                    if (enemy.type === 'cat') this.player.enterPowerUp(this.score = this.score + 5);
                    else if (!this.gameOver) this.score--;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                        if (enemy.lives <= 0){
                            for (let i = 0; i < enemy.score; i++){
                                this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                            }
                            enemy.markedForDeletion = true;
                            if (enemy.type === 'babis') 
                                this.sound.explosion();
                                
                            if (!this.gameOver) this.score += enemy.score;
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else { 
                this.enemyTimer += deltaTime;
            }
            }
        }
        }
        draw(context){
            if (this.gameStarted) {
            this.ui.draw(context);
            this.player.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            }
        }
        addEnemy(){
            const randomize = Math.random();
            if (randomize < 0.88) this.enemies.push(new Babis(this));
            else if (randomize < 0.92) this.enemies.push(new Cat1(this));
            else if(randomize < 0.96) this.enemies.push(new Cat2(this));
            else this.enemies.push(new Cat3(this));
        }
        addExplosion(enemy){{
            this.explosions.push(new Explosion(this));
            }
        }
        checkCollision(rect1, rect2){
            return (        rect1.x < rect2.x + rect2.width &&
                            rect1.x + rect1.width > rect2.x &&
                            rect1.y < rect2.y + rect2.height &&
                            rect1.height + rect1.y > rect2.y)
        }
    }

    game = new Game(canvas.width, canvas.height);
    const startButton = document.createElement("button");
    startButton.innerHTML = "Start game";
    startButton.className = "start-button";
    startButton.addEventListener("click", () => {
    game.startGame();
    startButton.style.display = "none";
    });
    document.body.appendChild(startButton);

    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});