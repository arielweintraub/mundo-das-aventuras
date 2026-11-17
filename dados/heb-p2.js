(function(){
/* Hebraico P2 · 4º ano C · Nossa rotina — revisão de manutenção, presa às fichas */
if(!document.getElementById('heb-css')){
  const lk=document.createElement('link');lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@500;700;800&display=swap';document.head.appendChild(lk);
  const st=document.createElement('style');st.id='heb-css';st.textContent=`
.he{font-family:"Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif}
bdi.he{font-weight:800;font-size:1.12em}
.qtext em.he{direction:rtl;text-align:right;border-left:0;border-right:5px solid var(--c);font:700 23px/1.75 "Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif}
.qtext em.he.txt{font-size:19px;line-height:1.8}
.qtext .big{display:block;font-size:46px;text-align:center;line-height:1.2;margin:4px 0}
#qbox:has(.rtlq) #ans{direction:rtl}
#qbox:has(.rtlq) .opt{text-align:right;font:700 21px/1.5 "Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif}
#qbox:has(.rtlq) .frame{text-align:right;font:700 18px/1.5 "Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif;padding:10px 44px 10px 12px}
#qbox:has(.rtlq) .frame::before{left:auto;right:10px}
#qbox:has(.rtlq) .slot span{display:none}
#qbox:has(.rtlq) .slot{font:700 17px/1.5 "Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif}
#qbox:has(.rtlq) .sent,#qbox:has(.rtlq) .wchip{font-family:"Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif;font-size:22px}
#qbox:has(.rtlq) .box{font:800 32px "Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif;white-space:nowrap}
#qbox:has(.rtlq) .bk{font-family:"Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif}
#qbox:has(.rtlq) .env{font-family:"Noto Sans Hebrew","Arial Hebrew",Arial,sans-serif;font-size:22px}
.toast p bdi.he{font-size:1.15em}`;
  document.head.appendChild(st);
}
/* resposta certa no aviso: isola o hebraico para não embaralhar com o português */
window.addEventListener('DOMContentLoaded',()=>{if(window.__hebAns||typeof ansText!=='function')return;window.__hebAns=1;const _a=ansText;window.ansText=function(t){const r=_a(t);return typeof r==='string'&&/[\u0590-\u05FF]/.test(r)?'\u2068'+r+'\u2069':r;};});
const H=s=>`<em class="he" dir="rtl">${s}</em>`;      // bloco em hebraico
const TX=s=>`<em class="he txt" dir="rtl">${s}</em>`;  // texto longo
const h=s=>`<bdi class="he">${s}</bdi>`;              // hebraico no meio do português
const R='<i class="rtlq"></i>';                       // respostas em hebraico (da direita p/ esquerda)
const BIG=s=>`<span class="big">${s}</span>`;
const TF=[[true,'✅','נָכוֹן','t'],[false,'❌','לֹא נָכוֹן','f']];

const YON=TX('<b>הַבֹּקֶר שֶׁל יוֹנָתָן</b><br>בַּבֹּקֶר אֲנִי קָם בְּשָׁעָה שֵׁשׁ.<br>אֲנִי לוֹבֵשׁ חֻלְצָה וּמִכְנָסַיִם.<br>בַּאֲרוּחַת בֹּקֶר אֲנִי אוֹכֵל לֶחֶם עִם גְּבִינָה וְשׁוֹתֶה קָפֶה.<br>אֲנִי שָׂם בְּתוֹךְ הַתִּיק בַּקְבּוּק מַיִם, חֲטִיף וּבָנָנָה.<br>אֲנִי יוֹרֵד בַּמַּדְרֵגוֹת לְקוֹמָה אֶפֶס, וְהוֹלֵךְ לְבֵית הַסֵּפֶר בְּשָׁעָה שֶׁבַע.<br>אֲנִי חוֹזֵר הַבַּיְתָה בְּשָׁעָה אַרְבַּע.');
const FER=TX('<b>הַשִּׁגְרָה שֶׁל פֶרְנַנְדָּה</b><br>בַּבֹּקֶר אֲנִי קָמָה בְּשָׁעָה שֵׁשׁ.<br>אֲנִי לוֹבֶשֶׁת מִכְנָס אָרֹךְ וְחֻלְצָה.<br>בַּאֲרוּחַת בֹּקֶר אֲנִי אוֹכֶלֶת יוֹגוּרְט.<br>בַּתִּיק שֶׁלִּי יֵשׁ בַּקְבּוּק מַיִם וְעִפָּרוֹן.<br>אֲנִי הוֹלֶכֶת לְלַמֵּד בְּבֵית סֵפֶר בְּשָׁעָה שֵׁשׁ וָחֵצִי.<br>אֲנִי חוֹזֶרֶת הַבַּיְתָה אַחֲרֵי הַשִּׁעוּרִים שֶׁלִּי.');
const NOA=TX('<b>הַשִּׁגְרָה שֶׁל נוֹעָה</b><br>אֲנִי קָמָה בְּשֵׁשׁ בַּבֹּקֶר.<br>אֲנִי שׁוֹתָה קָפֶה וְאוֹכֶלֶת עוּגָה.<br>אֲנִי מְלַמֶּדֶת עִבְרִית בְּשִׁעוּר.<br>וְאַחֲרֵי בֵּית הַסֵּפֶר אֲנִי הוֹלֶכֶת לַחֲדַר כֹּשֶׁר.<br>אֲנִי מְכִינָה אֲרוּחַת עֶרֶב.<br>אֲנִי הוֹלֶכֶת לִישֹׁן בְּעֶשֶׂר בַּלַּיְלָה.');

const ST=[
 {n:'Quarto do Despertador',ic:'🛏️',cls:'st-mem',c:'#2a6fb5',l:'#e1efff',x:70,y:430,sub:'Roupas, mochila e café da manhã',bg:'linear-gradient(135deg,#4f8fe0,#8fc2ff)'},
 {n:'Varal dos Verbos',ic:'🧺',cls:'st-candy',c:'#e84a8a',l:'#ffe1ee',x:250,y:390,sub:'ele, ela, eles, elas e eu',bg:'linear-gradient(135deg,#ff6f9f,#ffb36b)'},
 {n:'Torre do Relógio',ic:'🕰️',cls:'st-bus',c:'#c0254f',l:'#ffe0e8',x:110,y:300,sub:'As horas por extenso',bg:'linear-gradient(135deg,#c0254f,#ff8a6b)'},
 {n:'Biblioteca dos Textos',ic:'📚',cls:'st-mail',c:'#7a3fb5',l:'#efe3fb',x:270,y:220,sub:'Yonatan e Fernanda',bg:'linear-gradient(135deg,#7a3fb5,#c58bff)'},
 {n:'Teatro da Noa',ic:'🎭',cls:'st-cinema',c:'#13a58b',l:'#d9f7f1',x:90,y:145,sub:'A rotina da Noa e as cenas',bg:'linear-gradient(135deg,#13a58b,#7fe0c4)'},
 {n:'Caverna do Dorminhoco',ic:'😴',cls:'st-boss',c:'#4b3a8f',l:'#e9e4fb',x:240,y:60,sub:'Revisão geral'}];

const TOP={
 roupa:{n:'Roupas (מָה לוֹבְשִׁים?)',w:'👕 O que vestimos?',t:'מַדִּים uniforme · חֻלְצָה camiseta · מִכְנָסַיִם calça · שִׂמְלָה vestido · מִכְנָסַיִם קְצָרִים bermuda · חֲצָאִית saia.'},
 mochila:{n:'Mochila (מָה שָׂמִים בַּתִּיק?)',w:'🎒 Mochila e café da manhã',t:'קַלְמָר estojo · סֵפֶר livro · מַחְבֶּרֶת caderno · בַּקְבּוּק מַיִם garrafa de água · עִפָּרוֹן lápis.'},
 comida:{n:'Café da manhã (מָה אוֹכְלִים?)',w:'🎒 Mochila e café da manhã',t:'דְּגָנִים cereal · לֶחֶם pão · חֲבִיתָה omelete · גְּבִינָה queijo · וָפֶל waffle.'},
 faz:{n:'Banho e dentes (מָה עוֹשִׂים?)',w:'🚿 O que fazemos?',t:'Menino: מִתְקַלֵּחַ, מְצַחְצֵחַ שִׁנַּיִם. Menina: מִתְקַלַּחַת, מְצַחְצַחַת שִׁנַּיִם.'},
 ela:{n:'Verbo de ele × ela',w:'⏰ Os verbos da manhã',t:'Ela termina em ה ou ת: קָמָה, לוֹבֶשֶׁת, אוֹכֶלֶת, שׁוֹתָה, שָׂמָה, הוֹלֶכֶת.'},
 plural:{n:'Verbo de eles × elas',w:'👥 A regra de ouro',t:'Eles termina em ים (קָמִים). Elas termina em וֹת (קָמוֹת). Grupo misto usa eles.'},
 eu:{n:'Eu, menina (אֲנִי)',w:'✍️ A minha manhã',t:'Menina escreve com a forma de ela: אֲנִי קָמָה, אֲנִי לוֹבֶשֶׁת.'},
 horas:{n:'As horas',w:'🕖 As horas',t:'בְּשָׁעָה + número por extenso: שֵׁשׁ, שֶׁבַע, אַרְבַּע, עֶשֶׂר. E meia = וָחֵצִי.'},
 yonatan:{n:'Texto do Yonatan',w:'👦 A manhã do Yonatan',t:'Levanta às 6, pão com queijo e café, mochila com água, salgadinho e banana, escola às 7, volta às 4.'},
 fernanda:{n:'Texto da Fernanda',w:'👩‍🏫 A rotina da Fernanda',t:'Levanta às 6, calça comprida e camiseta, iogurte, água e lápis, ensina às 6h30.'},
 noa:{n:'Texto da Noa',w:'🏋️‍♀️ A rotina da Noa',t:'Levanta → café e bolo → ensina hebraico → academia → jantar → dormir às 10.'},
 escola:{n:'Onde? Escola × aula',w:'🏋️‍♀️ A rotina da Noa (pegadinha)',t:'אֵיפֹה? pede um LUGAR: בְּבֵית הַסֵּפֶר. שִׁעוּר é a aula, não o lugar.'},
 imagem:{n:'Descrever a imagem',w:'🎤 Verbos para descrever uma imagem',t:'Quem? + verbo na forma de quem faz + o quê: מִיכַל שׁוֹמַעַת מוּזִיקָה.'},
 pontinho:{n:'שָׁר (canta) × שָׂם (coloca)',w:'🎤 Pegadinha do pontinho',t:'שָׁר: pontinho à direita. שָׂם: pontinho à esquerda.'}};

const T=[
 // 0 · QUARTO DO DESPERTADOR — vocabulário
 {s:0,ty:'mc',tp:'roupa',q:'Qual é a palavra?'+BIG('👕')+'camiseta'+R,o:['חֻלְצָה','שִׂמְלָה','חֲצָאִית','מַדִּים'],a:0,ex:'Camiseta = '+h('חֻלְצָה')+'.'},
 {s:0,ty:'mc',tp:'roupa',q:'Qual é a palavra?'+BIG('🩳')+'bermuda'+R,o:['מִכְנָסַיִם קְצָרִים','מִכְנָסַיִם','חֲצָאִית','חֻלְצָה'],a:0,ex:'Bermuda = '+h('מִכְנָסַיִם קְצָרִים')+' (calça curta).'},
 {s:0,ty:'mc',tp:'roupa',q:'O que é?'+H('חֲצָאִית'),o:['saia 🩰','vestido 👗','calça 👖','uniforme 🎽'],a:0,ex:h('חֲצָאִית')+' = saia. Vestido é '+h('שִׂמְלָה')+'.'},
 {s:0,ty:'rapid',tp:'mochila',q:'🎒 A esteira está trazendo coisas! Vai para a mochila ou é para comer?'+R,bins:['🎒','🍽️'],subs:['mochila','comida'],
  o:[['קַלְמָר',0],['לֶחֶם',1],['מַחְבֶּרֶת',0],['גְּבִינָה',1],['סֵפֶר',0],['דְּגָנִים',1],['עִפָּרוֹן',0],['חֲבִיתָה',1]],ex:'Mochila: קַלְמָר, מַחְבֶּרֶת, סֵפֶר, עִפָּרוֹן. Comida: לֶחֶם, גְּבִינָה, דְּגָנִים, חֲבִיתָה.'},
 {s:0,ty:'mc',tp:'comida',q:'Qual é a palavra?'+BIG('🧇')+'waffle'+R,o:['וָפֶל','חֲבִיתָה','לֶחֶם','דְּגָנִים'],a:0,ex:'Waffle = '+h('וָפֶל')+'. Omelete é '+h('חֲבִיתָה')+'.'},
 {s:0,ty:'mc',tp:'comida',q:'Qual é a palavra?'+BIG('🍳')+'omelete'+R,o:['חֲבִיתָה','גְּבִינָה','וָפֶל','עוּגָה'],a:0,ex:'Omelete = '+h('חֲבִיתָה')+'.'},
 {s:0,ty:'mc',tp:'mochila',q:'O que é?'+H('קַלְמָר'),o:['estojo','lápis','caderno','livro'],a:0,ex:h('קַלְמָר')+' = estojo. Lápis é '+h('עִפָּרוֹן')+'.'},
 {s:0,ty:'mc',tp:'faz',q:'🚿 Como se diz "ela toma banho"?'+R,o:['הִיא מִתְקַלַּחַת','הוּא מִתְקַלֵּחַ','הִיא מְצַחְצַחַת שִׁנַּיִם','הִיא לוֹבֶשֶׁת'],a:0,ex:'Ela toma banho = '+h('הִיא מִתְקַלַּחַת')+' (menina termina em ת).'},
 {s:0,ty:'mc',tp:'faz',q:'🪥 O menino escova os dentes:'+R,o:['הַיֶּלֶד מְצַחְצֵחַ שִׁנַּיִם','הַיֶּלֶד מְצַחְצַחַת שִׁנַּיִם','הַיֶּלֶד מִתְקַלֵּחַ','הַיֶּלֶד לוֹבֵשׁ מַדִּים'],a:0,ex:'Menino: '+h('מְצַחְצֵחַ שִׁנַּיִם')+'. A forma '+h('מְצַחְצַחַת')+' é de menina.'},

 // 1 · VARAL DOS VERBOS — ele, ela, eles, elas, eu
 {s:1,ty:'mc',tp:'ela',q:'Complete:'+H('הִיא ___ בְּשָׁעָה שֵׁשׁ.')+R,o:['קָמָה','קָם','קָמִים','קָמוֹת'],a:0,ex:h('הִיא')+' (ela) → '+h('קָמָה')+'.'},
 {s:1,ty:'mc',tp:'plural',q:'Complete:'+H('הֵם ___ לֶחֶם.')+R,o:['אוֹכְלִים','אוֹכֵל','אוֹכֶלֶת','אוֹכְלוֹת'],a:0,ex:h('הֵם')+' (eles) → termina em '+h('ים')+': '+h('אוֹכְלִים')+'.'},
 {s:1,ty:'mc',tp:'plural',q:'Complete:'+H('הֵן ___ לְבֵית הַסֵּפֶר.')+R,o:['הוֹלְכוֹת','הוֹלְכִים','הוֹלֶכֶת','הוֹלֵךְ'],a:0,ex:h('הֵן')+' (elas) → termina em '+h('וֹת')+': '+h('הוֹלְכוֹת')+'.'},
 {s:1,ty:'rapid',tp:'ela',q:'🧺 Pendure cada verbo no varal certo: ele ou ela?'+R,bins:['👦 הוּא','👧 הִיא'],subs:['ele','ela'],
  o:[['לוֹבֵשׁ',0],['לוֹבֶשֶׁת',1],['שׁוֹתָה',1],['שָׂם',0],['אוֹכֶלֶת',1],['הוֹלֵךְ',0],['קָמָה',1],['שׁוֹתֶה',0]],ex:'Ela termina em ה ou ת. Cuidado: שׁוֹתֶה (ele) e שׁוֹתָה (ela) só mudam a vogal embaixo.'},
 {s:1,ty:'mc',tp:'ela',q:'Complete:'+BIG('👧🥤')+H('הִיא ___ מַיִם.')+R,o:['שׁוֹתָה','שׁוֹתֶה','שׁוֹתִים','שׁוֹתֶת'],a:0,ex:'Pegadinha da ficha: ela bebe é '+h('שׁוֹתָה')+', termina em '+h('ה')+' e não em '+h('ת')+'.'},
 {s:1,ty:'mc',tp:'ela',q:'Só uma frase está certinha. Qual?'+R,o:['הִיא לוֹבֶשֶׁת שִׂמְלָה.','הִיא לוֹבֵשׁ שִׂמְלָה.','הֵם לוֹבֶשֶׁת מַדִּים.','הֵן לוֹבְשִׁים חֻלְצָה.'],a:0,ex:h('הִיא')+' + '+h('לוֹבֶשֶׁת')+'. O verbo combina com quem faz.'},
 {s:1,ty:'build',tp:'plural',q:'Toque na palavra certa para completar a frase:'+BIG('👧👧📕🎒')+R,parts:['הַבָּנוֹת ','',' סֵפֶר בַּתִּיק.'],bank:['שָׂמוֹת','שָׂמִים','שָׂמָה'],ans:['שָׂמוֹת'],goTxt:'✅ Conferir',ex:'As meninas = elas → '+h('שָׂמוֹת')+'.'},
 {s:1,ty:'mc',tp:'plural',q:'Meninos e meninas juntos (grupo misto):'+H('הַיְּלָדִים ___ לְבֵית הַסֵּפֶר.')+R,o:['הוֹלְכִים','הוֹלְכוֹת','הוֹלֶכֶת','הוֹלֵךְ'],a:0,ex:'Grupo misto usa a forma de eles: '+h('הַיְּלָדִים הוֹלְכִים')+'.'},
 {s:1,ty:'mc',tp:'eu',q:'Você é menina. Complete sobre você:'+H('אֲנִי ___ חֻלְצָה.')+R,o:['לוֹבֶשֶׁת','לוֹבֵשׁ','לוֹבְשִׁים','לוֹבְשׁוֹת'],a:0,ex:'Menina usa a forma de ela: '+h('אֲנִי לוֹבֶשֶׁת')+'.'},

 // 2 · TORRE DO RELÓGIO — horas
 {s:2,ty:'mc',tp:'horas',q:'Como se escreve?'+BIG('⏰ 06:00')+R,o:['בְּשָׁעָה שֵׁשׁ','בְּשָׁעָה שֶׁבַע','בְּשָׁעָה אַרְבַּע','בְּשָׁעָה עֶשֶׂר'],a:0,ex:'6 = '+h('שֵׁשׁ')+'.'},
 {s:2,ty:'mc',tp:'horas',q:'Como se escreve?'+BIG('⏰ 07:00')+R,o:['בְּשָׁעָה שֶׁבַע','בְּשָׁעָה שֵׁשׁ','בְּשָׁעָה עֶשֶׂר','בְּשָׁעָה אַרְבַּע'],a:0,ex:'7 = '+h('שֶׁבַע')+'. Cuidado: '+h('שֵׁשׁ')+' (6) e '+h('שֶׁבַע')+' (7) começam com a mesma letra.'},
 {s:2,ty:'mc',tp:'horas',q:'Como se escreve?'+BIG('⏰ 06:30')+R,o:['בְּשָׁעָה שֵׁשׁ וָחֵצִי','בְּשָׁעָה שֵׁשׁ','בְּשָׁעָה שֶׁבַע וָחֵצִי','בְּשָׁעָה שֶׁבַע'],a:0,ex:'E meia = '+h('וָחֵצִי')+': '+h('שֵׁשׁ וָחֵצִי')+'.'},
 {s:2,ty:'mc',tp:'horas',q:'Que horas são?'+H('בְּעֶשֶׂר בַּלַּיְלָה'),o:['🌙 10 da noite','☀️ 10 da manhã','☀️ 6 da manhã','🕓 4 da tarde'],a:0,ex:h('עֶשֶׂר')+' = 10 e '+h('בַּלַּיְלָה')+' = à noite. É a hora em que a Noa vai dormir.'},
 {s:2,ty:'mc',tp:'horas',q:'Que horas são?'+H('בְּשָׁעָה אַרְבַּע'),o:['🕓 4 horas','🕖 7 horas','🕕 6 horas','🕙 10 horas'],a:0,ex:h('אַרְבַּע')+' = 4. É a hora em que o Yonatan volta para casa.'},
 {s:2,ty:'mc',tp:'horas',q:'O que esta pergunta quer saber?'+H('בְּאֵיזוֹ שָׁעָה?'),o:['A que horas?','Onde?','O quê?','Por quê?'],a:0,ex:h('בְּאֵיזוֹ שָׁעָה')+' = a que horas? Responda com '+h('בְּשָׁעָה')+' + a hora por extenso.'},
 {s:2,ty:'build',tp:'horas',q:'Complete com a hora por extenso:'+BIG('🏫 ⏰ 07:00')+R,parts:['הַיֶּלֶד הוֹלֵךְ לְבֵית הַסֵּפֶר בְּשָׁעָה ','','.'],bank:['שֶׁבַע','שֵׁשׁ','עֶשֶׂר'],ans:['שֶׁבַע'],goTxt:'✅ Conferir',ex:'07:00 = '+h('בְּשָׁעָה שֶׁבַע')+' (como na cena 4 da LC 3).'},

 // 3 · BIBLIOTECA — Yonatan e Fernanda (textos originais)
 {s:3,ty:'mc',tp:'yonatan',q:'Leia e responda:'+YON+H('בְּאֵיזוֹ שָׁעָה יוֹנָתָן קָם בַּבֹּקֶר?')+R,o:['יוֹנָתָן קָם בְּשֵׁשׁ בַּבֹּקֶר.','יוֹנָתָן קָם בְּשֶׁבַע בַּבֹּקֶר.','יוֹנָתָן קָם בְּאַרְבַּע.','יוֹנָתָן קָמָה בְּשֵׁשׁ בַּבֹּקֶר.'],a:0,ex:'Linha 1: '+h('קָם בְּשָׁעָה שֵׁשׁ')+'. Às 7 ele vai para a escola. E '+h('קָמָה')+' é de menina.'},
 {s:3,ty:'mc',tp:'yonatan',q:'Leia e responda:'+YON+H('מָה יֵשׁ בְּתוֹךְ הַתִּיק שֶׁל יוֹנָתָן?')+R,o:['בַּקְבּוּק מַיִם, חֲטִיף וּבָנָנָה','בַּקְבּוּק מַיִם וְעִפָּרוֹן','סֵפֶר, מַחְבֶּרֶת וְקַלְמָר','לֶחֶם עִם גְּבִינָה'],a:0,ex:'Linha 4 do texto. Água e lápis é a mochila da Fernanda.'},
 {s:3,ty:'mc',tp:'yonatan',q:'Pergunta da professora:'+H('לָמָּה יוֹנָתָן לֹא הוֹלֵךְ לְבֵית הַסֵּפֶר עִם שִׁיר?')+R,o:['כִּי שִׁיר הוֹלֶכֶת לְבֵית הַסֵּפֶר עִם גִּילִי.','כִּי שִׁיר קָמָה בְּשֵׁשׁ.','כִּי יוֹנָתָן חוֹזֵר הַבַּיְתָה.','כִּי שִׁיר אוֹכֶלֶת עוּגָה.'],a:0,ex:'A Shir (texto da P1) vai para a escola com a Gili. Pergunta com '+h('לָמָּה')+' → resposta começa com '+h('כִּי')+'.'},
 {s:3,ty:'tf',tp:'yonatan',lb:TF,q:'Certo ou errado?'+YON+H('יוֹנָתָן שׁוֹתֶה קָפֶה.')+R,a:true,ex:'Certo: '+h('וְשׁוֹתֶה קָפֶה')+' (linha 3).'},
 {s:3,ty:'tf',tp:'yonatan',lb:TF,q:'Certo ou errado?'+YON+H('יוֹנָתָן חוֹזֵר הַבַּיְתָה בְּשָׁעָה שֶׁבַע.')+R,a:false,ex:'Errado: ele volta '+h('בְּשָׁעָה אַרְבַּע')+' (4). Às 7 ele vai para a escola.'},
 {s:3,ty:'mc',tp:'fernanda',q:'Leia e responda:'+FER+H('מָה פֶרְנַנְדָּה אוֹכֶלֶת בַּאֲרוּחַת בֹּקֶר?')+R,o:['פֶרְנַנְדָּה אוֹכֶלֶת יוֹגוּרְט.','פֶרְנַנְדָּה אוֹכֶלֶת עוּגָה.','פֶרְנַנְדָּה אוֹכֶלֶת לֶחֶם עִם גְּבִינָה.','פֶרְנַנְדָּה אוֹכֵל יוֹגוּרְט.'],a:0,ex:'Iogurte. Bolo é da Noa, pão com queijo é do Yonatan. E '+h('אוֹכֵל')+' é de menino.'},
 {s:3,ty:'mc',tp:'fernanda',q:'Leia e responda:'+FER+H('מָה פֶרְנַנְדָּה לוֹבֶשֶׁת?')+R,o:['מִכְנָס אָרֹךְ וְחֻלְצָה','שִׂמְלָה','מַדִּים','מִכְנָסַיִם קְצָרִים וְחֻלְצָה'],a:0,ex:h('מִכְנָס אָרֹךְ')+' = calça comprida, e '+h('חֻלְצָה')+' = camiseta.'},
 {s:3,ty:'mc',tp:'fernanda',q:'Leia e responda:'+FER+H('מָה יֵשׁ בַּתִּיק שֶׁל פֶרְנַנְדָּה?')+R,o:['בַּקְבּוּק מַיִם וְעִפָּרוֹן','בַּקְבּוּק מַיִם, חֲטִיף וּבָנָנָה','קַלְמָר וְסֵפֶר','יוֹגוּרְט'],a:0,ex:'Linha 4: água e lápis ('+h('עִפָּרוֹן')+').'},
 {s:3,ty:'tf',tp:'fernanda',lb:TF,q:'Certo ou errado?'+FER+H('פֶרְנַנְדָּה הוֹלֶכֶת לְלַמֵּד בְּשָׁעָה שֵׁשׁ וָחֵצִי.')+R,a:true,ex:'Certo: ela vai ensinar às seis e meia.'},

 // 4 · TEATRO DA NOA — ordem, 4 perguntas e descrever imagem
 {s:4,ty:'film',tp:'noa',q:'🎭 '+H('בְּבַקָּשָׁה לְסַדֵּר: מָה נוֹעָה עוֹשָׂה?')+'Toque nas frases na ordem do dia da Noa.'+R,slot:'⏰',slotTxt:'',goTxt:'✅ Conferir a ordem',
  o:['אֲנִי קָמָה בְּשֵׁשׁ בַּבֹּקֶר.','אֲנִי שׁוֹתָה קָפֶה וְאוֹכֶלֶת עוּגָה.','אֲנִי מְלַמֶּדֶת עִבְרִית בְּשִׁעוּר.','וְאַחֲרֵי בֵּית הַסֵּפֶר אֲנִי הוֹלֶכֶת לַחֲדַר כֹּשֶׁר.','אֲנִי מְכִינָה אֲרוּחַת עֶרֶב.','אֲנִי הוֹלֶכֶת לִישֹׁן בְּעֶשֶׂר בַּלַּיְלָה.'],
  ex:'Levanta → café e bolo → ensina → academia → jantar → dormir. Igualzinho à ficha da Noa.'},
 {s:4,ty:'mc',tp:'noa',q:'Leia e responda:'+NOA+H('מָה נוֹעָה מְלַמֶּדֶת בְּשִׁעוּר?')+R,o:['נוֹעָה מְלַמֶּדֶת עִבְרִית.','נוֹעָה שׁוֹתָה קָפֶה.','נוֹעָה הוֹלֶכֶת לַחֲדַר כֹּשֶׁר.','נוֹעָה מְכִינָה אֲרוּחַת עֶרֶב.'],a:0,ex:'Ela ensina hebraico: '+h('מְלַמֶּדֶת עִבְרִית')+'.'},
 {s:4,ty:'mc',tp:'escola',q:'Leia e responda:'+NOA+H('אֵיפֹה נוֹעָה מְלַמֶּדֶת?')+R,o:['נוֹעָה מְלַמֶּדֶת בְּבֵית הַסֵּפֶר.','נוֹעָה מְלַמֶּדֶת עִבְרִית.','נוֹעָה מְלַמֶּדֶת בְּעֶשֶׂר בַּלַּיְלָה.','נוֹעָה מְלַמֶּדֶת בַּחֲדַר כֹּשֶׁר.'],a:0,ex:h('אֵיפֹה')+' = onde? A resposta é um LUGAR: '+h('בְּבֵית הַסֵּפֶר')+' (na escola). Foi a correção da professora: escola, não aula.'},
 {s:4,ty:'mc',tp:'noa',q:'Leia e responda:'+NOA+H('מָה נוֹעָה אוֹכֶלֶת וְשׁוֹתָה בַּאֲרוּחַת בֹּקֶר?')+R,o:['נוֹעָה אוֹכֶלֶת עוּגָה וְשׁוֹתָה קָפֶה.','נוֹעָה אוֹכֶלֶת יוֹגוּרְט.','נוֹעָה אוֹכֶלֶת לֶחֶם וְשׁוֹתָה מִיץ.','נוֹעָה אוֹכֵל עוּגָה וְשׁוֹתֶה קָפֶה.'],a:0,ex:'Bolo e café, com os verbos de menina: '+h('אוֹכֶלֶת')+' e '+h('שׁוֹתָה')+'.'},
 {s:4,ty:'mc',tp:'noa',q:'Leia e responda:'+NOA+H('מָה נוֹעָה עוֹשָׂה אַחֲרֵי בֵּית הַסֵּפֶר?')+R,o:['נוֹעָה הוֹלֶכֶת לַחֲדַר כֹּשֶׁר.','נוֹעָה הוֹלֶכֶת לִישֹׁן.','נוֹעָה קָמָה בְּשֵׁשׁ.','נוֹעָה הוֹלֵךְ לַחֲדַר כֹּשֶׁר.'],a:0,ex:h('אַחֲרֵי')+' = depois. Depois da escola ela vai à academia ('+h('חֲדַר כֹּשֶׁר')+').'},
 {s:4,ty:'mc',tp:'imagem',q:'Olhe a cena:'+BIG('👧🎧🎵')+H('מָה מִיכַל עוֹשָׂה?')+R,o:['מִיכַל שׁוֹמַעַת מוּזִיקָה.','מִיכַל שׁוֹמֵעַ מוּזִיקָה.','מִיכַל רוֹקֶדֶת.','מִיכַל רוֹאָה טֶלֶוִיזְיָה.'],a:0,ex:'Quem? Michal (menina) → '+h('שׁוֹמַעַת')+' → o quê? '+h('מוּזִיקָה')+'.'},
 {s:4,ty:'mc',tp:'imagem',q:'Olhe a cena:'+BIG('👦👦📺')+H('מָה הַיְּלָדִים עוֹשִׂים?')+R,o:['הַיְּלָדִים רוֹאִים טֶלֶוִיזְיָה.','הַיְּלָדִים רוֹאוֹת טֶלֶוִיזְיָה.','הַיְּלָדִים שָׁרִים.','הַיֶּלֶד רוֹאֶה טֶלֶוִיזְיָה.'],a:0,ex:'Os meninos = eles → '+h('רוֹאִים')+'.'},
 {s:4,ty:'mc',tp:'imagem',q:'Olhe a cena:'+BIG('👧👧💃🎉')+H('מָה הַבָּנוֹת עוֹשׂוֹת?')+R,o:['הַבָּנוֹת רוֹקְדוֹת בַּמְּסִיבָּה.','הַבָּנוֹת רוֹקְדִים בַּמְּסִיבָּה.','הַבָּנוֹת עוֹשׂוֹת עוּגָה.','הַבָּנוֹת שׁוֹמְעוֹת מוּזִיקָה.'],a:0,ex:'As meninas = elas → '+h('רוֹקְדוֹת')+' (dançam).'},
 {s:4,ty:'film',tp:'imagem',q:'🖼️ As 4 cenas do menino da LC 3 se misturaram! Coloque na ordem.'+R,slot:'🖼️',slotTxt:'',goTxt:'✅ Conferir a ordem',
  o:['⏰ אִיתַי קָם בְּשָׁעָה שֵׁשׁ.','🍞 אִיתַי אוֹכֵל אֲרוּחַת בֹּקֶר עִם אַבָּא וְאִמָּא.','🎒 אִיתַי שָׂם בַּתִּיק סֵפֶר וּבַקְבּוּק מַיִם.','🏫 אִיתַי הוֹלֵךְ לְבֵית הַסֵּפֶר בְּשָׁעָה שֶׁבַע.'],
  ex:'Acorda às 6 → café com a família → arruma a mochila → vai para a escola às 7.'},

 // 5 · CHEFÃO — Dorminhoco (revisão geral)
 {s:5,ty:'mc',tp:'ela',q:'O Dorminhoco apagou o verbo!'+BIG('👩🎂')+H('אִמָּא ___ עוּגָה.')+R,o:['עוֹשָׂה','עוֹשֶׂה','עוֹשִׂים','עוֹשׂוֹת'],a:0,ex:'Mamãe = ela → '+h('עוֹשָׂה')+' (vogal em forma de T embaixo do שׂ).'},
 {s:5,ty:'mc',tp:'pontinho',q:'Olhe o pontinho!'+BIG('👨🎤')+H('אַבָּא ___ בַּסָּלוֹן.')+R,o:['שָׁר','שָׂם','שָׁרָה','שָׁרִים'],a:0,ex:'Cantar = '+h('שָׁר')+' (pontinho à direita). '+h('שָׂם')+' é colocar.'},
 {s:5,ty:'mc',tp:'pontinho',q:'Olhe o pontinho!'+BIG('👧📕🎒')+H('הַיַּלְדָּה ___ סֵפֶר בַּתִּיק.')+R,o:['שָׂמָה','שָׁרָה','שָׂם','שָׂמִים'],a:0,ex:'A menina coloca = '+h('שָׂמָה')+' (pontinho à esquerda, forma de ela).'},
 {s:5,ty:'mc',tp:'escola',q:'A pergunta começa com '+h('אֵיפֹה?')+'. A resposta precisa ser…',o:['um lugar (ex.: na escola)','uma hora','uma comida','uma roupa'],a:0,ex:h('אֵיפֹה')+' = onde? → lugar: '+h('בְּבֵית הַסֵּפֶר')+', '+h('בַּסָּלוֹן')+', '+h('לַחֲדַר כֹּשֶׁר')+'.'},
 {s:5,ty:'tf',tp:'escola',lb:[[true,'✅','Certo','t'],[false,'❌','Errado','f']],q:'Certo ou errado?<em>'+h('שִׁעוּר')+' quer dizer "escola".</em>',a:false,ex:'Errado: '+h('שִׁעוּר')+' é a AULA. Escola é '+h('בֵּית סֵפֶר')+'.'},
 {s:5,ty:'rapid',tp:'plural',q:'😴 Acorde os verbos! Ela ou elas?'+R,bins:['👧 הִיא','👧👧 הֵן'],subs:['ela','elas'],
  o:[['קָמָה',0],['שָׁרוֹת',1],['אוֹכֶלֶת',0],['הוֹלְכוֹת',1],['שׁוֹתָה',0],['לוֹבְשׁוֹת',1],['רוֹקֶדֶת',0],['שׁוֹמְעוֹת',1]],ex:'Elas sempre termina em וֹת. Ela termina em ה ou ת.'},
 {s:5,ty:'mc',tp:'eu',q:'Você (menina) escreve sobre a sua manhã. Qual frase está certa?'+R,o:['אֲנִי לוֹבֶשֶׁת מַדִּים.','אֲנִי לוֹבֵשׁ מַדִּים.','אֲנִי לוֹבְשׁוֹת מַדִּים.','אֲנִי לוֹבְשִׁים מַדִּים.'],a:0,ex:'Menina: '+h('אֲנִי לוֹבֶשֶׁת')+'.'},
 {s:5,ty:'build',tp:'eu',q:'Monte a frase sobre você (menina):'+BIG('☀️ ⏰ 07:00')+R,parts:['בַּבֹּקֶר אֲנִי ','',' בְּשָׁעָה ','','.'],bank:['קָמָה','קָם','שֶׁבַע','שֵׁשׁ'],ans:['קָמָה','שֶׁבַע'],goTxt:'✅ Conferir',ex:h('בַּבֹּקֶר אֲנִי קָמָה בְּשָׁעָה שֶׁבַע.')+' Menina usa '+h('קָמָה')+'.'},
 {s:5,ty:'mc',tp:'plural',q:'As duas shinshiniot levantam às seis:'+H('נוֹעָה וּפֶרְנַנְדָּה ___ בְּשֵׁשׁ.')+R,o:['קָמוֹת','קָמִים','קָמָה','קָם'],a:0,ex:'Noa e Fernanda = elas → '+h('קָמוֹת')+'.'},
 {s:5,ty:'mc',tp:'yonatan',q:'Qual palavra-pergunta combina com esta resposta?'+H('כִּי שִׁיר הוֹלֶכֶת לְבֵית הַסֵּפֶר עִם גִּילִי.')+R,o:['לָמָּה?','אֵיפֹה?','בְּאֵיזוֹ שָׁעָה?','מָה?'],a:0,ex:'Resposta com '+h('כִּי')+' (porque) responde '+h('לָמָּה?')+' (por quê?).'}
];

JOGOS.push({id:'heb-p2-2026',ano:4,materia:'Hebraico',prova:'P2 · 2º sem 2026',titulo:'Vila do Despertador',ic:'⏰',cor:'#ffd9a8',
  intro:'Primeira parada: Quarto do Despertador 🛏️',
  links:[{t:'📓 Roteiro de estudo',u:'roteiros/hebraico-p2.html'}],
  mapa:{sea:['#ffd6a5','#ff9f7a'],isl:['#fff3c4','#ffd36b'],praia:'#ffe9b8',deco:['⏰','☀️','🌻','🏫','🎒','🥐']},
  boss:{nome:'Dorminhoco',fala:'Zzz… ninguém vai lembrar dos verbos… 😴',svg:`<svg class="dragon" id="dragon" viewBox="0 0 160 150">
  <ellipse cx="80" cy="140" rx="50" ry="7" fill="#0002"/>
  <ellipse cx="80" cy="98" rx="52" ry="44" fill="#9b87e8"/><ellipse cx="80" cy="108" rx="32" ry="28" fill="#d9d0fb"/>
  <circle cx="80" cy="58" r="36" fill="#9b87e8"/>
  <path d="M46 46 Q60 2 116 24 Q100 30 104 44 Z" fill="#ff6f9f"/><circle cx="122" cy="22" r="8" fill="#fff"/><path d="M46 46 Q80 36 106 44" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M60 60 q8 6 16 0 M86 60 q8 6 16 0" stroke="#3a2850" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="62" cy="72" rx="7" ry="4" fill="#ff9fc4"/><ellipse cx="100" cy="72" rx="7" ry="4" fill="#ff9fc4"/>
  <ellipse cx="81" cy="80" rx="7" ry="5" fill="#3a2850"/>
  <ellipse cx="34" cy="104" rx="12" ry="18" fill="#8a75dc" transform="rotate(25 34 104)"/><ellipse cx="126" cy="104" rx="12" ry="18" fill="#8a75dc" transform="rotate(-25 126 104)"/>
  <ellipse cx="58" cy="138" rx="14" ry="7" fill="#8a75dc"/><ellipse cx="102" cy="138" rx="14" ry="7" fill="#8a75dc"/>
  <text x="122" y="64" font-size="16" font-weight="800" fill="#4b3a8f" font-family="Fredoka,sans-serif">Z</text><text x="134" y="50" font-size="12" font-weight="800" fill="#4b3a8f" font-family="Fredoka,sans-serif">z</text><text x="143" y="40" font-size="9" font-weight="800" fill="#4b3a8f" font-family="Fredoka,sans-serif">z</text></svg>`},
  ST,TOP,T});
})();
