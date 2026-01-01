class Player2{
  constructor({ctx,imageSrc,framesMax=1,scale=1,offSet={x:0,y:0},sprites,attackBox={offset:{},width:undefined,height:undefined}}){
    this.ctx=ctx;

    this.position={
      x:canvas.width-400,
      y:0,
    };
    this.size={
      width:100,
      height:300,
    };

    // Spritess
    this.image=new Image();
    this.image.src=imageSrc;
    this.framesMax=framesMax;
    this.framesCurrent=0;
    this.framesElapsed=0;
    this.framesHold=5;
    this.scale=scale;
    this.offSet=offSet;
    this.sprites=sprites;
    this.dead=false;

    for(const sprite in this.sprites){
      sprites[sprite].image=new Image()
      sprites[sprite].image.src=sprites[sprite].imageSrc
    }


    this.gravity=0.8;
    this.mathi={
      y:0,
    };
    this.jumpPower=-25;
    this.isOnGround=false;
    this.speed=7;
    // this.color="yellow";

    this.isAttacking=false;
    this.attackBox={
        x:0,
        y:0,
        width:-attackBox.width,
        height:attackBox.height,
        offSet:attackBox.offset,
    };
    this.health=100;
  }
 
  draw() {
  this.ctx.save(); // canvas ko current state stores
  this.ctx.imageSmoothingEnabled = false; // bnot too much blurry 
  this.ctx.translate(
    this.position.x-this.offSet.x+(this.image.width/this.framesMax)*this.scale,
    this.position.y-this.offSet.y
  );// drawing ko og origin maintains
  this.ctx.scale(-1,1);// horizontall flip
  this.ctx.drawImage(
    this.image,
    this.framesCurrent*(this.image.width/this.framesMax),
    0,
    this.image.width/this.framesMax,
    this.image.height,
    0,
    0,
    (this.image.width/this.framesMax)*this.scale,
    this.image.height*this.scale
  );
  this.ctx.restore();

  // this.ctx.fillStyle = "green"; //collisoin testt
  //     this.ctx.fillRect(
  //       this.attackBox.x,
  //       this.attackBox.y,
  //       this.attackBox.width,
  //       this.attackBox.height
  //     );
      
}

  switchSprite(sprite){
    if(this.image==this.sprites.death.image){
      if(this.framesCurrent==this.sprites.death.framesMax-1)this.dead=true;
      return;
    }

    if((this.image==this.sprites.attack1.image&&this.framesCurrent<this.sprites.attack1.framesMax-1)||
  (this.image==this.sprites.attack2.image&&this.framesCurrent<this.sprites.attack2.framesMax-1)){
    this.isAttacking=false
      return;
    }
    if(this.image==this.sprites.takeHit.image&&this.framesCurrent<this.sprites.takeHit.framesMax-1){
      return;
    }
    switch(sprite){
      case 'idle':
        if(this.image!== this.sprites.idle.image){
          this.image=this.sprites.idle.image
          this.framesMax=this.sprites.idle.framesMax
          this.framesCurrent=0
        }
        break
      case 'run':
        if(this.image!==this.sprites.run.image){
          this.image=this.sprites.run.image
          this.framesMax=this.sprites.run.framesMax
          this.framesCurrent=0
        }
        break
      case 'jump':
        if(this.image!==this.sprites.jump.image){
          this.image=this.sprites.jump.image
          this.framesMax=this.sprites.jump.framesMax
          this.framesCurrent=0
        }
        break
      case 'fall':
        if(this.image!==this.sprites.fall.image){
          this.image=this.sprites.fall.image
          this.framesMax=this.sprites.fall.framesMax
          this.framesCurrent=0
        }
        break
      case 'attack1':
        if(this.image!==this.sprites.attack1.image){
          this.image=this.sprites.attack1.image
          this.framesMax=this.sprites.attack1.framesMax
          this.framesCurrent=0
        }
        break
      case 'attack2':
        if(this.image!==this.sprites.attack2.image){
          this.image=this.sprites.attack2.image
          this.framesMax=this.sprites.attack2.framesMax
          this.framesCurrent=0
        }
        break
      case 'takeHit':
        if(this.image!==this.sprites.takeHit.image){
          this.image=this.sprites.takeHit.image
          this.framesMax=this.sprites.takeHit.framesMax
          this.framesCurrent=0
        }
        break
      case 'death':
        if(this.image!==this.sprites.death.image){
          this.image=this.sprites.death.image
          this.framesMax=this.sprites.death.framesMax
          this.framesCurrent=0
        }
        break
    }
  }
  animate(){
//Sprite animatess
    this.framesElapsed++;
    if (this.framesElapsed%this.framesHold==0){
      if(this.framesCurrent<this.framesMax-1){
        this.framesCurrent++
      }else{
        this.framesCurrent=0
      }
    }
  }
  update(){
    this.draw();
    if(!this.dead){
      this.animate();
    }
    

    this.mathi.y+=this.gravity;
    this.position.y+=this.mathi.y;

    //Ground Detectss
    if(this.position.y+this.size.height>=canvas.height){
      this.position.y=canvas.height-this.size.height;
      this.mathi.y=0;
      this.isOnGround=true;
    }else{
      this.isOnGround=false;
    }


    this.attackBox.x=this.position.x+0;
    this.attackBox.y=this.position.y+50;

    if (
  this.isAttacking&&
  (this.image==this.sprites.attack1.image||this.image==this.sprites.attack2.image)&&
  this.framesCurrent==this.sprites.attack1.framesMax-1
) {
  this.isAttacking = false;
}   
  }

  jump(){
    if(this.isOnGround){
      this.mathi.y=this.jumpPower;
      this.isOnGround=false;
    }
    this.switchSprite("jump");
  }

  moveLeft(){
    this.position.x-=this.speed;
    if(this.position.x<0)this.position.x=0;
    this.switchSprite("run");
  }

  moveRight(){
    this.position.x+=this.speed;
    if (this.position.x+this.size.width>window.innerWidth-100)
      this.position.x=window.innerWidth-this.size.width-100;
    this.switchSprite("run");
  }
   attack(){
    if(!this.dead){

      if (this.isAttacking) return;
      const a=Math.floor(Math.random()*2)+1;
      
      this.isAttacking=true;
      this.switchSprite(`attack${a}`);
      // console.log(a);
    }
}
takeHit(){
  this.health-=10;
  if(this.health==0){
    this.switchSprite("death");
    let b=`GameAssets/bgMusic/dead.mp3`;
    this.effects(b)
    this.isAttacking=false;
  }else{
    this.switchSprite("takeHit");
  }
}
effects(b){
let effect= new Audio(b);
effect.play();
}
}


export default Player2;