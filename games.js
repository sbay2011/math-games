window.games={};

/* ---------------- RUNNER ---------------- */
window.games.runner=function(canvas,ctx){
let x=50, y=350, vy=0, gravity=0.6, jumping=false;
let obstacles=[700];

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    vy+=gravity;
    y+=vy;

    if(y>350){ y=350; vy=0; jumping=false; }

    ctx.fillRect(x,y,30,30);

    obstacles[0]-=5;
    if(obstacles[0]<-20) obstacles[0]=700;

    ctx.fillRect(obstacles[0],360,20,40);

    if(obstacles[0]<x+30 && obstacles[0]+20>x && y+30>360){
        ctx.fillText("Game Over",280,200);
        return;
    }

    requestAnimationFrame(update);
}
update();

document.onkeydown=e=>{
    if(e.code==="Space"&&!jumping){
        vy=-12;
        jumping=true;
    }
}

return {stop(){}};
};

/* ---------------- JUMP ---------------- */
window.games.jump=function(canvas,ctx){
let x=320,y=200;

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(x,y,20,0,Math.PI*2);
    ctx.fill();
    requestAnimationFrame(update);
}
update();

document.onmousemove=e=>{
    const rect=canvas.getBoundingClientRect();
    x=e.clientX-rect.left;
    y=e.clientY-rect.top;
}

return {stop(){}};
};

/* ---------------- PONG ---------------- */
window.games.pong=function(canvas,ctx){
let bx=320,by=200,vx=4,vy=3,py=180;

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    bx+=vx; by+=vy;
    if(by<0||by>400)vy*=-1;
    if(bx<20 && by>py && by<py+80)vx*=-1;

    ctx.fillRect(10,py,10,80);
    ctx.fillRect(bx,by,10,10);

    requestAnimationFrame(update);
}
update();

document.onmousemove=e=>{
    const rect=canvas.getBoundingClientRect();
    py=e.clientY-rect.top-40;
}

return {stop(){}};
};