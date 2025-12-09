# MovieReview - Aplicație de Recenzii Filme

O aplicație modernă de recenzii pentru filme, inspirată de IMDb, disponibilă atât ca **aplicație web** (React) cât și ca **aplicație mobilă** (React Native/Expo) pentru Android și iOS.

## ✨ Funcționalități

- 🎬 **Lista de filme** - Vezi toate filmele disponibile cu poster, rating și informații esențiale
- 🔍 **Căutare** - Caută filme după titlu, actor, regizor sau gen
- 🏷️ **Filtrare după gen** - Filtrează filmele după genuri preferate
- 📊 **Sortare** - Sortează după rating, an sau popularitate
- 📱 **Design responsive** - Funcționează perfect pe desktop, tabletă și mobil
- 🎨 **Interfață modernă** - Design întunecat cu accent pe accesibilitate
- ⭐ **Rating colorat** - Rating-uri vizuale cu coduri de culoare
- 📝 **Pagini de detalii** - Vezi sinopsis complet, echipă, distribuție și recenzii
- 💰 **Detalii complete** - Buget, box office, premii, data lansării, țară, limbă
- ✍️ **Adaugă recenzii** - Utilizatorii pot adăuga propriile recenzii și rating-uri
- 💾 **Salvare locală** - Recenziile sunt salvate în AsyncStorage (mobile) sau localStorage (web)
- 📈 **Rating dinamic** - Rating-ul mediu se calculează automat din toate recenziile
- 🎥 **Trailer-uri** - Vizualizare trailer-uri YouTube/Vimeo
- 🌐 **Integrare TMDB** - Adaugă filme populare direct din TMDB API

## 🚀 Versiuni Disponibile

### 📱 React Native / Expo (Mobile)

Aplicația este disponibilă pentru **Android** și **iOS** folosind React Native și Expo.

#### Instalare rapidă (Expo - Recomandat):

```bash
npm install
npm install expo
npx expo install
npx expo start
```

Apoi scanează QR code-ul cu aplicația **Expo Go** de pe telefon.

#### Instalare completă (React Native CLI):

Vezi [README_REACT_NATIVE.md](./README_REACT_NATIVE.md) pentru instrucțiuni detaliate.

### 🌐 React Web

Aplicația web originală construită cu Create React App.

```bash
npm install
npm start
```

Aplicația se va deschide automat la [http://localhost:3000](http://localhost:3000)

## 🛠️ Tehnologii Utilizate

### Mobile (React Native):
- **React Native** - Framework pentru aplicații mobile
- **Expo** - Platformă pentru dezvoltare React Native
- **React Navigation** - Navigare între ecrane
- **AsyncStorage** - Stocare locală
- **React Native WebView** - Vizualizare trailer-uri

### Web:
- **React** - Biblioteca UI
- **React Router DOM** - Navigare și routing
- **CSS3** - Stilizare modernă cu variabile CSS și design responsive
- **Create React App** - Tooling și configurație

## 📁 Structura Proiectului

```
moviereview/
├── App.js                    # React Native App (mobile)
├── index.js                  # Entry point React Native
├── app.json                  # Expo configuration
├── babel.config.js           # Babel config
├── metro.config.js          # Metro bundler config
├── package.json              # Dependencies
│
├── src/
│   ├── screens/              # React Native screens
│   │   ├── HomeScreen.js
│   │   └── MovieDetailScreen.js
│   │
│   ├── components/           # React Native components
│   │   ├── Header.js
│   │   ├── MovieCard.js
│   │   ├── MovieList.js
│   │   ├── ReviewForm.js
│   │   └── TrailerPlayer.js
│   │
│   ├── data/                 # Movie data (shared)
│   │   └── movies.js
│   │
│   └── utils/                # Utilities (shared)
│       └── tmdbImages.js
│
└── public/                   # Web assets (web version only)
```

## 🎯 Funcționalități Principale

### Căutare
- Caută după titlul filmului
- Caută după numele actorilor
- Caută după numele regizorului
- Caută după genuri

### Filtrare
- Filtrează filmele după unul sau mai multe genuri
- Combină mai multe filtre simultan
- Buton pentru ștergerea tuturor filtrelor

### Sortare
- Rating (cel mai mare / cel mai mic)
- An (cel mai recent / cel mai vechi)
- Popularitate (după numărul de voturi)

### Pagini de Detalii
- Poster și backdrop image
- Sinopsis complet
- Informații despre regizor, scenariști și distribuție
- Detalii de producție (buget, box office, țară, limbă, producător, muzică, imagine)
- Premii și nominalizări
- Lista completă de recenzii cu rating-uri
- Formular pentru adăugare recenzii noi
- Vizualizare trailer-uri
- Navigare înapoi la listă

### Adăugare Recenzii
- Formular intuitiv cu validare
- Câmpuri: nume, rating (1-10), text recenzie
- Validare în timp real
- Salvare automată în AsyncStorage (mobile) sau localStorage (web)
- Rating-ul mediu se actualizează automat
- Recenziile sunt sortate cronologic (cele mai recente primele)

## 🎨 Design

Aplicația folosește un design întunecat modern cu:
- Paletă de culori inspirată de IMDb (galben auriu pentru accent)
- Rating-uri colorate (verde pentru excelent, galben pentru mediu, roșu pentru slab)
- Animații subtile la hover
- Design responsive pentru toate dispozitivele
- Accesibilitate (screen reader support, focus states)

## 📝 Date

Aplicația folosește date mock stocate în `src/data/movies.js`. Poți adăuga, modifica sau șterge filme editând acest fișier.

Fiecare film conține:
- Informații de bază (titlu, an, genuri, durată)
- Echipa (regizor, scenariști, distribuție, producător, muzică, imagine)
- Detalii financiare (buget, box office)
- Informații suplimentare (țară, limbă, data lansării, rating MPAA)
- Premii și nominalizări
- Recenzii inițiale
- **Imagini reale** - Poster și backdrop images de la TMDB (The Movie Database)

### Imagini de Filme

Aplicația folosește imagini oficiale de la **The Movie Database (TMDB)**, un serviciu gratuit care oferă imagini autentice de filme. Imaginiile sunt încărcate direct de la serverele TMDB folosind path-urile oficiale.

**Note importante:**
- Imaginiile sunt folosite în conformitate cu termenii și condițiile TMDB
- TMDB este un serviciu gratuit pentru utilizare non-comercială și educațională
- Dacă o imagine nu se încarcă, se folosește automat o imagine placeholder
- Pentru a adăuga noi filme, poți obține path-urile de imagini de la [TMDB](https://www.themoviedb.org/)

**Structura imaginilor:**
- `src/utils/tmdbImages.js` - Helper functions pentru generarea URL-urilor TMDB
- Poster images: `w500` (500px lățime)
- Backdrop images: `w1280` (1280px lățime)

## 🔮 Viitor

Funcționalități potențiale pentru viitor:
- Integrare completă cu TMDB API
- Autentificare utilizatori
- Editare/ștergere recenzii
- Like/dislike pentru recenzii
- Filtrare recenzii după rating
- Wishlist pentru filme
- Recomandări personalizate
- Export date în diverse formate
- Partajare recenzii pe social media
- Notificări push pentru filme noi

## 📄 Licență

Acest proiect este open source și disponibil sub licență MIT.

---

**Făcut cu ❤️ folosind React și React Native**
