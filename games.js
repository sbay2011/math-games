window.games={};

/* ---------- Runner ---------- */
window.games.runner=function(canvas,ctx){
    let x=50,y=350,vy=0,gravity=0.6,jumping=false;
    let obstacles=[700];

    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        vy+=gravity; y+=vy;
        if(y>350){y=350;vy=0;jumping=false;}
        ctx.fillStyle="red"; ctx.fillRect(x,y,30,30);

        obstacles[0]-=5;
        if(obstacles[0]<-20) obstacles[0]=700;
        ctx.fillStyle="black"; ctx.fillRect(obstacles[0],360,20,40);

        if(obstacles[0]<x+30 && obstacles[0]+20>x && y+30>360){
            ctx.fillStyle="black"; ctx.fillText("Game Over",280,200);
            return;
        }
        requestAnimationFrame(update);
    }
    update();

    document.onkeydown=e=>{if(e.code==="Space"&&!jumping){vy=-12;jumping=true;}}
    return {stop(){}};
};

/* ---------- Pong ---------- */
window.games.pong=function(canvas,ctx){
    let bx=320,by=200,vx=4,vy=3,py=180;
    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bx+=vx; by+=vy;
        if(by<0||by>400)vy*=-1;
        if(bx<20 && by>py && by<py+80)vx*=-1;

        ctx.fillStyle="black";
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

/* ---------- Pixel Art ---------- */
window.games.pixelArt=function(canvas,ctx){
    let size=10,px=0,py=0;
    canvas.onclick=e=>{
        const rect=canvas.getBoundingClientRect();
        px=Math.floor((e.clientX-rect.left)/size)*size;
        py=Math.floor((e.clientY-rect.top)/size)*size;
        ctx.fillStyle="#"+Math.floor(Math.random()*16777215).toString(16);
        ctx.fillRect(px,py,size,size);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    return {stop(){}};
};

/* ---------- NES Emulator Demo ---------- */
window.games.nes=function(canvas,ctx){
    ctx.fillStyle="blue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    ctx.fillText("NES Emulator Demo",220,200);
    return {stop(){}};
};

/* ---------- Minecraft Clone Demo ---------- */
window.games.mineclone=function(canvas,ctx){
    ctx.fillStyle="#7ec850"; ctx.fillRect(0,300,canvas.width,100);
    ctx.fillStyle="#87ceeb"; ctx.fillRect(0,0,canvas.width,300);
    ctx.fillStyle="brown"; ctx.fillRect(300,250,40,50);
    ctx.fillStyle="grey"; ctx.fillText("Minecraft Clone Demo",250,200);
    return {stop(){}};
};
