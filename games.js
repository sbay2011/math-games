window.games = {};
window.gameList = [];

// --- Demo games ---
function addDemo(id, name, category, func){
    window.games[id]=func;
    window.gameList.push({id,name,category});
}

// ---------- Arcade / Platformers ----------
addDemo('runner','Runner','Arcade',function(canvas,ctx){
    let x=50,y=350,vy=0,gravity=0.6,jumping=false,obstacles=[700];
    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        vy+=gravity;y+=vy;if(y>350){y=350;vy=0;jumping=false;}
        ctx.fillStyle='red';ctx.fillRect(x,y,30,30);
        obstacles[0]-=5;if(obstacles[0]<-20) obstacles[0]=700;
        ctx.fillStyle='black';ctx.fillRect(obstacles[0],360,20,40);
        if(obstacles[0]<x+30 && obstacles[0]+20>x && y+30>360){
            ctx.fillStyle='black';ctx.fillText("Game Over",280,200);return;
        }
        requestAnimationFrame(update);
    }update();
    document.onkeydown=e=>{if(e.code==="Space"&&!jumping){vy=-12;jumping=true;}}
    return {stop(){}};
});

addDemo('pong','Pong','Arcade',function(canvas,ctx){
    let bx=320,by=200,vx=4,vy=3,py=180;
    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bx+=vx; by+=vy;
        if(by<0||by>400)vy*=-1;
        if(bx<20 && by>py && by<py+80)vx*=-1;
        ctx.fillStyle='black';
        ctx.fillRect(10,py,10,80);
        ctx.fillRect(bx,by,10,10);
        requestAnimationFrame(update);
    }update();
    document.onmousemove=e=>{const rect=canvas.getBoundingClientRect();py=e.clientY-rect.top-40;}
    return {stop(){}};
});

// ---------- Minecraft clone demo ----------
addDemo('mineclone','Minecraft Clone','Sandbox',function(canvas,ctx){
    ctx.fillStyle='#7ec850';ctx.fillRect(0,300,canvas.width,100);
    ctx.fillStyle='#87ceeb';ctx.fillRect(0,0,canvas.width,300);
    ctx.fillStyle='brown';ctx.fillRect(300,250,40,50);
    ctx.fillStyle='black';ctx.fillText('Minecraft Clone Demo',250,200);
    return {stop(){}};
});

// ---------- Roblox-style clone ----------
addDemo('robloxclone','Roblox Clone','Sandbox',function(canvas,ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='orange';
    ctx.fillRect(50,300,50,50);ctx.fillRect(150,300,50,50);
    ctx.fillStyle='black';ctx.fillText('Roblox-style Demo',220,200);
    return {stop(){}};
});

// ---------- Geometry Dash clone ----------
addDemo('geometrydash','Geometry Dash','Arcade',function(canvas,ctx){
    let x=50,y=350,vy=0,gravity=0.6,jumping=false,obstacles=[700];
    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        vy+=gravity;y+=vy;if(y>350){y=350;vy=0;jumping=false;}
        ctx.fillStyle='blue';ctx.fillRect(x,y,30,30);
        obstacles[0]-=5;if(obstacles[0]<-20) obstacles[0]=700;
        ctx.fillStyle='black';ctx.fillRect(obstacles[0],360,20,40);
        if(obstacles[0]<x+30 && obstacles[0]+20>x && y+30>360){ctx.fillStyle='black';ctx.fillText("Game Over",280,200);return;}
        requestAnimationFrame(update);
    }update();
    document.onkeydown=e=>{if(e.code==="Space"&&!jumping){vy=-12;jumping=true;}}
    return {stop(){}};
});

// ---------- Five Nights at Diddys mini demo ----------
addDemo('fnad','Five Nights at Diddys','Horror',function(canvas,ctx){
    ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='white';ctx.fillText('Five Nights at Diddys Demo',180,200);
    return {stop(){}};
});

// NES Emulator
addDemo('nes','NES Emulator','Emulators',function(canvas,ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='black';
    ctx.fillText('NES Emulator: Choose your .nes file',150,200);

    const input = document.createElement('input');
    input.type='file';
    input.accept='.nes';
    input.style.position='absolute';
    input.style.top='50px';
    input.style.left='50px';
    input.onchange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(ev){
            const buffer = ev.target.result;
            const nes = new jsnes.NES({onFrame:frame=>{
                // render NES frame to canvas
                const imageData = new ImageData(new Uint8ClampedArray(frame.buffer),256,240);
                ctx.putImageData(imageData,0,0);
            }});
            nes.loadROM(new Uint8Array(buffer));
            nes.start();
        };
        reader.readAsArrayBuffer(file);
    };
    document.body.appendChild(input);

    return {stop(){}};
});

// SNES Emulator
addDemo('snes','SNES Emulator','Emulators',function(canvas,ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='black';
    ctx.fillText('SNES Emulator: Choose your .smc file',150,200);

    const input = document.createElement('input');
    input.type='file';
    input.accept='.smc';
    input.style.position='absolute';
    input.style.top='50px';
    input.style.left='50px';
    input.onchange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(ev){
            const buffer = ev.target.result;
            // snes emulator code here (use JS SNES emulator like snes9x.js)
            // this will load the ROM and render to canvas
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillText('Loaded SNES ROM (demo)',150,200);
        };
        reader.readAsArrayBuffer(file);
    };
    document.body.appendChild(input);

    return {stop(){}};
});

// ---------- Placeholder slots to reach 100 total ----------
for(let i=7;i<=100;i++){
    addDemo('game'+i,'Game '+i,'Misc',function(canvas,ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='grey';
        ctx.fillText('Placeholder Game '+i,250,200);
        return {stop(){}};
    });
}

