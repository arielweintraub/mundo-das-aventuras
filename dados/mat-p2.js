(function(){
function uneq(ws,k,col){col=col||'#8b6cf0';let x=0,r='';const tot=ws.reduce((a,b)=>a+b,0);ws.forEach((w,i)=>{r+=`<rect x="${x}" y="0" width="${w}" height="40" fill="${i<k?col:'#fff'}" stroke="#6b4f80" stroke-width="1.6"/>`;x+=w;});return `<svg viewBox="-1 -1 ${tot+2} 42" style="width:${tot}px;max-width:100%;display:block;margin:8px auto">${r}</svg>`;}
const VF=[[true,'✅','Verdade','t'],[false,'❌','Mito','f']];
const ST=[
 {n:'Carrossel das Frações',ic:'🎠',cls:'st-x',bg:'linear-gradient(135deg,#ff6fa8,#ffaa5e)',c:'#e0447a',l:'#ffe1ec',x:190,y:445,sub:'Ler, escrever e repartir frações'},
 {n:'Roda-Gigante Equivalente',ic:'🎡',cls:'st-x',bg:'linear-gradient(135deg,#8b6cf0,#4fc3f7)',c:'#6a4fd0',l:'#ece6ff',x:75,y:380,sub:'Frações que valem o mesmo'},
 {n:'Barraca de Pipoca',ic:'🍿',cls:'st-x',bg:'repeating-linear-gradient(90deg,#ef5a6f 0 26px,#f7909e 26px 52px)',c:'#d6336c',l:'#ffe1e7',x:235,y:335,sub:'Fração de quantidade e comparar'},
 {n:'Montanha-Russa da Divisão',ic:'🎢',cls:'st-x',bg:'linear-gradient(160deg,#2fa8e0,#1fc7a8)',c:'#13a58b',l:'#d9f7f1',x:85,y:250,sub:'Ideias, estratégias e resto'},
 {n:'Casa dos Espelhos',ic:'🪞',cls:'st-x',bg:'linear-gradient(135deg,#6f7fd8,#b49cff)',c:'#5b6bd0',l:'#e6e9ff',x:255,y:165,sub:'Confira se a conta está certa'},
 {n:'Trem-Fantasma',ic:'👻',cls:'st-boss',bg:'linear-gradient(160deg,#2b1d4e,#5b3c8f)',c:'#5b3c8f',l:'#efe3fb',x:240,y:62,sub:'Problemas de vários passos'}];

const T=[
 // 0 CARROSSEL
 {s:0,ty:'paint',shape:'bar',tp:'fracbase',q:'🍫 Pinte <b>3/8</b> da barra de chocolate. Toque nos pedaços.',n:8,a:3,ex:'A barra tem 8 partes iguais; 3/8 é pintar 3 delas.'},
 {s:0,ty:'num',tp:'fracbase',q:'Que fração da torta <b>NÃO</b> está pintada? Digite o número de cima.'+pie(8,5)+'<div class="fracq">? / 8</div>',a:3,ex:'5 de 8 partes estão pintadas; sem pintar ficam 3 → 3/8.'},
 {s:0,ty:'tf',lb:VF,tp:'fracbase',q:'<em>"Na fração 4/9, o 9 mostra quantas partes eu pintei."</em>',a:false,ex:'Mito! O 9 é o denominador: em quantas partes iguais o inteiro foi dividido. Quem mostra as partes usadas é o 4.'},
 {s:0,ty:'mc',tp:'fracbase',q:'Como se escreve <b>"dois quinze avos"</b>?',o:['2/15','15/2','2/50','12/5'],a:0,ex:'Dois (em cima) quinze avos (embaixo): 2/15.'},
 {s:0,ty:'tf',lb:VF,tp:'fracbase',q:'<em>"7/100 se lê sete centésimos."</em>',a:true,ex:'Verdade! 1/100 é um centésimo, então 7/100 são sete centésimos.'},
 {s:0,ty:'build',tp:'fracbase',q:'Complete como se lê:',parts:['4/7 se lê "quatro ','','"   e   5/12 se lê "cinco ','','"'],bank:['sétimos','setes','doze avos','dozes','quartos'],ans:['sétimos','doze avos'],goTxt:'✓ Conferir',ex:'4/7 = quatro sétimos; 5/12 = cinco doze avos.'},
 {s:0,ty:'mc',oh:true,tp:'fracbase',q:'Toque na figura em que a parte pintada é <b>1/3</b>.',o:[bar(3,1,'#ff8a3d',180),uneq([100,40,40],1,'#ff8a3d'),bar(4,1,'#ff8a3d',180),bar(3,2,'#ff8a3d',180)],a:0,ex:'Para ser 1/3, o inteiro tem que estar dividido em 3 partes IGUAIS e 1 pintada.'},
 {s:0,ty:'tf',lb:VF,tp:'fracbase',q:'<em>"A parte pintada desta figura é 1/4."</em>'+uneq([110,40,40,40],1),a:false,ex:'Mito! São 4 pedaços, mas eles não são iguais. Fração só vale com partes iguais.'},
 {s:0,ty:'mc',oh:true,tp:'fracbase',q:'Este pedaço é <b>1/4</b> de um chocolate:'+bar(1,1,'#8a4b2a',40)+'Qual destas barras pode ser o chocolate <b>inteiro</b>?',o:[bar(4,0,'#8a4b2a',160),bar(2,0,'#8a4b2a',80),bar(3,0,'#8a4b2a',120),bar(6,0,'#8a4b2a',240)],a:0,ex:'Se o pedaço é 1/4, o inteiro tem 4 pedaços iguais a ele.'},
 {s:0,ty:'mc',tp:'repartir',q:'Um bolo de <b>7 fatias</b> foi repartido entre <b>2 crianças</b>, sem sobrar nada. Quanto cada uma recebe?'+bar(7,0,'#ffb36b'),o:['3 fatias e 1/2','3 fatias e 1/7','3 fatias e sobra 1','4 fatias'],a:0,ex:'3 fatias inteiras para cada (usa 6). A que sobra é cortada ao meio: 1/2 para cada.'},
 {s:0,ty:'num',tp:'repartir',q:'<b>11 quadradinhos</b> de chocolate para <b>4 amigas</b>: cada uma recebe 2 inteiros e mais <b>?/4</b>. Qual número falta?'+bar(11,0,'#8a4b2a'),a:3,ex:'2 inteiros para cada usa 8. Sobram 3; cortando cada um em 4 são 12 quartos, 3 para cada amiga: 2 e 3/4.'},
 // 1 RODA-GIGANTE
 {s:1,ty:'rapid',tp:'equiv',q:'🎡 Esta fração é igual a <b>1/2</b>? Mande para a cabine certa!',bins:['✔ Igual a 1/2','✘ Diferente'],subs:['é a metade','não é a metade'],
  o:[['2/4',0],['2/8',1],['3/6',0],['2/6',1],['5/10',0],['3/4',1],['4/8',0],['6/12',0]],ex:'É metade quando o número de cima é a metade do de baixo: 3/6, 4/8, 6/12. Já 2/8 é igual a 1/4!'},
 {s:1,ty:'build',tp:'equiv',q:'Complete para as frações ficarem iguais:',parts:['1/2 = ','','/8      1/3 = ','','/6'],bank:['4','2','3','6','8'],ans:['4','2'],goTxt:'✓ Conferir',ex:'1/2 = 4/8 (metade de 8 é 4). 1/3 = 2/6 (cortando cada terço ao meio, viram 6 pedaços e 2 deles são o mesmo que 1/3).'},
 {s:1,ty:'num',tp:'equiv',q:'<b>3/6 = 1/?</b><br>Digite o número de baixo.',a:2,ex:'Divida em cima e embaixo por 3: 3/6 = 1/2.'},
 {s:1,ty:'memory',tp:'equiv',q:'🃏 Vire as cartas e junte cada desenho com a fração que vale o <b>mesmo</b>.',pairs:[[2,1,'4/8'],[3,1,'2/6'],[4,1,'2/8'],[3,2,'4/6'],[4,3,'6/8']],ex:'1/2 = 4/8 · 1/3 = 2/6 · 1/4 = 2/8 · 2/3 = 4/6 · 3/4 = 6/8.'},
 {s:1,ty:'tf',lb:VF,tp:'equiv',q:'<em>"A parte pintada desta pizza é a metade (1/2)."</em>'+pie(8,4),a:true,ex:'Verdade! 4 de 8 fatias é a metade: 4/8 = 1/2.'},
 {s:1,ty:'num',tp:'equiv',q:'<b>3 quadradinhos</b> são a <b>metade</b> de um chocolate. Quantos quadradinhos tem o chocolate inteiro?'+bar(3,3,'#8a4b2a',120),a:6,ex:'Se 3 é a metade, o inteiro é o dobro: 6 quadradinhos.'},
 {s:1,ty:'tf',lb:VF,tp:'equiv',q:'<em>"2/8 é igual a 3/6."</em>'+bar(8,2,'#8b6cf0')+bar(6,3,'#8b6cf0'),a:false,ex:'Mito! 2/8 = 1/4 e 3/6 = 1/2. Olhe as barras: os pedaços pintados têm tamanhos diferentes.'},
 {s:1,ty:'mc',tp:'repartir',q:'Um grupo disse: "cada um recebe <b>1 quadradinho e 3/6</b>". Que outro jeito diz a mesma coisa?',o:['1 quadradinho e 1/2','1 quadradinho e 1/3','1 quadradinho e 3/12','2 quadradinhos'],a:0,ex:'3/6 = 1/2 (divide em cima e embaixo por 3).'},
 // 2 PIPOCA
 {s:2,ty:'paint',e:'🍿',tp:'fracqtd',q:'🍿 Pinte <b>2/5</b> dos 15 saquinhos de pipoca.',n:15,a:6,ex:'15 ÷ 5 = 3 (cada quinto). 2/5 = 2 × 3 = 6.'},
 {s:2,ty:'num',tp:'fracqtd',q:'Quanto é <b>1/5 de 30</b> bolinhas?',a:6,ex:'30 ÷ 5 = 6. O 1 de cima não é o número de bolinhas!'},
 {s:2,ty:'num',tp:'fracqtd',q:'Quanto é <b>3/4 de 16</b> balas?',a:12,ex:'16 ÷ 4 = 4 (cada quarto). 3 × 4 = 12.'},
 {s:2,ty:'film',tp:'compara',q:'🍕 Coloque as fatias em ordem, da <b>MAIOR</b> para a <b>MENOR</b>.',o:['1/2','1/3','1/6','1/10'],slot:'🍕',slotTxt:'lugar',goTxt:'✓ Conferir',ex:'Com 1 em cima, quanto menor o número de baixo, maior o pedaço: 1/2 > 1/3 > 1/6 > 1/10.'},
 {s:2,ty:'tf',lb:VF,tp:'compara',q:'<em>"1/16 de um bolo é maior que 1/8 do mesmo bolo."</em>',a:false,ex:'Mito! Cortado em 16, cada pedaço fica menor do que cortado em 8.'},
 {s:2,ty:'mc',tp:'fracqtd',q:'Uma turma tem 28 alunos. <b>1/4</b> usa óculos. Quantos <b>NÃO</b> usam?',o:['21','7','4','24'],a:0,ex:'28 ÷ 4 = 7 usam óculos. 28 − 7 = 21 não usam.'},
 // 3 MONTANHA-RUSSA
 {s:3,ty:'rapid',tp:'divideia',q:'🎢 Qual ideia da divisão? Mande cada problema para o vagão certo!',bins:['🤝 Repartir','📦 Quantas cabem'],subs:['quanto cada um?','quantos grupos?'],
  o:[['96 adesivos para 8 amigas. Quanto cada uma?',0],['54 ovos em caixas de 6. Quantas caixas?',1],['R$ 120 divididos entre 4 irmãos.',0],['Fita de 60 cm em pedaços de 5 cm. Quantos pedaços?',1],['84 cartas para 7 jogadores.',0],['72 alunos em grupos de 9. Quantos grupos?',1]],ex:'"Quanto cada um" é repartir; "quantos grupos/caixas/pedaços" é ver quantas vezes cabe.'},
 {s:3,ty:'num',tp:'divestr',q:'Quanto é <b>258 ÷ 6</b>?<br><small>Dica: 240 ÷ 6 = 40 e 18 ÷ 6 = 3.</small>',a:43,ex:'Decompondo: 40 + 3 = 43. Confira: 43 × 6 = 258 ✔.'},
 {s:3,ty:'build',tp:'divestr',q:'<b>87 ÷ 3</b> em rodadas: na 1ª, cada um recebe 20 (usa 60 e sobram 27). Complete:',parts:['2ª rodada: cada um recebe ','','  →  87 ÷ 3 = ',''],bank:['9','7','29','27','30'],ans:['9','29'],goTxt:'✓ Conferir',ex:'27 ÷ 3 = 9. Total: 20 + 9 = 29.'},
 {s:3,ty:'num',tp:'divestr',q:'Quanto é <b>336 ÷ 14</b>?<br><small>Faça a colinha: 14 × 10 = 140, 14 × 20 = 280…</small>',a:24,ex:'14 × 20 = 280, sobram 56 = 14 × 4. Total 24.'},
 {s:3,ty:'num',tp:'resto',q:'Cada carrinho da montanha-russa leva <b>6 pessoas</b>. Quantos carrinhos são necessários para <b>45 pessoas</b>?',a:8,ex:'45 ÷ 6 = 7 e sobram 3. Essas 3 precisam de mais um carrinho: 8.'},
 {s:3,ty:'mc',tp:'resto',q:'Com <b>R$ 50</b>, quantos ingressos de <b>R$ 7</b> dá para comprar?',o:['7, e sobra R$ 1','8, e não sobra nada','6, e sobram R$ 8','7, e sobram R$ 7'],a:0,ex:'7 × 7 = 49. Sobra R$ 1, que não dá para outro ingresso.'},
 // 4 ESPELHOS
 {s:4,ty:'rapid',tp:'conferir',q:'🪞 Conta certa ou errada? <b>Confira</b> antes de mandar!',bins:['✔ Certa','✘ Errada'],subs:['confere','tem erro'],
  o:[['53 × 12 = 636',0],['1.000 − 347 = 763',1],['144 ÷ 12 = 12',0],['38 × 21 = 778',1],['2.500 − 1.375 = 1.125',0],['225 ÷ 15 = 16',1]],ex:'1.000 − 347 = 653 (confira: 653 + 347 = 1.000). 38 × 21 = 798. 225 ÷ 15 = 15 (15 × 15 = 225).'},
 {s:4,ty:'spot',tp:'mult',q:'🔍 O Leo fez <b>67 × 14</b>. Toque na <b>primeira</b> linha com erro.',o:['67 × 4 = 258','67 × 10 = 670','258 + 670 = 928'],a:0,ex:'67 × 4 = 268 (7 × 4 = 28, vai 2; 6 × 4 = 24 + 2 = 26). O certo é 268 + 670 = 938.'},
 {s:4,ty:'num',tp:'sub',q:'Quanto é <b>1.300 − 476</b>?<br><small>Depois confira somando!</small>',a:824,ex:'1.300 − 476 = 824. Confira: 824 + 476 = 1.300 ✔.'},
 {s:4,ty:'tf',lb:VF,tp:'conferir',q:'<em>"Para conferir se 405 ÷ 9 = 45, eu faço 45 × 9."</em>',a:true,ex:'Verdade! 45 × 9 = 405 ✔. A multiplicação confere a divisão.'},
 {s:4,ty:'spot',tp:'divestr',q:'🔍 A Gabi fez <b>406 ÷ 14</b>. Toque na linha com erro.',o:['14 × 20 = 280 → sobram 126','14 × 8 = 112 → sobram 14','Resposta: 28, resto 14'],a:1,ex:'Com 126, cabem 9 de 14 (126), não 8. Resto igual ao divisor é sinal de erro! Certo: 29, resto 0.'},
 {s:4,ty:'build',tp:'mult',q:'Complete sem armar a conta:',parts:['46 × 10 = ','','     46 × 100 = ',''],bank:['460','4.600','46.000','406'],ans:['460','4.600'],goTxt:'✓ Conferir',ex:'Vezes 10: acrescenta um zero (460). Vezes 100: dois zeros (4.600).'},
 {s:4,ty:'num',tp:'mult',q:'Quanto é <b>75 × 16</b>?',a:1200,ex:'75 × 6 = 450 e 75 × 10 = 750. 450 + 750 = 1.200.'},
 // 5 TREM-FANTASMA
 {s:5,ty:'num',tp:'prob',q:'O parque vendeu <b>26 pacotes</b> com <b>15 ingressos</b> cada. Quantos ingressos ao todo?',a:390,ex:'26 × 5 = 130 e 26 × 10 = 260. 130 + 260 = 390.'},
 {s:5,ty:'num',tp:'sub',q:'Desses <b>390 ingressos</b>, 125 eram de criança. Quantos eram de adulto?',a:265,ex:'390 − 125 = 265. Confira: 265 + 125 = 390 ✔.'},
 {s:5,ty:'mc',tp:'prob',q:'R$ 156 serão divididos igualmente entre <b>3 primos e 1 prima</b>. Quanto cada um recebe?',o:['R$ 39','R$ 52','R$ 40','R$ 156'],a:0,ex:'3 + 1 = 4 pessoas. 156 ÷ 4 = 39.'},
 {s:5,ty:'num',tp:'prob',q:'Um prédio tem <b>12 andares</b>. Cada andar tem <b>4 apartamentos</b>. Cada apartamento tem 3 quartos, 2 banheiros e 1 cozinha. Vão trocar a pia de <b>todas as cozinhas</b>. Quantas pias serão trocadas?',a:48,ex:'Só importa a cozinha (1 por apartamento). 12 × 4 = 48 apartamentos = 48 pias. Quartos e banheiros eram informação a mais!'},
 {s:5,ty:'num',tp:'fracqtd',q:'Quanto é <b>2/3 de 21</b> balões?',a:14,ex:'21 ÷ 3 = 7. 7 × 2 = 14.'},
 {s:5,ty:'num',tp:'prob',q:'Na festa da turma trouxeram <b>46 brigadeiros</b>, <b>38 beijinhos</b> e <b>36 cajuzinhos</b>. Tudo foi dividido igualmente em <b>6 pratos</b>. Quantos doces ficaram em cada prato?',a:20,ex:'Primeiro junta tudo: 46 + 38 + 36 = 120. Depois divide: 120 ÷ 6 = 20.'},
 {s:5,ty:'num',tp:'divestr',q:'Quanto é <b>448 ÷ 16</b>?',a:28,ex:'16 × 20 = 320, sobram 128 = 16 × 8. Total 28. Confira: 28 × 16 = 448 ✔.'},
 {s:5,ty:'tf',lb:VF,tp:'divestr',q:'<em>"Dividi por 16 e sobrou resto 16. A conta está certa."</em>',a:false,ex:'Mito! O resto nunca pode ser igual ou maior que o divisor. Ainda dava mais uma rodada.'}
];

const TOP={
 fracbase:{n:'Numerador, denominador e leitura',w:'🍕 Numerador e denominador · 🔤 Como se lê',t:'Denominador (embaixo) = em quantas partes iguais o inteiro foi dividido. Numerador (em cima) = quantas partes eu uso.'},
 repartir:{n:'Repartindo inteiros (chocolate)',w:'🍫 Repartindo inteiros',t:'Primeiro dê os inteiros; o que sobrar, corte em tantas partes iguais quantas forem as pessoas.'},
 equiv:{n:'Frações equivalentes',w:'⚖️ Frações equivalentes',t:'Multiplique ou divida em cima e embaixo pelo mesmo número. 3/6 = 1/2 (não 2/8!).'},
 fracqtd:{n:'Fração de uma quantidade',w:'🍬 Fração de uma quantidade',t:'Divida pelo número de baixo e multiplique pelo de cima. 2/5 de 30 → 30÷5=6 → 6×2=12.'},
 compara:{n:'Comparar frações',w:'🎂 Qual fração é maior?',t:'Com numerador 1, quanto maior o denominador, MENOR o pedaço: 1/8 > 1/16.'},
 divideia:{n:'Ideias da divisão',w:'🍪 As duas ideias da divisão',t:'"Quanto cada um" = repartir. "Quantos grupos/caixas" = quantas vezes cabe. As duas são divisão.'},
 divestr:{n:'Estratégias e algoritmo da divisão',w:'🚌 Estratégias · 🃏 Algoritmo por estimativa',t:'Faça a colinha do divisor (×1, ×2, ×5, ×10, ×20). O resto nunca pode ser maior ou igual ao divisor. Confira multiplicando.'},
 resto:{n:'O resto nos problemas',w:'🚐 O que fazer com o resto',t:'Às vezes o resto some (sobra dinheiro), às vezes precisa de mais 1 (mais uma van).'},
 mult:{n:'Multiplicação armada',w:'✖️ Multiplicação armada',t:'Multiplique pelas unidades, depois pelas dezenas (com o zero), e some. Cuidado com o "vai um".'},
 sub:{n:'Subtração com empréstimo',w:'➖ Subtração com empréstimo',t:'Quem empresta fica com 1 a menos. Confira somando o resultado com o número de baixo.'},
 prob:{n:'Problemas de vários passos',w:'🚐 O que fazer com o resto (dica dos 2 passos)',t:'Descubra o total primeiro (× ou +), depois tire ou reparta (− ou ÷). Leia de novo a pergunta antes de responder.'},
 conferir:{n:'Conferir as contas',w:'➖ Subtração (confira somando) · 🃏 Algoritmo da divisão (confira multiplicando)',t:'Subtração: confira somando. Divisão: multiplique o resultado pelo divisor e some o resto. Multiplicação: refaça por partes.'}};

JOGOS.push({id:'mat-p2-2026-parque',materia:'Matemática',prova:'P2 · 2º sem 2026',titulo:'Parque dos Números',ic:'🎡',cor:'#ffd28a',
  intro:'Pegue papel e lápis! Primeira parada: Carrossel das Frações 🎠',
  links:[{t:'📓 Roteiro de estudo',u:'roteiros/matematica-p2.html'},{t:'✏️ Treino de contas',u:'roteiros/treino-contas-p2.html'}],
  mapa:{sea:['#ffe9f4','#bfe3ff'],isl:['#fff6d8','#ffe3a3'],praia:'#ffffff',deco:['🎪','🎈','🍿','🎡','🍭','🎠']},
  boss:{nome:'Fantasminha Trapaceiro',fala:'Buuu! Troquei os números de todas as contas! 👻',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150"><ellipse cx="80" cy="142" rx="44" ry="6" fill="rgba(0,0,0,.25)"/><path d="M36 74 Q18 86 26 104 Q34 94 42 94Z M124 74 Q142 86 134 104 Q126 94 118 94Z" fill="#f3efff"/><path d="M36 128 L36 70 Q36 22 80 22 Q124 22 124 70 L124 128 Q114 118 104 128 Q94 138 84 128 Q74 118 64 128 Q54 138 46 128 Q41 122 36 128Z" fill="#f3efff"/><ellipse cx="64" cy="70" rx="9" ry="12" fill="#3a2850"/><ellipse cx="96" cy="70" rx="9" ry="12" fill="#3a2850"/><circle cx="67" cy="66" r="3" fill="#fff"/><circle cx="99" cy="66" r="3" fill="#fff"/><ellipse cx="80" cy="96" rx="10" ry="8" fill="#3a2850"/><ellipse cx="80" cy="99" rx="6" ry="4" fill="#ff8ec2"/><circle cx="52" cy="88" r="6" fill="#ff8ec2" opacity=".55"/><circle cx="108" cy="88" r="6" fill="#ff8ec2" opacity=".55"/><text x="114" y="40" font-size="22">➗</text></svg>`},
  ST,TOP,T});
})();
