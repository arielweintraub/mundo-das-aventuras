(function(){
/* Jogo de estudo (2º ano) — misto: inglês com lógica, hebraico (som das letras) e português (achar erros). Sem material da escola. */
const H=s=>`<em class="he" dir="rtl">${s}</em>`;
const h=s=>`<bdi class="he">${s}</bdi>`;
const R='<i class="rtlq"></i>';
const fig=s=>`<div style="font-size:32px;line-height:1.35;text-align:center;letter-spacing:2px;margin:8px 0">${s}</div>`;
const grp=s=>`<div style="font-size:40px;padding:4px 0;text-align:center">${s}</div>`;
const pt=s=>`<div style="font:700 14px Nunito;color:var(--muted);margin-top:6px">(${s})</div>`;
const CE=[[true,'✅','Certo','t'],[false,'❌','Errado','f']];
const YN=[[true,'✅','TRUE','t'],[false,'❌','FALSE','f']];

const ST=[
 {n:'Picadeiro das Cores',ic:'🎨',cls:'st-x',bg:'linear-gradient(135deg,#ff6a88,#ffcc70)',c:'#e0457b',l:'#ffe4ee',x:190,y:445,sub:'English: colors, numbers e padrões'},
 {n:'Jaula dos Bichos',ic:'🦁',cls:'st-x',bg:'linear-gradient(135deg,#f7971e,#ffd200)',c:'#d97a00',l:'#fff3d6',x:75,y:380,sub:'English: animals e enigmas'},
 {n:'Tenda dos Enigmas',ic:'🪄',cls:'st-x',bg:'linear-gradient(135deg,#7f53ac,#647dee)',c:'#5b4bc4',l:'#ebe6ff',x:235,y:335,sub:'English: family, food e lógica'},
 {n:'Barraca do Álef-Bet',ic:'🔤',cls:'st-x',bg:'linear-gradient(135deg,#11998e,#38ef7d)',c:'#0f8a6f',l:'#dcfaef',x:85,y:250,sub:'Hebraico: o som das letras'},
 {n:'Espelho dos Erros',ic:'🔎',cls:'st-x',bg:'linear-gradient(135deg,#3a7bd5,#6dd5fa)',c:'#2f6fbf',l:'#e2f0ff',x:255,y:165,sub:'Português: ache o que está errado'},
 {n:'Palco do Palhaço',ic:'🤡',cls:'st-boss',bg:'linear-gradient(160deg,#8e1b3a,#e0457b)',c:'#c0254f',l:'#ffe0e8',x:240,y:62,sub:'Um pouco de tudo'}];

const TOP={
 cores:{n:'Cores em inglês',t:'red, blue, yellow, green, orange, purple, pink, black, white.'},
 numeros:{n:'Números em inglês',t:'one, two, three, four, five, six, seven, eight, nine, ten.'},
 padrao:{n:'Padrões e sequências',t:'Olhe o que se repete e continue do mesmo jeito.'},
 bichos:{n:'Animais em inglês',t:'cat, dog, fish, bird, elephant, mouse, chicken, bee.'},
 enigma:{n:'Enigmas e lógica',t:'Leia cada pista com calma e elimine o que não serve.'},
 familia:{n:'Família e comida em inglês',t:'mom, dad, grandma, sister, brother · apple, banana, strawberry.'},
 hletra:{n:'Hebraico: letra do começo',t:'Fale a palavra devagar e escute o primeiro som.'},
 hparece:{n:'Hebraico: letras parecidas',t:'ד × ר (o ד tem um cantinho) · ה × ח × ת · שׁ (sh) × ס (s).'},
 port:{n:'Português: escrita das palavras',t:'M antes de P e B · R e RR · S e SS.'},
 frase:{n:'Português: frases',t:'Frase começa com letra maiúscula e termina com ponto. Nome de gente começa com maiúscula.'},
 mistura:{n:'Inglês ou português?',t:'Repare nas palavras que você já conhece em cada língua.'}};

const T=[
 // 0 PICADEIRO DAS CORES
 {s:0,ty:'mc',tp:'cores',q:'🎨 Misture as tintas!<em>🔴 red + 🟡 yellow = ?</em>',o:['🟠 orange','🟢 green','🟣 purple','🔵 blue'],a:0,ex:'Vermelho + amarelo = laranja: orange.'},
 {s:0,ty:'mc',tp:'cores',q:'🎨 E agora?<em>🔵 blue + 🟡 yellow = ?</em>',o:['🟢 green','🟠 orange','🟣 purple','⚫ black'],a:0,ex:'Azul + amarelo = verde: green.'},
 {s:0,ty:'build',tp:'padrao',goTxt:'✓ Conferir',q:'🎪 Continue as bandeirinhas do circo:'+fig('🔴🔵🔴🔵 ❓❓'),parts:['red, blue, red, blue, ','',', ',''],bank:['red','blue','green'],ans:['red','blue'],ex:'O padrão é red, blue, red, blue… então vem red e depois blue.'},
 {s:0,ty:'num',tp:'numeros',q:'Quanto dá?<em>two + three = ?</em>'+pt('responda com número'),a:5,ex:'two = 2, three = 3. 2 + 3 = 5 (five).'},
 {s:0,ty:'num',tp:'numeros',q:'Quanto dá?<em>ten − four = ?</em>',a:6,ex:'ten = 10, four = 4. 10 − 4 = 6 (six).'},
 {s:0,ty:'spot',tp:'cores',q:'🔎 Um intruso entrou na lista de cores. Qual <b>NÃO</b> é cor?',o:['red','green','dog','pink'],a:2,ex:'dog = cachorro. Não é cor!'},
 {s:0,ty:'tf',lb:YN,tp:'numeros',q:'<em>"seven" is the number 8.</em>'+pt('"seven" é o número 8?'),a:false,ex:'FALSE. seven = 7. eight = 8.'},
 {s:0,ty:'film',tp:'numeros',slot:'🎈',slotTxt:'balão',goTxt:'✓ Conferir',q:'🎈 Coloque os balões do <b>menor</b> para o <b>maior</b> número:',o:['one','three','five','eight'],ex:'one (1), three (3), five (5), eight (8).'},

 // 1 JAULA DOS BICHOS
 {s:1,ty:'mc',oh:true,tp:'bichos',q:'Toque no <b>cat</b>.',o:[grp('🐱'),grp('🐶'),grp('🐟'),grp('🐦')],a:0,ex:'cat = gato. dog = cachorro, fish = peixe, bird = pássaro.'},
 {s:1,ty:'num',tp:'enigma',q:'How many legs?'+fig('🐶 🐶')+pt('quantas patas têm 2 cachorros?'),a:8,ex:'Cada dog tem 4 patas: 4 + 4 = 8.'},
 {s:1,ty:'mc',tp:'enigma',q:'🦁 Riddle:<em>I am big and gray. I have a very long nose. What am I?</em>'+pt('sou grande e cinza, tenho um nariz bem comprido'),o:['an elephant','a mouse','a frog','a bird'],a:0,ex:'Elefante = elephant 🐘.'},
 {s:1,ty:'rapid',tp:'bichos',q:'🪽 Esse bicho consegue voar?',bins:['🪽 It can fly','🚫 It can’t fly'],subs:['voa','não voa'],
  o:[['bird 🐦',0],['dog 🐶',1],['butterfly 🦋',0],['fish 🐟',1],['bee 🐝',0],['cat 🐱',1]],ex:'bird, butterfly e bee voam. dog, fish e cat não.'},
 {s:1,ty:'spot',tp:'bichos',q:'🔎 Qual <b>NÃO</b> é um animal?',o:['horse','cat','dog','banana'],a:3,ex:'banana é fruta!'},
 {s:1,ty:'tf',lb:YN,tp:'bichos',q:'<em>A fish lives in the water.</em> 🐟'+pt('o peixe vive na água?'),a:true,ex:'TRUE. fish = peixe, water = água.'},
 {s:1,ty:'mc',tp:'enigma',q:'🐭 🐱 🐶<em>The cat is bigger than the mouse. The dog is bigger than the cat. Who is the biggest?</em>'+pt('o gato é maior que o rato; o cachorro é maior que o gato. Quem é o maior?'),o:['the dog','the cat','the mouse'],a:0,ex:'O cachorro é maior que o gato, que é maior que o rato. Então o maior é the dog.'},
 {s:1,ty:'num',tp:'enigma',q:'How many legs?'+fig('🐔 🐔 🐔')+pt('quantas patas têm 3 galinhas?'),a:6,ex:'Cada chicken tem 2 patas: 2 + 2 + 2 = 6.'},

 // 2 TENDA DOS ENIGMAS
 {s:2,ty:'mc',tp:'familia',q:'🍌 <em>A banana is ______.</em>',o:['yellow','blue','purple','black'],a:0,ex:'Banana é amarela: yellow.'},
 {s:2,ty:'num',tp:'enigma',q:'<em>I have 3 apples. Mom gives me 2 more. How many apples do I have?</em>'+fig('🍎🍎🍎 + 🍎🍎')+pt('tenho 3 maçãs e a mamãe me dá mais 2'),a:5,ex:'3 + 2 = 5 apples.'},
 {s:2,ty:'film',tp:'enigma',slot:'⏰',slotTxt:'passo',goTxt:'✓ Conferir',q:'⏰ Coloque a manhã na ordem certa:',o:['wake up 🛏️','brush my teeth 🪥','eat breakfast 🥣','go to school 🏫'],ex:'Primeiro acordar, depois escovar os dentes, tomar café e ir para a escola.'},
 {s:2,ty:'mc',tp:'familia',q:'<em>My mom’s mother is my ______.</em>'+pt('a mãe da minha mãe é minha…'),o:['grandma','sister','brother','dad'],a:0,ex:'A mãe da mamãe é a avó: grandma.'},
 {s:2,ty:'build',tp:'padrao',goTxt:'✓ Conferir',q:'🪄 Continue a mágica (de 2 em 2):',parts:['two, four, six, ','',', ',''],bank:['eight','ten','seven','nine'],ans:['eight','ten'],ex:'2, 4, 6, 8 (eight), 10 (ten).'},
 {s:2,ty:'spot',tp:'cores',q:'🌈 Qual cor <b>NÃO</b> aparece no arco-íris?',o:['red','black','green','blue'],a:1,ex:'O arco-íris não tem preto (black).'},
 {s:2,ty:'tf',lb:YN,tp:'enigma',q:'<em>Snow is hot.</em> ❄️'+pt('a neve é quente?'),a:false,ex:'FALSE. Snow is cold! (A neve é fria.)'},
 {s:2,ty:'mc',tp:'familia',q:'🪄 Riddle:<em>I am red. I am a fruit. I start with the letter S.</em>'+pt('sou vermelha, sou fruta e começo com S'),o:['strawberry','banana','grape','orange'],a:0,ex:'strawberry = morango 🍓. Começa com S e é vermelho.'},

 // 3 BARRACA DO ÁLEF-BET
 {s:3,ty:'mc',tp:'hletra',q:R+'🐶 '+h('כֶּלֶב')+' começa com qual letra?',o:['כ','ל','ב','מ'],a:0,ex:'כֶּלֶב (kélev) começa com o som K: letra כ.'},
 {s:3,ty:'mc',oh:true,tp:'hletra',q:'Qual figura começa com a letra '+h('מ')+' (som M)?',o:[grp('💧<br><span class="he" style="font-size:22px">מַיִם</span>'),grp('☀️<br><span class="he" style="font-size:22px">שֶׁמֶשׁ</span>'),grp('🐟<br><span class="he" style="font-size:22px">דָּג</span>'),grp('🏠<br><span class="he" style="font-size:22px">בַּיִת</span>')],a:0,ex:'מַיִם (máim) começa com M. Pegadinha: שֶׁמֶשׁ tem מ no meio, mas começa com שׁ (sh).'},
 {s:3,ty:'rapid',tp:'hparece',q:R+'Som de <b>SH</b> ou de <b>S</b>?',bins:['שׁ','ס'],subs:['sh','s'],
  o:[['☀️ שֶׁמֶשׁ',0],['🐴 סוּס',1],['👋 שָׁלוֹם',0],['📖 סֵפֶר',1],['👵 סַבְתָּא',1],['🪑 שֻׁלְחָן',0]],ex:'שׁ faz SH (shémesh, shalom, shulchan). ס faz S (sus, séfer, sávta).'},
 {s:3,ty:'mc',tp:'hparece',q:R+'Qual letra faz o som de <b>R</b>, como em 🚂 '+h('רַכֶּבֶת')+'?',o:['ר','ד','ו','ז'],a:0,ex:'ר (rêsh) faz R. Cuidado: o ד parece, mas tem um cantinho e faz D.'},
 {s:3,ty:'tf',lb:CE,tp:'hparece',q:'🐟 '+h('דָּג')+' começa com a letra '+h('ר')+'.',a:false,ex:'Errado! דָּג (dag) começa com D: letra ד. O ר é redondinho em cima; o ד tem um cantinho.'},
 {s:3,ty:'mc',tp:'hparece',q:R+'🍎 '+h('תַּפּוּחַ')+' começa com qual letra?',o:['ת','ח','ה','נ'],a:0,ex:'תַּפּוּחַ (tapúach) começa com T: letra ת. ח e ה parecem, mas fazem CH e H.'},
 {s:3,ty:'film',tp:'hletra',slot:'🔤',slotTxt:'letra',goTxt:'✓ Conferir',q:R+'Coloque as letras na ordem do álef-bet:',o:['א','ב','ג','ד','ה'],ex:'א álef, ב bêt, ג guímel, ד dálet, ה hê.'},
 {s:3,ty:'mc',tp:'hletra',q:'Qual palavra começa com o <b>mesmo som</b> de 🐘 '+h('פִּיל')+'?',o:['🍕 פִּיצָה','🐴 סוּס','❤️ לֵב','✋ יָד'],a:0,ex:'פִּיל (pil) e פִּיצָה (pitsa) começam com P: letra פ.'},

 // 4 ESPELHO DOS ERROS
 {s:4,ty:'spot',tp:'port',q:'🔎 Qual palavra está escrita <b>errada</b>?',o:['casa','bola','gato','cachoro'],a:3,ex:'O certo é cachorro, com RR: o som forte do R no meio da palavra é RR.'},
 {s:4,ty:'spot',tp:'frase',q:'🔎 Qual frase está <b>errada</b>?',o:['O gato dorme.','eu gosto de bolo.','O sol está quente.','A Ana foi à escola.'],a:1,ex:'Toda frase começa com letra maiúscula: Eu gosto de bolo.'},
 {s:4,ty:'mc',tp:'port',q:'Antes de <b>P</b> e <b>B</b> usamos <b>M</b>. Qual está certa?',o:['campo','canpo','cãpo','kampo'],a:0,ex:'campo: M antes do P. Também: tempo, bombom, samba.'},
 {s:4,ty:'rapid',tp:'port',q:'Qual vai no espaço: <b>R</b> ou <b>RR</b>?',bins:['R','RR'],subs:['som fraco','som forte'],
  o:[['ca _ o 🚗',1],['ba _ ata 🪳',0],['te _ a 🌍',1],['pe _ a 🍐',0],['ca _ oça 🐴',1],['cade _ a 🪑',0]],ex:'carro, terra, carroça têm som forte (RR). barata, pera, cadeira têm som fraco (R).'},
 {s:4,ty:'tf',lb:CE,tp:'frase',q:'A frase<em>O passarinho canta.</em>começa com letra maiúscula e termina com ponto.',a:true,ex:'Certo! Maiúscula no começo (O) e ponto no fim.'},
 {s:4,ty:'spot',tp:'port',q:'🔎 Qual palavra está <b>errada</b>?',o:['osso','pasarinho','mesa','vaso'],a:1,ex:'O certo é passarinho, com SS. Entre duas vogais, um S só faz som de Z (mesa, vaso).'},
 {s:4,ty:'mc',tp:'port',q:'uma flor 🌸 → duas ______',o:['flores','flors','floris','florres'],a:0,ex:'Palavra que termina em R ganha ES no plural: flor → flores.'},
 {s:4,ty:'film',tp:'frase',slot:'🧩',slotTxt:'palavra',goTxt:'✓ Conferir',q:'🧩 Monte a frase na ordem certa:',o:['A','menina','pula','corda.'],ex:'A menina pula corda. Começa com maiúscula e termina com ponto.'},

 // 5 PALCO DO PALHAÇO (chefão)
 {s:5,ty:'num',tp:'enigma',q:'How many eyes?'+fig('👧 👦 👧')+pt('quantos olhos têm 3 crianças?'),a:6,ex:'Cada criança tem 2 olhos: 2 + 2 + 2 = 6.'},
 {s:5,ty:'mc',tp:'hparece',q:R+'☀️ '+h('שֶׁמֶשׁ')+' começa com qual letra?',o:['שׁ','ס','מ','ת'],a:0,ex:'שֶׁמֶשׁ (shémesh) começa com SH: letra שׁ.'},
 {s:5,ty:'spot',tp:'port',q:'🤡 O palhaço escreveu uma palavra errada. Qual?',o:['palhaço','pipoca','paliasso','circo'],a:2,ex:'O certo é palhaço, com LH e Ç.'},
 {s:5,ty:'mc',tp:'padrao',q:'🎈 What comes next?<em>red, red, blue, red, red, blue, red, red, ___</em>',o:['blue','red','green','yellow'],a:0,ex:'O padrão é red, red, blue. Depois de dois red vem blue.'},
 {s:5,ty:'tf',lb:CE,tp:'hletra',q:h('ב')+' é a <b>segunda</b> letra do álef-bet.',a:true,ex:'Certo! א é a primeira e ב é a segunda.'},
 {s:5,ty:'rapid',tp:'mistura',q:'🤡 Essa palavra é em <b>inglês</b> ou em <b>português</b>?',bins:['🇺🇸 English','🇧🇷 Português'],subs:['',''],
  o:[['dog',0],['cachorro',1],['blue',0],['amarelo',1],['apple',0],['maçã',1],['house',0],['casa',1]],ex:'dog, blue, apple e house são inglês.'},
 {s:5,ty:'num',tp:'enigma',q:'O palhaço tinha <b>10 balões</b> 🎈. Estourou <b>3</b> e ganhou mais <b>2</b>. Quantos balões ele tem agora?',a:9,ex:'10 − 3 = 7. Depois 7 + 2 = 9.'}
];

JOGOS.push({id:'mix-2ano-circo',ano:2,ler:true,materia:'Inglês · Hebraico · Português',prova:'2º ano · treino 4',titulo:'Circo das Ideias',ic:'🎪',cor:'#ffc2d4',
  intro:'Respeitável público! Escolha um lugar do circo 🎪',
  links:[],
  mapa:{sea:['#ffd1dc','#ff8fab'],isl:['#fff3b0','#ffd166'],praia:'#fff7d6',deco:['🎪','🎈','🍿','⭐','🎠','🎈']},
  boss:{nome:'Palhaço Bagunça',fala:'Biiiii! Baguncei as palavras do circo! 🤡',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150">
  <ellipse cx="80" cy="144" rx="46" ry="5" fill="rgba(0,0,0,.2)"/>
  <path d="M46 140 L56 92 L104 92 L114 140Z" fill="#3a86ff"/><circle cx="80" cy="108" r="5" fill="#ffd166"/><circle cx="80" cy="124" r="5" fill="#ffd166"/>
  <path d="M50 94 q30 12 60 0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="48" cy="52" r="16" fill="#ff7b00"/><circle cx="112" cy="52" r="16" fill="#ff7b00"/><circle cx="58" cy="34" r="13" fill="#ff7b00"/><circle cx="102" cy="34" r="13" fill="#ff7b00"/>
  <circle cx="80" cy="58" r="30" fill="#fff1e0"/>
  <path d="M62 30 L80 2 L98 30Z" fill="#e0457b"/><circle cx="80" cy="3" r="5" fill="#ffd166"/>
  <path d="M64 50 l6 -6 l6 6 M84 50 l6 -6 l6 6" stroke="#2a1d4a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="80" cy="62" r="8" fill="#e63946"/>
  <path d="M62 72 q18 16 36 0" stroke="#e63946" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="140" rx="14" ry="6" fill="#e63946"/><ellipse cx="100" cy="140" rx="14" ry="6" fill="#e63946"/></svg>`},
  ST,TOP,T});
})();
