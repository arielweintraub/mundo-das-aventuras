(function(){
/* Inglês (Language) P2 · 2º sem 2026 · 4º ano — Too Small Tola, vocabulary e grammar da tarjeta */
const TFQ=['TRUE','FALSE','WE DON’T KNOW YET'];
const TF=[[true,'✅','TRUE','t'],[false,'❌','FALSE','f']];
const RUA=`<span style="display:flex;justify-content:center;gap:6px;margin:8px 0;font:700 14px Nunito"><span style="background:#e1efff;border-radius:12px;padding:6px 10px;text-align:center"><span style="font-size:34px">🏦</span><br>bank</span><span style="background:#fff0d6;border-radius:12px;padding:6px 10px;text-align:center"><span style="font-size:34px">🥖</span><br>bakery</span><span style="background:#d9f7f1;border-radius:12px;padding:6px 10px;text-align:center"><span style="font-size:34px">🏫</span><br>school</span></span>`;

const ST=[
 {n:'Room and Parlor',ic:'🏠',cls:'st-mem',c:'#c0254f',l:'#ffe0e8',x:70,y:430,sub:'A casa e a família de Tola (p. 31–35)',bg:'linear-gradient(135deg,#c0254f,#ff8a6b)'},
 {n:'Ponto do Danfo',ic:'🚌',cls:'st-bus',c:'#d98a00',l:'#fff0d6',x:250,y:390,sub:'A manhã até a escola (p. 54–57)'},
 {n:'Mercado do Can',ic:'🛒',cls:'st-candy',c:'#e84a8a',l:'#ffe1ee',x:110,y:300,sub:'can e can’t'},
 {n:'Rua das Preposições',ic:'📍',cls:'st-signs',c:'#2a6fb5',l:'#e1efff',x:270,y:220,sub:'there is/are · in, on, at, under, next to…'},
 {n:'Ateliê das Palavras',ic:'🧵',cls:'st-runway',c:'#13a58b',l:'#d9f7f1',x:90,y:145,sub:'Vocabulary: ações, sentimentos, lugares'},
 {n:'Torre do Apagão',ic:'🦇',cls:'st-boss',c:'#4b3a8f',l:'#e9e4fb',x:240,y:60,sub:'because, but, so + revisão geral'}];

const TOP={
 casa:{n:'A casa de Tola',w:'🏠 A casa de Tola em Lagos',t:'Prédio velho (run-down) em Lagos; luz e água vão e voltam; um só cômodo dividido por uma cortina; uma cama; banheiro dividido com os vizinhos.'},
 familia:{n:'A família de Tola',w:'👵 A família de Tola',t:'Grandmommy vende amendoim 6 dias por semana; o pai trabalha no UK e paga o aluguel; Moji tem bolsa; Dapo dorme no colchonete e carrega os galões.'},
 manha:{n:'A manhã até a escola',w:'🚌 A manhã de Tola até a escola',t:'Banho de jarra → pão com sardinha → Dapo na escada → danfo amarelo → chamada na sala. Ela não chegou atrasada!'},
 sentir:{n:'Sentimentos das personagens',w:'💗 Sentimentos e características',t:'Diga o sentimento + o que aconteceu no livro que mostra isso.'},
 can:{n:'Can / can’t',w:'💪 Can / can’t',t:'can = consegue/pode · can’t = não consegue/não pode. Depois de can, verbo sem -s. Pergunta: Can + pessoa + ação? — Yes, she can.'},
 there:{n:'There is / there are',w:'🏘️ There is / there are',t:'there is + 1 coisa · there are + 2 ou mais.'},
 prepl:{n:'Preposições de lugar',w:'📍 Preposições de lugar e tempo',t:'in (dentro) · on (em cima) · under (embaixo) · next to (ao lado) · between (entre dois).'},
 prept:{n:'Preposições de tempo',w:'📍 Preposições de lugar e tempo',t:'in the morning · on Sunday · at 7 o’clock.'},
 vocab:{n:'Ações e sentimentos (Vocabulary Box)',w:'🏃 Ações e sentimentos',t:'carry, help, tease, spill, protect, struggle · worried, brave, strong, afraid, responsible, small.'},
 lugares:{n:'Lugares, rotina e descrever um lugar',w:'🏙️ Lugares da cidade e rotina',t:'Para descrever um lugar: sounds (o que ouço), smells (cheiros), colors, people e feelings.'},
 bordado:{n:'Bordado (embroidery)',w:'🧵 Meu bordado',t:'needle (agulha), thread (linha), fabric (tecido), stitch (ponto), shapes, colors, symbols.'},
 conect:{n:'because, but, so, even though',w:'🔗 Because, but, so',t:'because = porque (motivo) · but = mas (contraste) · so = então (consequência) · even though = mesmo que.'},
 lagos:{n:'Lagos e a história única',w:'🌍 Lagos e o perigo de uma história só',t:'Single story = achar que um lugar ou povo é uma coisa só. Lagos tem problemas, mas também famílias, escolas, amigos e alegria.'},
 escrita:{n:'Respostas completas',w:'✍️ Respostas completas e justificadas',t:'Frase completa em inglês + motivo (because) + exemplo do livro.'}};

const T=[
 // 0 ROOM AND PARLOR (p. 31–35)
 {s:0,ty:'mc',fixo:true,tp:'casa',q:'TRUE, FALSE or WE DON’T KNOW YET?<em>"Tola lives in a big house on Victoria Island."</em>',o:TFQ,a:1,ex:'FALSE. Tola mora num prédio velho (run-down block of apartments) em Lagos. Quem fala da casa grande em Victoria Island é o Dapo, reclamando.'},
 {s:0,ty:'mc',fixo:true,tp:'casa',q:'TRUE, FALSE or WE DON’T KNOW YET?<em>"Tola, Moji and Grandmommy share one bed."</em>',o:TFQ,a:0,ex:'TRUE. Só tem uma cama, e as três dividem. O Dapo dorme num colchonete (mat) no chão.'},
 {s:0,ty:'mc',fixo:true,tp:'familia',q:'TRUE, FALSE or WE DON’T KNOW YET?<em>"Grandmommy sells groundnuts on Sundays."</em>',o:TFQ,a:1,ex:'FALSE. Ela vende 6 dias por semana. No domingo ela folga para agradecer a Deus pelas bênçãos (blessings).'},
 {s:0,ty:'mc',fixo:true,tp:'familia',q:'TRUE, FALSE or WE DON’T KNOW YET?<em>"Tola’s father has a job in the UK."</em>',o:TFQ,a:0,ex:'TRUE. O pai tem um emprego seguro no UK e manda o dinheiro do aluguel.'},
 {s:0,ty:'mc',fixo:true,tp:'familia',q:'TRUE, FALSE or WE DON’T KNOW YET?<em>"Tola’s father will come back to Nigeria next year."</em>',o:TFQ,a:2,ex:'WE DON’T KNOW YET. O livro (até aqui) não fala nada sobre ele voltar. Quando o texto não diz, é "we don’t know yet".'},
 {s:0,ty:'mc',tp:'casa',q:'Why does Dapo sleep on a mat on the floor?',o:['Because he is a boy.','Because the bed is broken.','Because he likes the floor.','Because he is very tall.'],a:0,ex:'"Dapo cannot share it because he is a boy." Por isso ele dorme no chão.'},
 {s:0,ty:'mc',tp:'casa',q:'There is only one room. What divides it into two parts?',o:['a curtain','a wall','a door','a cupboard'],a:0,ex:'Uma cortina (curtain) separa a parte de dormir da parte de cozinhar, sentar e estudar: "room and parlor".'},
 {s:0,ty:'mc',tp:'familia',q:'Why are Grandmommy’s earrings so special?',o:['They belonged to the mothers of her family.','They are new and very cheap.','Tola bought them at the market.','They came from Victoria Island.'],a:0,ex:'Eram da mãe da mãe da mãe da mãe dela. Usando os brincos, ela sente as bênçãos dessas mães, e isso vale mais que o ouro.'},
 {s:0,ty:'mc',tp:'casa',q:'Why can’t Tola hear the ceiling fan?',o:['The electricity is off.','Dapo is snoring too loud.','The fan is in the bathroom.','She is wearing earphones.'],a:0,ex:'A luz caiu de novo (the electricity is off), então o ventilador parou.'},
 {s:0,ty:'tf',lb:TF,tp:'casa',q:'<em>"In the shared bathroom, Tola turns on the tap, but no water comes out."</em>',a:true,ex:'TRUE. Sem luz e agora sem água: Tola suspira (sighs) de novo.'},

 // 1 PONTO DO DANFO (p. 54–57)
 {s:1,ty:'film',tp:'manha',slot:'🚌',slotTxt:'passo',goTxt:'🚌 Partiu escola!',q:'🚌 A manhã da Tola ficou bagunçada! Coloque na ordem certa.',
  o:['Tola pours water over herself with a jug.','Moji leaves and says: bread and sardines on the table!','Tola eats some bread and sardines and rushes out.','On the stairs, she passes Dapo with the jerry cans.','She squeezes into a crowded yellow danfo.','The teacher calls her name… he is just taking attendance!'],
  ex:'Banho de jarra → Moji sai → pão com sardinha → Dapo na escada → danfo → chamada na sala.'},
 {s:1,ty:'mc',tp:'manha',q:'Complete:<em>"Moji’s uniform is ______. Tola’s uniform is ______."</em>',o:['smart and striped / plain and brown','plain and brown / smart and striped','old and green / new and blue','pink and white / plain and yellow'],a:0,ex:'Moji: smart white-and-blue striped uniform, gravata e sapatos brilhando. Tola: plain and brown, com chinelos velhos (flip-flops).'},
 {s:1,ty:'mc',tp:'familia',q:'Why does Moji go to a fancy school?',o:['She has a scholarship.','Grandmommy pays a lot.','Her father is a teacher there.','The school is next to her home.'],a:0,ex:'Moji tem bolsa de estudos (scholarship). Tola não tem.'},
 {s:1,ty:'mc',tp:'sentir',q:'Tola sees Dapo on the stairs with three jerry cans. She points to one can and then to her head. What does she want?',o:['To help him carry a can.','To ask him for some money.','To tease him about the water.','To play football with him.'],a:0,ex:'Ela está com a boca cheia, então aponta: quer ajudar a carregar (help / carry). Dapo responde: "Jus’ go!"'},
 {s:1,ty:'mc',tp:'sentir',q:'Why does Tola run all the way to school?',o:['She hates to be late, and math is in the morning.','She wants to buy more bread and sardines.','Dapo is chasing her down the street.','The danfo is broken and cannot move.'],a:0,ex:'Ela odeia se atrasar, e a matemática (a matéria favorita dela) é logo de manhã.'},
 {s:1,ty:'spot',tp:'manha',q:'🔎 Um passageiro do danfo contou a história errado. Qual frase <b>NÃO</b> combina com o livro?',o:['The danfo is yellow and rusty.','Tola looks at her watch on the bus.','The danfo is jammed with people.','Tola jumps off and runs up the street.'],a:1,ex:'Tola não tem relógio nem celular: ela não sabe se está atrasada.'},
 {s:1,ty:'mc',tp:'sentir',q:'The teacher calls: "Tola Adebayo!" How does Tola feel first?',o:['worried','bored','proud','sleepy'],a:0,ex:'Ela acha que está encrencada (in trouble): fica preocupada (worried). Depois sente alívio (relief): era só a chamada!'},
 {s:1,ty:'tf',lb:TF,tp:'sentir',q:'<em>"Dapo cares a lot about missing school."</em>',a:false,ex:'FALSE. Dapo não liga de perder aula; Tola liga. Ele fica chutando bola e olhando motor de carro.'},

 // 2 MERCADO DO CAN
 {s:2,ty:'build',tp:'can',goTxt:'🛒 Pagar!',q:'🛒 Complete com as palavras certas:',parts:['Fish ','',' swim, but they ','',' climb trees.'],bank:['can','can’t','is','are'],ans:['can','can’t'],ex:'Peixe consegue nadar (can), mas não consegue subir em árvore (can’t).'},
 {s:2,ty:'rapid',tp:'can',q:'🛒 Mande cada frase para a caixa certa!',bins:['✅ CAN','🚫 CAN’T'],subs:['consegue / pode','não consegue / não pode'],
  o:[['a bird → fly',0],['a baby → drive a car',1],['Dapo → share the bed',1],['Tola → squeeze into a danfo',0],['a cat → read a book',1],['a dog → run',0],['Tola → hear the fan (no electricity)',1],['Moji → go to a fancy school',0]],ex:'Can = é possível / consegue. Can’t = não dá.'},
 {s:2,ty:'mc',tp:'can',q:'How do we answer?<em>"Can Tola count money?"</em>',o:['Yes, she can.','Yes, she is.','Yes, she cans.','Yes, she does can.'],a:0,ex:'Pergunta com can, resposta com can: Yes, she can. / No, she can’t.'},
 {s:2,ty:'mc',tp:'can',q:'Which question is correct?',o:['Can you ride a bike?','You can ride a bike?','Can you rides a bike?','Do you can ride a bike?'],a:0,ex:'Can + pessoa + ação + ? → Can you ride a bike?'},
 {s:2,ty:'spot',tp:'can',q:'🔎 Uma frase do mercado está <b>errada</b>. Qual?',o:['She can swim.','He can’t sing.','We can help you.','They can plays football.'],a:3,ex:'Depois de can o verbo fica sem -s: They can play football.'},
 {s:2,ty:'build',tp:'can',goTxt:'🛒 Pagar!',q:'🛒 Complete:',parts:['Tola is small, but she ','',' run very fast. Dapo is asleep, so he ','',' hear Tola.'],bank:['can','can’t','cans','do'],ans:['can','can’t'],ex:'Ela consegue correr rápido (can); ele, dormindo, não consegue ouvir (can’t).'},
 {s:2,ty:'mc',tp:'can',q:'<em>"There is no electricity, so the children ______ watch TV."</em>',o:['can’t','can','cans','canning'],a:0,ex:'Sem luz não dá para ver TV: can’t.'},
 {s:2,ty:'tf',lb:TF,tp:'can',q:'<em>"Can’t" is the short form of "cannot".</em>',a:true,ex:'TRUE. can’t = cannot. No livro: "Dapo cannot share it".'},

 // 3 RUA DAS PREPOSIÇÕES
 {s:3,ty:'mc',tp:'prepl',q:'Look at the street:'+RUA+'<em>"The bakery is ______ the bank and the school."</em>',o:['between','under','on','in'],a:0,ex:'A padaria está no meio dos dois: between.'},
 {s:3,ty:'mc',tp:'prepl',q:'Look again:'+RUA+'<em>"The school is ______ the bakery."</em>',o:['next to','between','under','on'],a:0,ex:'A escola está ao lado da padaria: next to. (between precisa de duas coisas, uma de cada lado.)'},
 {s:3,ty:'build',tp:'prepl',goTxt:'📍 Conferir',q:'📍 Uma frase do livro. Complete:',parts:['Dapo sleeps ','',' a mat ','',' the floor.'],bank:['on','on','under','at'],ans:['on','on'],ex:'on = em cima: on a mat, on the floor.'},
 {s:3,ty:'mc',tp:'prepl',q:'<em>"When they shower, they put a bucket ______ the taps."</em>',o:['under','on','between','at'],a:0,ex:'O balde fica embaixo das torneiras: under the taps.'},
 {s:3,ty:'mc',tp:'prepl',q:'<em>"Moji says: There is bread ______ the table for you."</em>',o:['on','under','at','between'],a:0,ex:'Em cima da mesa: on the table.'},
 {s:3,ty:'mc',tp:'prept',q:'<em>"Teacher always does math ______ the morning."</em>',o:['in','on','at','under'],a:0,ex:'Partes do dia: in the morning / in the afternoon.'},
 {s:3,ty:'mc',tp:'prept',q:'<em>"Grandmommy does not work ______ Sundays."</em>',o:['on','in','at','between'],a:0,ex:'Dias da semana: on Sunday(s), on Monday.'},
 {s:3,ty:'mc',tp:'prept',q:'<em>"My school starts ______ 7 o’clock."</em>',o:['at','in','on','under'],a:0,ex:'Hora certa: at 7 o’clock.'},
 {s:3,ty:'build',tp:'there',goTxt:'📍 Conferir',q:'📍 Complete:',parts:['In my street, there ','',' a big park and there ','',' two bakeries.'],bank:['is','are','am','be'],ans:['is','are'],ex:'a big park = 1 → there is · two bakeries = 2 → there are.'},
 {s:3,ty:'spot',tp:'there',q:'🔎 Uma placa da rua está <b>errada</b>. Qual?',o:['There are a curtain in the room.','There are many danfos on the road.','There is a friend next to Tola.','There is only one bed in the room.'],a:0,ex:'a curtain = 1 coisa → There is a curtain in the room.'},

 // 4 ATELIÊ DAS PALAVRAS
 {s:4,ty:'memory',tp:'vocab',q:'🧵 Jogo da memória: ache cada palavra e o seu significado!',pairs:[{a:'worried',b:'preocupado'},{a:'brave',b:'corajoso'},{a:'afraid',b:'com medo'},{a:'responsible',b:'responsável'},{a:'strong',b:'forte'},{a:'small',b:'pequeno'}],ex:'Palavras da Vocabulary Box (feelings and characteristics).'},
 {s:4,ty:'rapid',tp:'vocab',q:'🧵 Ação ou sentimento/característica?',bins:['🏃 ACTION','💗 FEELING / TRAIT'],subs:['o que alguém faz','como alguém é ou se sente'],
  o:[['carry',0],['worried',1],['help',0],['brave',1],['spill',0],['afraid',1],['protect',0],['responsible',1],['struggle',0]],ex:'Ações: carry, help, tease, spill, protect, struggle.'},
 {s:4,ty:'mc',tp:'vocab',q:'Dapo carries heavy jerry cans of water up the stairs for the family. He is…',o:['responsible','lazy','afraid','bored'],a:0,ex:'Ele cuida de uma tarefa importante da família: responsible.'},
 {s:4,ty:'mc',tp:'vocab',q:'Some big kids laugh at a small boy and call him "Shorty". They ______ him.',o:['tease','protect','carry','help'],a:0,ex:'Zoar, provocar = tease.'},
 {s:4,ty:'mc',tp:'vocab',q:'Oops! Leo knocks over his cup and the juice goes all over the table. He ______ the juice.',o:['spills','carries','protects','teases'],a:0,ex:'Derramar = spill.'},
 {s:4,ty:'mc',tp:'vocab',q:'Nina tries and tries to open a very heavy door. She ______ with the door.',o:['struggles','spills','teases','sleeps'],a:0,ex:'Fazer muito esforço, ter dificuldade = struggle. (Tola "struggles into her uniform".)'},
 {s:4,ty:'mc',tp:'lugares',q:'Describing a place: which sentence tells a <b>SMELL</b>?',o:['The market smells of fresh bread.','The buses are yellow and rusty.','I can hear horns and people talking.','I feel happy and safe there.'],a:0,ex:'smell = cheiro. Os outros: colors, sounds e feelings.'},
 {s:4,ty:'mc',tp:'lugares',q:'Describing a place: which sentence tells a <b>SOUND</b>?',o:['I can hear horns and people talking.','The market smells of fresh bread.','The houses are blue and pink.','I feel calm when I am there.'],a:0,ex:'sound = som: o que eu ouço (I can hear…).'},
 {s:4,ty:'mc',tp:'lugares',q:'Where do you buy bread?',o:['at the bakery','at the hospital','at the library','at the bus stop'],a:0,ex:'bakery = padaria. library = biblioteca, bus stop = ponto de ônibus.'},
 {s:4,ty:'mc',tp:'lugares',q:'Which one is a <b>responsibility</b> at home?',o:['make my bed','watch cartoons','eat candy','play video games'],a:0,ex:'Responsabilidade = uma tarefa que eu tenho que fazer, como arrumar a cama.'},
 {s:4,ty:'mc',tp:'bordado',q:'🧵 To embroider, you need a ______ and colorful ______.',o:['needle / thread','hammer / nails','brush / paint','pencil / eraser'],a:0,ex:'needle = agulha · thread = linha.'},

 // 5 TORRE DO APAGÃO (chefão)
 {s:5,ty:'build',tp:'conect',goTxt:'💡 Acender!',q:'💡 Acenda a luz com a palavra certa:',parts:['Tola is hungry, ','',' she eats some bread and sardines.'],bank:['so','because','but'],ans:['so'],ex:'Consequência → so (então).'},
 {s:5,ty:'build',tp:'conect',goTxt:'💡 Acender!',q:'💡 Mais uma:',parts:['Tola runs to school ','',' she hates to be late.'],bank:['because','so','but'],ans:['because'],ex:'Motivo → because (porque).'},
 {s:5,ty:'build',tp:'conect',goTxt:'💡 Acender!',q:'💡 E agora:',parts:['Tola is small, ','',' she is mighty!'],bank:['but','so','because'],ans:['but'],ex:'Ideias opostas → but (mas). Small but mighty!'},
 {s:5,ty:'mc',tp:'conect',q:'<em>"______ Dapo is tired, he carries the jerry cans up the stairs."</em>',o:['Even though','Because','So','But'],a:0,ex:'Even though = mesmo que / apesar de. Ele está cansado e mesmo assim carrega.'},
 {s:5,ty:'mc',tp:'escrita',q:'TRUE or FALSE?<em>"Tola is brave because she is never afraid of anything."</em>',o:['FALSE: she feels worried sometimes, but she keeps going.','TRUE: Tola never feels worried or afraid at all.','TRUE: brave people never feel afraid of anything.'],a:0,ex:'Ser corajoso não é nunca ter medo: é ter medo e ir mesmo assim. Tola fica preocupada (worried), mas corre, entra no danfo cheio e quer ajudar o Dapo.'},
 {s:5,ty:'mc',tp:'lagos',q:'Which sentence is a <b>single story</b> about Lagos?',o:['Lagos is only a poor place with no water.','Lagos is a megacity with many people.','In Lagos there are yellow danfo buses.','Some people in Lagos live in big houses.'],a:0,ex:'"Only" mostra a história única: achar que Lagos é uma coisa só. No livro tem problemas, mas também família, escola, amigos e casas grandes.'},
 {s:5,ty:'spot',tp:'familia',q:'🦇 O Morcego Apagão bagunçou uma frase! Qual está <b>errada</b>?',o:['Tola’s favorite subject is math.','Moji has a scholarship.','Tola has a watch, so she knows the time.','Grandmommy works six days a week.'],a:2,ex:'Tola não tem relógio nem celular (no phone, not even a watch).'},
 {s:5,ty:'mc',tp:'escrita',q:'Which is a <b>complete answer</b> in English?',o:['Tola is responsible because she helps her family.','Responsible, help, family.','Tola responsible because help.','Because she help family.'],a:0,ex:'Resposta completa = frase inteira com quem + verbo + motivo (because).'},
 {s:5,ty:'tf',lb:TF,tp:'vocab',q:'<em>"Mighty" means very strong and powerful.</em>',a:true,ex:'TRUE. Small but Mighty = pequena, mas poderosa!'}
];

JOGOS.push({id:'ing-p2-2026',materia:'Inglês',prova:'P2 · 2º sem 2026',titulo:'Aventura em Lagos',ic:'🚌',cor:'#ffe08a',
  intro:'Escolha um lugar de Lagos para começar 🚌',
  links:[{t:'📓 Roteiro de estudo',u:'roteiros/ingles-p2.html'}],
  mapa:{sea:['#ffd98a','#f0a64a'],isl:['#b8f0a0','#7fd479'],praia:'#ffe7a8',deco:['🌴','🚌','🥜','☀️','🏠','🌴']},
  boss:{nome:'Morcego Apagão',fala:'Hehe! Apaguei a luz de Lagos! 🦇',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150">
  <path d="M48 78 Q20 40 2 62 Q14 70 10 84 Q24 80 28 94 Q40 86 52 96Z" fill="#6b4bb5"/><path d="M112 78 Q140 40 158 62 Q146 70 150 84 Q136 80 132 94 Q120 86 108 96Z" fill="#6b4bb5"/>
  <ellipse cx="80" cy="96" rx="34" ry="36" fill="#4b3a8f"/><ellipse cx="80" cy="104" rx="20" ry="22" fill="#8f7ad6"/>
  <circle cx="80" cy="58" r="30" fill="#4b3a8f"/>
  <path d="M56 40 L52 14 L70 32Z M104 40 L108 14 L90 32Z" fill="#4b3a8f"/><path d="M57 34 L55 22 L64 31Z M103 34 L105 22 L96 31Z" fill="#ff9ec7"/>
  <circle cx="69" cy="56" r="9" fill="#ffe14d"/><circle cx="91" cy="56" r="9" fill="#ffe14d"/><circle cx="70" cy="58" r="4" fill="#2a1d4a"/><circle cx="92" cy="58" r="4" fill="#2a1d4a"/>
  <path d="M68 74 q12 9 24 0" stroke="#2a1d4a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M73 75 l2 6 l2 -5 M83 76 l2 5 l2 -6" fill="#fff"/>
  <g transform="translate(118 104) rotate(20)"><circle cx="0" cy="0" r="11" fill="#cfd6e0"/><rect x="-5" y="9" width="10" height="9" rx="2" fill="#8a94a6"/><path d="M-4 -2 l8 4 M4 -2 l-8 4" stroke="#2a1d4a" stroke-width="2"/></g>
  <ellipse cx="66" cy="132" rx="9" ry="5" fill="#2a1d4a"/><ellipse cx="94" cy="132" rx="9" ry="5" fill="#2a1d4a"/></svg>`},
  ST,TOP,T});
})();
