# Fișiere modificate/create pentru React Native

## 📁 Fișiere noi create pentru React Native:

### Configurare proiect:
1. **`index.js`** (în root) - Punct de intrare React Native/Expo
2. **`App.js`** (în root) - Componenta principală React Native cu React Navigation
3. **`app.json`** - Configurație Expo
4. **`babel.config.js`** - Configurație Babel pentru Expo
5. **`metro.config.js`** - Configurație Metro bundler pentru Expo

### Ecrane (Screens):
6. **`src/screens/HomeScreen.js`** - Ecran principal cu lista de filme
7. **`src/screens/MovieDetailScreen.js`** - Ecran cu detalii film

### Componente React Native:
8. **`src/components/Header.js`** - Header convertit la React Native (TextInput în loc de input)
9. **`src/components/MovieCard.js`** - Card film convertit (Image, TouchableOpacity)
10. **`src/components/MovieList.js`** - Listă filme convertită (FlatList/View cu flexWrap)
11. **`src/components/ReviewForm.js`** - Formular recenzii convertit (TextInput, TouchableOpacity)
12. **`src/components/TrailerPlayer.js`** - Player trailer convertit (WebView pentru YouTube/Vimeo)

### Configurare:
13. **`package.json`** - Actualizat cu dependențele React Native/Expo

## 📁 Fișiere vechi (web) - NU se folosesc pentru React Native:

### Fișiere web (pot fi șterse sau ignorate):
- `src/index.js` - Vechi (web)
- `src/App.js` - Vechi (web)
- `src/App.css` - Vechi (web)
- `src/index.css` - Vechi (web)
- `public/` - Folder vechi (web)
- `src/components/Header.js` - Vechi (web) - există versiune nouă React Native
- `src/components/MovieCard.js` - Vechi (web) - există versiune nouă React Native
- `src/components/MovieDetail.js` - Vechi (web) - înlocuit cu MovieDetailScreen.js
- `src/components/MovieList.js` - Vechi (web) - există versiune nouă React Native
- `src/components/ReviewForm.js` - Vechi (web) - există versiune nouă React Native
- `src/components/TrailerPlayer.js` - Vechi (web) - există versiune nouă React Native

### Fișiere comune (folosite de ambele):
- `src/data/movies.js` - Date filme (folosit de ambele)
- `src/utils/tmdbImages.js` - Utilitare imagini (folosit de ambele)

## 🎯 Structura finală React Native:

```
moviereview/
├── App.js                    ← NOU (React Native)
├── index.js                  ← NOU (React Native entry point)
├── app.json                  ← NOU (Expo config)
├── babel.config.js           ← NOU (Expo Babel)
├── metro.config.js           ← NOU (Expo Metro)
├── package.json              ← MODIFICAT (dependențe React Native)
│
└── src/
    ├── screens/              ← NOU (ecrane React Native)
    │   ├── HomeScreen.js
    │   └── MovieDetailScreen.js
    │
    ├── components/           ← MODIFICAT (componente React Native)
    │   ├── Header.js         ← Convertit la React Native
    │   ├── MovieCard.js      ← Convertit la React Native
    │   ├── MovieList.js      ← Convertit la React Native
    │   ├── ReviewForm.js     ← Convertit la React Native
    │   └── TrailerPlayer.js  ← Convertit la React Native
    │
    ├── data/                 ← COMUN (folosit de ambele)
    │   └── movies.js
    │
    └── utils/                ← COMUN (folosit de ambele)
        └── tmdbImages.js
```

## ⚠️ Conflicte:

Există **două versiuni** ale componentelor:
- **Versiuni vechi (web)** în `src/components/` - folosesc HTML, CSS, react-router-dom
- **Versiuni noi (React Native)** în `src/components/` - folosesc View, Text, React Navigation

**Aplicația React Native folosește versiunile noi!**

## 🧹 Curățare recomandată (opțional):

Poți șterge fișierele vechi web dacă nu mai ai nevoie de ele:
- `src/index.js` (vechi)
- `src/App.js` (vechi)
- `src/App.css` (vechi)
- `src/index.css` (vechi)
- `public/` (folder vechi)

**NU șterge:**
- `src/data/movies.js` - folosit de React Native
- `src/utils/tmdbImages.js` - folosit de React Native

---

**Rezumat:** Am creat/modificat **13 fișiere principale** pentru React Native, plus actualizat `package.json`.

