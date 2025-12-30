import Player from "./Player.js";
import Player2 from "./Player2.js";

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let Arena= Math.floor(Math.random()*13);
canvas.style.backgroundImage=`url('GameAssets/Arenas/Arena${Arena+1}.gif')`;


let music=Math.floor(Math.random()*2);
const bgMusic= new Audio(`GameAssets/bgMusic/music${music+1}.mp3`);
document.addEventListener("click",()=>{
  bgMusic.volume=0.5;
  bgMusic.play();
})

const player=new Player(ctx);
const player2=new Player2(ctx);

let keys={};
let lastKey1=""; //for P1
let lastKey2=""; //for p2

let  audio=new Audio(music);
  audio.play("GameAssets/bgMusic/music1.mp3");

document.addEventListener("keydown",(e)=>{
  keys[e.key]=true;

  //Player 1 controls
  if (["a","A","d","D","w","W","s","S"].includes(e.key)) {
    lastKey1=e.key;
  }

  //Player 2 controls
  if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) {
    lastKey2=e.key;
  }
});

document.addEventListener("keyup",(e)=>{
  keys[e.key]=false;
});


function moving(){
if(keys["a"]&&lastKey1=="a"){
        player.moveLeft();
    } 
  else if(keys["d"]&&lastKey1=="d"){
    player.moveRight();
  }

  if(keys["w"]){
    player.jump();
  }
  
  // PLAYER 2
  if (keys["ArrowLeft"]&&lastKey2=="ArrowLeft"){
    player2.moveLeft();
  }
  else if(keys["ArrowRight"]&&lastKey2=="ArrowRight"){
    player2.moveRight();
  }

  if(keys["ArrowUp"]){
    player2.jump();
  }
}
const p1Health= document.getElementById("p1Health")
const p2Health= document.getElementById("p2Health");
const timer= document.getElementById("timer");
const whoWon=document.getElementById("whoWon");
let time=60;
let timerId;

function winnerwinner({player,player2,timerId}){
  clearTimeout(timerId)
if(player.health==player2.health)
  {
    whoWon.style.display="flex";
    whoWon.textContent="Tie";
  }
  if(player.health>player2.health)
  {
    whoWon.style.display="flex";
    whoWon.textContent="Player1 Won";
  }
  if(player.health<player2.health)
  {
    whoWon.style.display="flex";
    whoWon.textContent="Player2 Won";
  }
}
function decTime(){
  if(time>0){
    timerId=setTimeout(decTime,1000)
    time--;
    timer.textContent=time;
  }
  if(time==0){
    winnerwinner({player,player2,timerId});
  }
}
decTime();

function gameLoop(){
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  moving();
  player.update();
  player2.update();

  
  
  if(
  player.attackBox.x<player2.position.x+player2.size.width&&
  player.attackBox.x+player.attackBox.width> player2.position.x &&
  player.attackBox.y<player2.position.y + player2.size.height &&
  player.attackBox.y+player.attackBox.height > player2.position.y&&player.isAttacking
  ) 
  {
  player.isAttacking=false;
  player2.health-=10;
  p2Health.style.width=player2.health+"%";
  if(player2.health<=20){
  p2Health.style.backgroundColor="red";
}
  if(player2.health<=0){
 winnerwinner({player,player2,timerId})
}
  }

if(
player2.attackBox.x>player.position.x&&
player2.attackBox.x+player2.attackBox.width<player.position.x+player.size.width&&
player2.attackBox.y<player.position.y+player.size.height&&
player2.attackBox.y+player.attackBox.height>player.position.y&&player2.isAttacking
) 
{
player2.isAttacking=false;
player.health-=10;
p1Health.style.width=player.health+"%";
if(player.health<=20){
  p1Health.style.backgroundColor="red";
}
if(player.health<=0){
  winnerwinner({player,player2,timerId});
}
}

}

gameLoop();


document.addEventListener("keyup",(event)=>{
    if(event.key=="s")
    {
        player.attack();
    }
    if(event.key=="ArrowDown")
    {
        player2.attack();
    }
})