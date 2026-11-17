(function(){
/* Jogo de estudo (2º ano). */
function uneq(ws,k,col){col=col||'#ffb36b';let x=0,r='';const tot=ws.reduce((a,b)=>a+b,0);ws.forEach((w,i)=>{r+=`<rect x="${x}" y="0" width="${w}" height="40" fill="${i<k?col:'#fff'}" stroke="#6b4f80" stroke-width="1.6"/>`;x+=w;});return `<svg viewBox="-1 -1 ${tot+2} 42" style="width:${tot}px;max-width:100%;display:block;margin:8px auto">${r}</svg>`;}
const fig=(s)=>`<div style="font-size:30px;line-height:1.35;text-align:center;letter-spacing:2px;margin:8px 0">${s}</div>`;
const grp=(s)=>`<div style="font-size:26px;letter-spacing:1px;padding:4px 0">${s}</div>`;
const CE=[[true,'✅','Certo','t'],[false,'❌','Errado','f']];
const ST=[
 {n:'Galinheiro',ic:'🐔',cls:'st-x',bg:'linear-gradient(135deg,#ffcc4d,#ff9f43)',c:'#d9822b',l:'#fff1d9',x:190,y:445,sub:'Contar, dezenas e quem é maior'},
 {n:'Horta da Vovó',ic:'🥕',cls:'st-x',bg:'linear-gradient(135deg,#7bd389,#3fb67a)',c:'#2e9a62',l:'#e1f7e8',x:75,y:380,sub:'Historinhas de somar e tirar'},
 {n:'Celeiro',ic:'🐄',cls:'st-x',bg:'repeating-linear-gradient(90deg,#e05a5a 0 26px,#f08080 26px 52px)',c:'#c94444',l:'#ffe4e4',x:235,y:335,sub:'Grupos iguais, dobro e triplo'},
 {n:'Padaria',ic:'🧁',cls:'st-x',bg:'linear-gradient(135deg,#ff9ecb,#ffc6a5)',c:'#e0609a',l:'#ffe6f1',x:85,y:250,sub:'Metade e partes iguais'},
 {n:'Trator dos Enigmas',ic:'🚜',cls:'st-x',bg:'linear-gradient(135deg,#6c8cf5,#9b7bf0)',c:'#5a6fd6',l:'#e7ebff',x:255,y:165,sub:'Leia, pense e faça a conta'},
 {n:'Toca da Raposa',ic:'🦊',cls:'st-boss',bg:'linear-gradient(160deg,#5a3418,#a0582a)',c:'#a0582a',l:'#fbeadb',x:240,y:62,sub:'Um pouco de tudo'}];

const T=[
 // 0 GALINHEIRO
 {s:0,ty:'num',tp:'dezena',q:'Cada caixa tem <b>10 ovos</b>. Quantos ovos ao todo?'+fig('📦📦📦 + 🥚🥚🥚🥚🥚🥚🥚'),a:37,ex:'3 caixas de 10 = 30. Mais 7 ovos soltos = 37.'},
 {s:0,ty:'mc',tp:'compara',q:'Qual número é o <b>MAIOR</b>?',o:['61','16','59','60'],a:0,ex:'Olhe a dezena primeiro: 6 dezenas ganha de 5 e de 1. Entre 60 e 61, o 61 tem 1 a mais.'},
 {s:0,ty:'rapid',tp:'compara',q:'🐔 Este número é <b>menor</b> ou <b>maior</b> que 30?',bins:['⬇️ Menor','⬆️ Maior'],subs:['que 30','que 30'],
  o:[['29',0],['31',1],['13',0],['40',1],['28',0],['33',1]],ex:'29 e 28 têm só 2 dezenas: menores. 31 e 33 passam do 30.'},
 {s:0,ty:'build',tp:'contar',q:'🐣 Conte de <b>5 em 5</b> e complete:',parts:['5, 10, ','',', 20, ','',', 30'],bank:['15','25','12','11','35'],ans:['15','25'],goTxt:'✓ Conferir',ex:'De 5 em 5: 5, 10, 15, 20, 25, 30.'},
 {s:0,ty:'num',tp:'logica',q:'A galinha Pipoca botou <b>8 ovos</b>. A galinha Fofa botou <b>2 a mais</b> que a Pipoca. Quantos ovos a Fofa botou?',a:10,ex:'"2 a mais" = somar: 8 + 2 = 10.'},
 {s:0,ty:'film',tp:'compara',q:'Ordene do <b>MAIOR</b> para o <b>MENOR</b>.',o:['74','47','40','7'],slot:'🐔',slotTxt:'lugar',goTxt:'✓ Conferir',ex:'74 tem 7 dezenas, é o maior. Depois 47, 40 e o 7, que nem tem dezena.'},
 {s:0,ty:'mc',tp:'dezena',q:'Qual número tem <b>5 dezenas</b> e <b>2 unidades</b>?',o:['52','25','502','7'],a:0,ex:'5 dezenas = 50, mais 2 = 52. A dezena vem na frente.'},
 // 1 HORTA
 {s:1,ty:'num',tp:'soma',q:'A vovó colheu <b>15 cenouras</b> de manhã e <b>10</b> à tarde. Quantas cenouras ela colheu?',a:25,ex:'Colheu de manhã E à tarde: junta, 15 + 10 = 25.'},
 {s:1,ty:'mc',tp:'qualconta',q:'Eu tinha <b>18 tomates</b> e <b>dei 5</b> para a vizinha. Que conta mostra com quantos fiquei?',o:['18 − 5','18 + 5','5 − 18','18 + 18'],a:0,ex:'Dei = saiu de mim = tirar: 18 − 5 (o maior vem primeiro).'},
 {s:1,ty:'num',tp:'sub',q:'Tinha <b>30 espigas</b> de milho. O cavalo comeu <b>4</b>. Quantas sobraram?'+fig('🌽🐴'),a:26,ex:'30 − 4: tire 4 de uma dezena → sobram 2 dezenas e 6 = 26.'},
 {s:1,ty:'build',tp:'soma',q:'Faça <b>43 + 25</b> pela dezena e pela unidade:',parts:['40 + 20 = ','','     3 + 5 = ','','     Total: ',''],bank:['60','8','68','65','80'],ans:['60','8','68'],goTxt:'✓ Conferir',ex:'Dezenas 40 + 20 = 60, unidades 3 + 5 = 8, total 68.'},
 {s:1,ty:'tf',lb:CE,tp:'qualconta',q:'A Lia tinha <b>20 morangos</b> e comeu <b>5</b>. Ela disse:<em>"Agora eu tenho 25 morangos!"</em>',a:false,ex:'Errado! Comeu = tirou: 20 − 5 = 15. Ela somou quando era para tirar.'},
 {s:1,ty:'num',tp:'soma',q:'Na horta tem <b>12 alfaces</b>. O vovô plantou <b>mais 12</b>. Quantas alfaces agora?',a:24,ex:'12 + 12 = 24 (é o dobro de 12!).'},
 {s:1,ty:'num',tp:'sub',q:'Que número falta?<em>14 + ? = 20</em>',a:6,ex:'Do 14 até o 20 faltam 6. Confere: 14 + 6 = 20.'},
 // 2 CELEIRO
 {s:2,ty:'num',tp:'mult',q:'Cada vaca tem <b>4 patas</b>. Quantas patas têm <b>2 vacas</b>?'+fig('🐄 🐄'),a:8,ex:'4 + 4 = 8. É 2 × 4.'},
 {s:2,ty:'mc',oh:true,tp:'mult',q:'Toque no desenho que mostra <b>3 × 2</b> (3 grupos de 2).',o:[grp('🍎🍎 · 🍎🍎 · 🍎🍎'),grp('🍎🍎🍎 · 🍎🍎'),grp('🍎🍎 · 🍎🍎'),grp('🍎🍎🍎🍎🍎')],a:0,ex:'3 × 2 = 3 grupos com 2 em cada = 6 maçãs.'},
 {s:2,ty:'paint',e:'🥕',tp:'mult',q:'O coelho come <b>2 cenouras por dia</b>. Pinte as cenouras que ele come em <b>3 dias</b>.',n:10,a:6,ex:'2 + 2 + 2 = 6 cenouras.'},
 {s:2,ty:'num',tp:'mult',q:'Qual é o <b>dobro de 9</b>?',a:18,ex:'9 + 9 = 18.'},
 {s:2,ty:'rapid',tp:'mult',q:'🐄 Esta conta dá <b>12</b>? Mande para o lado certo!',bins:['✔ Dá 12','✘ Não dá'],subs:['',''],
  o:[['2 × 6',0],['2 × 5',1],['6 + 6',0],['3 × 3',1],['3 × 4',0],['10 + 3',1]],ex:'Dão 12: 2×6, 6+6 e 3×4 (4+4+4).'},
 {s:2,ty:'num',tp:'mult',q:'No celeiro tem <b>3 ninhos</b> com <b>3 ovos</b> em cada. Quantos ovos?'+fig('🪺🪺🪺'),a:9,ex:'3 + 3 + 3 = 9. É o triplo de 3.'},
 {s:2,ty:'mc',tp:'mult',q:'O <b>triplo</b> de 5 é…',o:['15','10','8','53'],a:0,ex:'Triplo = 3 vezes: 5 + 5 + 5 = 15.'},
 // 3 PADARIA
 {s:3,ty:'paint',e:'🧁',tp:'metade',q:'A vovó fez <b>10 bolinhos</b>. Pinte a <b>METADE</b>.',n:10,a:5,ex:'Metade é dividir em 2 partes iguais: 5 e 5.'},
 {s:3,ty:'mc',oh:true,tp:'metade',q:'Qual bolo foi cortado em pedaços <b>IGUAIS</b>?',o:[uneq([40,40,40,40],0),uneq([70,30,40,20],0),uneq([80,40,40],0),uneq([50,50,30,30],0)],a:0,ex:'Só o primeiro tem os 4 pedaços do mesmo tamanho.'},
 {s:3,ty:'num',tp:'metade',q:'A torta tinha <b>6 pedaços</b>. Os pintados foram comidos. <b>Quantos foram comidos?</b>'+pie(6,4,'#e0609a'),a:4,ex:'Conte os pintados: 4.'},
 {s:3,ty:'num',tp:'metade',q:'E quantos pedaços da torta <b>sobraram</b>?'+pie(6,4,'#e0609a'),a:2,ex:'6 pedaços − 4 comidos = 2 sobraram.'},
 {s:3,ty:'tf',lb:CE,tp:'metade',q:'<em>"A metade de 8 pãezinhos é 4."</em>'+bar(8,4,'#f2b05e',200),a:true,ex:'Certo! 4 + 4 = 8.'},
 {s:3,ty:'mc',tp:'metade',q:'Uma pizza foi cortada <b>ao meio</b>. Cada pedaço é…'+pie(2,1,'#ff9f43'),o:['a metade','um terço','um quarto','a pizza inteira'],a:0,ex:'Ao meio = 2 partes iguais = metade (1/2).'},
 {s:3,ty:'num',tp:'metade',q:'A Bia e o Téo vão dividir <b>12 biscoitos</b> igualzinho. Quantos cada um ganha?'+fig('🍪'),a:6,ex:'Dividir entre 2 = metade: 6 + 6 = 12.'},
 // 4 TRATOR
 {s:4,ty:'num',tp:'logica',q:'A Clara tem <b>7 anos</b>. O irmão dela é <b>2 anos mais velho</b>. Quantos anos ele tem?',a:9,ex:'Mais velho = mais anos: 7 + 2 = 9.'},
 {s:4,ty:'num',tp:'logica',q:'Na fila do lanche, o Leo é o <b>5º</b>. Quantas crianças estão <b>na frente</b> dele?',a:4,ex:'1º, 2º, 3º, 4º estão na frente. O 5º é ele: 4 crianças.'},
 {s:4,ty:'mc',tp:'logica',q:'A Ana é mais alta que a Bia. A Bia é mais alta que o Caio. Quem é o <b>mais baixo</b>?',o:['Caio','Ana','Bia','Todos iguais'],a:0,ex:'Ana > Bia > Caio. O Caio fica no fim: é o mais baixo.'},
 {s:4,ty:'num',tp:'logica',q:'Pensei num número. <b>Tirei 3</b> e deu <b>10</b>. Que número eu pensei?',a:13,ex:'Faz ao contrário: 10 + 3 = 13. Confere: 13 − 3 = 10.'},
 {s:4,ty:'num',tp:'logica',q:'Na fazenda tem <b>2 tratores</b> (4 rodas cada) e <b>1 bicicleta</b>. Quantas rodas ao todo?'+fig('🚜 🚜 🚲'),a:10,ex:'Tratores: 4 + 4 = 8. Bicicleta: 2. Total: 10.'},
 {s:4,ty:'num',tp:'logica',q:'O Pedro tinha <b>10 balas</b>. Deu a <b>metade</b> para a irmã. Depois <b>ganhou 3</b>. Com quantas ficou?',a:8,ex:'Metade de 10 = 5 (ficou com 5). Ganhou 3: 5 + 3 = 8.'},
 {s:4,ty:'tf',lb:CE,tp:'logica',q:'O João tem <b>5 figurinhas</b>. A Maria tem <b>3 a mais</b> que o João.<em>"Então a Maria tem 2 figurinhas."</em>',a:false,ex:'Errado! "A mais" é somar: 5 + 3 = 8. Quem fez 5 − 3 se confundiu.'},
 {s:4,ty:'mc',tp:'logica',q:'Qual vem depois?<em>1, 3, 5, 7, …</em>',o:['9','8','10','11'],a:0,ex:'Pula de 2 em 2: 7 + 2 = 9.'},
 // 5 RAPOSA
 {s:5,ty:'num',tp:'soma',q:'Tinha <b>25 galinhas</b>. Chegaram <b>mais 13</b>. Quantas galinhas agora?',a:38,ex:'20 + 10 = 30 e 5 + 3 = 8 → 38.'},
 {s:5,ty:'num',tp:'mult',q:'A raposa escondeu <b>2 ovos</b> em cada um dos <b>4 buracos</b>. Quantos ovos ela escondeu?',a:8,ex:'2 + 2 + 2 + 2 = 8.'},
 {s:5,ty:'num',tp:'sub',q:'Tinha <b>40 maçãs</b>. A vovó vendeu <b>10</b>. Quantas sobraram?',a:30,ex:'Tirar 10 é tirar 1 dezena: 30.'},
 {s:5,ty:'mc',tp:'dezena',q:'Que número tem <b>3 dezenas</b> e <b>9 unidades</b>?',o:['39','93','12','309'],a:0,ex:'30 + 9 = 39.'},
 {s:5,ty:'num',tp:'logica',q:'A Mia tem <b>6 anos</b>. A mãe dela tem <b>30 anos a mais</b>. Quantos anos tem a mãe?',a:36,ex:'6 + 30 = 36.'},
 {s:5,ty:'paint',e:'🍪',tp:'metade',q:'Pinte a <b>metade</b> dos biscoitos.',n:6,a:3,ex:'Metade de 6 = 3.'},
 {s:5,ty:'num',tp:'logica',q:'Pensei num número e fiz o <b>dobro</b> dele. Deu <b>14</b>. Que número eu pensei?',a:7,ex:'Que número + ele mesmo dá 14? 7 + 7 = 14.'},
 {s:5,ty:'spot',tp:'mult',q:'🔎 A raposa trocou uma conta. Qual está <b>errada</b>?',o:['20 + 5 = 25','2 × 4 = 8','3 × 3 = 6','15 − 5 = 10'],a:2,ex:'3 × 3 = 3 + 3 + 3 = 9. Quem deu 6 somou 3 + 3.'}];

const TOP={
 contar:{n:'Contar de 5 em 5',t:'Conte pulando: 5, 10, 15, 20…'},
 dezena:{n:'Dezenas e unidades',t:'O número da esquerda são as dezenas (grupos de 10); o da direita, as unidades.'},
 compara:{n:'Maior e menor',t:'Compare primeiro a dezena. Só se for igual, olhe a unidade.'},
 soma:{n:'Somar',t:'Junte dezena com dezena e unidade com unidade.'},
 sub:{n:'Tirar e número que falta',t:'Tire as unidades das unidades e as dezenas das dezenas. Para achar o número que falta, conte do menor até o maior.'},
 qualconta:{n:'Qual conta fazer',t:'Ganhou, chegou, juntou = somar. Deu, comeu, vendeu, perdeu = tirar.'},
 mult:{n:'Grupos iguais, dobro e triplo',t:'3 × 2 = 3 grupos de 2. Dobro = 2 vezes; triplo = 3 vezes.'},
 metade:{n:'Metade e partes iguais',t:'Metade = 2 partes iguais. Fração só vale com pedaços do mesmo tamanho.'},
 logica:{n:'Historinhas para pensar',t:'Leia de novo, sublinhe os números e veja: "a mais" soma, "mais novo" tira, às vezes são duas contas.'}};

JOGOS.push({id:'mat-2ano-fazenda',ano:2,ler:true,materia:'Matemática',prova:'2º ano · treino 2',titulo:'Fazendinha dos Números',ic:'🐮',cor:'#bfeab0',
  intro:'Bem-vinda à fazenda! Primeira parada: Galinheiro 🐔',
  links:[],
  mapa:{sea:['#d8f5c4','#8fd16b'],isl:['#fff6d8','#f7e1a0'],praia:'#ffffff',deco:['🌻','🐑','🌳','🐷','🌾','🐴']},
  boss:{nome:'Raposa Espertinha',fala:'Hehe! Escondi os ovos e baguncei as contas! 🦊',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="46" ry="5" fill="rgba(0,0,0,.25)"/><path d="M112 120 Q150 110 146 72 Q136 100 112 104Z" fill="#f08a3c" stroke="#c4621f" stroke-width="2"/><path d="M146 72 Q148 86 138 96 Q144 84 140 76Z" fill="#fff"/><ellipse cx="80" cy="112" rx="34" ry="28" fill="#f08a3c" stroke="#c4621f" stroke-width="2"/><ellipse cx="80" cy="118" rx="18" ry="18" fill="#fff4e6"/><path d="M38 26 L56 58 L36 62Z M122 26 L104 58 L124 62Z" fill="#f08a3c" stroke="#c4621f" stroke-width="2"/><path d="M42 36 L52 56 L42 58Z M118 36 L108 56 L118 58Z" fill="#3a2850"/><path d="M34 60 Q80 30 126 60 Q122 92 80 104 Q38 92 34 60Z" fill="#f08a3c" stroke="#c4621f" stroke-width="2"/><path d="M56 80 Q80 112 104 80 Q92 96 80 98 Q68 96 56 80Z" fill="#fff4e6"/><ellipse cx="62" cy="68" rx="7" ry="8" fill="#3a2850"/><ellipse cx="98" cy="68" rx="7" ry="8" fill="#3a2850"/><circle cx="64" cy="65" r="2" fill="#fff"/><circle cx="100" cy="65" r="2" fill="#fff"/><ellipse cx="80" cy="88" rx="6" ry="4.5" fill="#3a2850"/><path d="M72 95 Q80 100 88 95" fill="none" stroke="#3a2850" stroke-width="2.4" stroke-linecap="round"/><text x="16" y="138" font-size="20">🥚</text></svg>`},
  ST,TOP,T});
})();
