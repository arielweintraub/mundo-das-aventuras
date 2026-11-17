(function(){
const ST=[
 {n:'Cinema da História',ic:'🎬',cls:'st-cinema',c:'#c0254f',l:'#ffe0e8',x:70,y:430,sub:'Momentos da ação'},
 {n:'Correio da Brígida',ic:'💌',cls:'st-mail',c:'#ff5fa2',l:'#ffe3ef',x:250,y:390,sub:'Kafka e a boneca viajante'},
 {n:'Fábrica de Verbos',ic:'⚙️',cls:'st-factory',c:'#f08c00',l:'#fff0d6',x:110,y:300,sub:'Conjugações, pessoa e tempo'},
 {n:'Desfile da Concordância',ic:'👗',cls:'st-runway',c:'#13a58b',l:'#d9f7f1',x:270,y:220,sub:'Gênero, número e verbo'},
 {n:'Caça aos Sinais',ic:'🔍',cls:'st-signs',c:'#2a6fb5',l:'#e1efff',x:90,y:145,sub:'Pontuação e parágrafos'},
 {n:'Castelo do Dragão',ic:'🐉',cls:'st-boss',c:'#7a3fb5',l:'#efe3fb',x:240,y:60,sub:'Acentuação + revisão geral'}];

const TOP={
 momentos:{n:'Os 4 momentos da ação',w:'🎢 Os 4 momentos de uma narrativa',t:'Situação inicial → conflito → clímax → desfecho. Nem toda história é contada na ordem (não linear).'},
 sitini:{n:'Situação inicial',w:'🏡 Situação inicial',t:'Começo calmo (equilíbrio) que apresenta personagens, espaço e tempo.'},
 conflito:{n:'Conflito',w:'⚡ Conflito e clímax',t:'O problema que quebra o equilíbrio e muda a situação.'},
 climax:{n:'Clímax',w:'⚡ Conflito e clímax',t:'O momento de MAIOR tensão ou emoção.'},
 desfecho:{n:'Desfecho',w:'🌈 Desfecho',t:'A solução ou conclusão do conflito.'},
 kafka:{n:'Kafka e a boneca viajante',w:'🧸 💌 💍 cards do livro',t:'Quem é quem, por que Kafka inventou as cartas e como a história termina.'},
 vsentido:{n:'O que os verbos indicam',w:'🏃‍♀️ Verbos e as conjugações',t:'Ação, acontecimento, estado ou fenômeno da natureza.'},
 vconj:{n:'Conjugações e finais dos verbos',w:'⏳ Presente x passado',t:'-AR: o/a/amos/am (presente) · ei/ou/amos/aram (passado). -ER: o/e/emos/em · i/eu/emos/eram.'},
 concord:{n:'Concordância nominal e verbal',w:'👯‍♀️ Concordância',t:'Artigo e adjetivo combinam com o substantivo; o verbo combina com quem faz a ação.'},
 pontua:{n:'Sinais de pontuação',w:'❗ Pontuação e parágrafos',t:'? pergunta · ! emoção · , lista · : anuncia fala · – começa a fala · . termina.'},
 paragrafo:{n:'Parágrafos',w:'❗ Pontuação e parágrafos',t:'Mudou a ideia ou o momento da história? Novo parágrafo.'},
 acento:{n:'Acentuação',w:'🎵 Acentuação',t:'´ aberto (café) · ^ fechado (você) · ~ nasal (mão). avó ≠ avô.'}};

const MOM=['🏡 Situação inicial','⚡ Conflito','🎢 Clímax','🌈 Desfecho'];
const T=[
 // 0 CINEMA
 {s:0,ty:'film',tp:'momentos',q:'🎬 O filme "A pipa da Nina" caiu e as cenas se misturaram! Monte na ordem certa.',
  o:['Todo domingo, Nina empinava sua pipa amarela no alto do morro com o irmão, Caio.',
     'Num domingo de vento forte, a linha arrebentou e a pipa voou para longe.',
     'Nina correu até a beira de um lago, onde a pipa ficou presa num galho fininho que balançava sobre a água…',
     'Caio subiu nos ombros de um amigo, alcançou a pipa e todos voltaram rindo. Agora Nina sempre leva linha extra.'],
  ex:'Situação inicial (domingo tranquilo) → conflito (linha arrebentou) → clímax (pipa presa sobre a água) → desfecho (pipa resgatada).'},
 {s:0,ty:'mc',tp:'sitini',q:'Que cena é esta?<em>"No reino das nuvens, o dragãozinho Bolinha passava os dias regando os jardins do céu."</em>',o:MOM,a:0,ex:'Apresenta personagem, lugar e rotina calma: situação inicial.'},
 {s:0,ty:'mc',tp:'conflito',q:'E esta?<em>"Um dia, Bolinha espirrou fogo sem querer e queimou o jardim da rainha."</em>',o:MOM,a:1,ex:'Surge o problema que muda tudo: conflito.'},
 {s:0,ty:'mc',tp:'climax',q:'E esta?<em>"A rainha mandou chamar Bolinha. Todos prenderam a respiração quando ela abriu a boca para falar…"</em>',o:MOM,a:2,ex:'Maior tensão: será que ele vai ser castigado? É o clímax.'},
 {s:0,ty:'mc',tp:'desfecho',q:'E a última?<em>"Ela sorriu e pediu que ele acendesse as lanternas da festa. Bolinha virou o guardião da luz do reino."</em>',o:MOM,a:3,ex:'O problema se resolve: desfecho.'},
 {s:0,ty:'mc',tp:'sitini',q:'Quais elementos a situação inicial apresenta?',o:['Título, autor e editora','Personagens, espaço e tempo','Problema, tensão e solução','Só o nome do personagem'],a:1,ex:'Personagens (quem), espaço (onde) e tempo (quando).'},
 {s:0,ty:'tf',tp:'conflito',q:'<em>"O conflito é o momento em que tudo está calmo e em equilíbrio."</em>',a:false,ex:'Falso! Calma e equilíbrio são da situação inicial. O conflito quebra esse equilíbrio.'},
 {s:0,ty:'mc',tp:'momentos',q:'Uma história começa mostrando o final e depois volta para contar o começo. Essa narrativa é…',o:['errada','não linear','sem conflito','sem personagens'],a:1,ex:'Quando os fatos não aparecem na ordem em que aconteceram, a narrativa é não linear.'},
 // 1 CORREIO
 {s:1,ty:'tf',tp:'kafka',q:'Carta verdadeira ou carta falsa?<em>"Franz Kafka era um escritor."</em>',a:true,ex:'Verdadeira: Kafka foi um escritor de verdade.'},
 {s:1,ty:'tf',tp:'kafka',q:'Carta verdadeira ou carta falsa?<em>"Kafka encontrou a boneca Brígida e devolveu para Elsi."</em>',a:false,ex:'Falsa! Ele não achou a boneca: inventou que ela tinha viajado.'},
 {s:1,ty:'tf',tp:'kafka',q:'Carta verdadeira ou carta falsa?<em>"Nas cartas, Brígida contava suas aventuras viajando pelo mundo."</em>',a:true,ex:'Verdadeira: cada carta contava um pedaço da viagem.'},
 {s:1,ty:'mc',tp:'kafka',q:'Qual "profissão" Kafka inventou para conversar com Elsi?',o:['Pintor de bonecas','Carteiro de bonecas','Piloto de avião','Professor de dança'],a:1,ex:'Ele disse que era carteiro de bonecas.'},
 {s:1,ty:'mc',tp:'sitini',q:'Na situação inicial do livro, onde Kafka e Elsi se encontram?',o:['Num parque de Berlim','Numa praia do Brasil','Num castelo','Numa estação de trem'],a:0,ex:'Espaço da situação inicial: um parque em Berlim.'},
 {s:1,ty:'mc',tp:'kafka',q:'O que a atitude de Kafka mostra sobre ele?',o:['Que não gostava de crianças','Que se importou com os sentimentos de Elsi','Que queria ficar com a boneca','Que estava com pressa'],a:1,ex:'Ele usou a imaginação para cuidar da tristeza de Elsi.'},
 {s:1,ty:'mc',tp:'desfecho',q:'Qual é o desfecho do livro?',o:['A boneca volta para a casa de Elsi','Brígida conta que vai se casar e se despede; Elsi fica feliz por ela','Kafka para de escrever no primeiro dia','Elsi descobre que era tudo mentira e chora'],a:1,ex:'Na última carta, Brígida se despede porque vai se casar.'},
 // 2 FÁBRICA
 {s:2,ty:'rapid',tp:'vconj',q:'⚙️ Os verbos estão chegando na esteira! Mande cada um para a caixa certa.',bins:['📦 -AR','📦 -ER'],subs:['1ª conjugação','2ª conjugação'],
  o:[['dançar',0],['correr',1],['estudar',0],['escrever',1],['viajar',0],['torcer',1],['morar',0],['perder',1]],ex:'Olhe só o final: -AR é 1ª conjugação, -ER é 2ª conjugação.'},
 {s:2,ty:'mc',tp:'vconj',q:'Qual final completa?<em>"Ontem eu estud___ para a prova."</em>',o:['-ou','-o','-ei','-aram'],a:2,ex:'Eu + passado (-AR) = -ei → estudei.'},
 {s:2,ty:'mc',tp:'vconj',q:'Qual final completa?<em>"No sábado, elas corr___ no parque."</em>',o:['-eu','-eram','-em','-emos'],a:1,ex:'Elas + passado (-ER) = -eram → correram.'},
 {s:2,ty:'mc',tp:'vconj',q:'Qual final completa?<em>"Todo dia ele escrev___ no diário."</em>',o:['-e','-eu','-i','-em'],a:0,ex:'"Todo dia" = presente. Ele + presente (-ER) = -e → escreve.'},
 {s:2,ty:'mc',tp:'vconj',q:'<em>"Eu ______ no recreio ontem." (brincar)</em>',o:['brincei','brinquei','brincou','brinco'],a:1,ex:'Para manter o som de "c" duro antes do E, troca por QU: brinquei.'},
 {s:2,ty:'mc',tp:'vsentido',q:'<em>"Trovejou a noite toda."</em> O verbo indica…',o:['ação','acontecimento','estado','fenômeno da natureza'],a:3,ex:'Trovejar, chover, ventar: fenômenos da natureza.'},
 {s:2,ty:'mc',tp:'vsentido',q:'<em>"A Ana ficou feliz com o presente."</em> O verbo "ficou" indica…',o:['ação','acontecimento','estado','fenômeno da natureza'],a:2,ex:'Ficar, estar, permanecer: estado.'},
 {s:2,ty:'mc',tp:'vsentido',q:'<em>"O campeonato aconteceu em julho."</em> O verbo indica…',o:['ação','acontecimento','estado','fenômeno da natureza'],a:1,ex:'Acontecer indica acontecimento.'},
 // 3 DESFILE
 {s:3,ty:'build',tp:'concord',q:'👗 Vista a frase com as palavras certas! Toque numa palavra para colocar no espaço.',parts:['',' gatinha ','',' dormiu no sofá.'],bank:['A','As','O','preguiçosa','preguiçosas','preguiçoso'],ans:['A','preguiçosa'],ex:'Feminino singular: A gatinha preguiçosa.'},
 {s:3,ty:'build',tp:'concord',q:'👗 Mais um look para a frase:',parts:['Os ','',' ','',' jogaram futebol.'],bank:['menino','meninos','animado','animados','animada'],ans:['meninos','animados'],ex:'Masculino plural: Os meninos animados.'},
 {s:3,ty:'build',tp:'concord',q:'👗 Agora o verbo:',parts:['As amigas ','',' pizza ontem.'],bank:['comeu','comeram','come','comemos'],ans:['comeram'],ex:'"As amigas" = elas. Elas comeram.'},
 {s:3,ty:'mc',tp:'concord',q:'Qual frase desfila SEM erro?',o:['Os pássaros cantou cedo.','Os pássaros cantaram cedo.','O pássaros cantaram cedo.','Os pássaro cantaram cedo.'],a:1,ex:'Tudo no plural: Os pássaros cantaram.'},
 {s:3,ty:'mc',tp:'concord',q:'<em>"Meu irmão e eu ______ ao cinema."</em>',o:['foi','foram','fomos','vou'],a:2,ex:'"Meu irmão e eu" = nós. Nós fomos.'},
 {s:3,ty:'mc',tp:'concord',q:'<em>"A família inteira ______ para a praia."</em>',o:['viajou','viajaram','viajamos','viajei'],a:0,ex:'"A família" é uma palavra no singular: a família viajou.'},
 // 4 SINAIS
 {s:4,ty:'key',tp:'pontua',q:'<em>"Quantos anos você tem__"</em>',a:'?',ex:'É uma pergunta: interrogação.'},
 {s:4,ty:'key',tp:'pontua',q:'<em>"Que dia lindo__"</em>',a:'!',ex:'Mostra emoção: exclamação.'},
 {s:4,ty:'key',tp:'pontua',q:'<em>"Na mala levei boné__ protetor solar e óculos."</em>',a:',',ex:'Vírgula separa os itens da lista.'},
 {s:4,ty:'key',tp:'pontua',q:'<em>"Lá do alto da árvore, o galo gritou__"</em>(na linha de baixo vem a fala dele)',a:':',ex:'Os dois-pontos anunciam a fala.'},
 {s:4,ty:'key',tp:'paragrafo',q:'Qual sinal começa a fala?<em>"__ Já estou descendo! – disse o galo."</em>',a:'–',ex:'No diálogo, a fala começa com travessão.'},
 {s:4,ty:'key',tp:'pontua',q:'<em>"A festa acabou bem tarde__"</em>',a:'.',ex:'Frase que só informa termina com ponto final.'},
 {s:4,ty:'mc',tp:'paragrafo',q:'Terminei de escrever a situação inicial e agora vou contar o conflito. O que faço?',o:['Continuo na mesma linha','Começo um novo parágrafo','Apago tudo','Escrevo só com letra maiúscula'],a:1,ex:'Mudou o momento da história, mude de parágrafo.'},
 // 5 DRAGÃO
 {s:5,ty:'mc',tp:'acento',q:'Qual palavra está escrita certinha?',o:['lampada','lâmpada','lãmpada','lámpada'],a:1,ex:'Lâmpada: circunflexo.'},
 {s:5,ty:'mc',tp:'acento',q:'Qual palavra está escrita certinha?',o:['passaro','pâssaro','pássaro','pássáro'],a:2,ex:'Pássaro: acento agudo no "á".'},
 {s:5,ty:'mc',tp:'acento',q:'Qual palavra está escrita certinha?',o:['mamae','mamâe','mamáe','mamãe'],a:3,ex:'Mamãe: til, som nasal.'},
 {s:5,ty:'mc',tp:'acento',q:'<em>"A mãe do meu pai é a minha ______."</em>',o:['avô','avó','avo','avõ'],a:1,ex:'Avó (aberto, ´) é a vovó.'},
 {s:5,ty:'mc',tp:'acento',q:'Qual sinal deixa o som FECHADO, como em "você"?',o:['acento agudo (´)','acento circunflexo (^)','til (~)','vírgula'],a:1,ex:'Circunflexo = som fechado: você, avô, ônibus.'},
 {s:5,ty:'mc',tp:'acento',q:'Qual palavra está escrita certinha?',o:['onibus','ónibus','ônibus','ônibús'],a:2,ex:'Ônibus: circunflexo.'},
 {s:5,ty:'mc',tp:'climax',q:'Revisão relâmpago: o clímax é…',o:['o momento de maior tensão ou emoção','o começo calmo','a lista de personagens','o título'],a:0,ex:'Clímax = pico de tensão.'},
 {s:5,ty:'mc',tp:'kafka',q:'Revisão relâmpago: Kafka escrevia as cartas como se fosse…',o:['a mãe de Elsi','a boneca Brígida','um carteiro de verdade','a professora'],a:1,ex:'As cartas eram "da Brígida".'}
];


T.forEach(t=>{if(t.ty==='mc'&&(t.o===MOM||t.o.length===2||t.o[0]==='ação'))t.fixo=true;});
JOGOS.push({id:'lp-p2-2026',materia:'Português',prova:'P2 · 2º sem 2026',titulo:'Ilha das Palavras',ic:'🏝️',cor:'#b9e6ff',
  intro:'Primeira parada: Cinema da História 🎬',
  links:[{t:'📓 Roteiro de estudo',u:'roteiros/portugues-p2.html'}],
  mapa:{sea:['#8fe3ff','#4fb6e8'],isl:['#b8f0a0','#7fd479'],praia:'#ffe7a8',deco:['🌴','🌴','🌷','🍄','🌸','🐚']},
  boss:{nome:'Dragão Bagunça',fala:'Rá! Ninguém sabe acentuar! 😈',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150">
  <path d="M40 70 L5 40 L30 80 L0 90 L38 92Z" fill="#ff8ec2"/><path d="M120 70 L155 40 L130 80 L160 90 L122 92Z" fill="#ff8ec2"/>
  <ellipse cx="80" cy="100" rx="45" ry="40" fill="#5fd38d"/><ellipse cx="80" cy="110" rx="28" ry="26" fill="#c9f5d6"/>
  <path d="M120 120 q30 10 30 -15" stroke="#5fd38d" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="80" cy="55" r="34" fill="#5fd38d"/>
  <path d="M58 30 L52 8 L68 26Z M102 30 L108 8 L92 26Z" fill="#ffbf2e"/>
  <circle cx="68" cy="52" r="9" fill="#fff"/><circle cx="92" cy="52" r="9" fill="#fff"/><circle cx="70" cy="54" r="4.5" fill="#3a2850"/><circle cx="94" cy="54" r="4.5" fill="#3a2850"/>
  <path d="M60 42 l14 4 M100 42 l-14 4" stroke="#3a2850" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="80" cy="70" rx="14" ry="8" fill="#43b874"/><circle cx="75" cy="69" r="2" fill="#2a7a4c"/><circle cx="85" cy="69" r="2" fill="#2a7a4c"/>
  <path d="M68 80 q12 8 24 0" stroke="#3a2850" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M74 81 l2 5 l2 -4 M84 81 l2 4 l2 -5" fill="#fff"/>
  <ellipse cx="60" cy="138" rx="12" ry="6" fill="#43b874"/><ellipse cx="100" cy="138" rx="12" ry="6" fill="#43b874"/></svg>`},
  ST,TOP,T});
})();
