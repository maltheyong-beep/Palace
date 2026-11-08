# Palace — dit studierum til HHX

En statisk studiehjemmeside på dansk. Lavet i HTML, CSS og vanilla JavaScript uden backend, framework, eksterne skrifttyper eller biblioteker. Afsætning A og Virksomhedsøkonomi A er fremhævet; der er i alt 10 fag.

## Kom i gang

Læg `index.html`, `style.css` og `script.js` i samme mappe, og åbn `index.html` i en moderne browser. GitHub Pages anbefales til daglig brug, fordi lokal lagring ved `file://` kan variere mellem browsere.

## Læg Palace på GitHub Pages

1. Opret et **offentligt repository** på GitHub med navnet `Palace`.
2. Vælg **Add file → Upload files**, og upload de tre filer direkte i roden af dit repository. `index.html` skal altså ikke ligge i en ekstra Palace-mappe.
3. Tryk **Commit changes** på branchen `main`.
4. Åbn **Settings → Pages**. Under **Build and deployment** vælger du **Deploy from a branch**.
5. Vælg branchen **main** og mappen **/(root)**. Tryk **Save**.
6. Vent på den første publicering. GitHub viser sidens adresse under Pages. Normalt er adressen `https://DIT-BRUGERNAVN.github.io/Palace/`.

Ingen build-kommando, API-nøgle eller installation er nødvendig. Fremtidige ændringer publiceres ved at opdatere filerne på `main`.

Officiel guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Det indeholder Palace

- 10 fag med eget ikon og egen farve: International Økonomi, Dansk, Tysk, Fransk, Spansk, Historie, Matematik, Erhvervsjura, Afsætning og Virksomhedsøkonomi.
- 12 eksempelkort og 6 multiple choice-spørgsmål i hvert fag: **120 kort og 60 spørgsmål i alt**. Indholdet er HHX-øveeksempler og kan tilpasses din undervisning.
- Forside med alle fag, indlæringsfremgang og nedtælling til eksamen.
- Flashcards med 3D-vending, piletaster, swipe, kan/kan ikke samt oprettelse, redigering og sletning.
- Quiz med ét spørgsmål ad gangen, svarforklaringer, score, resultatgennemgang og konfetti. Bedste quizresultat gemmes pr. fag.
- Noter, læringsmål og eksamensdato pr. fag med automatisk lagring.
- Kildesamling til PDF, tekst og billeder med drag and drop og mappevalg, når browseren understøtter det.
- Søgning på tværs af fag, kort, quizforklaringer, noter, læringsmål, skabeloner og tekstkilder.
- Temaer: system, lyst og mørkt. Tryk på sol/måne nederst i sidebaren for at skifte.
- Eksport og import af hele studierummet som JSON. Import valideres og kræver en bekræftelse, før data erstattes.
- Mobilmenu, synlige fokusringe, tastaturbetjening og respekt for reduceret bevægelse.

## Fagværktøjer

| Fag | Værktøj |
| --- | --- |
| Tysk, Fransk, Spansk | Skriv oversættelsen, få feedback, og vend kort begge veje |
| Matematik | Formelsamling og canvas-graftegner til f(x) = ax² + bx + c, inklusive rette linjer |
| Virksomhedsøkonomi | DB, dækningsgrad, nulpunkt, sikkerhedsmargin, likviditetsgrad og soliditetsgrad |
| Afsætning | Redigerbare SWOT- og Porter-skabeloner med automatisk lagring og eksport |
| Erhvervsjura | Placer hændelser i aftalemodellen, se score og tegn selv i et canvas |
| Dansk | Skabelon til analyse og disposition |
| Historie | Kildekritisk analyse og disposition |
| International Økonomi | Skabelon til data, årsager, konsekvenser og økonomisk politik |

Aftalemodellen er et forenklet standardforløb. Eksemplerne om aftaleloven tager højde for forskellen på fremkomst og kundskab. Hovedreglerne om for sen og uoverensstemmende accept har undtagelser i §§ 4 og 6, stk. 2.
Lovtekst: https://www.retsinformation.dk/eli/lta/2016/193

## Hvad er lokalt, og hvad er ikke AI?

Palace har ingen server, konto, telemetri eller AI-forbindelse. Chatten er en **regelbaseret lokal studiehjælper**, der slår op i det valgte fags flashcards og tekstkilder og foreslår læserutiner. Den genererer ikke nye faglige forklaringer fra PDF’er og vurderer ikke eksamensbesvarelser.

**Podcast** er oplæsning af egne noter eller kort med browserens talesyntese. **Videoer** er et lokalt begrebsslideshow, ikke videooptagelser. Guidet læring, mundtlig og skriftlig eksamen samt åbne spørgsmål er selvstyrede øvelser med gemte svar.

Mikrofonen bruges kun efter et aktivt valg og en forklaring i appen. Browserens valgfrie talegenkendelse kan sende lyd til browserudbyderen. Palace gemmer ikke lyd. Funktionen findes ikke i alle browsere.

## Filer og lagerplads

- Filformater: `.pdf`, `.txt`, `.md`, `.csv`, `.png`, `.jpg`, `.jpeg`, `.webp` og `.gif`.
- Maks. **1,5 MB pr. fil** og 100 kilder pr. fag. Store kilder kan ramme den samlede lagergrænse før denne grænse.
- Tekstfiler læses som UTF-8-tekst. PDF og billeder gemmes lokalt og kan åbnes eller hentes igen. **Der er ingen OCR eller automatisk udtræk af PDF-tekst.** De søges efter filnavn.
- `localStorage` har en begrænset browserafhængig kvote. Filimporten holder en konservativ samlet grænse på ca. 2 millioner tegn i Palace-data for at mindske risikoen for at ramme den typiske kvote. Browseren kan have en lavere grænse.
- Ved fuldt eller blokeret lager vises en besked. Noter og kort kan blive liggende i den åbne fanes hukommelse; eksportér en backup, før du lukker.
- Alt fagindhold gemmes under separate nøgler som `palace.v1.afsaetning` og `palace.v1.voe`. Tema og seneste fag ligger i `palace.v1.settings`.
- Fremgang er andelen af kort markeret “kan”; det er ikke et mål for, hvor stor en del af pensum du har lært.
- Browserdata følger ikke med mellem forskellige enheder, browsere eller webadresser. Brug Backup ved flytning fra en lokal kopi til GitHub Pages.
- Brug helst én aktiv redigeringsfane. Palace viser en besked, hvis data ændres i en anden fane.

## Genveje

- `/`: fokus på søgning.
- `←` og `→`: forrige/næste flashcard.
- `Mellemrum`: vend flashcard, når kortet eller studierummet har fokus.
- `Escape`: luk dialog/mobilmenu.
- `Enter`: send chat. `Shift + Enter`: linjeskift.

## Tilpas koden

`index.html` er appens faste trekolonnelayout. `style.css` indeholder design, temaer, animationer og mobiltilpasning. `script.js` indeholder fagdata, lagring og funktioner, opdelt med danske kommentarer.

Ret eksempelindholdet i `SUBJECTS` i `script.js`. Allerede gemte brugerkort overskrives ikke, når eksemplerne ændres i koden. Eksportér dine data før større ændringer.

## Kontrol af leverancen

JavaScript-syntaksen er kontrolleret. Datakontrol har verificeret 10 fag, 120 kort, 60 spørgsmål, gyldige seeddata og afvisning af udvalgte ugyldige backups. Browserkontrol har verificeret fagvalg, flashcard-vending, oprettelse og indlæringsfremgang, adskilte noter, gennemførelse af en quiz til 100 %, VØ-eksempelberegninger og matematikkens graf med toppunkt og nulpunkter.

Den afsluttende browserkontrol af filvælger, backup-rundtur og mobil blev afbrudt af testmiljøet og er derfor ikke fuldt verificeret i browser. Koden omfatter funktionerne; kontrollér gerne et filvalg og en backup på din egen enhed, før du lægger større mængder noter ind.

Palace er et selvstændigt projekt, inspireret af et roligt studierum med tre kolonner. Det er ikke tilknyttet Alice.
