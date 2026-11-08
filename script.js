/* Palace · Dansk, kommenteret vanilla JavaScript. Ingen netværkskald eller biblioteker.
   Data er opdelt pr. fag. Brugerindhold indsættes altid som tekst eller escapes. */
'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => globalThis.crypto?.randomUUID?.() || `p-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const normalize = s => String(s).toLocaleLowerCase('da').normalize('NFC').trim();
const ICONS = {
  german:'M5 21V3h14v12H5M5 7h14M5 11h14',french:'M5 21V3h14v12H5M10 3v12M14 3v12',spanish:'M5 21V3h14v12H5M5 6h14M5 12h14M9 8v2',
  grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  target:'M22 12a10 10 0 1 1-10-10M18 12a6 6 0 1 1-6-6M12 12l9-9M16 3h5v5',
  folder:'M3 7V4h6l3 3h9v13H3z',upload:'M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6',
  archive:'M3 3h18v5H3zM5 8v13h14V8M10 12h4',sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1',
  moon:'M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13',help:'M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  menu:'M4 6h16M4 12h16M4 18h16',paperclip:'m8 13 7-7a3 3 0 0 1 4 4l-9 9a5 5 0 0 1-7-7l9-9',mic:'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0zM5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8',
  'arrow-up':'m6 11 6-6 6 6M12 5v15',arrow:'M4 12h16m-6-6 6 6-6 6',left:'m14 5-7 7 7 7',right:'m10 5 7 7-7 7',
  sparkle:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',book:'M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2zm0 0v16',
  note:'M5 3h14v18H5zM8 8h8M8 12h8M8 16h5',headphones:'M3 14v-3a9 9 0 0 1 18 0v3M3 12h4v9H3zm14 0h4v9h-4z',video:'M3 5h14v14H3zm14 5 5-4v12l-5-4',
  oral:'M4 3h16v14H9l-5 4zM8 8h8M8 12h5',pen:'m15 3 6 6M3 21l2-7L17 2l5 5L10 19z',cards:'m7 5 14 2-2 15-14-2zM3 16 2 2l14 1',
  quiz:'M8 5h13M8 12h13M8 19h13M2 5l1 1 2-3M2 12h3M2 19h3',message:'M3 4h18v13H8l-5 4zM7 9h10M7 13h7',shuffle:'M3 5h3l12 14h3m-4-4 4 4-4 3M3 19h3l4-5m4-5 4-4h3m-4-3 4 3-4 4',
  globe:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20',language:'M3 5h12M9 2v3M5 5c0 5 4 9 8 11M13 5c0 5-4 9-10 11M14 22l4-12 4 12m-7-4h6',
  history:'M3 10V3m0 7h7M3 10a9 9 0 1 1 1 8M12 7v6l4 2',math:'M3 4h18v16H3zM7 8h4m-2-2v4M15 8h3M7 14l4 4m0-4-4 4M15 14h3m-3 3h3',
  scale:'M12 3v18M7 21h10M4 6h16M5 6l-4 8h8zm14 0-4 8h8z',chart:'M3 3v18h18M7 16v-5m5 5V6m5 10v-8',business:'M3 7h18v14H3zM8 7V3h8v4M3 12c6 4 12 4 18 0M10 13h4',
  trash:'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',close:'m5 5 14 14M19 5 5 19',plus:'M12 4v16M4 12h16',check:'m4 12 5 5L20 6',file:'M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h6',download:'M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4',clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 6v6l4 2',play:'m7 3 14 9-14 9z',pause:'M6 3h4v18H6zm8 0h4v18h-4z',refresh:'M21 3v6h-6M3 21v-6h6M20 9A9 9 0 0 0 5 5M4 15a9 9 0 0 0 15 4'
};
function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[name] || ICONS.book}"/></svg>`; }
$$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));

/* 12 begreber og 6 selvstændige spørgsmål pr. fag. Kortene kan frit redigeres. */
const SUBJECTS = [
{id:'io',name:'International Økonomi',color:'#657c99',icon:'globe',level:'HHX · Samfund & økonomi',cards:[
['Hvad er BNP?','Værdien af den samlede produktion af endelige varer og tjenester i et land i en periode.'],
['Hvad er realvækst?','Vækst i produktionen, når der er korrigeret for prisændringer.'],
['Hvad er inflation?','En vedvarende stigning i det generelle prisniveau, som mindsker pengenes købekraft.'],
['Hvad viser betalingsbalancens løbende poster?','Handel med varer og tjenester samt løbende indkomster og overførsler mellem landet og udlandet.'],
['Hvad er en valutakurs?','Prisen på en valuta udtrykt i en anden valuta.'],
['Hvad er komparative fordele?','Et land har en komparativ fordel i det, som det producerer med lavest alternativomkostning.'],
['Hvad er told?','En afgift på varer, der passerer en grænse, typisk import. Den kan beskytte hjemlige producenter.'],
['Hvad kendetegner en højkonjunktur?','Høj økonomisk aktivitet, ofte lav arbejdsløshed og risiko for kapacitetspres og inflation.'],
['Hvad er ekspansiv finanspolitik?','Fx højere offentlige udgifter eller lavere skatter for at øge efterspørgslen.'],
['Hvad er pengepolitik?','Centralbankens påvirkning af renter og likviditet for at nå sine økonomiske mål.'],
['Hvad er EU’s indre marked?','Et marked med fri bevægelighed for varer, tjenester, personer og kapital.'],
['Hvad måler Gini-koefficienten?','Ulighed i en fordeling. 0 betyder fuld lighed; 1 (eller 100) betyder maksimal ulighed.']
],quiz:[
['Hvad korrigeres der for, når BNP måles i faste priser?',['Prisændringer','Befolkningens alder','Valutabeholdningen','Importens størrelse'],0,'Faste priser gør det muligt at måle ændringer i produktionens mængde.'],
['Hvilken politik er typisk ekspansiv?',['Højere indkomstskat','Lavere offentligt forbrug','Flere offentlige investeringer','Højere centralbankrente'],2,'Offentlige investeringer kan øge den samlede efterspørgsel.'],
['Hvad bestemmer en komparativ fordel?',['Den største befolkning','Den laveste alternativomkostning','Den højeste timeløn','Den største eksportværdi'],1,'Det handler om, hvad man opgiver af anden produktion.'],
['Hvilken frihed indgår i EU’s indre marked?',['Fri prisfastsættelse uden konkurrence','Fri bevægelighed for kapital','Fritagelse fra al skat','Fri handel kun med USA'],1,'De fire friheder omfatter varer, tjenester, personer og kapital.'],
['Hvad sker der med købekraften ved inflation og uændret løn?',['Den stiger altid','Den er uændret','Den fordobles','Den falder'],3,'Samme beløb kan købe færre varer, når priserne stiger.'],
['Hvad tyder en stigende Gini-koefficient på?',['Større indkomstulighed','Lavere BNP','Faldende inflation','Færre indbyggere'],0,'En højere Gini betyder en mere ulige fordeling.']
]},
{id:'dansk',name:'Dansk',color:'#b98274',icon:'book',level:'HHX · Sprog & litteratur',cards:[
['Hvad er ethos?','En appelform, der bygger på afsenderens troværdighed og karakter.'],['Hvad er logos?','En appelform, der bygger på fornuft, dokumentation og logiske argumenter.'],['Hvad er pathos?','En appelform, der søger at påvirke modtagerens følelser.'],['Hvad er det retoriske pentagram?','En model med afsender, modtager, emne, sprog og omstændigheder. Delene påvirker hinanden.'],['Hvad er en påstand i Toulmins model?','Det synspunkt, som afsenderen ønsker tilslutning til. Belæg støtter påstanden; hjemmel forbinder dem.'],['Hvad er en alvidende fortæller?','En fortæller med viden om flere personers tanker og begivenheder uden for én persons synsfelt.'],['Hvad er intern synsvinkel?','Læseren oplever begivenheder gennem en persons bevidsthed og tanker.'],['Hvad er en metafor?','Et sprogligt billede, hvor et udtryk overføres til et andet område, fx tid er penge.'],['Hvad er en novelle?','En kort episk tekst, ofte med få personer, koncentreret handling og et centralt vendepunkt.'],['Hvad kendetegner romantikken?','En litterær strømning med fokus på bl.a. følelse, natur, ånd og sammenhæng i tilværelsen.'],['Hvad kendetegner det moderne gennembrud?','Litteratur fra ca. 1870, der sætter problemer under debat, fx køn, klasse og religion.'],['Hvad er en autenticitetsmarkør?','Et virkemiddel, der skaber indtryk af virkelighed, fx interviews, håndholdt kamera eller arkivmateriale.']
],quiz:[
['En taler henviser til sin erfaring som læge. Hvilken appel er tydeligst?',['Pathos','Ethos','Metafor','Ironi'],1,'Faglig erfaring styrker afsenderens troværdighed.'],['Hvad er belæg?',['Det, der støtter en påstand','Tekstens overskrift','En skjult fortæller','En gentagelse af emnet'],0,'Belæg er de grunde eller den dokumentation, påstanden bygger på.'],['Hvilket eksempel er en metafor?',['Han løber som vinden','Tiden flyver','Bogen er lang','Det regner i dag'],1,'Tiden tillægges en egenskab fra et andet område uden et sammenlignende som.'],['Hvad forbindes med det moderne gennembrud?',['Kun eventyr','Ingen samfundskritik','Problemer sættes under debat','Kun mundtlig poesi'],2,'Litteraturen debatterer bl.a. sociale normer, køn og religion.'],['Hvad er intern synsvinkel?',['Et kamera udefra','En forfatters biografi','En oversigt over alle personer','Adgang til en persons oplevelse og tanker'],3,'Synsvinklen er bundet til en persons bevidsthed.'],['Hvad er et eksempel på en autenticitetsmarkør?',['Et virkeligt interview','En drage','En rimordbog','En fast strofeform'],0,'Interviewet kan understøtte oplevelsen af dokumentarisk virkelighed.']
]},
{id:'tysk',name:'Tysk',color:'#ba9751',icon:'german',level:'HHX · Sprog & kultur',language:'de-DE',cards:[
['die Wirtschaft','økonomien'],['das Unternehmen','virksomheden'],['die Ungleichheit','uligheden'],['die Ausbildung','uddannelsen'],['die Armut','fattigdommen'],['die Umwelt','miljøet'],['Meiner Meinung nach','efter min mening'],['Ich stimme zu','jeg er enig'],['Hvad sker der med verbet efter weil?','Det finitte verbum står normalt sidst i ledsætningen.'],['Hvilken kasus styrer mit?','Dativ. Fx mit dem Zug.'],['Hvordan dannes perfektum?','Med haben eller sein i nutid samt perfektum participium. Fx ich habe gelernt.'],['Hvad er bestemt artikel i nominativ?','der (maskulinum), die (femininum), das (neutrum), die (pluralis).']
],quiz:[
['Hvad betyder das Unternehmen?',['Uddannelsen','Virksomheden','Lønnen','Aftalen'],1,'Das Unternehmen betyder virksomheden.'],['Vælg korrekt: Ich bleibe zu Hause, weil ich krank …',['bin','bist','sein','ist'],0,'Efter weil står det finitte verbum normalt sidst. Ich bøjes med bin.'],['Hvilken kasus følger efter mit?',['Akkusativ','Genitiv','Dativ','Nominativ'],2,'Mit er en præposition med dativ.'],['Hvad betyder die Armut?',['Velstanden','Arbejdskraften','Uddannelsen','Fattigdommen'],3,'Armut betyder fattigdom.'],['Hvilken sætning er perfektum?',['Ich lerne','Ich habe gelernt','Ich werde lernen','Ich lernte'],1,'Habe + gelernt danner perfektum.'],['Hvad betyder Meiner Meinung nach?',['Efter min mening','På den anden side','I går aftes','Til sidst'],0,'Vendingen bruges til at udtrykke en holdning.']
]},
{id:'fransk',name:'Fransk',color:'#7c84af',icon:'french',level:'HHX · Sprog & kultur',language:'fr-FR',cards:[
['une entreprise','en virksomhed'],['le marché','markedet'],['le prix','prisen'],['le travail','arbejdet'],['la société','samfundet'],['l’environnement','miljøet'],['à mon avis','efter min mening'],['je suis d’accord','jeg er enig'],['Hvordan dannes passé composé?','Med avoir eller être i nutid og kort tillægsform. Fx j’ai parlé.'],['Hvordan nægter man normalt på skrift?','Med ne … pas omkring det finitte verbum, fx je ne parle pas.'],['Hvad er bestemt artikel?','le i hankøn, la i hunkøn, les i flertal; l’ foran vokal eller stumt h.'],['Hvordan bøjes être i nutid?','je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.']
],quiz:[
['Hvad betyder une entreprise?',['En pris','En virksomhed','En regering','En elev'],1,'Une entreprise er en virksomhed.'],['Vælg korrekt: Nous … français.',['parle','parles','parlons','parlent'],2,'Nous-endelsen for regelmæssige -er-verber er -ons.'],['Hvilken sætning er passé composé?',['Je parle','Je parlerai','Je parlais','J’ai parlé'],3,'Avoir i nutid + parlé danner passé composé.'],['Hvad betyder à mon avis?',['Efter min mening','I min taske','I morgen','På markedet'],0,'Vendingen bruges til at fremlægge en holdning.'],['Hvad er korrekt skriftlig nægtelse?',['Je pas parle','Je ne parle pas','Ne je parle','Je parle ne'],1,'Ne og pas placeres omkring det finitte verbum.'],['Hvad er flertalsformen af le?',['La','Un','Les','Une'],2,'Les er bestemt artikel i flertal for begge køn.']
]},
{id:'spansk',name:'Spansk',color:'#c08b58',icon:'spanish',level:'HHX · Sprog & kultur',language:'es-ES',cards:[
['la empresa','virksomheden'],['el mercado','markedet'],['el precio','prisen'],['el trabajo','arbejdet'],['la desigualdad','uligheden'],['el medio ambiente','miljøet'],['en mi opinión','efter min mening'],['estoy de acuerdo','jeg er enig'],['Hvad bruges ser typisk til?','Identitet, oprindelse og karakteristik. Fx soy danés.'],['Hvad bruges estar typisk til?','Tilstand og placering. Fx estoy cansado, Madrid está en España.'],['Hvordan bøjes hablar i nutid?','hablo, hablas, habla, hablamos, habláis, hablan.'],['Hvordan dannes nær fremtid?','Ir i nutid + a + infinitiv. Fx voy a estudiar.']
],quiz:[
['Hvad betyder la empresa?',['Miljøet','Virksomheden','Prisen','Skolen'],1,'Empresa betyder virksomhed.'],['Vælg korrekt: Yo … español.',['hablas','habla','hablo','hablan'],2,'Yo-formen af hablar er hablo.'],['Vælg korrekt: Madrid … en España.',['está','es','soy','somos'],0,'Placering udtrykkes normalt med estar.'],['Hvad betyder en mi opinión?',['Hver dag','I morgen','Af og til','Efter min mening'],3,'Vendingen indleder en holdning.'],['Hvilken sætning udtrykker nær fremtid?',['He estudiado','Voy a estudiar','Estudié','Estudio'],1,'Ir + a + infinitiv bruges om noget, man skal til at gøre.'],['Vælg korrekt: Soy …',['cansado hoy','en Madrid','danés','de acuerdo'],2,'Nationalitet og oprindelse udtrykkes med ser.']
]},
{id:'historie',name:'Historie',color:'#998574',icon:'history',level:'HHX · Fortid & samfund',cards:[
['Hvad er kildekritik?','At vurdere, hvad en kilde kan bruges til ud fra bl.a. ophav, tid, formål, tendens og afhængighed.'],['Hvad er en primærkilde?','En kilde, der er oprindelig i forhold til det undersøgte forhold; modsætningen er en kilde, der bygger på en anden.'],['Hvad er en førstehåndskilde?','En kilde fra en person, som selv oplevede det, der berettes om.'],['Hvad er tendens?','Kildens interesse eller vinkel, som kan påvirke dens fremstilling.'],['Hvad er et levn?','En kilde brugt som spor af den tid og sammenhæng, den er blevet til i.'],['Hvad er en beretning?','En kilde brugt for dens beskrivelse af en begivenhed eller et forhold.'],['Hvad var merkantilisme?','Økonomisk politik, der søgte at styrke staten gennem fx eksportoverskud, told og kolonier.'],['Hvad kendetegner industrialiseringen?','Overgangen til maskinel produktion og fabrikker samt store ændringer i arbejde og byliv.'],['Hvad var imperialisme?','Stormagters politiske, økonomiske eller militære dominans over andre områder.'],['Hvad var den kolde krig?','Konflikten mellem USA og Sovjetunionen med deres allierede efter 1945 frem til ca. 1991.'],['Hvad er historiebrug?','Måder, hvorpå fortiden bruges i nutiden, fx politisk, kommercielt eller til identitet.'],['Hvad er brud og kontinuitet?','Brud er væsentlige forandringer; kontinuitet er forhold, der fortsætter over tid.']
],quiz:[
['Hvilket spørgsmål undersøger tendens?',['Hvor mange sider har kilden?','Hvilke interesser har afsenderen?','Hvilket filformat er det?','Er teksten på dansk?'],1,'Afsenderens interesser kan påvirke udvælgelse og fremstilling.'],['Hvad er en førstehåndskilde?',['En ny lærebog','En oversættelse','En beretning fra et øjenvidne','En tekst uden afsender'],2,'Et øjenvidne har selv oplevet det, der beskrives.'],['Hvad forbindes med industrialisering?',['Maskinel fabriksproduktion','Kun landbrug','Ophør af handel','Afvikling af byer'],0,'Maskiner og fabrikker ændrede produktion, arbejde og bosætning.'],['Hvilke lande var hovedmodstandere i den kolde krig?',['Danmark og Sverige','Frankrig og Spanien','Kina og Japan','USA og Sovjetunionen'],3,'De stod i spidsen for hver sin blok.'],['En politiker bruger en historisk begivenhed i en tale. Det er …',['Regressionsanalyse','Historiebrug','Passé composé','Primærproduktion'],1,'Fortiden anvendes i en nutidig sammenhæng.'],['Kan en kilde bruges både som levn og beretning?',['Ja, afhængigt af spørgsmålet','Nej, aldrig','Kun hvis den er trykt','Kun hvis den er anonym'],0,'Det er den måde, man bruger kilden på, der er afgørende.']
]},
{id:'matematik',name:'Matematik',color:'#658a88',icon:'math',level:'HHX · Tal & modeller',cards:[
['Hvad er en lineær funktion?','f(x) = ax + b. a er hældningen, og b er skæringen med y-aksen.'],['Hvad er en andengradsfunktion?','f(x) = ax² + bx + c, hvor a ≠ 0. Grafen er en parabel.'],['Hvad er diskriminanten?','d = b² − 4ac. Fortegnet afgør antallet af reelle rødder i en andengradsligning.'],['Hvad er formlen for andengradsrødder?','x = (−b ± √d) / (2a), hvis d ≥ 0 og a ≠ 0.'],['Hvordan findes toppunktets x-koordinat?','xT = −b / (2a). Find yT ved at beregne f(xT).'],['Hvad viser den afledte funktion?','Den øjeblikkelige ændringshastighed og tangentens hældning.'],['Hvad er den afledte af xⁿ?','n·xⁿ⁻¹, hvor potensreglen er defineret. Fx (x³)′ = 3x².'],['Hvad er tangentens ligning?','y = f′(x₀)·(x − x₀) + f(x₀).'],['Hvad er regression?','En metode til at tilpasse en model til observerede data.'],['Hvad er medianen?','Den midterste observation i sorterede data; ved et lige antal bruges gennemsnittet af de to midterste.'],['Hvad er en eksponentiel funktion?','f(x) = b·aˣ med a > 0. Fremskrivningsfaktoren a = 1 + r ved vækstraten r.'],['Hvad er standardafvigelse?','Et mål for observationernes spredning omkring gennemsnittet, i samme enhed som observationerne.']
],quiz:[
['Hvad er a i f(x) = 3x + 7?',['7','3','10','x'],1,'I en lineær funktion er a koefficienten foran x.'],['Hvad er den afledte af x³?',['x²','3x','3x²','x⁴/4'],2,'Potensreglen giver 3·x^(3−1) = 3x².'],['Hvor mange reelle rødder har en andengradsligning med d < 0?',['Ingen','Én','To','Uendeligt mange'],0,'En negativ diskriminant giver ingen reelle rødder.'],['Hvad er medianen af 2, 3, 9, 10, 11?',['7','3','10','9'],3,'9 er den midterste observation.'],['Hvor ligger toppunktets x-koordinat for f(x) = x² − 6x − 7?',['−3','3','−6','7'],1,'xT = −b/(2a) = 6/2 = 3.'],['Hvilken faktor svarer til 5 % vækst?',['0,05','0,95','1,05','5'],2,'Fremskrivningsfaktoren er 1 + 0,05 = 1,05.']
]},
{id:'jura',name:'Erhvervsjura',color:'#8e7d9b',icon:'scale',level:'HHX · Regler & aftaler',cards:[
['Hvad er hovedreglen i aftalelovens § 1?','Tilbud og accept er bindende for afgiveren. Reglerne i §§ 2–9 kan som udgangspunkt fraviges.'],['Hvad følger af § 2 om en fastsat acceptfrist?','Accepten skal være kommet frem til tilbudsgiveren inden fristens udløb.'],['Hvad er den legale acceptfrist (§ 3)?','Når en frist ikke er fastsat: forventet fremsendelsestid, rimelig betænkningstid og tilbagesendelsestid. Mundtlige tilbud uden frist skal accepteres straks.'],['Hvad er hovedreglen om for sen accept (§ 4)?','En for sent fremkommet accept er et nyt tilbud. Stk. 2 indeholder en undtagelse med pligt til at reagere.'],['Hvad sker der ved et afslag (§ 5)?','Tilbuddet bortfalder, selv om acceptfristen endnu ikke er udløbet.'],['Hvad er en uoverensstemmende accept (§ 6)?','En accept med ændringer er som hovedregel et afslag og et nyt tilbud. Stk. 2 har en undtagelse.'],['Hvornår virker en tilbagekaldelse (§ 7)?','Når den kommer frem før eller samtidig med, at tilbuddet eller accepten kommer til modtagerens kundskab.'],['Hvad er forskellen på fremkomst og kundskab?','Fremkomst: meddelelsen er tilgængelig hos modtageren. Kundskab: modtageren bliver bekendt med indholdet.'],['Hvad regulerer købeloven?','Forholdet mellem køber og sælger ved køb af løsøre. Reglerne afhænger bl.a. af købets type.'],['Hvad er en mangel?','At det leverede ikke opfylder aftalen eller de relevante lovkrav, fx til egenskaber eller kvalitet.'],['Hvad er misligholdelse?','At en part ikke opfylder sine forpligtelser, fx ved forsinkelse, mangler eller manglende betaling.'],['Hvad er ugyldighed?','At en erklæring eller aftale ikke binder som ellers forudsat, fx på grund af tvang, svig eller visse fejl.']
],quiz:[
['En frist er fastsat til 1. april. Hvornår skal accepten være fremme?',['Senest ved fristens udløb','Når den er læst ugen efter','Når brevet er dateret','Inden årets udløb'],0,'Efter § 2 er fremkomsten inden fristens udløb afgørende.'],['Hvad er hovedreglen om for sen accept?',['Aftalen gælder altid','Den er et nyt tilbud','Tilbudsgiver får en bøde','Den er et afslag uden nyt tilbud'],1,'§ 4, stk. 1: For sen accept betragtes som et nyt tilbud. Der er en undtagelse i stk. 2.'],['En accept ændrer prisen. Hvad er hovedreglen?',['Bindende på den oprindelige pris','Automatisk ugyldig efter § 7','Afslag og nyt tilbud','Kun en forespørgsel'],2,'Efter § 6, stk. 1 er et ændret svar afslag og nyt tilbud. Stk. 2 indeholder en undtagelse.'],['Hvornår er en tilbagekaldelse rettidig?',['Altid inden 14 dage','Når tilbuddet er sendt','Kun før tilbuddet er kommet frem','Fremme før eller samtidig med kundskab om tilbuddet'],3,'§ 7 sammenholder tilbagekaldelsens fremkomst med kundskaben om den oprindelige erklæring.'],['Hvad sker der ved afslag på et tilbud?',['Tilbuddet bortfalder','Fristen forlænges','Prisen halveres','Accept bliver obligatorisk'],0,'§ 5: Tilbuddet bortfalder trods resterende acceptfrist.'],['Hvilken situation kan være en mangel?',['Køber ændrer mening om farven','Varen mangler en aftalt egenskab','Sælger svarer hurtigt','Prisen er tydeligt aftalt'],1,'En afvigelse fra en aftalt egenskab kan være en mangel.']
]},
{id:'afsaetning',name:'Afsætning',color:'#71825e',icon:'chart',level:'A-niveau · HHX',cards:[
['Hvad bruges SWOT til?','At samle interne styrker og svagheder samt eksterne muligheder og trusler som grundlag for strategiske valg.'],['Hvad analyserer Porters fem kræfter?','Branchekonkurrence: rivalisering, nye indtrængere, substitutter, kunders og leverandørers forhandlingsstyrke.'],['Hvad er de 4 P’er?','Product, Price, Place og Promotion — produkt, pris, distribution og markedskommunikation.'],['Hvad tilføjer de 7 P’er?','People, Process og Physical evidence til de 4 P’er; især relevant for serviceydelser.'],['Hvad er Ansoffs vækstmatrix?','Markedspenetrering, markedsudvikling, produktudvikling og diversifikation, fordelt efter nye/eksisterende produkter og markeder.'],['Hvad viser BCG-matricen?','Produkter efter relativ markedsandel og markedsvækst: stjerner, malkekøer, spørgsmålstegn og hunde.'],['Hvad er segmentering?','At opdele markedet i grupper med fælles behov eller adfærd, så virksomheden kan målrette sit tilbud.'],['Hvad er positionering?','Den ønskede plads i målgruppens bevidsthed i forhold til konkurrenterne.'],['Hvad er Kotlers fem produktniveauer?','Kernefordel, basisprodukt, forventet produkt, udvidet produkt og potentielt produkt.'],['Hvad er en målgruppe?','Det eller de segmenter, som virksomheden vælger at henvende sig til.'],['Hvad er differentiering?','At adskille sit tilbud fra konkurrenternes på forhold, som kunderne oplever som værdifulde.'],['Hvad viser købsbeslutningsprocessen?','Behovserkendelse, informationssøgning, vurdering af alternativer, købsbeslutning og efterkøbsadfærd.']
],quiz:[
['Hvor hører en stærk intern produktudvikling hjemme i SWOT?',['Mulighed','Trussel','Styrke','Svaghed'],2,'En eksisterende intern fordel kategoriseres som en styrke.'],['Hvilken kraft indgår i Porters model?',['Leverandørernes forhandlingsstyrke','Virksomhedens moms','Medarbejdernes ferie','Valutabeholdningen'],0,'Porter undersøger fem kræfter, der påvirker konkurrencen i branchen.'],['Et eksisterende produkt sælges på et nyt geografisk marked. Det er …',['Diversifikation','Markedsudvikling','Produktudvikling','Markedspenetrering'],1,'Ansoff kalder nye markeder med eksisterende produkter for markedsudvikling.'],['En malkeko i BCG har …',['Lav andel, høj vækst','Høj andel, høj vækst','Lav andel, lav vækst','Høj relativ andel, lav vækst'],3,'En malkeko har høj relativ markedsandel i et marked med lav vækst.'],['Hvad er segmentering?',['At sænke alle priser','At opdele markedet i relevante grupper','At købe konkurrenter','At beregne soliditet'],1,'Segmenter har fælles karakteristika, behov eller adfærd.'],['Hvilket P handler om distributionskanaler?',['Price','Product','Place','Promotion'],2,'Place handler om distribution og tilgængelighed.']
]},
{id:'voe',name:'Virksomhedsøkonomi',color:'#628b9a',icon:'business',level:'A-niveau · HHX',cards:[
['Hvad er dækningsbidrag pr. enhed?','Salgspris minus variable enhedsomkostninger. Bidraget skal dække kapacitetsomkostninger og overskud.'],['Hvordan beregnes dækningsgrad?','Dækningsbidrag / omsætning × 100 %.'],['Hvordan beregnes nulpunktsomsætning?','Kapacitetsomkostninger / dækningsgrad som decimaltal. Fx 100.000 / 0,40 = 250.000 kr.'],['Hvad er sikkerhedsmargin?','Omsætning minus nulpunktsomsætning. I procent: forskellen / omsætning × 100.'],['Hvad viser en balance?','Aktiver samt egenkapital og gæld på en bestemt dato. Aktiver = passiver.'],['Hvad viser en resultatopgørelse?','Periodens indtægter og omkostninger samt det resulterende overskud eller underskud.'],['Hvordan beregnes likviditetsgrad?','Omsætningsaktiver / kortfristet gæld × 100 %. Denne version medregner varebeholdninger.'],['Hvordan beregnes soliditetsgrad?','Egenkapital / aktiver i alt × 100 %. Viser andelen finansieret med egenkapital.'],['Hvordan beregnes afkastningsgrad?','Resultat før finansielle omkostninger / gennemsnitlige aktiver × 100 % (typisk HHX-definition).'],['Hvordan beregnes overskudsgrad?','Resultat før finansielle omkostninger / omsætning × 100 %.'],['Hvordan beregnes aktivernes omsætningshastighed?','Omsætning / gennemsnitlige aktiver. Viser udnyttelsen af den investerede kapital.'],['Hvad er forskellen på indtjening og likviditet?','Indtjening handler om indtægter minus omkostninger; likviditet handler om evnen til at betale til tiden.']
],quiz:[
['Pris 500 kr., variable omkostninger 300 kr. Hvad er DB pr. stk.?',['800 kr.','200 kr.','300 kr.','60 %'],1,'DB = 500 − 300 = 200 kr.'],['Hvad er dækningsgraden, når DB er 200 og pris er 500?',['20 %','60 %','40 %','250 %'],2,'DG = 200 / 500 × 100 = 40 %.'],['Kapacitetsomkostninger 100.000 kr., DG 25 %. Hvad er nulpunktsomsætningen?',['25.000 kr.','125.000 kr.','250.000 kr.','400.000 kr.'],3,'100.000 / 0,25 = 400.000 kr.'],['Egenkapital 300.000, aktiver 1.000.000. Soliditetsgrad?',['30 %','70 %','300 %','3 %'],0,'300.000 / 1.000.000 × 100 = 30 %.'],['Hvad viser balancen?',['Kun indtægter i perioden','Aktiver og passiver på en dato','Kun indbetalinger','Kun overskuddet'],1,'Balancen er et øjebliksbillede af økonomien.'],['Omsætningsaktiver 200.000, kortfristet gæld 100.000. Likviditetsgrad?',['50 %','100 %','200 %','2 %'],2,'200.000 / 100.000 × 100 = 200 %.']
]}
];

/* Lagerlaget håndterer blokeret lager, fuld kvote og beskadigede data. */
const PREFIX = 'palace.v1.';
let storageAvailable = true;
const data = {};
let settings = {theme:'system',subject:'afsaetning'};
function seed(s) { return {goals:'',notes:'',exam:'',cards:s.cards.map((c,i)=>({id:`${s.id}-${i}`,q:c[0],a:c[1],known:false})),sources:[],quizBest:0,quizAttempts:0,templates:{},answers:{}}; }
try { settings = {...settings,...JSON.parse(localStorage.getItem(PREFIX+'settings') || '{}')}; } catch { storageAvailable = false; }
function validSubject(d) {
  const str = (x,n) => typeof x === 'string' && x.length <= n;
  return d && str(d.goals,8000) && str(d.notes,150000) && str(d.exam,10) && (!d.exam || /^\d{4}-\d{2}-\d{2}$/.test(d.exam) && !isNaN(Date.parse(d.exam))) &&
    Array.isArray(d.cards) && d.cards.length<=1000 && new Set(d.cards.map(c=>c.id)).size===d.cards.length && d.cards.every(c=>str(c.id,100)&&str(c.q,3000)&&c.q.trim()&&str(c.a,10000)&&typeof c.known==='boolean') &&
    Array.isArray(d.sources) && d.sources.length<=100 && new Set(d.sources.map(s=>s.id)).size===d.sources.length && d.sources.every(s=>str(s.id,100)&&str(s.name,500)&&str(s.type,100)&&str(s.content,2200000)&&typeof s.size==='number'&&s.size>=0&&str(s.text,1600000)&&validSource(s)) &&
    Number.isFinite(d.quizBest)&&d.quizBest>=0&&d.quizBest<=100 && Number.isInteger(d.quizAttempts)&&d.quizAttempts>=0 &&
    d.templates && typeof d.templates==='object' && !Array.isArray(d.templates) && Object.entries(d.templates).every(([k,v])=>str(k,100)&&str(v,150000)) &&
    d.answers && typeof d.answers==='object' && !Array.isArray(d.answers) && Object.entries(d.answers).every(([k,v])=>str(k,100)&&str(v,150000));
}
function validSource(s) { return ['text/plain','text/markdown','text/csv'].includes(s.type) ? s.content==='' : /^(application\/pdf|image\/(png|jpeg|webp|gif))$/.test(s.type) && s.content.startsWith(`data:${s.type};base64,`) && /^[A-Za-z0-9+/=]*$/.test(s.content.split(',')[1] || ''); }
const recoveryWarnings = [];
for (const s of SUBJECTS) {
  try { const raw=localStorage.getItem(PREFIX+s.id); const d=raw?JSON.parse(raw):null; data[s.id]=d&&validSubject(d)?d:seed(s); if(raw&&!validSubject(d)) recoveryWarnings.push(s.name); }
  catch { data[s.id]=seed(s); storageAvailable=false; }
}
let subject = SUBJECTS.find(s=>s.id===settings.subject) || SUBJECTS.find(s=>s.id==='afsaetning');
let view='home', flashIndex=0, flashReverse=false, quiz=null, openIndex=0, revealed=false, vocabIndex=0, vocabReverse=false, vocabChecked=false;
let speech=null, timerInterval=null, timerSeconds=0, storyIndex=0, selectedEvent=null, lawSlots=Array(6).fill(null), drawingCleanup=null;
const main=$('#main');
function current() { return data[subject.id]; }
function persist(id=subject.id) {
  try { localStorage.setItem(PREFIX+id,JSON.stringify(data[id])); storageAvailable=true; return true; }
  catch { storageAvailable=false; toast('Lageret er fuldt eller blokeret. Eksportér en backup. Nye ændringer er kun i denne åbne fane.'); return false; }
}
function saveSettings() { try { localStorage.setItem(PREFIX+'settings',JSON.stringify(settings)); } catch { /* Fagindhold påvirkes ikke af en tema-fejl. */ } }
let toastTimeout;
function toast(text) { $('#toast').textContent=text; $('#toast').classList.add('show'); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>$('#toast').classList.remove('show'),5500); }
function percent(d) { return d.cards.length ? Math.round(d.cards.filter(c=>c.known).length/d.cards.length*100):0; }
function examLabel(date) {
  if(!date) return 'Tilføj en eksamensdato';
  const now=new Date(); now.setHours(0,0,0,0); const target=new Date(date+'T00:00:00');
  const days=Math.round((target-now)/86400000);
  return days>0?`${days} dag${days===1?'':'e'} til eksamen`:days===0?'Eksamen i dag · du kan godt!':'Eksamensdatoen er passeret';
}
function theme() {
  const choice=['system','light','dark'].includes(settings.theme)?settings.theme:'system';
  const dark=choice==='dark'||choice==='system'&&matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme=dark?'dark':'light';
  $('#theme-button').innerHTML=icon(dark?'moon':'sun');
  $('#theme-button').title=`Tema: ${{system:'system',light:'lyst',dark:'mørkt'}[choice]}. Klik for at skifte.`;
  $('#theme-button').setAttribute('aria-label',$('#theme-button').title);
  if(view==='extra'&&subject.id==='matematik') requestAnimationFrame(drawGraph);
}
function closeSidebar() { $('#sidebar').classList.remove('open'); $('#sidebar-scrim').hidden=true; $('#menu-button').setAttribute('aria-expanded','false'); if(innerWidth<=700) $('#sidebar').inert=true; }
function updateSidebar() {
  document.documentElement.style.setProperty('--subject-color',subject.color);
  $('#subject-select').value=subject.id;
  $('#subject-icon').innerHTML=icon(subject.icon);
  $('#panel-subject-icon').innerHTML=icon(subject.icon);
  $('#panel-subject-name').textContent=subject.name;
  $('#learning-goals').value=current().goals;
  $('#source-count').textContent=current().sources.length;
  $('#home-button').classList.toggle('active',view==='home');
  $('#source-list').innerHTML=current().sources.map(s=>`<li><button class="source-open" data-source="${esc(s.id)}" title="Åbn ${esc(s.name)}">${icon('file')}<span>${esc(s.name)}</span></button><button class="icon-button danger" data-delete-source="${esc(s.id)}" aria-label="Slet ${esc(s.name)}">${icon('close')}</button></li>`).join('');
  $('#storage-size').textContent=current().sources.length?`${(current().sources.reduce((n,s)=>n+s.size,0)/1024).toFixed(0)} KB i faget`:'Kun på din enhed';
  renderTools();
}
const GROUPS=[['Læring',[['guided','Guidet læring','sparkle'],['notes','Noter','note'],['podcast','Podcast','headphones'],['video','Videoer','video']]],['Eksamen',[['oral','Mundtlig eksamen','oral'],['written','Skriftlig eksamen','pen']]],['Øv dig',[['flashcards','Flashcards','cards'],['quiz','Multiple choice','quiz'],['open','Åbne spørgsmål','message'],['mixed','Lidt af hvert','shuffle']]]];
function extraName() { return subject.language?'Glosetræning':({matematik:'Formler & graftegner',voe:'Økonomiske regnemaskiner',afsaetning:'SWOT & Porters fem kræfter',jura:'Tegn aftalemodellen',dansk:'Analyse & disposition',historie:'Kildeanalyse & disposition'}[subject.id]||'Fagligt overblik'); }
function renderTools() {
  $('#tool-groups').innerHTML=GROUPS.map(([group,tools])=>`<section class="tool-group"><h3>${group}</h3><div class="tool-grid">${tools.map(([id,name,ic])=>`<button class="tool-card ${view===id?'is-active':''}" data-view="${id}" title="${esc(name)} i ${esc(subject.name)}">${icon(ic)}<span>${name}</span></button>`).join('')}</div></section>`).join('');
  let old=$('.tool-extra',$('.study-panel')); if(old) old.remove();
  $('.study-panel').insertAdjacentHTML('beforeend',`<button class="tool-extra" data-view="extra">${icon(subject.icon)}${extraName()}${icon('right')}</button>`);
}
function stopActivity() { if(speech && 'speechSynthesis' in window) speechSynthesis.cancel(); speech=null; clearInterval(timerInterval); timerInterval=null; drawingCleanup?.(); drawingCleanup=null; }
function go(next,focus=false) {
  stopActivity(); view=next; $('#search').value=''; $('#chat-messages').replaceChildren();
  main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter');
  updateSidebar();
  $('#breadcrumb').textContent=next==='home'?'Dit overblik':subject.name;
  const renders={home:renderHome,subject:renderSubject,flashcards:renderFlashcards,quiz:renderQuiz,notes:renderNotes,guided:renderGuided,podcast:renderPodcast,video:renderVideo,oral:renderOral,written:renderWritten,open:renderOpen,mixed:renderMixed,extra:renderExtra};
  (renders[next]||renderHome)(); closeSidebar();
  if(focus) { main.focus({preventScroll:true}); main.scrollIntoView({block:'start',behavior:'instant'}); }
}
function chooseSubject(id) {
  if(!SUBJECTS.some(s=>s.id===id)) return;
  subject=SUBJECTS.find(s=>s.id===id); settings.subject=id; saveSettings(); flashIndex=0; flashReverse=false; quiz=null; openIndex=0; revealed=false; vocabIndex=0; vocabReverse=false; vocabChecked=false; lawSlots=Array(6).fill(null); selectedEvent=null;
  go('subject',true);
}
function viewHeader(title,subtitle='') { return `<div class="view-header"><div><div class="eyebrow">${esc(subject.name)}</div><h1>${title}</h1></div><button class="icon-button" data-view="subject" aria-label="Tilbage til faget">${icon('close')}</button></div>${subtitle?`<p class="view-description">${subtitle}</p>`:''}`; }
function renderHome() {
  const cards=Object.values(data).reduce((n,d)=>n+d.cards.length,0),known=Object.values(data).reduce((n,d)=>n+d.cards.filter(c=>c.known).length,0);
  main.innerHTML=`<div class="overline"><span class="status-dot"></span>PLADS TIL AT BLIVE KLOGERE</div><section class="hero"><h1>Store idéer starter<br>med <em>små skridt.</em></h1><p>Velkommen til dit studierum. Saml dit pensum, få styr på begreberne, og mød op med ro i maven.</p><button class="pill" data-subject="${subject.id}">Fortsæt med ${esc(subject.name)} ${icon('arrow')}</button></section><div class="overview-stats"><div><strong>10</strong><span>fag, ét sted</span></div><div><strong>${cards}</strong><span>flashcards klar</span></div><div><strong>${known}</strong><span>begreber du kan</span></div></div><div class="section-heading"><h2>Alle dine fag</h2><span class="tiny">Din fremgang · kort du kan</span></div><div class="subject-grid">${SUBJECTS.map((s,i)=>`<button class="subject-card" style="--subject-color:${s.color};--i:${i}" data-subject="${s.id}" aria-label="${s.name}, ${percent(data[s.id])} procent lært"><span class="subject-card-top"><span class="subject-bubble">${icon(s.icon)}</span><span class="subject-title">${s.name}<span class="subject-level">${s.level}</span></span>${icon('right').replace('<svg ','<svg class="card-arrow" ')}</span><span class="card-meta"><span>${data[s.id].cards.filter(c=>c.known).length} af ${data[s.id].cards.length} begreber</span><span>${percent(data[s.id])}%</span></span><span class="progress" role="progressbar" aria-label="Fremgang i ${s.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent(data[s.id])}"><span style="width:${percent(data[s.id])}%"></span></span>${data[s.id].exam?`<span class="exam-mini">${icon('clock')} ${examLabel(data[s.id].exam)}</span>`:''}</button>`).join('')}</div>`;
}
function renderSubject() {
  const d=current();
  main.innerHTML=`<div class="overline"><span class="status-dot"></span>${esc(subject.name)} <span>· ${esc(subject.level)}</span></div><section class="hero"><h1>Start med at uploade<br><em>dit fags filer.</em></h1><p>Et kapitel, en opgave eller dine egne noter. Saml det her, og giv din næste læsesession et godt udgangspunkt.</p><button class="pill" id="hero-upload">${icon('plus')} Tilføj dine første kilder</button></section><div class="quick-grid"><button class="quick-card" data-view="flashcards">${icon('cards')}<strong>Vend en ny tanke</strong><small>${d.cards.length} flashcards klar</small></button><button class="quick-card" data-view="quiz">${icon('quiz')}<strong>Test din viden</strong><small>6 spørgsmål · ca. 3 min.</small></button><button class="quick-card" data-view="notes">${icon('note')}<strong>Saml dine tanker</strong><small>Dine noter, dit overblik</small></button></div><div class="card"><div class="section-heading" style="margin-top:0"><h2>Du bygger videre</h2><span class="tiny">${percent(d)}% af kortene lært</span></div><div class="progress"><span style="width:${percent(d)}%"></span></div><p style="margin:13px 0 0">${d.cards.filter(c=>c.known).length} af ${d.cards.length} begreber markeret som “kan”. ${d.quizAttempts?`Din bedste quizscore er ${d.quizBest}%.`:'Start med et par flashcards og find dit fokus.'}</p></div><button class="tool-extra" data-view="extra">${icon(subject.icon)}${extraName()}${icon('right')}</button><div class="exam-setting"><div><label for="exam-date">En dato at arbejde hen imod</label><small id="exam-countdown">${examLabel(d.exam)}</small></div><input id="exam-date" type="date" aria-label="Eksamensdato for ${esc(subject.name)}" value="${d.exam}"></div>`;
}

/* Flashcards: 3D-flip, vurdering, redigering, genveje og swipe. */
function renderFlashcards() {
  const cards=current().cards; flashIndex=Math.max(0,Math.min(flashIndex,cards.length-1)); const c=cards[flashIndex];
  main.innerHTML=viewHeader('Vend en ny tanke','Prøv at svare, før du vender kortet. Markér derefter, hvor sikkert begrebet sidder.')+`<div class="flash-toolbar"><span>${c?`Kort ${flashIndex+1} af ${cards.length}`:'Ingen kort endnu'}</span><span>${percent(current())}% lært</span></div><div class="progress" role="progressbar" aria-label="Indlærte kort" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent(current())}"><span style="width:${percent(current())}%"></span></div>`+(c?`<div class="flash-stage" id="flash-stage"><button class="flashcard" id="flashcard" aria-label="Vend flashcard" aria-pressed="false"><span class="flash-face flash-front"><span class="eyebrow">${c.known?'✓ KAN ALLEREDE':'TÆNK DIG OM ET ØJEBLIK'}</span><strong>${esc(flashReverse?c.a:c.q)}</strong><span class="flash-hint">Klik eller tryk mellemrum for at vende</span></span><span class="flash-face flash-back" aria-hidden="true"><span class="eyebrow">FORKLARING</span><strong>${esc(flashReverse?c.q:c.a)}</strong><span class="flash-hint">Kunne du svaret?</span></span></button></div><div class="flash-actions"><button class="bad-button" id="card-unknown">${icon('refresh')} Kan ikke endnu</button><button class="good-button" id="card-known">${icon('check')} Den kan jeg</button></div><div class="flash-nav"><button class="secondary" id="card-prev" aria-label="Forrige kort">${icon('left')}</button><span class="tiny">← → Skift kort · Mellemrum: vend<br>Swipe til siden på mobil</span><button class="secondary" id="card-next" aria-label="Næste kort">${icon('right')}</button></div>`:`<div class="empty-state">Dine egne begreber starter her. Tilføj dit første kort nedenfor.</div>`)+`<div class="button-row" style="margin-top:25px"><button class="secondary" id="add-card">${icon('plus')} Nyt kort</button><button class="secondary" id="manage-cards">${icon('pen')} Redigér kort</button>${subject.language?`<button class="secondary" id="reverse-cards">${icon('shuffle')} ${flashReverse?'Dansk → sprog':'Sprog → dansk'}</button>`:''}</div>`;
  if(c) {
    let startX=null,startY=0;
    $('#flash-stage').addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;});
    $('#flash-stage').addEventListener('pointerup',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>55&&Math.abs(e.clientY-startY)<65){flashIndex=(flashIndex+(e.clientX<startX?1:-1)+cards.length)%cards.length;renderFlashcards();}startX=null;});
    $('#flash-stage').addEventListener('pointercancel',()=>startX=null);
  }
}
function flipCard() { const el=$('#flashcard'); if(!el)return; const flipped=el.classList.toggle('flipped'); el.setAttribute('aria-pressed',String(flipped)); $('.flash-front',el).setAttribute('aria-hidden',String(flipped)); $('.flash-back',el).setAttribute('aria-hidden',String(!flipped)); }
function moveCard(delta) { if(!current().cards.length)return; flashIndex=(flashIndex+delta+current().cards.length)%current().cards.length; renderFlashcards(); }
function rateCard(known) { if(!current().cards.length)return; current().cards[flashIndex].known=known; persist(); if(known)toast('Godt gået. Ét begreb mere på plads.'); moveCard(1); }
function showDialog(title,body) { $('#dialog-content').innerHTML=`<div class="dialog-heading"><h2 id="dialog-title">${title}</h2><button class="icon-button" id="close-dialog" aria-label="Luk dialog">${icon('close')}</button></div><div class="dialog-body">${body}</div>`; if(!$('#dialog').open)$('#dialog').showModal(); }
function cardEditor(id) {
  const c=current().cards.find(c=>c.id===id);
  showDialog(c?'Redigér flashcard':'Et nyt begreb',`<form id="card-form"><label class="field">Forside / spørgsmål<textarea name="q" maxlength="3000" required>${esc(c?.q||'')}</textarea></label><label class="field">Bagside / svar<textarea name="a" maxlength="10000" required>${esc(c?.a||'')}</textarea></label><div class="button-row"><button class="primary" type="submit">Gem kort</button><button class="secondary" type="button" id="cancel-dialog">Annuller</button></div></form>`);
  $('#card-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),q=f.get('q').trim(),a=f.get('a').trim();if(!q||!a)return toast('Udfyld både spørgsmål og svar.');if(c)Object.assign(c,{q,a,known:false});else{if(current().cards.length>=1000)return toast('Der kan højst være 1.000 kort pr. fag.');current().cards.push({id:uid(),q,a,known:false});flashIndex=current().cards.length-1;}persist();$('#dialog').close();renderFlashcards();};
}
function manageCards() {
  showDialog('Dine flashcards',`<p>Redigér et begreb eller fjern et kort, du ikke skal bruge.</p><ul class="manage-list">${current().cards.map(c=>`<li><span class="manage-text">${esc(c.q)}<small>${esc(c.a)}</small></span><button class="icon-button" data-edit-card="${esc(c.id)}" aria-label="Redigér ${esc(c.q)}">${icon('pen')}</button><button class="icon-button danger" data-delete-card="${esc(c.id)}" aria-label="Slet ${esc(c.q)}">${icon('trash')}</button></li>`).join('')||'<li>Ingen kort endnu.</li>'}</ul>`);
}

/* Quizzen låser svaret før feedback. Resultater gemmes kun ved afsluttet quiz. */
function newQuiz() { quiz={index:0,score:0,answers:[],choices:subject.quiz.map(q=>q[1].map((text,i)=>({text,correct:i===q[2]})).sort(()=>Math.random()-.5)),finished:false}; renderQuiz(); }
function renderQuiz() {
  if(!quiz){newQuiz();return;}
  if(quiz.finished){renderResult();return;}
  const q=subject.quiz[quiz.index],answered=quiz.answers[quiz.index];
  main.innerHTML=viewHeader('Et spørgsmål ad gangen')+`<div class="flash-toolbar"><span>Spørgsmål ${quiz.index+1} af ${subject.quiz.length}</span><span>${quiz.score} rigtige</span></div><div class="progress"><span style="width:${quiz.index/subject.quiz.length*100}%"></span></div><h2 class="quiz-question">${esc(q[0])}</h2><div class="quiz-options">${quiz.choices[quiz.index].map((o,i)=>`<button class="quiz-option ${answered!==undefined?(o.correct?'correct':i===answered?'wrong':''):''}" data-answer="${i}" ${answered!==undefined?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(o.text)}</span>${answered!==undefined&&o.correct?icon('check'):''}</button>`).join('')}</div>${answered!==undefined?`<div class="feedback" role="status"><strong>${quiz.choices[quiz.index][answered].correct?'✓ Rigtigt!':'↻ Næsten. Her er forklaringen:'}</strong><br>${esc(q[3])}</div><button class="primary" id="quiz-next">${quiz.index===subject.quiz.length-1?'Se dit resultat':'Næste spørgsmål'} ${icon('arrow')}</button>`:'<p class="tiny" style="margin-top:18px">Tag dig god tid. Det er øvelse, ikke en eksamen.</p>'}`;
}
function answerQuiz(index) { if(!quiz||quiz.finished||quiz.answers[quiz.index]!==undefined||!quiz.choices[quiz.index][index])return;quiz.answers[quiz.index]=index;if(quiz.choices[quiz.index][index].correct)quiz.score++;renderQuiz(); }
function nextQuiz() {
  if(quiz.answers[quiz.index]===undefined)return;
  if(quiz.index<subject.quiz.length-1){quiz.index++;renderQuiz();}
  else{quiz.finished=true;const p=Math.round(quiz.score/subject.quiz.length*100);current().quizBest=Math.max(current().quizBest,p);current().quizAttempts++;persist();renderResult();}
}
function renderResult() {
  const p=Math.round(quiz.score/subject.quiz.length*100);
  main.innerHTML=viewHeader('Du rykkede dig')+`<div class="result">${Array.from({length:18},(_,i)=>`<i class="confetti" style="left:${5+i*5}%;background:${[subject.color,'#c7af81','#b5c5a2'][i%3]};animation-delay:${i*.035}s"></i>`).join('')}<div class="score-ring"><strong id="score-counter">${p}%</strong><small>${quiz.score} af ${subject.quiz.length} rigtige</small></div><h2>${p>=80?'Det sidder godt fast.':p>=50?'Godt på vej.':'Et godt sted at starte.'}</h2><p class="view-description">${p>=80?'Prøv at forklare begreberne højt med dine egne ord.':'Gå tilbage til kortene og brug lidt ekstra tid på de svære begreber.'}</p><div class="button-row" style="justify-content:center"><button class="primary" id="restart-quiz">Prøv igen</button><button class="secondary" data-view="flashcards">Øv med flashcards</button></div></div><div class="section-heading"><h2>Dine svar</h2></div>${subject.quiz.map((q,i)=>`<div class="card"><p><strong class="${quiz.choices[i][quiz.answers[i]].correct?'success':'danger'}">${quiz.choices[i][quiz.answers[i]].correct?'✓':'↻'} ${esc(q[0])}</strong></p><p>${esc(q[3])}</p></div>`).join('')}`;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const start=performance.now();function count(t){if(view!=='quiz'||!$('#score-counter'))return;const f=Math.min(1,(t-start)/650);$('#score-counter').textContent=Math.round(p*f)+'%';if(f<1)requestAnimationFrame(count);}requestAnimationFrame(count);}
}
function renderNotes() { main.innerHTML=viewHeader('Plads til dine tanker','Skriv med dine egne ord. Noterne gemmes automatisk i dette fag, mens du skriver.')+`<div class="button-row" style="margin-bottom:15px"><button class="secondary" id="notes-template">${icon('note')} Indsæt notestruktur</button><button class="secondary" id="download-notes">${icon('download')} Hent .txt</button></div><label class="sr-only" for="notes-editor">Noter til ${esc(subject.name)}</label><textarea id="notes-editor" class="notes-editor" maxlength="150000" placeholder="Hvad har du lært i dag? Skriv et begreb, et eksempel og det, du stadig er i tvivl om…">${esc(current().notes)}</textarea><div class="editor-status"><span id="notes-status">${storageAvailable?'Gemt på din enhed':'Kun i denne åbne fane'}</span><span id="word-count">${wordCount(current().notes)} ord</span></div>`; }
function wordCount(t) { return t.trim()?t.trim().split(/\s+/).length:0; }

/* Supplerende studietilstande bruger det lokale indhold, aldrig skjult AI. */
function renderGuided() {
  const unknown=current().cards.find(c=>!c.known)||current().cards[0];
  main.innerHTML=viewHeader('En lille plan. Mere overblik.','En lokal læserutine, der bruger dine læringsmål og dine flashcards.')+`<div class="card"><div class="eyebrow">DIT FOKUS I DAG</div><p>${esc(current().goals||'Vælg ét begreb, du vil kunne forklare uden at kigge i noterne.')}</p><ol class="steps"><li><span><strong>2 min. · Find dit udgangspunkt</strong><br>Læs dine læringsmål. Vælg én kilde eller et begreb.</span></li><li><span><strong>4 min. · Genkald aktivt</strong><br>${unknown?`Prøv at forklare: ${esc(unknown.q)}`:'Tilføj først nogle flashcards.'}</span></li><li><span><strong>3 min. · Test forståelsen</strong><br>Tag quizzen. Skriv en forklaring til et svar, du var i tvivl om.</span></li><li><span><strong>1 min. · Luk løkken</strong><br>Skriv én ting, du har lært, og én ting, du vil øve næste gang.</span></li></ol><div class="button-row"><button class="primary" data-view="flashcards">Start med flashcards ${icon('arrow')}</button><button class="secondary" data-view="notes">Åbn noter</button></div></div>`;
}
function renderPodcast() {
  const available='speechSynthesis' in window;
  main.innerHTML=viewHeader('Lyt dig til et overblik','Lokal oplæsning af dine noter eller flashcards med browserens stemme. Det er en oplæsningsfunktion, ikke en AI-genereret podcast.')+`<div class="card"><div class="eyebrow">LYDNOTER · ${esc(subject.name)}</div><h3>Tag dine begreber med på en gåtur.</h3><p>Vælg dit indhold. Dansk oplæsning bruges til forklaringer; en installeret stemme kan variere mellem enheder.</p><div class="audio-controls"><select id="audio-source" aria-label="Vælg indhold til oplæsning"><option value="cards">Flashcards</option><option value="notes">Mine noter</option></select><select id="audio-speed" aria-label="Oplæsningshastighed"><option value="0.85">0,85×</option><option value="1" selected>1×</option><option value="1.15">1,15×</option></select><button class="primary" id="audio-play" ${available?'':'disabled'}>${icon('play')} Lyt</button><button class="secondary" id="audio-stop">Stop</button></div><p id="audio-status" role="status" style="margin:18px 0 0">${available?'Klar til at læse op.':'Din browser understøtter ikke oplæsning. Brug noter eller flashcards.'}</p></div>`;
}
function playAudio() {
  if(!('speechSynthesis' in window))return;
  speechSynthesis.cancel();const text=$('#audio-source').value==='notes'?current().notes:current().cards.map(c=>c.q+'. '+c.a).join('\n');
  if(!text.trim())return toast('Der er ikke noget at læse op endnu.');
  speech=new SpeechSynthesisUtterance(text);speech.lang='da-DK';speech.rate=Number($('#audio-speed').value);speech.onend=()=>{if($('#audio-status'))$('#audio-status').textContent='Færdig. Prøv at genkalde tre begreber.';};speech.onerror=()=>{if($('#audio-status'))$('#audio-status').textContent='Oplæsningen blev afbrudt eller er ikke tilgængelig.';};speechSynthesis.speak(speech);$('#audio-status').textContent='Læser op…';
}
function renderVideo() {
  const cards=current().cards; storyIndex=cards.length?storyIndex%cards.length:0; const c=cards[storyIndex];
  main.innerHTML=viewHeader('Begreber i billeder','Et lokalt mini-slideshow til repetition. Palace indeholder ikke videooptagelser eller AI-genererede videoer.')+(c?`<div class="story-slide"><div class="eyebrow">${storyIndex+1} / ${cards.length}</div><h3>${esc(c.q)}</h3><p>${esc(c.a)}</p></div><div class="button-row"><button class="secondary" id="story-prev">${icon('left')} Forrige</button><button class="primary" id="story-next">Næste ${icon('right')}</button></div>`:'<div class="empty-state">Tilføj flashcards for at lave et slideshow.</div>');
}
function renderOral() {
  main.innerHTML=viewHeader('Øv din mundtlige forklaring','En selvstyret prøve. Palace vurderer ikke dit svar, men hjælper dig med at holde fokus og tiden.')+`<div class="card"><div class="eyebrow">DIN TRÆKNING</div><h3 id="oral-question">${esc(current().cards[openIndex%Math.max(1,current().cards.length)]?.q||'Forklar et centralt begreb fra faget.')}</h3><p>Forklar begrebet, giv et eksempel, og perspektivér til en virksomhed eller problemstilling.</p><div class="timer" id="timer">02:00</div><div class="button-row"><button class="primary" id="timer-start">${icon('play')} Start 2 minutter</button><button class="secondary" id="timer-stop">Stop</button><button class="secondary" id="oral-new">Nyt spørgsmål</button></div></div><div class="card"><h3>Giv dig selv feedback</h3><label class="field">Hvad gik godt, og hvad vil du forbedre?<textarea data-answer-field="oral" maxlength="150000">${esc(current().answers.oral||'')}</textarea></label><p style="margin:13px 0 0">Tjek: fagbegreber · konkrete eksempler · klar struktur · perspektivering.</p></div>`;
}
function startTimer() { clearInterval(timerInterval);timerSeconds=120;$('#timer').textContent='02:00';timerInterval=setInterval(()=>{timerSeconds--;if(!$('#timer')){clearInterval(timerInterval);return;}$('#timer').textContent=`${String(Math.floor(timerSeconds/60)).padStart(2,'0')}:${String(timerSeconds%60).padStart(2,'0')}`;if(timerSeconds<=0){clearInterval(timerInterval);timerInterval=null;toast('Tiden er gået. Skriv én ting, du vil gøre bedre næste gang.');}},1000); }
function renderWritten() {
  main.innerHTML=viewHeader('Fra begreb til besvarelse','Øv en kort faglig besvarelse. Teksten gemmes automatisk i dit valgte fag.')+`<div class="card"><div class="eyebrow">ØVEOPGAVE</div><h3>Undersøg en virksomhed eller en faglig problemstilling.</h3><p>1. Redegør for to relevante begreber fra ${esc(subject.name)}.<br>2. Anvend dem på et konkret eksempel og forklar dine valg.<br>3. Vurdér, hvad modellen eller forklaringen kan — og hvor dens begrænsninger ligger.</p></div><label class="sr-only" for="written-answer">Din skriftlige besvarelse</label><textarea id="written-answer" class="notes-editor" data-answer-field="written" maxlength="150000" placeholder="Redegørelse…\n\nAnalyse…\n\nVurdering…">${esc(current().answers.written||'')}</textarea><div class="editor-status"><span>Gemmes automatisk</span><button class="text-button" id="download-written">Hent besvarelse ${icon('download')}</button></div>`;
}
function renderOpen() {
  const cards=current().cards;const c=cards[openIndex%Math.max(1,cards.length)];
  main.innerHTML=viewHeader('Svar med dine egne ord','Forklar først uden hjælp. Sammenlign derefter med kortets faglige forklaring.')+(c?`<div class="overline">SPØRGSMÅL ${openIndex%cards.length+1} / ${cards.length}</div><h2 class="quiz-question">${esc(c.q)}</h2><label class="sr-only" for="open-answer">Dit svar</label><textarea id="open-answer" class="answer-area" data-answer-field="${esc(c.id)}" maxlength="150000" placeholder="Mit svar er…">${esc(current().answers[c.id]||'')}</textarea><div class="button-row"><button class="primary" id="reveal-open">${revealed?'Skjul':'Vis'} forklaring</button><button class="secondary" id="next-open">Næste spørgsmål ${icon('arrow')}</button></div>${revealed?`<div class="feedback"><strong>Faglig forklaring</strong><br>${esc(c.a)}<br><small>Sammenlign selv: Har du det centrale begreb, forklaringen og et eksempel med?</small></div>`:''}`:'<div class="empty-state">Tilføj et flashcard for at øve åbne spørgsmål.</div>');
}
function renderMixed() {main.innerHTML=viewHeader('En lille smule af det hele','Skift mellem at huske, anvende og forklare.')+`<div class="card"><ol class="steps"><li><span>Vend tre flashcards og markér din sikkerhed.</span></li><li><span>Tag seks multiple choice-spørgsmål.</span></li><li><span>Skriv et åbent svar med et konkret eksempel.</span></li></ol><div class="button-row"><button class="primary" data-view="flashcards">1 · Flashcards</button><button class="secondary" data-view="quiz">2 · Quiz</button><button class="secondary" data-view="open">3 · Forklar selv</button></div></div>`;}

/* Fagværktøjer: skabeloner, tal og tegninger bliver på enheden. */
function renderExtra() {if(subject.language)return renderVocab();if(subject.id==='matematik')return renderMath();if(subject.id==='voe')return renderCalculators();if(subject.id==='jura')return renderLaw();if(subject.id==='afsaetning')return renderMarketing();if(['dansk','historie'].includes(subject.id))return renderAnalysis();renderEconomy();}
function renderVocab() {
  const words=current().cards.slice(0,8); const c=words[vocabIndex%Math.max(1,words.length)];vocabChecked=false;
  main.innerHTML=viewHeader('Fra gloser til gode sætninger','Skriv oversættelsen. Accenter og bogstaver tæller; store bogstaver og ekstra mellemrum gør ikke.')+(c?`<div class="flash-toolbar"><span>Glose ${vocabIndex%words.length+1} af ${words.length}</span><button class="text-button" id="reverse-vocab">${icon('shuffle')} ${vocabReverse?'Dansk → sprog':'Sprog → dansk'}</button></div><div class="card"><div class="eyebrow">OVERSÆT TIL ${vocabReverse?subject.name.toUpperCase():'DANSK'}</div><div class="vocab-word">${esc(vocabReverse?c.a:c.q)}</div><form id="vocab-form" class="inline-form"><label class="sr-only" for="vocab-answer">Skriv oversættelse</label><input id="vocab-answer" autocomplete="off" required placeholder="Din oversættelse…"><button class="primary">Tjek</button></form><div id="vocab-feedback" role="status"></div></div><div class="button-row"><button class="secondary" id="vocab-next">Næste glose ${icon('arrow')}</button><button class="secondary" data-view="flashcards">Vendekort begge veje</button></div>`:'<div class="empty-state">Tilføj kort med glosen på forsiden og oversættelsen på bagsiden.</div>');
}
function checkVocab(e) {e.preventDefault();const words=current().cards.slice(0,8),c=words[vocabIndex%words.length];const correct=normalize($('#vocab-answer').value).replace(/\s+/g,' ')===normalize(vocabReverse?c.q:c.a).replace(/\s+/g,' ');vocabChecked=true;$('#vocab-feedback').innerHTML=`<div class="feedback"><strong class="${correct?'success':'danger'}">${correct?'✓ Rigtigt!':'↻ Øv den én gang mere.'}</strong><br>Oversættelse: ${esc(vocabReverse?c.q:c.a)}</div>`;if(correct&&!c.known){c.known=true;persist();}}
function renderMath() {
  main.innerHTML=viewHeader('Se sammenhængen','En lille formelsamling og en graftegner til lineære funktioner og parabler.')+`<div class="card"><h3>Tegn f(x) = ax² + bx + c</h3><p>Sæt a = 0 for en ret linje. Grafen viser x fra −10 til 10. Y-aksen tilpasses automatisk.</p><div class="form-grid"><label class="field">a<input id="graph-a" type="number" value="1" step="any"></label><label class="field">b<input id="graph-b" type="number" value="-6" step="any"></label><label class="field">c<input id="graph-c" type="number" value="-7" step="any"></label></div><canvas class="graph-canvas" id="graph" role="img" aria-label="Graf for andengradsfunktionen"></canvas><div class="feedback" id="graph-info" role="status"></div></div><div class="card"><h3>Lineær funktion</h3><div class="formula">f(x) = ax + b</div><p>a er hældning. b er skæringen med y-aksen.</p><h3>Andengradsfunktion</h3><div class="formula">d = b² − 4ac<br>x = <span>(−b ± √d) / (2a)</span><br>T = (−b / 2a, f(−b / 2a))</div><p>Rodformlen kræver a ≠ 0 og d ≥ 0.</p><h3>Differentialregning</h3><div class="formula">(xⁿ)′ = n · xⁿ⁻¹<br>y = f′(x₀) · (x − x₀) + f(x₀)</div><h3>Eksponentiel vækst</h3><div class="formula">f(x) = b · aˣ &nbsp; a = 1 + r</div></div>`;
  requestAnimationFrame(drawGraph);
}
function numberText(n) { return new Intl.NumberFormat('da-DK',{maximumFractionDigits:3}).format(n); }
function drawGraph() {
  const canvas=$('#graph');if(!canvas)return;const a=Number($('#graph-a').value),b=Number($('#graph-b').value),c=Number($('#graph-c').value);
  if(![a,b,c].every(n=>Number.isFinite(n)&&Math.abs(n)<=1e8)||['#graph-a','#graph-b','#graph-c'].some(s=>$(s).value==='')){$('#graph-info').textContent='Udfyld a, b og c med tal mellem −100.000.000 og 100.000.000.';return;}
  const width=canvas.clientWidth,height=310,dpr=devicePixelRatio||1;canvas.width=width*dpr;canvas.height=height*dpr;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const f=x=>a*x*x+b*x+c;const samples=Array.from({length:401},(_,i)=>f(-10+i/20));let lo=Math.min(0,...samples),hi=Math.max(0,...samples);if(hi-lo<2){lo-=1;hi+=1;}const pad=(hi-lo)*.1;lo-=pad;hi+=pad;
  const margin={l:49,r:14,t:20,b:30},w=width-margin.l-margin.r,h=height-margin.t-margin.b,X=x=>margin.l+(x+10)/20*w,Y=y=>margin.t+(hi-y)/(hi-lo)*h;const styles=getComputedStyle(document.documentElement);
  ctx.strokeStyle=styles.getPropertyValue('--line');ctx.fillStyle=styles.getPropertyValue('--muted');ctx.font='10px system-ui';ctx.lineWidth=1;
  for(let x=-10;x<=10;x+=2){ctx.beginPath();ctx.moveTo(X(x),margin.t);ctx.lineTo(X(x),height-margin.b);ctx.stroke();ctx.fillText(x,X(x)-6,height-10);}
  for(let i=0;i<=5;i++){const y=lo+(hi-lo)*i/5;ctx.beginPath();ctx.moveTo(margin.l,Y(y));ctx.lineTo(width-margin.r,Y(y));ctx.stroke();const text=Math.abs(y)>=10000?y.toExponential(1):numberText(y);ctx.fillText(text,3,Y(y)+3);}
  ctx.strokeStyle=styles.getPropertyValue('--muted');ctx.beginPath();ctx.moveTo(X(0),margin.t);ctx.lineTo(X(0),height-margin.b);ctx.moveTo(margin.l,Y(0));ctx.lineTo(width-margin.r,Y(0));ctx.stroke();
  ctx.strokeStyle=styles.getPropertyValue('--subject-color');ctx.lineWidth=2.5;ctx.beginPath();samples.forEach((y,i)=>{i?ctx.lineTo(X(-10+i/20),Y(y)):ctx.moveTo(X(-10),Y(y));});ctx.stroke();
  let info=`f(x) = ${numberText(a)}x² + (${numberText(b)})x + (${numberText(c)}). `;
  if(a!==0){const d=b*b-4*a*c,xt=-b/(2*a),yt=f(xt);info+=`Toppunkt: (${numberText(xt)}; ${numberText(yt)}). `;info+=d<0?'Ingen reelle nulpunkter.':`Nulpunkter: ${numberText((-b-Math.sqrt(d))/(2*a))}${d===0?'':` og ${numberText((-b+Math.sqrt(d))/(2*a))}`}.`;}
  else info+=b!==0?`Ret linje. Nulpunkt: ${numberText(-c/b)}.`:c===0?'Alle x er nulpunkter.':'Konstant funktion uden nulpunkter.';
  $('#graph-info').textContent=info;canvas.setAttribute('aria-label',info+' Visningsinterval: x fra minus 10 til 10.');
}
function renderCalculators() {
  main.innerHTML=viewHeader('Få styr på tallene','Indtast positive beløb. Resultaterne opdateres med det samme; priser og omkostninger skal være i samme enhed og normalt ekskl. moms.')+`<div class="card"><h3>Dækningsbidrag & nulpunkt</h3><div class="form-grid">${[['price','Salgspris pr. stk. (kr.)',500],['variable','Variable omk. pr. stk. (kr.)',300],['fixed','Kapacitetsomkostninger (kr.)',100000],['revenue','Faktisk omsætning (kr.)',400000]].map(([id,label,val])=>`<label class="field">${label}<input data-calc id="calc-${id}" type="number" min="0" step="any" value="${val}"></label>`).join('')}</div><div class="calc-result" id="db-result" role="status"></div></div><div class="card"><h3>Likviditetsgrad</h3><div class="form-grid"><label class="field">Omsætningsaktiver (kr.)<input data-calc id="calc-current" type="number" min="0" value="200000" step="any"></label><label class="field">Kortfristet gæld (kr.)<input data-calc id="calc-debt" type="number" min="0" value="100000" step="any"></label></div><div class="calc-result" id="liquidity-result" role="status"></div><p style="margin-top:12px">Her bruges omsætningsaktiver inkl. varebeholdninger. Sammenlign med virksomhedens branche og udvikling.</p></div><div class="card"><h3>Soliditetsgrad</h3><div class="form-grid"><label class="field">Egenkapital (kr.)<input data-calc id="calc-equity" type="number" value="300000" step="any"></label><label class="field">Aktiver i alt (kr.)<input data-calc id="calc-assets" type="number" min="0" value="1000000" step="any"></label></div><div class="calc-result" id="solvency-result" role="status"></div></div>`;calculate();
}
function calculate() {
  const val=id=>{const el=$('#calc-'+id);return el.value===''?NaN:Number(el.value);};const [p,v,f,r]=['price','variable','fixed','revenue'].map(val),[ca,debt,equity,assets]=['current','debt','equity','assets'].map(val);
  if(![p,v,f,r].every(n=>Number.isFinite(n)&&n>=0)||p<=0)$('#db-result').textContent='Udfyld ikke-negative beløb og en salgspris større end 0.';
  else {const db=p-v,dg=db/p;$('#db-result').innerHTML=`<strong>DB: ${numberText(db)} kr./stk.</strong><small>DB = ${numberText(p)} − ${numberText(v)} · DG = ${numberText(dg*100)} %</small>${dg>0?`<span>Nulpunktsomsætning: ${numberText(f/dg)} kr.</span><small>NPO = ${numberText(f)} / ${numberText(dg)} · Nulpunktsafsætning: ${Math.ceil(f/db)} stk.</small><span>Sikkerhedsmargin: ${numberText(r-f/dg)} kr. ${r>0?`(${numberText((r-f/dg)/r*100)} %)`:'(procent ikke defineret ved omsætning 0)'}</span>`:'<small>Et positivt dækningsbidrag kræves for at beregne et meningsfuldt nulpunkt.</small>'}`;}
  $('#liquidity-result').innerHTML=Number.isFinite(ca)&&ca>=0&&Number.isFinite(debt)&&debt>0?`<strong>${numberText(ca/debt*100)} %</strong><small>Omsætningsaktiver / kortfristet gæld × 100</small>`:'Indtast omsætningsaktiver ≥ 0 og kortfristet gæld > 0.';
  $('#solvency-result').innerHTML=Number.isFinite(equity)&&Number.isFinite(assets)&&assets>0?`<strong>${numberText(equity/assets*100)} %</strong><small>Egenkapital / aktiver i alt × 100</small>`:'Indtast egenkapital og aktiver i alt > 0.';
}
function templateField(key,label,hint) { return `<label class="field"><span>${label}</span><textarea data-template="${key}" maxlength="150000" placeholder="${hint}">${esc(current().templates[key]||'')}</textarea></label>`; }
function renderMarketing() {
  main.innerHTML=viewHeader('Gør modellerne til dine egne','Udfyld felterne med en virksomhed i tankerne. Dine analyser gemmes automatisk i Afsætning.')+`<div class="section-heading"><h2>SWOT-analyse</h2><span class="tiny">Internt øverst · eksternt nederst</span></div><div class="template-grid">${templateField('swot-s','S · STYRKER','Hvad gør virksomheden godt?')}${templateField('swot-w','W · SVAGHEDER','Hvor halter virksomheden internt?')}${templateField('swot-o','O · MULIGHEDER','Hvilke eksterne muligheder findes?')}${templateField('swot-t','T · TRUSLER','Hvilke eksterne forhold presser virksomheden?')}</div><div class="section-heading"><h2>Porters fem kræfter</h2><span class="tiny">Vurdér lav / middel / høj</span></div><div class="template-grid">${[['rival','RIVALISERING','Hvem konkurrerer, og hvordan?'],['new','NYE INDTRÆNGERE','Hvilke adgangsbarrierer findes?'],['sub','SUBSTITUTTER','Hvilke andre løsninger dækker behovet?'],['buyer','KUNDERNES STYRKE','Kan kunder let skifte eller presse prisen?'],['supplier','LEVERANDØRERNES STYRKE','Er virksomheden afhængig af få leverandører?']].map(([k,l,h])=>templateField('porter-'+k,l,h)).join('')}</div><div class="button-row" style="margin-top:18px"><button class="secondary" id="download-template">${icon('download')} Hent analyse</button><button class="secondary" id="print-template">Udskriv</button></div>`;
}
function renderAnalysis() {
  const history=subject.id==='historie';const fields=history?[['problem','PROBLEMSTILLING','Hvad vil du undersøge?'],['origin','OPHAV & KONTEKST','Hvem, hvornår, hvor og under hvilke forhold?'],['purpose','FORMÅL & TENDENS','Hvem er modtageren, og hvad vil afsenderen?'],['type','KILDETYPE & AFHÆNGIGHED','Førstehånd / andenhånd? Levn / beretning?'],['evidence','ANALYSE & BELÆG','Hvad viser konkrete uddrag?'],['conclusion','KONKLUSION & BEGRÆNSNING','Hvad kan kilden bruges til i forhold til spørgsmålet?']]:[['intro','PRÆSENTATION','Titel, afsender, årstal, genre og emne.'],['structure','KOMPOSITION & FORTÆLLER','Hvordan er teksten bygget op?'],['language','SPROG & VIRKEMIDLER','Billedsprog, ordvalg, retorik og konkrete eksempler.'],['interpret','ANALYSE & FORTOLKNING','Hvordan hænger virkemidler og tema sammen?'],['perspective','PERSPEKTIVERING','Periode, andre tekster eller samfund.'],['end','AFRUNDING','Saml tekstens vigtigste betydning og budskab.']];
  main.innerHTML=viewHeader(history?'Gå kilden efter i sømmene':'Giv analysen en rød tråd','En disposition, du kan udfylde løbende og bruge som afsæt for din opgave.')+`<div class="template-grid">${fields.map(([k,l,h])=>templateField(k,l,h)).join('')}</div><div class="button-row" style="margin-top:18px"><button class="secondary" id="download-template">${icon('download')} Hent disposition</button></div>`;
}
function renderEconomy() { main.innerHTML=viewHeader('Fra tal til forklaring','En enkel skabelon til økonomisk analyse.')+`<div class="template-grid">${[['indicator','INDIKATOR & DEFINITION','Hvilken økonomisk størrelse undersøger du?'],['data','DATA & UDVIKLING','Enhed, tidsperiode, kilde og udvikling.'],['cause','ÅRSAGER & SAMMENHÆNGE','Forklar udviklingen med fagbegreber.'],['policy','KONSEKVENSER & POLITIK','Hvem påvirkes, og hvilke tiltag er relevante?']].map(([k,l,h])=>templateField(k,l,h)).join('')}</div><button class="secondary" style="margin-top:18px" id="download-template">Hent analyse</button>`; }

/* Aftalemodellen kan bygges med mus, tastatur eller touch. Tegnefeltet er ekstra. */
const LAW_EVENTS=[{id:0,text:'TG afsender et tilbud.'},{id:1,text:'Tilbuddet kommer frem til TM.'},{id:2,text:'TM læser tilbuddet (kundskab).'}, {id:3,text:'TM sender en overensstemmende accept.'},{id:4,text:'Accepten kommer frem til TG inden fristen.'},{id:5,text:'TG læser accepten (kundskab).'}];
function renderLaw() {
  main.innerHTML=viewHeader('Byg aftalemodellen','Vælg en hændelse og derefter en plads på tidslinjen. Du kan også bruge tabulator og Enter.')+`<div class="notice">TG = tilbudsgiver · TM = tilbudsmodtager. Øvelsen viser et almindeligt forløb med rettidig, overensstemmende accept uden tilbagekaldelse.</div><div class="form-grid"><div><div class="eyebrow">HÆNDELSER</div><div class="event-pool">${[3,0,5,2,4,1].filter(id=>!lawSlots.includes(id)).map(id=>`<button class="event-token ${selectedEvent===id?'selected':''}" data-law-event="${id}" aria-pressed="${selectedEvent===id}">${LAW_EVENTS[id].text}</button>`).join('')||'<p class="tiny">Alle hændelser er placeret.</p>'}</div></div><div><div class="eyebrow">TIDSLINJE · FØRST TIL SIDST</div><div class="event-slots">${lawSlots.map((id,i)=>`<button class="event-slot ${id!==null?'filled':''}" data-law-slot="${i}" aria-label="Plads ${i+1}, ${id!==null?LAW_EVENTS[id].text:'tom'}"><span class="count">${i+1}</span>${id!==null?LAW_EVENTS[id].text:'Vælg en hændelse først'}</button>`).join('')}</div></div></div><div class="button-row" style="margin-top:18px"><button class="primary" id="check-law">Tjek rækkefølge</button><button class="secondary" id="reset-law">Start forfra</button></div><div id="law-feedback" role="status"></div><div class="section-heading"><h2>Tegn selv</h2><button class="text-button" id="clear-drawing">Ryd tegning</button></div><p class="tiny">Tegn pile mellem TG (venstre) og TM (højre). Tegningen gemmes i faget, men bedømmes ikke automatisk.</p><canvas id="law-canvas" class="law-drawing" role="img" aria-label="Frit tegnefelt til aftalemodellen"></canvas><div class="card" style="margin-top:18px"><h3>Og hvis der kommer en tilbagekaldelse?</h3><p>En tilbagekaldelse skal komme frem før eller samtidig med, at den oprindelige erklæring kommer til kundskab hos modtageren (§ 7). Acceptens rettidighed afgøres ved fremkomsten (§ 2).</p><p class="legal-source">Forenklet øvelsesmodel. Se <a href="https://www.retsinformation.dk/eli/lta/2016/193" target="_blank" rel="noopener noreferrer">aftalelovens §§ 1–7 hos Retsinformation</a> for regler og undtagelser.</p></div>`;
  requestAnimationFrame(setupDrawing);
}
function setupDrawing() {
  const canvas=$('#law-canvas');if(!canvas)return;const ctx=canvas.getContext('2d'),dpr=devicePixelRatio||1,w=canvas.clientWidth,h=150;canvas.width=w*dpr;canvas.height=h*dpr;ctx.scale(dpr,dpr);ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--accent');ctx.lineWidth=2;ctx.lineCap='round';ctx.font='12px system-ui';ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted');ctx.fillText('TG',12,20);ctx.fillText('TM',w-32,20);
  const old=current().templates.drawing;if(old?.startsWith('data:image/png;base64,')){const img=new Image();img.onload=()=>{if(canvas.isConnected)ctx.drawImage(img,0,0,w,h);};img.src=old;}
  let down=false;const pos=e=>{const r=canvas.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
  canvas.onpointerdown=e=>{down=true;canvas.setPointerCapture(e.pointerId);ctx.beginPath();ctx.moveTo(...pos(e));};canvas.onpointermove=e=>{if(down){ctx.lineTo(...pos(e));ctx.stroke();}};
  const finish=()=>{if(!down)return;down=false;current().templates.drawing=canvas.toDataURL('image/png');persist();};canvas.onpointerup=finish;canvas.onpointercancel=finish;drawingCleanup=finish;
}

/* Filhåndtering: ingen uploadserver. PDF/billeder lagres som data-URL, tekst som tekst. */
function fileKind(file) {
  const ext=file.name.split('.').pop().toLowerCase();
  return {pdf:'application/pdf',txt:'text/plain',md:'text/markdown',csv:'text/csv',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif'}[ext]||null;
}
function readFile(file,asText) {return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result));r.onerror=()=>reject(new Error('Filen kunne ikke læses.'));asText?r.readAsText(file):r.readAsDataURL(new Blob([file],{type:fileKind(file)}));});}
let fileQueue=Promise.resolve();
function addFiles(files) {
  const targetId=subject.id, items=[...files];
  fileQueue=fileQueue.then(async()=>{
    let added=0,skipped=0,full=false;
    for(const file of items){
      const type=fileKind(file);if(!type||file.size>1.5*1024*1024||data[targetId].sources.length>=100){skipped++;continue;}
      try{
        const isText=type.startsWith('text/'),content=await readFile(file,isText);
        // Hold en konservativ samlet grænse under browserens typiske localStorage-kvote.
        const entry={id:uid(),name:(file.webkitRelativePath||file.name).slice(0,500),type,size:file.size,text:isText?content:'',content:isText?'':content};
        const used=SUBJECTS.reduce((n,s)=>n+JSON.stringify(data[s.id]).length,0);
        if(used+JSON.stringify(entry).length>2000000){full=true;break;}
        data[targetId].sources.push(entry);
        if(!persist(targetId)){data[targetId].sources.pop();full=true;break;}added++;
      }catch{skipped++;}
    }
    updateSidebar();toast(`${added} fil${added===1?'':'er'} gemt i ${SUBJECTS.find(s=>s.id===targetId).name}.${skipped?` ${skipped} sprunget over (format eller størrelse).`:''}${full?' Lagergrænsen er nået. Fjern en kilde eller eksportér backup.':''}`);
  }).catch(()=>toast('Filerne kunne ikke tilføjes. Prøv igen med én fil.'));
  return fileQueue;
}
async function walkDrop(entry) {
  if(entry.isFile)return new Promise(resolve=>entry.file(file=>resolve([file]),()=>resolve([])));
  if(entry.isDirectory){const reader=entry.createReader();let entries=[],batch;do{batch=await new Promise(resolve=>reader.readEntries(resolve,()=>resolve([])));entries.push(...batch);}while(batch.length);const nested=await Promise.all(entries.map(walkDrop));return nested.flat();}return[];
}
function openSource(id) {
  const s=current().sources.find(s=>s.id===id);if(!s)return;
  showDialog(esc(s.name),s.type.startsWith('text/')?`<pre>${esc(s.text)}</pre>`:s.type.startsWith('image/')?`<img src="${esc(s.content)}" alt="${esc(s.name)}">`:`<p>PDF’en vises med browserens egen læser. På mobil kan du bruge hent-knappen.</p><iframe title="${esc(s.name)}" src="${esc(s.content)}"></iframe>`);
  $('.dialog-body').insertAdjacentHTML('beforeend',`<div class="button-row"><button class="secondary" id="download-source">${icon('download')} Hent fil</button></div>`);
  $('#download-source').onclick=()=>s.type.startsWith('text/')?download(s.name,s.text,s.type):downloadData(s.name,s.content);
}
function download(name,text,type='text/plain') {const blob=new Blob([text],{type:type+';charset=utf-8'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name.split('/').pop();a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function downloadData(name,content) {const a=document.createElement('a');a.href=content;a.download=name.split('/').pop();a.click();}
function backupDialog() {showDialog('Dit studierum, sikkert gemt',`<p>En backup indeholder alle fag: kilder, egne kort, noter, læringsmål, skabeloner og quizresultater. Opbevar filen et sted, du kan finde igen.</p><div class="button-row"><button class="primary" id="export-backup">${icon('download')} Eksportér backup</button><button class="secondary" id="import-backup">${icon('upload')} Importér backup</button></div><p class="tiny" style="margin-top:18px">Browserdata er knyttet til denne browser og webadresse. De følger ikke automatisk med til en anden enhed eller fra en lokal fil til GitHub Pages. Import erstatter det nuværende studierum efter din bekræftelse.</p>`);}
function exportBackup() {download(`Palace-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify({app:'Palace',version:1,exportedAt:new Date().toISOString(),settings,subjects:data},null,2),'application/json');toast('Din backup er klar til at hente.');}
let pendingImport=null;
async function prepareImport(file) {
  if(!file)return;
  if(file.size>12*1024*1024)return toast('Backupfilen er for stor (maks. 12 MB).');
  try{
    const parsed=JSON.parse(await readFile(file,true));
    if(parsed.app!=='Palace'||parsed.version!==1||!parsed.subjects||!SUBJECTS.every(s=>validSubject(parsed.subjects[s.id])))throw new Error('format');
    pendingImport=parsed;const count=SUBJECTS.reduce((n,s)=>n+parsed.subjects[s.id].cards.length,0);
    showDialog('Erstat dit nuværende studierum?',`<p>Filen indeholder <strong>10 fag og ${count} flashcards</strong>. Dine nuværende data erstattes. Eksportér gerne en backup først.</p><div class="button-row"><button class="primary" id="confirm-import">Importér og erstat</button><button class="secondary" id="export-backup">Eksportér nuværende</button><button class="secondary" id="cancel-dialog">Annuller</button></div>`);
  }catch{toast('Filen er ikke en gyldig Palace-backup. Ingen data er ændret.');}
}
function commitImport() {
  if(!pendingImport)return;
  const previous={};const nextSettings={theme:['system','light','dark'].includes(pendingImport.settings?.theme)?pendingImport.settings.theme:'system',subject:SUBJECTS.some(s=>s.id===pendingImport.settings?.subject)?pendingImport.settings.subject:'afsaetning'};
  try{
    for(const key of [...SUBJECTS.map(s=>s.id),'settings'])previous[key]=localStorage.getItem(PREFIX+key);
    // Frigiv gamle Palace-nøgler, så en lige stor backup også kan importeres ved fuld kvote.
    for(const key of Object.keys(previous))localStorage.removeItem(PREFIX+key);
    for(const s of SUBJECTS)localStorage.setItem(PREFIX+s.id,JSON.stringify(pendingImport.subjects[s.id]));
    localStorage.setItem(PREFIX+'settings',JSON.stringify(nextSettings));
  }catch{
    try{for(const key of Object.keys(previous))localStorage.removeItem(PREFIX+key);for(const [key,raw] of Object.entries(previous))if(raw!==null)localStorage.setItem(PREFIX+key,raw);}catch{/* Besked nedenfor gør fejlen synlig. */}
    return toast('Importen kunne ikke gemmes. Lageret er fuldt eller blokeret. Dit åbne studierum er bevaret.');
  }
  stopActivity();for(const s of SUBJECTS)data[s.id]=pendingImport.subjects[s.id];settings=nextSettings;subject=SUBJECTS.find(s=>s.id===settings.subject);pendingImport=null;quiz=null;flashIndex=0;openIndex=0;revealed=false;$('#dialog').close();theme();go('home');toast('Dit studierum er importeret.');
}

/* Søgning går på tværs af fag, også i brugerens lokale tekster. */
function searchAll(query) {
  const q=normalize(query),results=[];if(!q)return results;
  for(const s of SUBJECTS){const d=data[s.id];
    if(normalize(s.name).includes(q))results.push({subject:s.id,type:'Fag',title:s.name,text:s.level,target:'subject'});
    for(const [type,text,target] of [['Noter',d.notes,'notes'],['Læringsmål',d.goals,'subject']])if(normalize(text).includes(q))results.push({subject:s.id,type,title:s.name,text:snippet(text,q),target});
    d.cards.forEach((c,i)=>{if(normalize(c.q+' '+c.a).includes(q))results.push({subject:s.id,type:'Flashcard',title:c.q,text:c.a,target:'flashcards',index:i});});
    s.quiz.forEach(item=>{if(normalize(item[0]+' '+item[3]).includes(q))results.push({subject:s.id,type:'Quiz',title:item[0],text:item[3],target:'quiz'});});
    d.sources.forEach(source=>{if(normalize(source.name+' '+source.text).includes(q))results.push({subject:s.id,type:'Kilde',title:source.name,text:source.text?snippet(source.text,q):'Åbn den lokale fil.',target:'source',sourceId:source.id});});
    Object.entries(d.templates).forEach(([key,text])=>{if(key!=='drawing'&&normalize(text).includes(q))results.push({subject:s.id,type:'Skabelon',title:s.name,text:snippet(text,q),target:'extra'});});
  }
  return results.slice(0,70);
}
function snippet(text,q) {const i=normalize(text).indexOf(q);return (i>60?'…':'')+text.slice(Math.max(0,i-60),Math.max(0,i-60)+190)+(text.length>i+130?'…':'');}
let searchResults=[];
function renderSearch(query) {
  stopActivity();view='search';renderTools();$('#breadcrumb').textContent='Søg i Palace';searchResults=searchAll(query);
  main.innerHTML=`<div class="view-header"><div><div class="eyebrow">PÅ TVÆRS AF ALLE DINE FAG</div><h1>Find den røde tråd.</h1></div></div><p class="view-description">${searchResults.length} resultat${searchResults.length===1?'':'er'} for “${esc(query)}”. PDF’er og billeder søges efter filnavn; deres indhold bliver ikke tekstgenkendt.</p>${searchResults.map((r,i)=>`<button class="search-result" data-result="${i}"><small>${esc(SUBJECTS.find(s=>s.id===r.subject).name)} · ${r.type}</small><strong>${esc(r.title)}</strong><p>${esc(r.text)}</p></button>`).join('')||'<div class="empty-state">Ingen resultater endnu. Prøv et begreb som SWOT, inflation eller en del af et filnavn.</div>'}`;
}
function localReply(message) {
  const text=normalize(message);if(/flashcard|kort|øve/.test(text))return {text:`Du har ${current().cards.filter(c=>!c.known).length} begreber i ${subject.name}, som ikke er markeret som lært. Start med tre kort og prøv at svare højt.`,target:'flashcards',label:'Åbn flashcards'};
  if(/quiz|test|multiple/.test(text))return{text:`Tag seks spørgsmål i ${subject.name}. Du får forklaring efter hvert svar.`,target:'quiz',label:'Start quiz'};
  if(/start|plan|hjælp|lær/.test(text))return{text:`Brug 10 minutter: 2 min. læringsmål, 4 min. flashcards, 3 min. quiz og 1 min. noter. ${current().goals?'Dit fokus: '+current().goals:'Skriv dit læringsmål i sidebaren for at gøre planen mere konkret.'}`,target:'guided',label:'Åbn læseplan'};
  const terms=text.replace(/[?.,!:]/g,'').split(/\s+/).filter(t=>t.length>3&&!['hvad','hvordan','forklar','betyder','palace','noget','dette'].includes(t));
  const hit=current().cards.map(c=>({c,score:terms.reduce((n,t)=>n+(normalize(c.q+' '+c.a).includes(t)?1:0),0)})).sort((a,b)=>b.score-a.score)[0];
  if(hit?.score)return{text:`Fra dine flashcards i ${subject.name}:\n${hit.c.q}\n${hit.c.a}\n\nPrøv selv at finde et konkret eksempel.`,target:'open',label:'Forklar med egne ord'};
  const source=current().sources.find(s=>s.text&&terms.some(t=>normalize(s.text).includes(t)));
  if(source){const term=terms.find(t=>normalize(source.text).includes(t));return{text:`Fundet i ${source.name}:\n${snippet(source.text,term)}\n\nDette er et tekstuddrag, ikke en automatisk analyse.`,target:'notes',label:'Åbn noter'};}
  return{text:'Jeg er en lokal studiehjælper og kan finde begreber i dine kort og tekstkilder eller foreslå en øverutine. Prøv “forklar SWOT”, “start quiz” eller “hjælp mig i gang”.',target:'guided',label:'Find dit næste skridt'};
}
function sendChat(e) {
  e.preventDefault();const text=$('#chat-input').value.trim();if(!text)return;const reply=localReply(text),messages=$('#chat-messages');
  // Begræns historikken og gem ikke samtalen; fagnoter er den varige arbejdsplads.
  if(messages.children.length>=8)messages.replaceChildren();
  const user=document.createElement('div');user.className='chat-message user';user.textContent=text;messages.append(user);
  const bot=document.createElement('div');bot.className='chat-message';bot.textContent=reply.text;
  const button=document.createElement('button');button.className='text-button';button.dataset.view=reply.target;button.textContent=reply.label+' →';button.style.display='flex';bot.append(document.createElement('br'),button);messages.append(bot);messages.scrollTop=messages.scrollHeight;$('#chat-input').value='';
}
function helpDialog() {showDialog('Velkommen til Palace',`<p>Dit rolige studierum til HHX. Alt fagindhold gemmes adskilt på din enhed. Brug Backup for at flytte det til en anden browser.</p><ul><li><strong>/</strong> åbner søgefeltet.</li><li><strong>← / →</strong> skifter flashcard.</li><li><strong>Mellemrum</strong> vender kortet.</li><li><strong>Escape</strong> lukker en dialog eller mobilmenu.</li></ul><p>Fremgang viser den andel af dine flashcards, du har markeret “kan”. Quizzen gemmer bedste score separat.</p><p>Chatten er regelbaseret og bruger dine flashcards og tekstfiler. PDF’er og billeder kan gemmes og vises, men bliver ikke tekstgenkendt. Der er ingen AI-model eller server.</p><p>Podcast er browseroplæsning, og Videoer er et begrebsslideshow. Mikrofonen er valgfri; en understøttet browsers talegenkendelse kan sende lyd til browserudbyderen.</p><p>Fagindholdet er øvelseseksempler, som du frit kan tilpasse til undervisningen. Palace er et selvstændigt projekt uden tilknytning til Alice.</p>`);}
function startMic() {
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!Recognition)return toast('Din browser understøtter ikke talegenkendelse. Skriv dit spørgsmål i feltet.');
  showDialog('Indtal et spørgsmål',`<p>Browserens talegenkendelse kan sende lyd til browserudbyderen. Palace gemmer ikke lyden. Brug tekstfeltet, hvis du vil undgå dette.</p><button class="primary" id="confirm-mic">${icon('mic')} Start mikrofon</button>`);
  $('#confirm-mic').onclick=()=>{
    $('#dialog').close();const recognition=new Recognition();recognition.lang='da-DK';recognition.interimResults=false;
    recognition.onresult=e=>{$('#chat-input').value=e.results[0][0].transcript;$('#chat-input').focus();};recognition.onerror=()=>toast('Mikrofonen kunne ikke bruges. Skriv i stedet.');recognition.onend=()=>{$('#mic-button').classList.remove('success');};
    try{recognition.start();$('#mic-button').classList.add('success');toast('Lytter… tal nu.');}catch{toast('Talegenkendelse kunne ikke starte.');}
  };
}

/* Én fælles hændelsesrouter holder dynamiske visninger lette og overskuelige. */
document.addEventListener('click',e=>{
  const b=e.target.closest('button,a.brand');if(!b)return;
  const ds=b.dataset,id=b.id;
  if(ds.view){if(ds.view==='quiz'&&view!=='quiz')quiz=null;go(ds.view,true);return;}
  if(ds.subject){chooseSubject(ds.subject);return;}
  if(ds.source){openSource(ds.source);return;}
  if(ds.deleteSource){showDialog('Fjern denne kilde?',`<p>Filen fjernes kun fra Palace i dette fag. Din oprindelige fil ændres ikke.</p><div class="button-row"><button class="primary" id="confirm-delete-source">Fjern kilde</button><button class="secondary" id="cancel-dialog">Annuller</button></div>`);$('#confirm-delete-source').onclick=()=>{current().sources=current().sources.filter(s=>s.id!==ds.deleteSource);persist();updateSidebar();$('#dialog').close();};return;}
  if(ds.answer!==undefined){answerQuiz(Number(ds.answer));return;}
  if(ds.editCard){cardEditor(ds.editCard);return;}
  if(ds.deleteCard){const card=current().cards.find(c=>c.id===ds.deleteCard);showDialog('Slet flashcard?',`<p>${esc(card?.q)}</p><div class="button-row"><button class="primary" id="confirm-delete-card">Slet kort</button><button class="secondary" id="cancel-dialog">Annuller</button></div>`);$('#confirm-delete-card').onclick=()=>{current().cards=current().cards.filter(c=>c.id!==ds.deleteCard);persist();renderFlashcards();manageCards();};return;}
  if(ds.result!==undefined){const r=searchResults[Number(ds.result)];chooseSubject(r.subject);if(r.target==='source')openSource(r.sourceId);else{if(r.index!==undefined)flashIndex=r.index;go(r.target,true);}return;}
  if(ds.lawEvent!==undefined){selectedEvent=Number(ds.lawEvent);drawingCleanup?.();renderLaw();return;}
  if(ds.lawSlot!==undefined){const n=Number(ds.lawSlot);if(selectedEvent!==null){lawSlots[n]=selectedEvent;selectedEvent=null;}else if(lawSlots[n]!==null){selectedEvent=lawSlots[n];lawSlots[n]=null;}else return toast('Vælg først en hændelse fra listen.');drawingCleanup?.();renderLaw();return;}
  const actions={
    brand:()=>{e.preventDefault();go('home');},'home-button':()=>go('home',true),
    'menu-button':()=>{const open=!$('#sidebar').classList.contains('open');$('#sidebar').inert=false;$('#sidebar').classList.toggle('open',open);$('#sidebar-scrim').hidden=!open;b.setAttribute('aria-expanded',String(open));if(open)$('#subject-select').focus();else closeSidebar();},
    'theme-button':()=>{settings.theme=({system:'light',light:'dark',dark:'system'})[settings.theme]||'system';saveSettings();theme();toast(`Tema: ${{system:'følger systemet',light:'lyst',dark:'mørkt'}[settings.theme]}.`);},
    'help-button':helpDialog,'backup-button':backupDialog,'export-backup':exportBackup,'import-backup':()=>$('#import-input').click(),'confirm-import':commitImport,
    'hero-upload':()=>$('#file-input').click(),'attach-button':()=>$('#file-input').click(),'choose-folder':()=>$('#folder-input').click(),
    'close-dialog':()=>$('#dialog').close(),'cancel-dialog':()=>{$('#dialog').close();pendingImport=null;},
    flashcard:flipCard,'card-prev':()=>moveCard(-1),'card-next':()=>moveCard(1),'card-known':()=>rateCard(true),'card-unknown':()=>rateCard(false),'add-card':()=>cardEditor(),'manage-cards':manageCards,'reverse-cards':()=>{flashReverse=!flashReverse;renderFlashcards();},
    'quiz-next':nextQuiz,'restart-quiz':newQuiz,
    'notes-template':()=>{const structure='\n\nBEGREB\n\nFORKLARING MED EGNE ORD\n\nKONKRET EKSEMPEL\n\nDET VIL JEG UNDERSØGE\n';current().notes+=structure;persist();renderNotes();$('#notes-editor').focus();},
    'download-notes':()=>download(`Palace-${subject.name}-noter.txt`,current().notes),'download-written':()=>download(`Palace-${subject.name}-besvarelse.txt`,current().answers.written||''),
    'download-template':()=>download(`Palace-${subject.name}-analyse.txt`,Object.entries(current().templates).filter(([k])=>k!=='drawing').map(([k,v])=>k.toUpperCase()+'\n'+v).join('\n\n')),'print-template':()=>window.print(),
    'audio-play':playAudio,'audio-stop':()=>{if('speechSynthesis' in window)speechSynthesis.cancel();if($('#audio-status'))$('#audio-status').textContent='Oplæsning stoppet.';},
    'story-next':()=>{storyIndex++;renderVideo();},'story-prev':()=>{storyIndex=(storyIndex-1+current().cards.length)%current().cards.length;renderVideo();},
    'timer-start':startTimer,'timer-stop':()=>{clearInterval(timerInterval);timerInterval=null;},'oral-new':()=>{clearInterval(timerInterval);openIndex++;renderOral();},
    'reveal-open':()=>{revealed=!revealed;renderOpen();},'next-open':()=>{openIndex++;revealed=false;renderOpen();},
    'reverse-vocab':()=>{vocabReverse=!vocabReverse;renderVocab();},'vocab-next':()=>{vocabIndex++;renderVocab();},
    'check-law':()=>{const score=Math.round(lawSlots.reduce((n,v,i)=>n+(v===i?1:0),0)/6*100);$('#law-feedback').innerHTML=`<div class="feedback"><strong>${score}% korrekt</strong><br>${score===100?'Godt gået! Fremkomst og kundskab er to forskellige tidspunkter.':'Rækkefølgen er: tilbud sendt → fremme → læst → accept sendt → fremme → læst. Klik på en placeret hændelse for at flytte den.'}</div>`;},
    'reset-law':()=>{lawSlots=Array(6).fill(null);selectedEvent=null;drawingCleanup?.();renderLaw();},'clear-drawing':()=>{delete current().templates.drawing;persist();setupDrawing();},'mic-button':startMic
  };
  actions[id]?.();
});
document.addEventListener('input',e=>{
  const el=e.target;
  if(el.id==='learning-goals'){current().goals=el.value;persist();}
  if(el.id==='notes-editor'){current().notes=el.value;const ok=persist();$('#notes-status').textContent=ok?'✓ Gemt på din enhed':'Kun i denne åbne fane — eksportér backup';$('#word-count').textContent=wordCount(el.value)+' ord';}
  if(el.dataset.template){current().templates[el.dataset.template]=el.value;persist();}
  if(el.dataset.answerField){current().answers[el.dataset.answerField]=el.value;persist();}
  if(el.hasAttribute('data-calc'))calculate();
  if(el.id.startsWith('graph-'))drawGraph();
  if(el.id==='search'){const q=el.value.trim();if(q)renderSearch(q);else go('home');}
});
document.addEventListener('change',e=>{
  const el=e.target;
  if(el.id==='subject-select')chooseSubject(el.value);
  if(el.id==='exam-date'){current().exam=el.value;persist();$('#exam-countdown').textContent=examLabel(el.value);}
  if(['file-input','folder-input'].includes(el.id)){addFiles(el.files);el.value='';}
  if(el.id==='import-input'){prepareImport(el.files[0]);el.value='';}
});
document.addEventListener('submit',e=>{if(e.target.id==='vocab-form')checkVocab(e);});
$('#chat-form').addEventListener('submit',sendChat);
$('#chat-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('#chat-form').requestSubmit();}});
$('#sidebar-scrim').onclick=()=>{closeSidebar();$('#menu-button').focus();};
$('#dialog').addEventListener('click',e=>{if(e.target===$('#dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#dialog').close();}});
document.addEventListener('keydown',e=>{
  const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable;
  if(e.key==='Escape'){closeSidebar();return;}
  // La navigation i mobilmenuen blive i menuen, indtil den lukkes.
  if(e.key==='Tab'&&innerWidth<=700&&$('#sidebar').classList.contains('open')){const focusable=$$('a,button,input,textarea,select,[tabindex="0"]',$('#sidebar')).filter(el=>!el.disabled);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  if(typing||$('#dialog').open)return;
  if(e.key==='/'){e.preventDefault();if(innerWidth<=700){$('#sidebar').inert=false;$('#sidebar').classList.add('open');$('#sidebar-scrim').hidden=false;$('#menu-button').setAttribute('aria-expanded','true');}$('#search').focus();}
  if(view==='flashcards'&&!e.altKey&&!e.ctrlKey&&!e.metaKey){if(e.key==='ArrowRight'){e.preventDefault();moveCard(1);}if(e.key==='ArrowLeft'){e.preventDefault();moveCard(-1);}if(e.code==='Space'&&(!document.activeElement?.matches('button')||document.activeElement.id==='flashcard')){e.preventDefault();flipCard();}}
});
const dropzone=$('#dropzone');dropzone.onclick=()=>$('#file-input').click();dropzone.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#file-input').click();}};
let dragCount=0;dropzone.addEventListener('dragenter',e=>{e.preventDefault();dragCount++;dropzone.classList.add('drag-over');});dropzone.addEventListener('dragover',e=>e.preventDefault());dropzone.addEventListener('dragleave',()=>{dragCount--;if(dragCount<=0)dropzone.classList.remove('drag-over');});
dropzone.addEventListener('drop',async e=>{e.preventDefault();dragCount=0;dropzone.classList.remove('drag-over');const items=[...(e.dataTransfer.items||[])],entries=items.map(i=>i.webkitGetAsEntry?.()).filter(Boolean),fallback=[...e.dataTransfer.files];const files=entries.length?(await Promise.all(entries.map(walkDrop))).flat():fallback;await addFiles(files);});
// Undgå at en fil sluppet ved siden af feltet navigerer væk fra studierummet.
window.addEventListener('dragover',e=>{if(e.dataTransfer?.types.includes('Files'))e.preventDefault();});window.addEventListener('drop',e=>e.preventDefault());
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(settings.theme==='system')theme();});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(innerWidth>700){$('#sidebar').inert=false;closeSidebar();}else if(!$('#sidebar').classList.contains('open'))$('#sidebar').inert=true;if($('#graph'))drawGraph();},120);});
window.addEventListener('beforeunload',()=>{if('speechSynthesis' in window)speechSynthesis.cancel();});
window.addEventListener('storage',e=>{if(e.key?.startsWith(PREFIX))toast('Palace er ændret i en anden fane. Genindlæs denne fane, før du redigerer videre.');});
$('#subject-select').innerHTML=SUBJECTS.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
// Vis en brugbar app selv uden localStorage; gør begrænsningen tydelig.
theme();go('home');if(innerWidth<=700)$('#sidebar').inert=true;
if(!storageAvailable)setTimeout(()=>toast('Lokal lagring er blokeret. Du kan øve her, men eksportér backup før du lukker.'),500);
if(recoveryWarnings.length)setTimeout(()=>toast(`Nogle gemte data kunne ikke læses (${recoveryWarnings.join(', ')}). Eksempelkort vises. Importér din seneste backup.`),650);
