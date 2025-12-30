class Player2{
  constructor(ctx){
    this.ctx=ctx;

    this.size={
      width:100,
      height:300,
    };

    this.position={
      x:canvas.width-200,
      y:0,
    };

    this.mathi={
      y:0,
    };

    this.gravity=1;
    this.jumpPower=-20;
    this.isOnGround=false;

    this.color="yellow";
    this.speed=11;

    this.isAttacking

    this.attackBox={
        x:0,
        y:0,
        width:-150,
        height:50,
    }
    this.health=100;
  }
  attack(){
  this.isAttacking=true;
    setTimeout(()=>{
        this.isAttacking=false
    },100)
}
  draw(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    this.attackBox.x = this.position.x;
  this.attackBox.y = this.position.y;
if(this.isAttacking){

  this.ctx.fillStyle = "green";
  this.ctx.fillRect(
    this.attackBox.x,
    this.attackBox.y,
    this.attackBox.width,
    this.attackBox.height
  );
}
  }

  update(){
    this.draw();

    this.mathi.y+=this.gravity;
    this.position.y+=this.mathi.y;

    
    if (this.position.y+this.size.height>=canvas.height){
      this.position.y=canvas.height-this.size.height;
      this.mathi.y=0;
      this.isOnGround=true;
    }else{
      this.isOnGround=false;
    }

    
  }

  jump(){
    if(this.isOnGround){
      this.mathi.y=this.jumpPower;
      this.isOnGround=false;
    }
  }

  moveLeft(){
    this.position.x-=this.speed;
    if(this.position.x<0)this.position.x=0;
  }

  moveRight(){
    this.position.x+=this.speed;
    if (this.position.x+this.size.width>window.innerWidth)
      this.position.x=window.innerWidth-this.size.width;
  }
}
export default Player2;
