(function(){
/* Jogo de estudo (2º ano). */
function uneq(ws,k,col){col=col||'#9b87e8';let x=0,r='';const tot=ws.reduce((a,b)=>a+b,0);ws.forEach((w,i)=>{r+=`<rect x="${x}" y="0" width="${w}" height="40" fill="${i<k?col:'#fff'}" stroke="#4b3a8f" stroke-width="1.6"/>`;x+=w;});return `<svg viewBox="-1 -1 ${tot+2} 42" style="width:${tot}px;max-width:100%;display:block;margin:8px auto">${r}</svg>`;}
const fig=(s)=>`<div style="font-size:30px;line-height:1.35;text-align:center;letter-spacing:2px;margin:8px 0">${s}</div>`;
const grp=(s)=>`<div style="font-size:26px;letter-spacing:1px;padding:4px 0">${s}</div>`;
const CE=[[true,'✅','Certo','t'],[false,'❌','Errado','f']];
const ST=[
 {n:'Base de Lançamento',ic:'🚀',cls:'st-x',bg:'linear-gradient(135deg,#3a7bd5,#6dd5fa)',c:'#2f6fbf',l:'#e2f0ff',x:190,y:445,sub:'Dezenas, contar e quem é maior'},
 {n:'Lua das Contas',ic:'🌙',cls:'st-x',bg:'linear-gradient(135deg,#8e9eab,#c9d6df)',c:'#5b6b7a',l:'#eef2f6',x:75,y:380,sub:'Somar, tirar e qual conta fazer'},
 {n:'Planeta dos Grupos',ic:'🪐',cls:'st-x',bg:'linear-gradient(135deg,#f7971e,#ffd200)',c:'#d97a00',l:'#fff3d6',x:235,y:335,sub:'Grupos iguais, dobro e triplo'},
 {n:'Estrela da Metade',ic:'⭐',cls:'st-x',bg:'linear-gradient(135deg,#ff9ecb,#fbc2eb)',c:'#d9609a',l:'#ffe6f1',x:85,y:250,sub:'Metade e partes iguais'},
 {n:'Nave dos Enigmas',ic:'🛸',cls:'st-x',bg:'linear-gradient(135deg,#11998e,#38ef7d)',c:'#0f8a6f',l:'#dcfaef',x:255,y:165,sub:'Leia, pense e faça a conta'},
 {n:'Cratera do Alien',ic:'👾',cls:'st-boss',bg:'linear-gradient(160deg,#1f1147,#4b2a8f)',c:'#6a3fc4',l:'#ece4fb',x:240,y:62,sub:'Um pouco de tudo'}];

const T=[
 // 0 BASE DE LANÇAMENTO — dezenas, contar, maior/menor
 {s:0,ty:'num',tp:'dezena',q:'Cada pacote tem <b>10 adesivos</b> de estrela. Quantos adesivos ao todo?'+fig('📦📦 + ⭐⭐⭐⭐⭐'),a:25,ex:'2 pacotes de 10 = 20. Mais 5 soltos = 25. Conte os pacotes de 10 em 10 e depois os soltos de 1 em 1.'},
 {s:0,ty:'mc',oh:true,tp:'dezena',q:'Cada 📦 vale <b>10</b> e cada 🔹 vale <b>1</b>. Toque no desenho que mostra <b>32</b>.',o:[grp('📦📦📦 🔹🔹'),grp('📦📦 🔹🔹🔹'),grp('📦📦📦📦📦 🔹🔹'),grp('📦📦📦 🔹🔹🔹🔹🔹')],a:0,ex:'32 = 3 dezenas (3 pacotes) e 2 unidades (2 soltos).'},
 {s:0,ty:'tf',lb:CE,tp:'dezena',q:'<em>"O número 46 tem 6 dezenas."</em>',a:false,ex:'Errado! Em 46 o 4 é a dezena (40) e o 6 é a unidade. 46 tem 4 dezenas.'},
 {s:0,ty:'build',tp:'contar',q:'🚀 Conte de <b>10 em 10</b> até a decolagem:',parts:['30, 40, ','',', 60, ','',', 80'],bank:['50','70','45','65','90'],ans:['50','70'],goTxt:'✓ Conferir',ex:'De 10 em 10 só muda a dezena: 30, 40, 50, 60, 70, 80.'},
 {s:0,ty:'film',tp:'compara',q:'Os foguetes vão decolar do <b>MENOR</b> para o <b>MAIOR</b> número. Coloque na ordem!',o:['9','19','90','91'],slot:'🚀',slotTxt:'foguete',goTxt:'✓ Conferir',ex:'9 não tem dezena. 19 tem 1 dezena. 90 e 91 têm 9 dezenas, e 91 tem 1 a mais.'},
 {s:0,ty:'spot',tp:'compara',q:'🔎 Um astronauta errou uma comparação. Qual está <b>errada</b>?',o:['52 > 25','30 < 33','71 > 17','48 > 84'],a:3,ex:'48 tem 4 dezenas e 84 tem 8 dezenas: 48 é MENOR que 84.'},
 {s:0,ty:'num',tp:'contar',q:'Que número vem <b>logo depois</b> do 59?',a:60,ex:'Depois do 59 a unidade passa de 9 e vira uma dezena nova: 60.'},

 // 1 LUA DAS CONTAS — somar, tirar, qual conta fazer
 {s:1,ty:'rapid',tp:'qualconta',q:'🌙 Em cada historinha, é de <b>somar</b> ou de <b>tirar</b>?',bins:['➕ Somar','➖ Tirar'],subs:['',''],
  o:[['Ganhou 5 adesivos',0],['Perdeu 2 bolas',1],['Chegaram 3 amigos',0],['Comeu 4 balas',1],['Juntou com as do irmão',0],['Deu 6 para a prima',1]],ex:'Ganhou, chegou, juntou = somar. Perdeu, comeu, deu = tirar.'},
 {s:1,ty:'num',tp:'soma',q:'O astronauta tinha <b>24 pedras</b> da Lua e achou <b>mais 13</b>. Quantas pedras ele tem agora?'+fig('🪨🧑‍🚀'),a:37,ex:'Dezenas: 20 + 10 = 30. Unidades: 4 + 3 = 7. Total 37.'},
 {s:1,ty:'num',tp:'sub',q:'Na nave tinha <b>35 biscoitos</b> espaciais. A tripulação comeu <b>12</b>. Quantos sobraram?',a:23,ex:'Comeu = tirar: 30 − 10 = 20 e 5 − 2 = 3 → 23.'},
 {s:1,ty:'build',tp:'sub',q:'Faça <b>56 − 23</b> pela dezena e pela unidade:',parts:['50 − 20 = ','','     6 − 3 = ','','     Resultado: ',''],bank:['30','3','33','70','9'],ans:['30','3','33'],goTxt:'✓ Conferir',ex:'Dezenas 50 − 20 = 30, unidades 6 − 3 = 3, resultado 33.'},
 {s:1,ty:'mc',tp:'soma',q:'Qual destas contas dá <b>30</b>?',o:['18 + 12','15 + 10','20 + 5','12 + 12'],a:0,ex:'18 + 12: 10 + 10 = 20 e 8 + 2 = 10 → 30. As outras dão 25, 25 e 24.'},
 {s:1,ty:'num',tp:'sub',q:'Que número falta?<em>25 + ? = 30</em>',a:5,ex:'Do 25 até o 30 faltam 5. Confere: 25 + 5 = 30.'},
 {s:1,ty:'tf',lb:CE,tp:'qualconta',q:'A Luna tinha <b>15 estrelinhas</b> e <b>ganhou 5</b>. Ela disse:<em>"Agora eu tenho 10 estrelinhas!"</em>',a:false,ex:'Errado! Ganhou = somar: 15 + 5 = 20. Ela tirou quando era para somar.'},

 // 2 PLANETA DOS GRUPOS — grupos iguais, dobro, triplo
 {s:2,ty:'mc',oh:true,tp:'mult',q:'Toque no desenho que mostra <b>2 × 4</b> (2 grupos de 4).',o:[grp('👽👽👽👽 · 👽👽👽👽'),grp('👽👽 · 👽👽'),grp('👽👽👽👽👽👽'),grp('👽👽👽 · 👽👽👽 · 👽')],a:0,ex:'2 × 4 = 2 grupos com 4 em cada = 8 aliens.'},
 {s:2,ty:'num',tp:'mult',q:'São <b>3 foguetes</b> e cada um tem <b>4 janelas</b>. Quantas janelas ao todo?'+fig('🚀 🚀 🚀'),a:12,ex:'4 + 4 + 4 = 12. É 3 × 4.'},
 {s:2,ty:'tf',lb:CE,tp:'mult',q:'<em>"6 + 6 é o mesmo que 2 × 6."</em>',a:true,ex:'Certo! 2 × 6 = 2 grupos de 6 = 6 + 6 = 12.'},
 {s:2,ty:'paint',e:'👁️',tp:'mult',q:'Cada alien tem <b>3 olhos</b>. Pinte os olhos de <b>2 aliens</b>.',n:9,a:6,ex:'3 + 3 = 6 olhos. É 2 × 3.'},
 {s:2,ty:'rapid',tp:'mult',q:'🪐 Esta conta dá <b>10</b>? Mande para o lado certo!',bins:['✔ Dá 10','✘ Não dá'],subs:['',''],
  o:[['2 × 5',0],['3 × 3',1],['5 + 5',0],['2 × 4',1],['10 + 0',0],['3 + 3',1]],ex:'Dão 10: 2 × 5, 5 + 5 e 10 + 0. 3 × 3 = 9, 2 × 4 = 8, 3 + 3 = 6.'},
 {s:2,ty:'num',tp:'mult',q:'Qual é o <b>triplo de 4</b>?',a:12,ex:'Triplo = 3 vezes: 4 + 4 + 4 = 12.'},
 {s:2,ty:'spot',tp:'mult',q:'🔎 Um robô fez uma conta errada. Toque nela!',o:['2 × 3 = 6','3 × 2 = 6','2 × 2 = 4','3 × 4 = 7'],a:3,ex:'3 × 4 = 4 + 4 + 4 = 12. Quem deu 7 somou 3 + 4.'},
 {s:2,ty:'mc',tp:'mult',q:'O <b>dobro de 7</b> é…',o:['14','9','72','17'],a:0,ex:'Dobro = 2 vezes: 7 + 7 = 14.'},

 // 3 ESTRELA DA METADE — metade e partes iguais
 {s:3,ty:'paint',e:'⭐',tp:'metade',q:'Pinte a <b>METADE</b> das estrelas.',n:8,a:4,ex:'Metade de 8 = 4, porque 4 + 4 = 8.'},
 {s:3,ty:'mc',oh:true,tp:'metade',q:'Qual barra de chocolate espacial foi cortada <b>ao meio</b> (2 partes iguais)?',o:[uneq([70,70],0),uneq([100,40],0),uneq([47,47,46],0),uneq([90,50],0)],a:0,ex:'Ao meio = 2 pedaços do mesmo tamanho. Só a primeira tem os 2 iguais.'},
 {s:3,ty:'num',tp:'metade',q:'A torta tinha <b>8 pedaços</b>. Os pintados foram comidos. Quantos pedaços <b>sobraram</b>?'+pie(8,3,'#d9609a'),a:5,ex:'Foram comidos 3 (os pintados). 8 − 3 = 5 sobraram.'},
 {s:3,ty:'tf',lb:CE,tp:'metade',q:'<em>"A metade de 10 é 4."</em>'+bar(10,4,'#f2b05e',220),a:false,ex:'Errado! 4 + 4 = 8, não 10. A metade de 10 é 5 (5 + 5 = 10).'},
 {s:3,ty:'num',tp:'metade',q:'Dois astronautas vão dividir <b>14 balas</b> igualzinho. Quantas cada um ganha?'+fig('🧑‍🚀🍬🧑‍🚀'),a:7,ex:'Dividir entre 2 = metade: 7 + 7 = 14.'},
 {s:3,ty:'mc',tp:'metade',q:'Cortei uma melancia <b>ao meio</b>. Quantos pedaços iguais ficaram?'+fig('🍉🔪'),o:['2','4','1','3'],a:0,ex:'Ao meio = em 2 partes iguais.'},

 // 4 NAVE DOS ENIGMAS — historinhas para pensar
 {s:4,ty:'num',tp:'logica',q:'Na fila para entrar no foguete, a Nina é a <b>6ª</b>. Quantas crianças estão <b>na frente</b> dela?'+fig('🧒🧒🧒🧒🧒👧'),a:5,ex:'1ª, 2ª, 3ª, 4ª e 5ª estão na frente. A 6ª é ela: 5 crianças.'},
 {s:4,ty:'num',tp:'logica',q:'O robô Bip tem <b>10 anos</b>. A robô Bop é <b>4 anos mais nova</b>. Quantos anos tem a Bop?',a:6,ex:'Mais nova = menos anos: 10 − 4 = 6.'},
 {s:4,ty:'mc',tp:'logica',q:'O Leo tem <b>mais</b> adesivos que a Mia. A Mia tem <b>mais</b> que a Bia. Quem tem <b>menos</b>?',o:['Bia','Leo','Mia','Todos iguais'],a:0,ex:'Leo > Mia > Bia. A Bia fica no fim: tem menos.'},
 {s:4,ty:'num',tp:'logica',q:'Pensei num número. <b>Somei 5</b> e deu <b>12</b>. Que número eu pensei?',a:7,ex:'Faz ao contrário: 12 − 5 = 7. Confere: 7 + 5 = 12.'},
 {s:4,ty:'num',tp:'logica',q:'Tinha <b>3 caixas</b> com <b>2 foguetinhos</b> em cada. <b>1 quebrou</b>. Quantos sobraram?'+fig('📦 📦 📦'),a:5,ex:'Duas contas: 2 + 2 + 2 = 6 foguetinhos. Quebrou 1: 6 − 1 = 5.'},
 {s:4,ty:'tf',lb:CE,tp:'logica',q:'A Gabi tem <b>9 figurinhas</b>. O Lucas tem <b>4 a menos</b> que a Gabi.<em>"Então o Lucas tem 13 figurinhas."</em>',a:false,ex:'Errado! "A menos" é tirar: 9 − 4 = 5. Quem fez 9 + 4 se confundiu.'},
 {s:4,ty:'build',tp:'logica',q:'🛸 As luzes da nave piscam num padrão. Complete:',parts:['2, 4, 6, ','',', 10, ',''],bank:['8','12','7','11','9'],ans:['8','12'],goTxt:'✓ Conferir',ex:'Pula de 2 em 2: 2, 4, 6, 8, 10, 12.'},
 {s:4,ty:'num',tp:'logica',q:'Na nave tem <b>2 astronautas</b> e <b>1 cachorro</b> espacial. Quantas <b>patas e pernas</b> ao todo?'+fig('🧑‍🚀 🧑‍🚀 🐕'),a:8,ex:'Astronautas: 2 + 2 = 4 pernas. Cachorro: 4 patas. Total: 4 + 4 = 8.'},

 // 5 CRATERA DO ALIEN — um pouco de tudo
 {s:5,ty:'num',tp:'dezena',q:'O alien roubou adesivos! Cada pacote tem <b>10</b>. Quantos ele roubou?'+fig('📦📦📦📦 + ⭐⭐⭐⭐⭐⭐'),a:46,ex:'4 pacotes de 10 = 40. Mais 6 soltos = 46.'},
 {s:5,ty:'num',tp:'mult',q:'São <b>4 aliens</b> e cada um tem <b>2 antenas</b>. Quantas antenas ao todo?'+fig('👽 👽 👽 👽'),a:8,ex:'2 + 2 + 2 + 2 = 8. É 4 × 2.'},
 {s:5,ty:'num',tp:'logica',q:'Você é a <b>4ª</b> da fila do lanche. Quantas crianças estão <b>na frente</b> de você?',a:3,ex:'1ª, 2ª e 3ª estão na frente: 3 crianças.'},
 {s:5,ty:'mc',tp:'compara',q:'Qual número é o <b>MAIOR</b>?',o:['83','38','80','33'],a:0,ex:'83 e 80 têm 8 dezenas. Entre eles, 83 tem 3 unidades a mais.'},
 {s:5,ty:'paint',e:'🍬',tp:'metade',q:'Pinte a <b>metade</b> das balas.',n:12,a:6,ex:'Metade de 12 = 6, porque 6 + 6 = 12.'},
 {s:5,ty:'num',tp:'sub',q:'Tinha <b>50 estrelas</b> no céu. O alien apagou <b>20</b>. Quantas ficaram?',a:30,ex:'Tirar 20 é tirar 2 dezenas: 5 − 2 = 3 dezenas = 30.'},
 {s:5,ty:'spot',tp:'mult',q:'🔎 O alien bagunçou uma conta. Qual está <b>errada</b>?',o:['3 × 3 = 9','4 + 4 = 8','2 × 6 = 8','10 − 3 = 7'],a:2,ex:'2 × 6 = 6 + 6 = 12. Quem deu 8 somou 2 + 6.'},
 {s:5,ty:'num',tp:'logica',q:'Pensei num número e fiz o <b>dobro</b>. Deu <b>16</b>. Que número eu pensei?',a:8,ex:'Que número + ele mesmo dá 16? 8 + 8 = 16.'},
 {s:5,ty:'num',tp:'logica',q:'A Mel tinha <b>20 estrelinhas</b>. Deu a <b>metade</b> para a amiga e depois <b>ganhou 2</b>. Com quantas ficou?',a:12,ex:'Metade de 20 = 10 (ficou com 10). Ganhou 2: 10 + 2 = 12.'}];

const TOP={
 contar:{n:'Contar e o número seguinte',t:'De 10 em 10 só muda a dezena. Depois do 9 nas unidades, vem a próxima dezena (59 → 60).'},
 dezena:{n:'Dezenas e unidades',t:'Conte os grupos de 10 primeiro (dezenas) e depois os soltos (unidades). Em 46, o 4 é a dezena.'},
 compara:{n:'Maior e menor',t:'Compare primeiro a dezena. Só se for igual, olhe a unidade.'},
 soma:{n:'Somar',t:'Junte dezena com dezena e unidade com unidade.'},
 sub:{n:'Tirar e número que falta',t:'Tire dezena de dezena e unidade de unidade. Para achar o número que falta, conte do menor até o maior.'},
 qualconta:{n:'Qual conta fazer',t:'Ganhou, chegou, juntou = somar. Deu, comeu, perdeu = tirar.'},
 mult:{n:'Grupos iguais, dobro e triplo',t:'3 × 4 = 3 grupos de 4 = 4 + 4 + 4. Dobro = 2 vezes; triplo = 3 vezes. Cuidado para não somar os dois números (3 + 4).'},
 metade:{n:'Metade e partes iguais',t:'Metade = 2 partes iguais. Pedaços comidos saem; os outros sobram.'},
 logica:{n:'Historinhas para pensar',t:'Leia de novo e sublinhe os números. Na fila, quem está na frente do 6º são 5. "Mais nova" e "a menos" tiram. Às vezes são duas contas.'}};

JOGOS.push({id:'mat-2ano-espaco',ano:2,ler:true,materia:'Matemática',prova:'2º ano · treino 3',titulo:'Foguete dos Números',ic:'🚀',cor:'#c9c2ff',
  intro:'3, 2, 1… decolar! Primeira parada: Base de Lançamento 🚀',
  links:[],
  mapa:{sea:['#3b3486','#141038'],isl:['#a99cf5','#6a5acd'],praia:'#e3dcff',deco:['⭐','🪐','🌙','☄️','🛰️','✨']},
  boss:{nome:'Alien Trapalhão',fala:'Blip blop! Baguncei as contas da galáxia! 👾',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150">
  <ellipse cx="80" cy="144" rx="46" ry="5" fill="rgba(0,0,0,.25)"/>
  <path d="M60 30 L50 6" stroke="#5fd38d" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ffbf2e"/>
  <path d="M100 30 L110 6" stroke="#5fd38d" stroke-width="4" stroke-linecap="round"/><circle cx="110" cy="6" r="6" fill="#ff6f9f"/>
  <ellipse cx="80" cy="112" rx="34" ry="28" fill="#5fd38d" stroke="#2e9a62" stroke-width="2"/>
  <ellipse cx="80" cy="118" rx="18" ry="16" fill="#c9f5d6"/>
  <path d="M46 110 Q24 100 22 82" stroke="#5fd38d" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M114 110 Q136 100 138 82" stroke="#5fd38d" stroke-width="10" fill="none" stroke-linecap="round"/>
  <ellipse cx="80" cy="58" rx="46" ry="36" fill="#5fd38d" stroke="#2e9a62" stroke-width="2"/>
  <circle cx="58" cy="54" r="12" fill="#fff"/><circle cx="80" cy="44" r="10" fill="#fff"/><circle cx="102" cy="54" r="12" fill="#fff"/>
  <circle cx="60" cy="56" r="5.5" fill="#3a2850"/><circle cx="81" cy="46" r="4.5" fill="#3a2850"/><circle cx="100" cy="56" r="5.5" fill="#3a2850"/>
  <circle cx="62" cy="54" r="1.8" fill="#fff"/><circle cx="83" cy="44" r="1.5" fill="#fff"/><circle cx="102" cy="54" r="1.8" fill="#fff"/>
  <path d="M62 76 Q80 90 98 76" fill="#3a2850"/><path d="M68 78 l3 5 l3 -4 M86 78 l3 4 l3 -5" fill="#fff"/>
  <ellipse cx="62" cy="140" rx="12" ry="6" fill="#43b874"/><ellipse cx="98" cy="140" rx="12" ry="6" fill="#43b874"/>
  <text x="128" y="132" font-size="18">⭐</text></svg>`},
  ST,TOP,T});
})();
