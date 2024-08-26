## Priminimas kaip susitvarkyti git ant Windows OS
1. Eiti į _Windows Credentials_ ir ištrinti esamą vartotoją.
1. Savo repozitorijoje suvesti komandas su savo duomenimis pagal [šią dokumentaciją](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration).
1. Susikurti naują repozitoriją github puslapyje.
1. Prisijungti prie git VS Code.
1. Supushinti kodą kaip įprastai.

## Kaip sukuriama bazinė aplikacijos struktūra:

1. Pradinėje direktorijoje, kuri nebus git repozitorija, komandinėje eilutėje paleidžiama _npx craete-react-app application-name_ komanda, sukurianti _application-name_ direktoriją, talpinančią _React_ aplikaciją.
1. Šioje _application-name_ direktorijoje sukuriama _client_ direktorija ir visas _React_ perkeliamas ten. Tai bus projekto _React_ aplikacija.
1. _application-name_ tampa pagrindine projekto direktorija, kurioje bus _client_ ir _server_ direktorijos.
1. Pagrindinėje projekto direktorijoje, sukuriama nauja _server_ direktorija.
1. _cd server_ komandos pagalba patekus į šią direktoriją, suvedama _npm init -y_ komanda.
1. _server_ direktorijoje, paleidžiama _npm i express_ komanda ir ranka sukuriami _index.js_ ir _server.js_ failai.
1. Remiantis _express.js_ [dokumentacija](https://expressjs.com/en/5x/api.html), sukuriamas _express_ aplikacijos kintamasis _index.js_ faile.
1. _index.js_ taip pat sukuriama middleware leidžianti atlikti duomenų POST "app.use(express.json());"
1. Pagal [šią](https://medium.com/@akhilanand.ak01/simplify-your-node-js-configuration-with-dotenv-env-ee371ad6bf9a) konfigūracinio failo kūrimo pamoką paleidžiama _npm i dotenv_ komanda.
1. _server_ direktorijoje sukuriamas, _config.env_ failas ir pridedami PORT ir HOST kintamieji.
1. _server.js_ faile pašaukiamas _dotenv_ paketas duodantis prieigą prie _config.env_ faile esančių kintamųjų ir sukuriami _port_, _host_ kintamieji.
1. _service.js_ pakviečiaims _app_ kintamasis iš _index.js_, prie jo pridedamas _listen_ metodas, priimantis PORT ir HOST kintamuosius.
1. _server_ direktorijoje paleidžiama _npm i nodemon_ komanda ir _package.json_ faile prie _scripts_ nurodoma _start_ komanda, kuri paleis _nodemon server.js_.
1. MongoDB internetiniame [puslapyje](https://www.mongodb.com/) sukuriamas naujas projektas, klasteris, duombazė ir kolekcijos, o gauti konfigūraciniai duomenys pridedami į _config.env_, nepamirštant įdėti ir DB pavadinimo.
1. _server.js_ sukuriamas DB kintamasis naudojant _env_ paketą.
1. Liekant _server_ direktorijoje, komandinėje eilutėje įvedama komanda _npm i mongoose_, o _server.js_ sukuriamas kintamasis iškviečiantis _mongoose_ paketą tolimesniam naudojimui.
1. Remiantis _mongoose_ [dokumentacija](https://mongoosejs.com/docs/connections.html) naudojamas _connect()_ metodas prisijungimui prie duombazės.
1. _client_ direktorijoje pašalinami visi pavyzdiniai _React app_ failai, kurie nereikalingi šiai aplikacijai.
1. _client/src_ direltorijoje sukuriama _components_ direktorija ir ten perkeliamas _App_ komponentas.
1. Pašalinamas _client_ direktorijos _README_ failas.
1. Tiek _client_, tiek _server_ direktorijose sukuriami _.gitignore_ failai, nurodantys, kad _node_modules_ ir _config.env_ (jei tokie yra) nebus keliami į git repozitoriją.
1. Atliekamas pirmasis "git push".

## Kaip sukuriama tolimesnė BE aplikacijos struktūra:

### Duomenų bazės modeliai

1. _server_ direktorijoje sukuriamas _models_ aplankas, kuriame naudojant _mongoose_ paketą ir modulius bus sukuriama kiek vienos duomazėje esančios kolekcijos schema.
1. Kiek vienas modelis turi pasišaukti _mongoose_, nes jo metodai bus naudojai schemos kūrimui.
1. _userSchema_ reikalingi _bcryptjs_ (slaptažodžio enkripciaji) is _validator_ (email ir password validavimui) paketai, kuriuos reikia įdiegti _services_ direktorijoje, tad reikia juos įsirašyti su npm ir išsikviesti schemos modelio faile.
1. _lunchSchema_ taip pat reikia naudoti _validator_ užtikrinti, kad nuotraukos URL iš tiesų yra validus URL.
1. _likesSchema_ naudojamas tiek vartotojo, tiek patiekalo id, kad vėliau "patiktukais" būtų galima "populiuoti" _lunchSchema_.

### Valdikliai

1. Kiek vienas valdiklis turės išsikviesti atitinkamą duomenų bazės modelį.
1. _userController_ faile reikės autentifikacijos; tam bus naudojamas _JWT_ (_npm i jsonwebtoken_ komanda _server_ direktorijoje).
1. Tam _server_ direktorijoje kuriamas _jwtUtils.js_ failas su funkcija "token'ui" sukurti pagal [šią](https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/) pamoką.
1. _userController_ registration funkcija tik sukuria naują vartotoją, bet jo neprijungia, tačiau login funkcija sukuria "token" parsiimportuojant funkciją iš _jwtUtils.js_.
   - _JWT_ turi būti atkoduojamas norint gauti vartotojo duomenis kaip [šioje](https://medium.com/@vkcivil62p/basics-of-jwt-and-how-to-decode-jwt-tokens-in-node-97c2975266e9) pamokoje, kad tik prisijungę vartotojai galėtų matyti kitas aplikacijos skiltis.
   - Kadangi projektas lokalus (localhost), šiam kartui token bus išsaugomas naršyklės localStorage pagal [šią](https://medium.com/@giwon.yi339/how-to-store-jwt-token-in-local-storage-for-react-b0957686b75c) pamoką.
   - Production variante localStorage yra nesaugus ir nenašus variantas (paaiškinta [čia](https://medium.com/kanlanc/heres-why-storing-jwt-in-local-storage-is-a-great-mistake-df01dad90f9e)), todėl reiktų kito sprendimo.

### API maršrutai

1. Kiek vienas maršrutas turi išsikviesti _express_ ir _express.Router()_ metodus; _Router_ ir yra pagrindinis "maršrutizatorius".
1. Taip pat išsikvieti atitinkamus valdiklius, nes jie bus siejami su maršrutais.
1. Norint duoti prieigą tik registruotiems vartotojams ir tam tikroms rolėms, reikalingi _protect_ ir _restrict_ iš _userController_.
1. Sukuriami POST, GET, PATCH ar DELETE maršrutai ir susiejami su atitinkamų valdiklių funkcijomis.
1. Išeksportuojamas _router_ komponentas, kad kiek vienas maršrutas ir jo veiksmas galėtų būti susiejamas su savo "tėviniu" maršrutu _index.js_ faile.

## _Client_ ir _Server_ sujungimas

1. Pagal [šią](https://dev.to/techcheck/creating-a-react-node-and-express-app-1ieg) pamoką, _client_ direktorijoje komandos _npm i axios_ pagalba įdiegiamas _Axios_ paketas, kad būtų galima sujungti "front-end" su "back-end" ir naudotis API.
1. _server_ direktorijoje įdiegiamas _cors_ paketas su _npm i cors_ komanda, kad nebūtų blokuojamos API užklausos.
1. _server/index.js_ iškviečiamas _cors_.
1. _client_ direktorijoje, reikiamame komponente (pvz. _Registration_), importuojamas _Axios_ ir panaudojami _server_ esantys "endpoints" duomenims gauti arba siųsti pagal pirmame punkte nurodytos pamokos pavyzdį, jei reikia, pakeičiant _axios.get()_ į _axios.post()_ ir nurodant, kokie duomenys bus paduodami.

## Kaip sukuriama tolimesnė FE struktūra

1. _client_ direktorijoje _npm_ pagalba įrašomi paketai: _bootstrap_, _bootstrap-icons_ ir _react-dom-router_.
2. _client/index.js_ faile suimportuojami bootsrap stiliai, skriptai ir ikonėlių stiliai.
3. _App.jsx_ importuojami _Router, Routes, Route_ is _react-router-dom_ ir komponento _return_ viduje sukuriamas elementas <Router>, kuriame bus talpinami <Routes>, o jų viduje <Route> į kitus komponentus ar skiltis. Taip implementuojamas SPA modelis.

## Programos talpinimas internete
1. Naudojamas _Render_ patalpinti _server_.
2. Naudojamas _Vercel_ patalpinti _client_.
3. Sekta [šios](https://medium.com/@yashpatel54257/how-to-deploy-a-mern-app-on-vercel-635683167e30) pamokos nurodymais, o CORS options pritaikytos iš _Vercel_ [dokumentacijos](https://vercel.com/guides/how-to-enable-cors#enabling-cors-using-vercel.json).
4. Programa pasiekiama [čia](https://kontrastu-virtuve.vercel.app/).
