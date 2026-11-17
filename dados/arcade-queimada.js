/* Fliperama · "6-7 contra 42" (queimada). Carrega DEPOIS do script principal: usa ARCADE do index.
   Partida de 60 s; ganha quem tiver mais pontos no fim. Escolhe o personagem na própria tela do jogo. */
(function(){
if(typeof ARCADE==='undefined')return;
const LW=400,LH=640,MID=320,SIDE=34,DUR=60;
const CH={'67':{label:'67',col:'#ff7a2f',dark:'#b34400',name:'6-7'},'42':{label:'42',col:'#3a8dff',dark:'#1a4fa8',name:'42'}};
const PW={star:{e:'⭐',w:30},ice:{e:'❄️',w:20},shield:{e:'🛡️',w:18},dbl:{e:'🎾',w:16},big:{e:'🍄',w:16}};
const FANS=['😃','🤩','😄','🥳','😆','😁','🙌','👏'];
let AC=null;function snd(f,d,type,v){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),gn=AC.createGain();o.type=type||'square';o.frequency.value=f;gn.gain.value=v||.05;o.connect(gn);gn.connect(AC.destination);const n=AC.currentTime;o.frequency.exponentialRampToValueAtTime(f*.6,n+d);gn.gain.exponentialRampToValueAtTime(.0001,n+d);o.start(n);o.stop(n+d);}catch(e){}}

function drawChar(g,ch,x,y,o){o=o||{};const s=o.s||1,tt=o.t||0,walk=o.walk||0,flash=o.flash||0,pow=o.pow||0,face=o.face||'ok';
  g.save();g.translate(x,y);g.scale(s,s);
  if(o.dance){g.translate(0,-Math.abs(Math.sin(tt*9))*16);g.rotate(Math.sin(tt*9)*.15);}
  if(flash>0)g.translate(Math.sin(tt*60)*4,0);
  if(o.sel){g.fillStyle='#ffd23f55';g.beginPath();g.arc(0,4,62,0,7);g.fill();}
  if(pow>0){const r=46+Math.sin(tt*10)*4;const gr=g.createRadialGradient(0,0,10,0,0,r);gr.addColorStop(0,'#fff6a0cc');gr.addColorStop(1,'#ffd23f00');g.fillStyle=gr;g.beginPath();g.arc(0,0,r,0,7);g.fill();}
  const sw=Math.sin(walk)*7;g.lineCap='round';g.strokeStyle=ch.dark;g.lineWidth=5;
  g.beginPath();g.moveTo(-11,20);g.lineTo(-13+sw,40);g.moveTo(11,20);g.lineTo(13-sw,40);g.stroke();
  g.fillStyle='#3a2850';g.beginPath();g.ellipse(-15+sw,42,9,5,0,0,7);g.ellipse(15-sw,42,9,5,0,0,7);g.fill();
  const up=o.dance?Math.abs(Math.sin(tt*9)):(o.throwAnim||0);
  g.beginPath();g.moveTo(-26,0);g.quadraticCurveTo(-40,-4-sw,-46,8+sw-up*30);g.moveTo(26,0);g.quadraticCurveTo(40,-4+sw,46,8-sw-up*30);g.stroke();
  g.fillStyle='#fff';g.strokeStyle=ch.dark;g.lineWidth=3;
  g.beginPath();g.arc(-46,8+sw-up*30,6,0,7);g.fill();g.stroke();g.beginPath();g.arc(46,8-sw-up*30,6,0,7);g.fill();g.stroke();
  g.font='700 58px Fredoka, sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  g.lineWidth=9;g.strokeStyle='#fff';g.strokeText(ch.label,0,0);g.lineWidth=4;g.strokeStyle=ch.dark;g.strokeText(ch.label,0,0);
  g.fillStyle=flash>0?'#ff4d6d':ch.col;g.fillText(ch.label,0,0);
  const ex=13,ey=-10;
  if(face==='ouch'){g.strokeStyle='#3a2850';g.lineWidth=3;[-ex,ex].forEach(dx=>{g.beginPath();g.moveTo(dx-5,ey-4);g.lineTo(dx+5,ey+4);g.moveTo(dx+5,ey-4);g.lineTo(dx-5,ey+4);g.stroke();});}
  else{[-ex,ex].forEach(dx=>{g.fillStyle='#fff';g.strokeStyle='#3a2850';g.lineWidth=2;g.beginPath();g.ellipse(dx,ey,7,8,0,0,7);g.fill();g.stroke();
    g.fillStyle='#3a2850';g.beginPath();g.arc(dx+(o.look||0)*2.5,ey+1+(o.lookY||0)*2,3.6,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(dx+1+(o.look||0)*2.5,ey-1+(o.lookY||0)*2,1.3,0,7);g.fill();});}
  g.fillStyle='#ff9fc4aa';g.beginPath();g.ellipse(-22,6,5,3,0,0,7);g.ellipse(22,6,5,3,0,0,7);g.fill();
  g.strokeStyle='#3a2850';g.lineWidth=3;g.beginPath();
  if(face==='ouch'){g.ellipse(0,10,5,6,0,0,7);g.fillStyle='#3a2850';g.fill();}
  else if(face==='win'){g.arc(0,5,9,0.1,Math.PI-0.1);g.stroke();}
  else{g.arc(0,6,6,0.2,Math.PI-0.2);g.stroke();}
  g.restore();}

ARCADE.queimada={n:'🔥 6-7 contra 42',
 h:'Escolha seu jogador. Arraste o dedo na sua quadra para andar e toque na tela (ou segure 🎯) para jogar a bola. 60 segundos!',
 hd:'Escolha com ← → e espaço. Setas para andar, espaço (pode segurar) ou clique para jogar a bola. 60 segundos!',
 W:360,H:576,dur:DUR,noCoins:true,btns:[['🎯 Jogar','F']],
 make(m){
  const K=m.W/LW;let phase='pick',pickIdx=0,me=null,cpu=null,balls=[],stars=[],fx=[],conf=[],rockets=[],starT=3,shake=0,cheer=0,cheerSide=0,holdFire=false,keys={},touchT=null,T=0,winner=null,msg=null,celebT=0;
  const P=(c,side)=>{const y=side==='bot'?540:100;return{ch:CH[c],x:LW/2,y,side,r:30,score:0,cd:0,pow:0,dbl:0,big:0,shield:0,frozen:0,flash:0,walk:0,throwAnim:0,face:'ok',faceT:0,tx:LW/2,ty:y,nextThrow:1.6};};
  const choose=i=>{const k=i?'42':'67';me=P(k,'bot');cpu=P(k==='67'?'42':'67','top');phase='play';m.t0=performance.now();msg={txt:'Valendo! 60 segundos',t:1.6};snd(660,.2,'triangle',.06);};
  const aim=()=>{const b=Math.atan2(cpu.x-me.x,me.y-cpu.y);return Math.max(-.8,Math.min(.8,b+Math.sin(T*1.3)*0.24));};
  const addFx=(x,y,txt,col,d)=>fx.push({x,y,txt,col,t:d||1.1});
  const burst=(x,y,col,n)=>{for(let i=0;i<(n||14);i++)fx.push({x,y,vx:(Math.random()-.5)*300,vy:(Math.random()-.5)*300,t:.6,p:1,col});};
  function thr(p,ang){if(!p||phase!=='play'||p.cd>0||p.frozen>0)return;const strong=p.pow>0,big=p.big>0;
    const sp=p===me?(strong?620:440):(strong?480:340);const dir=p.side==='bot'?-1:1;
    (p.dbl>0?[ang-.13,ang+.13]:[ang]).forEach(a=>balls.push({x:p.x,y:p.y+dir*34,vx:Math.sin(a)*sp,vy:Math.cos(a)*sp*dir,owner:p,strong,rad:big?22:(strong?13:11),trail:[]}));
    if(p.dbl>0)p.dbl--;if(strong)p.pow--;p.cd=p===me?0.5:0.65;p.throwAnim=1;snd(strong?240:420,.12,strong?'sawtooth':'square',.05);}
  function finish(){phase='end';balls=[];me.frozen=cpu.frozen=0;me.shield=cpu.shield=0;const d=me.score-cpu.score;winner=d>0?me:d<0?cpu:null;cheer=5;cheerSide=d>0?-1:1;celebT=0;
    for(let i=0;i<70;i++)conf.push({x:Math.random()*LW,y:-20-Math.random()*200,vx:(Math.random()-.5)*80,vy:60+Math.random()*120,r:Math.random()*6,vr:(Math.random()-.5)*10,c:['#ff5fa2','#ffd23f','#5fd38d','#3a8dff','#ff7a2f','#8b6cf0'][i%6]});
    const win=d>0;[0,150,300,450].forEach((t,i)=>setTimeout(()=>snd(win?[523,659,784,1046][i]:d<0?[392,330,262,196][i]:[440,440,523,523][i],.25,'triangle',.07),t));
    m.endHTML=(win?'🏆 Você ganhou!':d<0?'😅 Quase! O '+cpu.ch.name+' ganhou.':'🤝 Empate!')+`<br><span style="font:800 15px Nunito">${me.ch.name} ${me.score} × ${cpu.score} ${cpu.ch.name}</span><br><span style="font:800 13px Nunito;color:var(--muted)">Os jogos do fliperama não dão moedas.</span>`;
    m.score=me.score;}
  const cvEl=document.getElementById('miniC');if(cvEl){cvEl.onpointerup=cvEl.onpointercancel=cvEl.onpointerleave=()=>{touchT=null;};}
  return{
   btn(k,on){if(k==='F'){if(phase==='pick'&&on){choose(pickIdx);return;}holdFire=on;}},
   down(x,y){x/=K;y/=K;if(phase==='pick'){choose(x<LW/2?0:1);return;}if(phase!=='play')return;thr(me,aim());if(y>MID)touchT={x,y:Math.max(MID+50,y)};},
   move(x,y){x/=K;y/=K;if(touchT)touchT={x,y:Math.max(MID+50,y)};},
   up(){touchT=null;},
   step(dt,t,el,left){T+=dt;
    if(phase==='pick'){m.t0=t;}
    if(phase==='play'&&left<=120){finish();m.dur+=4500;}       // acabou o tempo: comemoração antes de fechar
    cheer=Math.max(0,cheer-dt);if(msg){msg.t-=dt;if(msg.t<=0)msg=null;}
    conf.forEach(c=>{c.x+=c.vx*dt;c.y+=c.vy*dt;c.vy+=120*dt;c.r+=c.vr*dt;});conf=conf.filter(c=>c.y<LH+20);
    fx.forEach(f=>{f.t-=dt;if(f.p){f.x+=f.vx*dt;f.y+=f.vy*dt;}else f.y-=30*dt;});fx=fx.filter(f=>f.t>0);
    if(phase==='end'){celebT+=dt;if(winner===me||!winner){if(Math.random()<dt*2.6)rockets.push({x:SIDE+40+Math.random()*(LW-2*SIDE-80),y:LH,vy:-(420+Math.random()*160),ty:80+Math.random()*220,c:['#ffd23f','#ff5fa2','#5fd0ff','#7dff8a','#ff9f2e'][Math.floor(Math.random()*5)]});}
      rockets.forEach(r=>{if(r.boom){r.p.forEach(q=>{q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=90*dt;q.t-=dt;});return;}r.y+=r.vy*dt;if(r.y<=r.ty){r.boom=1;snd(160+Math.random()*80,.3,'sawtooth',.04);r.p=[];for(let i=0;i<36;i++){const a=i/36*6.283,s=110+Math.random()*90;r.p.push({x:r.x,y:r.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t:1.1+Math.random()*.4});}}});
      rockets=rockets.filter(r=>!r.boom||r.p.some(q=>q.t>0));
      if(celebT>4.2)m.end();return;}
    if(phase!=='play')return;
    let dx=0,dy=0;if(keys.L)dx--;if(keys.R)dx++;if(keys.U)dy--;if(keys.D)dy++;
    if(touchT){const a=touchT.x-me.x,b=touchT.y-me.y,dd=Math.hypot(a,b);if(dd>6){dx=a/dd;dy=b/dd;}}else if(dx&&dy){dx*=.707;dy*=.707;}
    if(me.frozen>0){dx=0;dy=0;}
    me.x+=dx*260*dt;me.y+=dy*260*dt;if(dx||dy)me.walk+=dt*14;
    me.x=Math.max(SIDE+30,Math.min(LW-SIDE-30,me.x));me.y=Math.max(MID+50,Math.min(LH-50,me.y));
    if(holdFire)thr(me,aim());
    // adversário
    let danger=null;balls.filter(b=>b.owner===me&&b.vy<0).forEach(b=>{const tt=(b.y-cpu.y)/(-b.vy);if(tt>0&&tt<0.9){const px=b.x+b.vx*tt;if(Math.abs(px-cpu.x)<58&&(!danger||tt<danger.tt))danger={px,tt};}});
    if(danger){if(!cpu.react){cpu.react=0.18+Math.random()*0.22;cpu.lazy=Math.random()<0.15;}if(cpu.lazy)cpu.react=1;cpu.react-=dt;
      if(cpu.react<=0){cpu.tx=danger.px>cpu.x?cpu.x-110:cpu.x+110;if(cpu.tx<SIDE+30)cpu.tx=cpu.x+110;if(cpu.tx>LW-SIDE-30)cpu.tx=cpu.x-110;}}
    else{cpu.react=0;const st=stars.find(s=>s.land&&s.y<MID);if(st&&Math.random()<0.025){cpu.tx=st.x;cpu.ty=st.y;}else if(Math.random()<0.012){cpu.tx=SIDE+40+Math.random()*(LW-2*SIDE-80);cpu.ty=70+Math.random()*170;}}
    const a=cpu.tx-cpu.x,b=cpu.ty-cpu.y,cd=Math.hypot(a,b),cs=danger&&!cpu.lazy?190:140;
    if(cd>4&&!(cpu.frozen>0)){cpu.x+=a/cd*Math.min(cs*dt,cd);cpu.y+=b/cd*Math.min(cs*dt,cd);cpu.walk+=dt*12;}
    cpu.x=Math.max(SIDE+30,Math.min(LW-SIDE-30,cpu.x));cpu.y=Math.max(50,Math.min(MID-50,cpu.y));
    cpu.nextThrow-=dt;
    if(cpu.nextThrow<=0&&cpu.cd<=0&&!(cpu.frozen>0)){const lead=0;const err=(Math.random()-.5)*190+(Math.random()<.25?(Math.random()<.5?-100:100):0);
      thr(cpu,Math.max(-.8,Math.min(.8,Math.atan2(me.x+lead+err-cpu.x,me.y-cpu.y))));cpu.nextThrow=0.9+Math.random()*0.9;}
    [me,cpu].forEach(p=>{p.frozen=Math.max(0,p.frozen-dt);p.shield=Math.max(0,p.shield-dt);p.big=Math.max(0,p.big-dt);p.cd=Math.max(0,p.cd-dt);p.flash=Math.max(0,p.flash-dt);p.throwAnim=Math.max(0,p.throwAnim-dt*4);if(p.faceT>0){p.faceT-=dt;if(p.faceT<=0)p.face='ok';}});
    balls.forEach(b=>{b.trail.push([b.x,b.y]);if(b.trail.length>(b.strong?10:5))b.trail.shift();b.x+=b.vx*dt;b.y+=b.vy*dt;
      if((b.x<SIDE+b.rad&&b.vx<0)||(b.x>LW-SIDE-b.rad&&b.vx>0)){b.vx=-b.vx;snd(700,.04,'triangle',.03);}
      const tg=b.owner===me?cpu:me;
      if(!b.dead&&Math.hypot(b.x-tg.x,b.y-tg.y)<tg.r+b.rad+(tg===cpu?0:-4)){b.dead=1;
        if(tg.shield>0){addFx(tg.x,tg.y-56,'🛡️ Bloqueou!','#9fe8ff',.9);burst(b.x,b.y,'#9fe8ff',8);snd(300,.12,'triangle',.05);return;}
        b.owner.score++;if(b.owner===me)m.add(1);tg.flash=.5;tg.face='ouch';tg.faceT=.7;b.owner.face='win';b.owner.faceT=.8;shake=b.strong?.35:.2;cheer=1.2;cheerSide=b.owner===me?-1:1;
        addFx(tg.x,tg.y-50,b.strong?'POW! +1':(b.rad>15?'BUM! +1':'+1'),b.owner.ch.col);burst(tg.x,tg.y,b.strong?'#ffd23f':'#fff');
        snd(b.owner===me?660:180,.22,'square',.06);if(b.owner===me)setTimeout(()=>snd(990,.18,'square',.05),90);}
      if(b.y<-30||b.y>LH+30)b.dead=1;});
    balls=balls.filter(b=>!b.dead);
    starT-=dt;if(starT<=0){starT=4.5+Math.random()*3.5;let r=Math.random()*100,k='star';for(const kk in PW){if(r<PW[kk].w){k=kk;break;}r-=PW[kk].w;}
      const top=Math.random()<.45;stars.push({k,x:SIDE+40+Math.random()*(LW-2*SIDE-80),y:-20,ty:top?80+Math.random()*180:MID+60+Math.random()*190,land:0,life:7});}
    stars.forEach(s=>{if(!s.land){s.y+=180*dt;if(s.y>=s.ty){s.y=s.ty;s.land=1;}}else s.life-=dt;
      [me,cpu].forEach(p=>{if(!s.got&&s.land&&Math.hypot(s.x-p.x,s.y-p.y)<44){s.got=1;const o=p===me?cpu:me;
        if(s.k==='ice'){o.frozen=2.5;addFx(o.x,o.y-60,'❄️ CONGELADO!','#8fe3ff',1.4);snd(1500,.35,'sine',.06);}
        else if(s.k==='shield'){p.shield=5;addFx(p.x,p.y-60,'🛡️ ESCUDO!','#9fe8ff',1.2);snd(600,.3,'sine',.06);}
        else if(s.k==='dbl'){p.dbl=4;addFx(p.x,p.y-60,'🎾 BOLA DUPLA!','#c6ff6b',1.2);snd(760,.3,'sine',.06);}
        else if(s.k==='big'){p.big=5;addFx(p.x,p.y-60,'🍄 BOLAS GIGANTES!','#ff9fc4',1.2);snd(330,.3,'sine',.06);}
        else{p.pow=3;addFx(p.x,p.y-60,'⭐ BOLA FORTE!','#ffd23f',1.2);snd(880,.3,'sine',.06);}}});});
    stars=stars.filter(s=>!s.got&&s.life>0);shake=Math.max(0,shake-dt);},
   draw(ctx){ctx.save();ctx.scale(K,K);if(shake>0)ctx.translate((Math.random()-.5)*12*shake/.35,(Math.random()-.5)*12*shake/.35);
    const g1=ctx.createLinearGradient(0,0,0,LH);g1.addColorStop(0,'#5fd38d');g1.addColorStop(1,'#3fb67a');ctx.fillStyle=g1;ctx.fillRect(0,0,LW,LH);
    for(let i=0;i<8;i++){if(i%2===0){ctx.fillStyle='#ffffff10';ctx.fillRect(SIDE,i*80,LW-2*SIDE,80);}}
    // torcida
    [[0,-1],[LW-SIDE,1]].forEach(([x0,side])=>{const g=ctx.createLinearGradient(x0,0,x0+SIDE,0);g.addColorStop(0,'#7a3fb5');g.addColorStop(1,'#5a2a90');ctx.fillStyle=g;ctx.fillRect(x0,0,SIDE,LH);
      ctx.font='22px serif';ctx.textAlign='center';ctx.textBaseline='middle';
      for(let i=0;i<14;i++){const yy=24+i*46,hop=(cheer>0&&cheerSide===side)?Math.abs(Math.sin(T*14+i))*8:Math.sin(T*2+i)*1.5;ctx.fillText(FANS[(i+(side>0?3:0))%FANS.length],x0+SIDE/2,yy-hop);}
      const tm=side===-1?me:cpu;if(tm){ctx.save();ctx.translate(x0+SIDE/2,MID);ctx.rotate(side*Math.PI/2);ctx.font='700 13px Fredoka, sans-serif';ctx.fillStyle=tm.ch.col;ctx.strokeStyle='#fff';ctx.lineWidth=3;const tx='torcida do '+tm.ch.label;ctx.strokeText(tx,0,0);ctx.fillText(tx,0,0);ctx.restore();}});
    ctx.strokeStyle='#ffffffcc';ctx.lineWidth=4;ctx.strokeRect(SIDE+6,8,LW-2*SIDE-12,LH-16);ctx.beginPath();ctx.moveTo(SIDE+6,MID);ctx.lineTo(LW-SIDE-6,MID);ctx.stroke();ctx.beginPath();ctx.arc(LW/2,MID,40,0,7);ctx.stroke();
    if(phase==='pick'){ctx.fillStyle='#120d33cc';ctx.fillRect(0,0,LW,LH);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 30px Fredoka, sans-serif';ctx.fillStyle='#fff';ctx.fillText('Escolha seu jogador!',LW/2,150);
      drawChar(ctx,CH['67'],LW*0.26,320,{t:T,walk:T*6,s:1.1,sel:pickIdx===0,look:Math.sin(T)});drawChar(ctx,CH['42'],LW*0.74,320,{t:T,walk:T*6+1,s:1.1,sel:pickIdx===1,look:Math.sin(T+1)});
      ctx.font='700 20px Fredoka, sans-serif';ctx.fillStyle='#ffd23f';ctx.fillText('Toque no 6-7 ou no 42',LW/2,440);ctx.font='600 15px Fredoka, sans-serif';ctx.fillStyle='#fff';ctx.fillText('⭐ força  ❄️ congela  🛡️ escudo  🎾 dupla  🍄 gigante',LW/2,490);ctx.restore();return;}
    // placar + tempo
    ctx.fillStyle='#120d33bb';ctx.beginPath();ctx.roundRect(LW/2-100,MID-22,200,44,22);ctx.fill();ctx.font='700 24px Fredoka, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle=me.ch.col;ctx.fillText(`${me.ch.label} ${me.score}`,LW/2-46,MID+1);ctx.fillStyle='#fff';ctx.fillText('×',LW/2,MID+1);ctx.fillStyle=cpu.ch.col;ctx.fillText(`${cpu.score} ${cpu.ch.label}`,LW/2+46,MID+1);
    stars.forEach(s=>{ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.k==='star'?T*2:Math.sin(T*3)*.3);const sc=1+Math.sin(T*8)*.12;ctx.scale(sc,sc);ctx.font='30px serif';ctx.textAlign='center';ctx.textBaseline='middle';if(s.land&&s.life<2&&Math.floor(T*8)%2)ctx.globalAlpha=.3;ctx.fillText(PW[s.k].e,0,0);ctx.restore();});
    if(phase==='play'&&!(me.frozen>0)){const a=aim(),rd=me.cd<=0;ctx.save();ctx.translate(me.x,me.y-30);ctx.setLineDash([8,8]);ctx.lineDashOffset=-T*40;ctx.strokeStyle=rd?(me.pow?'#ffd23f':'#fff'):'#ffffff66';ctx.lineWidth=me.pow?5:3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.sin(a)*220,-Math.cos(a)*220);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=rd?'#ff5fa2':'#ffffff66';ctx.beginPath();ctx.arc(Math.sin(a)*228,-Math.cos(a)*228,9,0,7);ctx.fill();ctx.restore();}
    [cpu,me].forEach(p=>{ctx.fillStyle='#0003';ctx.beginPath();ctx.ellipse(p.x,p.y+44,30,8,0,0,7);ctx.fill();});
    const dn=p=>phase==='end'&&winner===p;
    drawChar(ctx,cpu.ch,cpu.x,cpu.y,{t:T,walk:cpu.walk,flash:cpu.flash,pow:cpu.pow,face:dn(cpu)?'win':cpu.face,throwAnim:cpu.throwAnim,dance:dn(cpu),look:Math.max(-1,Math.min(1,(me.x-cpu.x)/150)),lookY:1});
    drawChar(ctx,me.ch,me.x,me.y,{t:T,walk:me.walk,flash:me.flash,pow:me.pow,face:dn(me)?'win':me.face,throwAnim:me.throwAnim,dance:dn(me),look:Math.max(-1,Math.min(1,(cpu.x-me.x)/150)),lookY:-1});
    [cpu,me].forEach(p=>{if(p.shield>0){ctx.save();ctx.globalAlpha=p.shield<1.2&&Math.floor(T*8)%2?.25:.5;ctx.strokeStyle='#9fe8ff';ctx.fillStyle='#9fe8ff33';ctx.lineWidth=4;ctx.beginPath();ctx.arc(p.x,p.y+4,56+Math.sin(T*6)*2,0,7);ctx.fill();ctx.stroke();ctx.restore();}
      if(p.frozen>0){ctx.save();ctx.globalAlpha=.55;ctx.fillStyle='#bfefff';ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(p.x-52,p.y-46,104,96,18);ctx.fill();ctx.stroke();ctx.globalAlpha=1;ctx.font='22px serif';ctx.textAlign='center';ctx.fillText('❄️',p.x+40,p.y-40);ctx.font='700 16px Fredoka, sans-serif';ctx.fillStyle='#0b5d7a';ctx.fillText(p.frozen.toFixed(1)+'s',p.x,p.y+60);ctx.restore();}});
    ctx.font='700 14px Fredoka, sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('VOCÊ',me.x,me.y+64);
    balls.forEach(b=>{b.trail.forEach((q,i)=>{ctx.fillStyle=b.strong?`rgba(255,210,63,${i/b.trail.length*.6})`:`rgba(255,255,255,${i/b.trail.length*.4})`;ctx.beginPath();ctx.arc(q[0],q[1],b.rad*.8,0,7);ctx.fill();});
      ctx.fillStyle=b.strong?'#ffd23f':(b.owner===me?'#ff4d6d':'#8b6cf0');ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(b.x,b.y,b.rad,0,7);ctx.fill();ctx.stroke();});
    fx.forEach(f=>{if(f.p){ctx.globalAlpha=Math.max(0,f.t/.6);ctx.fillStyle=f.col;ctx.beginPath();ctx.arc(f.x,f.y,4,0,7);ctx.fill();ctx.globalAlpha=1;}else{ctx.globalAlpha=Math.min(1,f.t*2);ctx.font='700 26px Fredoka, sans-serif';ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#3a2850';ctx.strokeText(f.txt,f.x,f.y);ctx.fillStyle=f.col;ctx.fillText(f.txt,f.x,f.y);ctx.globalAlpha=1;}});
    const tags=p=>[p.pow?'⭐×'+p.pow:'',p.dbl?'🎾×'+p.dbl:'',p.big?'🍄'+Math.ceil(p.big)+'s':'',p.shield?'🛡️'+Math.ceil(p.shield)+'s':''].filter(Boolean).join('  ');
    ctx.font='700 15px Fredoka, sans-serif';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.textBaseline='middle';const tm=tags(me),tc=tags(cpu);if(tm)ctx.fillText(tm,SIDE+14,LH-24);if(tc)ctx.fillText(tc,SIDE+14,24);
    // fogos e confete da vitória
    rockets.forEach(r=>{if(!r.boom){ctx.fillStyle=r.c;ctx.beginPath();ctx.arc(r.x,r.y,4,0,7);ctx.fill();ctx.fillStyle='#fff8';ctx.fillRect(r.x-1,r.y,2,18);}else r.p.forEach(q=>{if(q.t<=0)return;ctx.globalAlpha=Math.min(1,q.t);ctx.fillStyle=r.c;ctx.beginPath();ctx.arc(q.x,q.y,3,0,7);ctx.fill();ctx.globalAlpha=1;});});
    conf.forEach(c=>{ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.r);ctx.fillStyle=c.c;ctx.fillRect(-4,-2,8,5);ctx.restore();});
    if(phase==='end'){const d=me.score-cpu.score;ctx.textAlign='center';ctx.font='700 38px Fredoka, sans-serif';ctx.lineWidth=8;ctx.strokeStyle='#3a2850';const tx=d>0?'🏆 VITÓRIA!':d<0?'Quase! 💪':'🤝 EMPATE!';ctx.strokeText(tx,LW/2,MID-80);ctx.fillStyle=d>0?'#ffd23f':'#fff';ctx.fillText(tx,LW/2,MID-80);}
    if(msg){ctx.globalAlpha=Math.min(1,msg.t*2);ctx.font='700 24px Fredoka, sans-serif';ctx.textAlign='center';ctx.lineWidth=6;ctx.strokeStyle='#3a2850';ctx.strokeText(msg.txt,LW/2,MID-70);ctx.fillStyle='#fff';ctx.fillText(msg.txt,LW/2,MID-70);ctx.globalAlpha=1;}
    ctx.restore();
    // teclado
    m.key=(code,down)=>{const map={ArrowLeft:'L',KeyA:'L',ArrowRight:'R',KeyD:'R',ArrowUp:'U',KeyW:'U',ArrowDown:'D',KeyS:'D'};
      if(phase==='pick'&&down){if(code==='ArrowLeft'||code==='KeyA')pickIdx=0;else if(code==='ArrowRight'||code==='KeyD')pickIdx=1;else if(code==='Space'||code==='Enter')choose(pickIdx);return true;}
      if(map[code]){keys[map[code]]=down;return true;}if(code==='Space'||code==='Enter'){holdFire=down;return true;}return false;};}
  };}};
})();
