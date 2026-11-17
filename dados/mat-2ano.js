(function(){
/* Jogo de estudo (2º ano). */
function uneq(ws,k,col){col=col||'#ffb36b';let x=0,r='';const tot=ws.reduce((a,b)=>a+b,0);ws.forEach((w,i)=>{r+=`<rect x="${x}" y="0" width="${w}" height="44" fill="${i<k?col:'#fff'}" stroke="#6b4f80" stroke-width="1.6"/>`;x+=w;});return `<svg viewBox="-1 -1 ${tot+2} 46" style="width:${tot}px;max-width:100%;display:block;margin:8px auto">${r}</svg>`;}
const fig=(s)=>`<div style="font-size:30px;line-height:1.35;text-align:center;letter-spacing:2px;margin:8px 0">${s}</div>`;
const rep=(e,n)=>e.repeat(n);
const CE=[[true,'✅','Certo','t'],[false,'❌','Errado','f']];
const ST=[
 {n:'Cardume da Contagem',ic:'🐠',cls:'st-x',bg:'linear-gradient(135deg,#29b6f6,#4dd0e1)',c:'#0a8fc7',l:'#dff4ff',x:190,y:445,sub:'Contar, dezenas e comparar'},
 {n:'Praia das Conchas',ic:'🐚',cls:'st-x',bg:'linear-gradient(135deg,#ffb36b,#ff8ec2)',c:'#e0607a',l:'#ffe8ee',x:75,y:380,sub:'Somar e tirar'},
 {n:'Ninho das Tartarugas',ic:'🐢',cls:'st-x',bg:'linear-gradient(135deg,#43c59e,#9be15d)',c:'#1f9e6e',l:'#e0f8ec',x:235,y:335,sub:'Dobro, triplo, ×2 e ×3'},
 {n:'Pizzaria do Siri',ic:'🦀',cls:'st-x',bg:'repeating-linear-gradient(90deg,#ff7b54 0 26px,#ffa07a 26px 52px)',c:'#e0532a',l:'#ffe9df',x:85,y:250,sub:'Pedaços da pizza (frações)'},
 {n:'Farol dos Enigmas',ic:'🗼',cls:'st-x',bg:'linear-gradient(135deg,#7e6cf0,#b49cff)',c:'#6a4fd0',l:'#ece6ff',x:255,y:165,sub:'Historinhas para pensar'},
 {n:'Caverna do Polvo',ic:'🐙',cls:'st-boss',bg:'linear-gradient(160deg,#123a6b,#2a6fb0)',c:'#2a5d9f',l:'#e3efff',x:240,y:62,sub:'Um pouco de tudo'}];

const T=[
 // 0 CARDUME
 {s:0,ty:'num',tp:'contar',q:'Conte os peixinhos! Quantos são?'+fig(rep('🐠',5)+'<br>'+rep('🐠',5)+'<br>'+rep('🐠',5)+'<br>🐠🐠'),a:17,ex:'Três fileiras de 5 dão 15, e mais 2: 17.'},
 {s:0,ty:'mc',tp:'contar',q:'Que número vem logo <b>depois</b> do <b>49</b>?',o:['50','48','40','410'],a:0,ex:'Depois do 49 a dezena "vira": 49, 50.'},
 {s:0,ty:'build',tp:'contar',q:'🐚 Conte de <b>2 em 2</b> e complete:',parts:['2, 4, ','',', 8, ','',', 12'],bank:['6','10','7','9','5'],ans:['6','10'],goTxt:'✓ Conferir',ex:'De 2 em 2: 2, 4, 6, 8, 10, 12.'},
 {s:0,ty:'film',tp:'compara',q:'Coloque as conchas em ordem, do <b>MENOR</b> para o <b>MAIOR</b>.',o:['19','27','72','91'],slot:'🐚',slotTxt:'lugar',goTxt:'✓ Conferir',ex:'Olhe primeiro a dezena: 1, 2, 7, 9 → 19, 27, 72, 91. Cuidado: 27 e 72 têm os mesmos números, mas 72 é bem maior!'},
 {s:0,ty:'mc',tp:'dezena',q:'O número <b>36</b> tem…',o:['3 dezenas e 6 unidades','6 dezenas e 3 unidades','3 dezenas e 3 unidades','36 dezenas'],a:0,ex:'36 = 30 + 6 → 3 dezenas (3 grupos de 10) e 6 unidades.'},
 {s:0,ty:'num',tp:'dezena',q:'A rede pegou <b>4 pacotes de 10</b> peixes e mais <b>5 soltinhos</b>. Quantos peixes ao todo?'+fig('🔟🔟🔟🔟 + '+rep('🐟',5)),a:45,ex:'4 dezenas = 40. Mais 5 = 45.'},
 {s:0,ty:'rapid',tp:'compara',q:'🐠 Este número é <b>menor</b> ou <b>maior</b> que 50? Mande para o lado certo!',bins:['⬇️ Menor','⬆️ Maior'],subs:['que 50','que 50'],
  o:[['38',0],['61',1],['49',0],['70',1],['15',0],['52',1]],ex:'Olhe a dezena: 3 e 4 são menos que 5; 6 e 7 são mais.'},
 // 1 PRAIA
 {s:1,ty:'num',tp:'soma',q:'A Ana achou <b>12 conchas</b> e o irmão achou <b>5</b>. Quantas conchas os dois juntos?',a:17,ex:'12 + 5 = 17.'},
 {s:1,ty:'num',tp:'decomp',q:'Para fazer <b>24 + 13</b>, a Lia separou:<em>20 + 10 = 30<br>4 + 3 = 7</em>Qual é o resultado?',a:37,ex:'Junta as dezenas e as unidades: 30 + 7 = 37.'},
 {s:1,ty:'build',tp:'decomp',q:'Agora você! Faça <b>35 + 22</b> pela dezena e pela unidade:',parts:['30 + 20 = ','','     5 + 2 = ','','     Total: ',''],bank:['50','7','57','52','70','3'],ans:['50','7','57'],goTxt:'✓ Conferir',ex:'Dezenas: 30 + 20 = 50. Unidades: 5 + 2 = 7. Total: 57.'},
 {s:1,ty:'num',tp:'sub',q:'Tinha <b>28 conchas</b> no balde. <b>6</b> caíram na areia. Quantas ficaram?',a:22,ex:'28 − 6 = 22 (só as unidades mudam: 8 − 6 = 2).'},
 {s:1,ty:'num',tp:'decomp',q:'<b>47 − 23 = ?</b><em>Dica: tire as dezenas (40 − 20) e depois as unidades (7 − 3).</em>',a:24,ex:'40 − 20 = 20 e 7 − 3 = 4 → 24.'},
 {s:1,ty:'tf',lb:CE,tp:'soma',q:'O Téo fez esta conta: <em>26 + 8 = 214</em>Ele acertou?',a:false,ex:'Errado! 6 + 8 = 14, que é 1 dezena e 4. Então 20 + 14 = 34.'},
 {s:1,ty:'mc',tp:'soma',q:'Qual destas contas dá <b>20</b>?',o:['12 + 8','15 + 3','10 + 12','30 − 5'],a:0,ex:'12 + 8 = 20. As outras dão 18, 22 e 25.'},
 // 2 TARTARUGAS
 {s:2,ty:'num',tp:'mult',q:'Cada tartaruga botou <b>3 ovos</b>. São <b>2 tartarugas</b>. Quantos ovos?'+fig('🐢🥚🥚🥚<br>🐢🥚🥚🥚'),a:6,ex:'3 + 3 = 6. É o mesmo que 2 × 3.'},
 {s:2,ty:'num',tp:'mult',q:'Qual é o <b>DOBRO</b> de <b>7</b>?',a:14,ex:'Dobro é duas vezes: 7 + 7 = 14.'},
 {s:2,ty:'paint',e:'🥚',tp:'mult',q:'🥚 Pinte o <b>TRIPLO</b> de 4 ovos. Toque nos ovos.',n:15,a:12,ex:'Triplo é três vezes: 4 + 4 + 4 = 12.'},
 {s:2,ty:'mc',tp:'mult',q:'<b>2 × 5</b> é o mesmo que…',o:['5 + 5','2 + 5','5 + 5 + 5','2 + 2'],a:0,ex:'2 × 5 é o 5 duas vezes: 5 + 5 = 10.'},
 {s:2,ty:'memory',tp:'mult',q:'🃏 Vire as cartas e junte cada conta com o resultado.',pairs:[{a:'2 × 3',b:'6'},{a:'2 × 4',b:'8'},{a:'3 × 3',b:'9'},{a:'3 × 5',b:'15'}],ex:'2×3=6 · 2×4=8 · 3×3=9 · 3×5=15.'},
 {s:2,ty:'num',tp:'mult',q:'Desafio! Qual é o <b>DOBRO de 12</b>?<em>Dica: dobro de 10 é 20 e dobro de 2 é 4.</em>',a:24,ex:'20 + 4 = 24. Separar dezena e unidade ajuda!'},
 {s:2,ty:'spot',tp:'mult',q:'🔎 Uma tartaruga fez uma conta <b>errada</b>. Toque nela!',o:['2 × 2 = 4','2 × 6 = 12','3 × 4 = 7','3 × 2 = 6'],a:2,ex:'3 × 4 é 4 + 4 + 4 = 12. Quem deu 7 somou 3 + 4.'},
 // 3 PIZZARIA
 {s:3,ty:'num',tp:'frac',q:'A pizza tinha <b>10 pedaços</b>. Os pedaços pintados foram comidos. Quantos foram comidos?'+pie(10,3,'#ff7b54')+'<div class="fracq">? / 10</div>',a:3,ex:'3 pedaços de 10 foram comidos: 3/10.'},
 {s:3,ty:'mc',tp:'frac',q:'Que fração da pizza está pintada?'+pie(4,1,'#ff7b54'),o:['1/4','1/3','4/1','3/4'],a:0,ex:'A pizza foi cortada em 4 partes iguais e 1 está pintada: 1/4 (um quarto).'},
 {s:3,ty:'mc',oh:true,tp:'frac',q:'Toque na pizza que está com a <b>METADE</b> pintada.',o:[pie(4,2,'#ff7b54'),pie(4,1,'#ff7b54'),pie(3,1,'#ff7b54'),pie(4,3,'#ff7b54')],a:0,ex:'Metade é 2 de 4 pedaços (2/4 = 1/2). Não precisa ter só 2 pedaços!'},
 {s:3,ty:'paint',shape:'bar',tp:'frac',q:'🍫 Pinte a <b>METADE</b> da barra de chocolate.',n:8,a:4,ex:'Metade de 8 pedaços é 4.'},
 {s:3,ty:'num',tp:'frac',q:'A pizza tinha <b>8 pedaços</b>. O Siri comeu <b>3</b> (os pintados). Quantos pedaços <b>sobraram</b>?'+pie(8,3,'#ff7b54'),a:5,ex:'8 − 3 = 5 pedaços sobraram.'},
 {s:3,ty:'mc',tp:'frac',q:'E que fração da pizza <b>sobrou</b>?'+pie(8,3,'#ff7b54'),o:['5/8','3/8','8/5','5/3'],a:0,ex:'Sobraram 5 de 8 pedaços: 5/8. O 8 embaixo é em quantos pedaços a pizza foi cortada.'},
 {s:3,ty:'tf',lb:CE,tp:'frac',q:'Este bolo foi cortado em 3 pedaços. <em>"O pedaço pintado é 1/3 do bolo."</em>'+uneq([110,50,50],1),a:false,ex:'Errado! Para ser 1/3 os 3 pedaços têm que ser do mesmo tamanho.'},
 // 4 FAROL
 {s:4,ty:'num',tp:'logica',q:'O João comeu <b>3 morangos</b>. A irmã dele é comilona: comeu o <b>TRIPLO</b>. Quantos morangos ela comeu?'+fig('🍓🍓🍓'),a:9,ex:'Triplo de 3 = 3 + 3 + 3 = 9.'},
 {s:4,ty:'num',tp:'logica',q:'O Davi tem <b>9 anos</b>. A irmã dele é <b>3 anos mais nova</b>. Quantos anos ela tem?',a:6,ex:'Mais nova = menos anos: 9 − 3 = 6.'},
 {s:4,ty:'mc',tp:'logica',q:'Qual vem depois?'+fig('🐠🐙🐙🐠🐙🐙🐠 ❓'),o:['🐙','🐠','🦀','🐢'],a:0,ex:'O jeito que se repete é 🐠🐙🐙. Depois do 🐠 vem 🐙.'},
 {s:4,ty:'num',tp:'logica',q:'Na fila do sorvete, a Lia é a <b>3ª</b>. Atrás dela tem <b>4 crianças</b>. Quantas crianças tem na fila?'+fig('🍦'),a:7,ex:'2 na frente dela + a Lia + 4 atrás = 7. Desenhar bolinhas ajuda!'},
 {s:4,ty:'num',tp:'logica',q:'Pensei num número. <b>Somei 5</b> e deu <b>12</b>. Que número eu pensei?',a:7,ex:'Faz ao contrário: 12 − 5 = 7. Confere: 7 + 5 = 12.'},
 {s:4,ty:'tf',lb:CE,tp:'logica',q:'O Pedro tem mais conchas que a Ana. A Ana tem mais conchas que o Téo.<em>"Então o Téo tem MAIS conchas que o Pedro."</em>',a:false,ex:'Errado! Pedro > Ana > Téo. O Téo é quem tem MENOS.'},
 {s:4,ty:'num',tp:'logica',q:'Coloquei <b>2 peixinhos</b> em cada um dos <b>3 aquários</b>. Depois <b>1</b> pulou para o mar. Quantos ficaram?'+fig('🫙🫙🫙'),a:5,ex:'3 × 2 = 6. Tirando 1: 5. Duas contas, uma depois da outra!'},
 // 5 CHEFÃO
 {s:5,ty:'num',tp:'decomp',q:'<b>18 + 21 = ?</b>',a:39,ex:'10 + 20 = 30 e 8 + 1 = 9 → 39.'},
 {s:5,ty:'num',tp:'mult',q:'Um polvo tem <b>8 braços</b>. Quantos braços têm <b>2 polvos</b>?',a:16,ex:'Dobro de 8 = 8 + 8 = 16.'},
 {s:5,ty:'mc',tp:'frac',q:'Os pedaços pintados foram comidos. Que fração da pizza foi comida?'+pie(6,2,'#ff7b54'),o:['2/6','4/6','6/2','2/4'],a:0,ex:'2 de 6 pedaços: 2/6.'},
 {s:5,ty:'num',tp:'sub',q:'Eu tinha <b>35 balas</b>. Dei <b>10</b> para minha irmã. Quantas ficaram?',a:25,ex:'Tirar 10 é tirar 1 dezena: 35 − 10 = 25.'},
 {s:5,ty:'film',tp:'compara',q:'Ordene do <b>MAIOR</b> para o <b>MENOR</b>.',o:['85','58','50','8'],slot:'🐙',slotTxt:'lugar',goTxt:'✓ Conferir',ex:'85 (8 dezenas) > 58 > 50 > 8.'},
 {s:5,ty:'num',tp:'logica',q:'A Mia tem <b>4 figurinhas</b>. O irmão tem o <b>dobro</b>. Quantas figurinhas os <b>dois juntos</b> têm?',a:12,ex:'Irmão: 4 + 4 = 8. Juntos: 4 + 8 = 12.'},
 {s:5,ty:'spot',tp:'soma',q:'🔎 O polvo bagunçou uma conta. Qual está <b>errada</b>?',o:['10 + 10 = 20','14 + 5 = 19','30 − 10 = 20','25 + 4 = 65'],a:3,ex:'25 + 4 = 29. O 4 é unidade: junta com o 5, não com o 2!'},
 {s:5,ty:'num',tp:'dezena',q:'Quantas <b>dezenas</b> tem o número <b>70</b>?',a:7,ex:'70 = 7 grupos de 10.'}];

const TOP={
 contar:{n:'Contar e sequências',t:'Conte em grupos (de 5 em 5, de 2 em 2) para não se perder.'},
 dezena:{n:'Dezenas e unidades',t:'O número da esquerda são as dezenas (grupos de 10); o da direita, as unidades.'},
 compara:{n:'Maior e menor',t:'Compare primeiro a dezena. Só se for igual, olhe a unidade.'},
 soma:{n:'Somar',t:'Some unidade com unidade e dezena com dezena. Se passar de 10, vira mais uma dezena.'},
 sub:{n:'Tirar (subtração)',t:'Tire as unidades das unidades e as dezenas das dezenas.'},
 decomp:{n:'Conta pela dezena e pela unidade',t:'Separe: dezenas de um lado, unidades do outro, depois junte.'},
 mult:{n:'Dobro, triplo, ×2 e ×3',t:'Dobro = 2 vezes (7 + 7). Triplo = 3 vezes (4 + 4 + 4).'},
 frac:{n:'Pedaços da pizza (frações)',t:'Embaixo: em quantos pedaços iguais cortou. Em cima: quantos pedaços estou contando.'},
 logica:{n:'Historinhas para pensar',t:'Leia devagar, desenhe bolinhas e veja se precisa de duas contas.'}};

JOGOS.push({id:'mat-2ano-recife',ano:2,ler:true,materia:'Matemática',prova:'2º ano · treino',titulo:'Recife dos Números',ic:'🐠',cor:'#9fe3ff',
  intro:'Bora mergulhar! Primeira parada: Cardume da Contagem 🐠',
  links:[],
  mapa:{sea:['#c9f1ff','#5fc3ef'],isl:['#fff6d8','#ffe3a3'],praia:'#ffffff',deco:['🐚','🌴','⭐','🐬','🪸','🦀']},
  boss:{nome:'Polvo Bagunceiro',fala:'Hihi! Embaralhei todos os números do mar! 🐙',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="48" ry="5" fill="rgba(0,0,0,.25)"/><g fill="#b07cf0" stroke="#8a55d6" stroke-width="2"><path d="M44 96 Q26 120 14 118 Q24 132 40 122 Q52 112 58 100Z"/><path d="M58 102 Q50 132 38 140 Q56 144 64 128 Q70 114 70 104Z"/><path d="M76 104 Q76 134 70 144 Q86 144 88 128 Q90 114 86 104Z"/><path d="M94 104 Q96 128 110 140 Q122 136 106 124 Q100 114 102 102Z"/><path d="M110 98 Q128 118 146 118 Q138 130 122 124 Q108 114 102 100Z"/></g><ellipse cx="80" cy="70" rx="46" ry="44" fill="#c08ff7" stroke="#8a55d6" stroke-width="2"/><ellipse cx="64" cy="70" rx="10" ry="12" fill="#fff"/><ellipse cx="96" cy="70" rx="10" ry="12" fill="#fff"/><circle cx="66" cy="72" r="5" fill="#3a2850"/><circle cx="98" cy="72" r="5" fill="#3a2850"/><circle cx="68" cy="70" r="1.6" fill="#fff"/><circle cx="100" cy="70" r="1.6" fill="#fff"/><path d="M68 92 Q80 102 92 92" fill="none" stroke="#3a2850" stroke-width="3" stroke-linecap="round"/><circle cx="52" cy="88" r="6" fill="#ff8ec2" opacity=".6"/><circle cx="108" cy="88" r="6" fill="#ff8ec2" opacity=".6"/><circle cx="62" cy="40" r="5" fill="#d9b8ff"/><circle cx="96" cy="34" r="4" fill="#d9b8ff"/><text x="118" y="38" font-size="20">🔢</text></svg>`},
  ST,TOP,T});
})();
