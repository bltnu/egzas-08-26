# Dienos pietų užsakymo "web" programa

Ši repozitorija talpina pilną internetinę programą dienos pietums užsisakyti, vertinti ir valdyti valgiaraštį. Programa parašyta laikantis KITM pavyzdinės egzamino užduoties reikalavimų ir nurodymų. Užduoties tikslas - įsivertinti kompetencijas įgytas tiek _front-end_, tiek _back-end_, t.y. ši programa yra _full-stack_.

**[Čia](https://kontrastu-virtuve.vercel.app/) galima pamatyti ir išbandyti programą.**

## Turinys

- [Programos Apžvalga](#projekto-apžvalga)
- [Funkcijos](#funkcijos)
- [Technologijos](#technologijos)
- [Reikalavimai](#reikalavimai)
- [Diegimas](#diegimas)
- [Naudojimas](#naudojimas)
- [Bendradarbiavimas](#bendradarbiavimas)

### Programos Apžvalga

Programos tikslas - leisti miesto gyventojams ir svečiams rasti informaciją apie dienos pietus, juos užsakyti, o užsakius įvertinti. Prieigą prie valgiaraščio ir kito programos funkcionalumo turi tik registruoti vartotojai.

Prieigą prie valgiaraščio kūrimo, redagavimo ir trynimo turi tik vartotojas-administartorius (admin@lunchapp.com). Be prieigos prie asministracinės, valgiaraščio valdymo sskilties, šis vartotojas turi visas prieigas kaip įprasti vartotojai.

Prisiregistravus ir prisijungus, vartotojas įgauna įprasto vartotojo rolę ir yra nuvedamas į dienos pietų puslapį, kur rodomi tik šios dienos pietūs. Čia galima juos užsisakyti bei įvertinti. Valgiaraštis keičiasi su kiek viena diena.

Norinčius žinoti, kokių patiekalų tikėtis kitomis dienomis, nudžiugins _Visų patiekalų_ skiltis, kur galima peržiūrėti visą valgiaraštį, ieškoti patiekalų pagal jų gaminimo (savaitės) dieną arba pavadinimą (ar abu kriterijus). Dėl patogumo vartotojui, šioje skiltyje taip pat galima užsisakyti bei vertinti ir šiandienos pietus. Kad tai padaryti galima leis žinoti žalias užsakymo mygtukas. Kitų dienų patiekalų užsakymas - negalimas (mygtukas pilkas).

Abiejose skiltyse matomas patiekalų įvertinimas, matuojamas patiktukais. Koks skaičius matomas šalia žvaigždutės - tiek kartų kažkam patiko šis patiekalas.

Užsakius patiekalą vartotojas nuvedamas į asmeninių užsakymų pusalpį.

### Funkcijos

1. **Vartotojo autentifikacija ir autorizacija:** registracija, prisijungimas, prieigos prie administracinės skilties ribojimas pagal rolę.
1. **Valgiaraščio valdymas:** patiekalų kūrimas, redagavimas, trynimas.
1. **Viso valgiaraščio peržiūra:** kiek vieno patiekalo atvaizdavimas kortelėje su nuotrauka, pavadinimu, aprašymu, kaina, savaitės diena, užsakymo ir įvertinimo mygtukai.
1. **Patiekalų paieška:** atvaizdavimas tik tų patiekalų kortelių, kurios atitinka paieškos kriterijus (diena ir/arba pavadinimas).
1. **Šiandienos patiekalų peržiūra:** gaunama šiandienos informacija (metai, mėnuo, diena) ir jai priskiriami atitinkamos savaitės dienos (pirmad. - sekmad.) patiekalai.
1. **Šiandienos patiekalo užsakymas:** tikrinama ar patiekalas priskiriamas šiandienai, aktyvuojamas užsakymo mygtukas, kurį paspaudus, patiekalas išsaugomas vartotojo užsakymų skiltyje.
1. **Vartotojo užsakymų peržiūra:** kiek vienas vartotojas mato kokius patiekalus užsisakė ir užsakymo datą; vartotojai mato tik savo užsakymus, atvaizduojamus patiekalo kortelės forma.
1. **Patiekalo įvertinimas:** tikrinama, ar vartotojas jau yra įvertinęs patiekalą. Jei taip - įvertinimo mygtukas neaktyvus, jei ne - įvertinimo mygtukas aktyvus ir jį paspaudus, "patiktukas" išsaugomas ir iškart atvaizduojamas.

### Technologijos

**_Front-end_:**

1. React
1. Javascript
1. HTML
1. Bootstrap
1. Axios (darbui su API iš _back-end_)

**_Back-end_:**

1. Node.js
1. Express
1. MongoDB ir Mongoose

### Reikalavimai

Norint pasileisti projektą lokaliai, t.y. savo kompiuteryje, prieš pradedant, įsitikinkite, kad jūsų sistemoje įdiegta:

1. [Node.js](https://nodejs.org/ "https://nodejs.org/")
1. [npm](https://www.npmjs.com/ "https://www.npmjs.com/") (ateina kartu su Node.js)

## Diegimas

#### 1\. Nukopijuokite Repozitoriją

```
git clone https://github.com/GintarePav/lunch-app-deployment
```

#### 2\. Įdiekite Priklausomybes

Kadangi projektą sudaro du aplankai - _client_ ir _server_ - reikalingus paketus reikės diegti abiejuos. Patikrinkite `package.json` failus, kad matytumėte, kokie paketai naudojami ir įdiekite juos. Tam reikės dviejų komandinių eilučių. Rekomenduojama jas pervadinti į _server_ ir _client_.

1. Atsidarius pirmają, _server_, komandinę eilutę įveskite šias komandas:

```
cd server
npm install
```

1. Atsidarius antrąją, _client_, įveskite šias komandas:

```
cd client
npm install
```

Pastebėsite, kad _server_ dalyje naudojamas _dotenv_ paketas. Dėl saugumo, _congig.env_ failas į repozitoriją nekeliamas ir jį reikės susikurti sau. Jame reiks šių kintamųjų:

```
PORT = 8080
HOST= 127.0.0.1
CLIENT_URL=http://localhost:3000
DATABASE: [jūsų susikurtos MongoDB duombazės konfigūracinė nuoroda]
TOKEN_KEY: [jūsų sugalvotas kodas]
```

_client_ direktorijoje _dotenv_ paketas nereikalingas, tad reiktų susikurti savo _.env_ failą ir ten nurodyti šią informaciją:

```
REACT_APP_SERVER_URL=http://127.0.0.1:8080
```

### Naudojimas

#### Vietinės Versijos Paleidimas

Reikia paleisti serverį ir vartotojo sąsajos aplikaciją.

Tiek _server_, tiek _client_ komandinėse eilutėse įveskite šią komandą:

```
npm start
```

### Bendradarbiavimas

Kreiptis į _gintare.pavilaviciute@gmail.com_, jei reikalinga kokia nors informacija, pvz. peržiūrint ["pahostintą" versiją](https://kontrastu-virtuve.vercel.app/) ir norint gauti administratoriaus teises.

_projectSetUp.md_ taip pat galima matyti mano užrašus bekuriant projekto bazinę dalį.
