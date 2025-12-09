# MovieReview - Aplicație React Native

Aplicație mobilă pentru recenzii de filme, convertită din React web la React Native pentru Android și iOS.

## 📋 Cerințe

- Node.js (versiunea 16 sau mai nouă)
- npm sau yarn
- React Native CLI
- Android Studio (pentru Android)
- Xcode (pentru iOS - doar pe macOS)

## 🚀 Instalare

### 1. Instalează dependențele

```bash
npm install
```

sau

```bash
yarn install
```

### 2. Instalare pentru iOS (doar pe macOS)

```bash
cd ios
pod install
cd ..
```

## 📱 Rulare

### Android

```bash
npm run android
```

sau

```bash
yarn android
```

Asigură-te că ai un emulator Android pornit sau un dispozitiv conectat prin USB cu debugging activat.

### iOS (doar pe macOS)

```bash
npm run ios
```

sau

```bash
yarn ios
```

## 🏗️ Structura Proiectului

```
moviereview/
├── App.js                 # Componenta principală cu navigare
├── index.js               # Punctul de intrare
├── app.json               # Configurație aplicație
├── babel.config.js        # Configurație Babel
├── metro.config.js        # Configurație Metro bundler
├── package.json           # Dependențe și scripturi
└── src/
    ├── screens/
    │   ├── HomeScreen.js      # Ecran principal cu lista de filme
    │   └── MovieDetailScreen.js # Ecran cu detalii film
    ├── components/
    │   ├── Header.js          # Header cu căutare
    │   ├── MovieCard.js       # Card pentru film
    │   ├── MovieList.js       # Lista de filme
    │   ├── ReviewForm.js      # Formular pentru recenzii
    │   └── TrailerPlayer.js   # Player pentru trailer
    ├── data/
    │   └── movies.js          # Date filme
    └── utils/
        └── tmdbImages.js       # Utilitare pentru imagini TMDB
```

## 📦 Dependențe Principale

- **react-native**: Framework-ul principal
- **@react-navigation/native**: Navigare între ecrane
- **@react-navigation/native-stack**: Stack navigator
- **@react-native-async-storage/async-storage**: Stocare locală (înlocuiește localStorage)
- **react-native-webview**: Pentru afișarea trailerelor YouTube/Vimeo
- **react-native-linear-gradient**: Gradient-uri (opțional)

## 🔧 Configurare TMDB API

Aplicația folosește TMDB API pentru a încărca filme. Cheia API este deja configurată în `App.js`, dar poți să o schimbi dacă este necesar:

```javascript
const TMDB_API_KEY = 'e5e15f63733c8b113d86026d6045f222';
```

Pentru a obține propria cheie API, vizitează: https://www.themoviedb.org/settings/api

## 📝 Funcționalități

- ✅ Listare filme cu poster și rating
- ✅ Căutare după titlu, actor, regizor sau gen
- ✅ Filtrare după gen
- ✅ Sortare după rating, an sau număr de voturi
- ✅ Detalii complete despre fiecare film
- ✅ Adăugare recenzii utilizator
- ✅ Vizualizare trailer (YouTube/Vimeo)
- ✅ Integrare cu TMDB API pentru filme populare
- ✅ Stocare locală a recenziilor (AsyncStorage)

## 🎨 Design

Aplicația păstrează design-ul original cu:
- Fundal întunecat (#0a0a0a)
- Culori accent (#f59e0b - portocaliu/auriu)
- Carduri cu efect glassmorphism
- Rating colorat (verde pentru excelent, roșu pentru slab)

## 🐛 Depanare

### Eroare: "Unable to resolve module"

```bash
npm start -- --reset-cache
```

### Eroare pe Android: "SDK location not found"

Configurează `ANDROID_HOME` în variabilele de mediu.

### Eroare pe iOS: "Pod install failed"

```bash
cd ios
pod deintegrate
pod install
cd ..
```

## 📱 Build pentru producție

### Android

```bash
cd android
./gradlew assembleRelease
```

APK-ul va fi generat în `android/app/build/outputs/apk/release/`

### iOS

Deschide `ios/MovieReview.xcworkspace` în Xcode și folosește "Product > Archive" pentru a crea un build de producție.

## 📄 Licență

Acest proiect este pentru uz educațional.

## 🙏 Note

- Aplicația web originală a fost convertită complet la React Native
- Toate funcționalitățile web sunt disponibile în versiunea mobilă
- Design-ul este optimizat pentru dispozitive mobile
- Trailer-urile se deschid într-un modal cu WebView

