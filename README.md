# ReviewBox - Aplicație de Recenzii Filme

O aplicație modernă de recenzii pentru filme, inspirată de IMDb, construită cu React. Explorează filme, citește recenzii, filtrează după gen și sortează după preferințe.

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
- 💾 **Salvare locală** - Recenziile sunt salvate în localStorage
- 📈 **Rating dinamic** - Rating-ul mediu se calculează automat din toate recenziile

## 🚀 Instalare și Rulare

### Cerințe
- Node.js (v14 sau mai nou)
- npm sau yarn

### Instalare

```bash
npm install
```

### Rulare în mod development

```bash
npm start
```

Aplicația se va deschide automat la [http://localhost:3000](http://localhost:3000)

### Build pentru producție

```bash
npm run build
```

### Testare

```bash
npm test
```

## 🛠️ Tehnologii Utilizate

- **React** - Biblioteca UI
- **React Router DOM** - Navigare și routing
- **CSS3** - Stilizare modernă cu variabile CSS și design responsive
- **Create React App** - Tooling și configurație

## 📁 Structura Proiectului

```
src/
├── components/
│   ├── Header.js          # Header cu logo, căutare și film featured
│   ├── MovieCard.js       # Card pentru afișarea filmelor în listă
│   ├── MovieList.js       # Lista de filme cu sortare
│   ├── MovieDetail.js     # Pagina de detalii pentru un film
│   └── ReviewForm.js      # Formular pentru adăugare recenzii
├── data/
│   └── movies.js          # Datele filmelor (mock data) cu imagini TMDB
├── utils/
│   └── tmdbImages.js      # Helper functions pentru imagini TMDB
├── App.js                 # Componenta principală cu routing și state management
├── App.css                # Stiluri principale
└── index.js               # Punctul de intrare al aplicației
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
- Navigare înapoi la listă

### Adăugare Recenzii
- Formular intuitiv cu validare
- Câmpuri: nume, rating (1-10), text recenzie
- Validare în timp real
- Salvare automată în localStorage
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

Recenziile adăugate de utilizatori sunt salvate în `localStorage` și persistă între sesiuni.

## 🔮 Viitor

Funcționalități potențiale pentru viitor:
- Integrare cu API-uri reale (TMDB, OMDb)
- Autentificare utilizatori
- Editare/ștergere recenzii
- Like/dislike pentru recenzii
- Filtrare recenzii după rating
- Wishlist pentru filme
- Recomandări personalizate
- Export date în diverse formate
- Partajare recenzii pe social media

## 📄 Licență

Acest proiect este open source și disponibil sub licență MIT.

---

Făcut cu ❤️ folosind React
