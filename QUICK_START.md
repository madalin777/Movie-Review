# Quick Start - MovieReview React Native

## Opțiunea 1: React Native CLI (Recomandat pentru producție)

### Pasul 1: Inițializează un proiect React Native nou

```bash
npx react-native init MovieReviewApp
cd MovieReviewApp
```

### Pasul 2: Copiază fișierele

Copiază toate fișierele din acest proiect în proiectul nou:
- `App.js` → înlocuiește App.js existent
- `index.js` → înlocuiește index.js existent
- `src/` → copiază întreg folderul
- `package.json` → actualizează dependențele
- `babel.config.js`, `metro.config.js`, `app.json` → copiază

### Pasul 3: Instalează dependențele

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-webview
npm install react-native-linear-gradient

# Pentru iOS
cd ios && pod install && cd ..
```

### Pasul 4: Rulează aplicația

```bash
# Android
npm run android

# iOS
npm run ios
```

## Opțiunea 2: Expo (Mai ușor pentru început)

### Pasul 1: Instalează Expo CLI

```bash
npm install -g expo-cli
```

### Pasul 2: Creează proiect nou

```bash
npx create-expo-app MovieReviewApp
cd MovieReviewApp
```

### Pasul 3: Instalează dependențele

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-webview
```

### Pasul 4: Copiază fișierele

Copiază `App.js`, `src/` și actualizează `package.json`

### Pasul 5: Rulează

```bash
npx expo start
```

Apoi scanează QR code-ul cu:
- **Android**: Expo Go app
- **iOS**: Camera app (deschide automat Expo Go)

## Structura finală a proiectului

```
MovieReviewApp/
├── App.js
├── index.js
├── package.json
├── babel.config.js
├── metro.config.js
├── app.json
└── src/
    ├── screens/
    │   ├── HomeScreen.js
    │   └── MovieDetailScreen.js
    ├── components/
    │   ├── Header.js
    │   ├── MovieCard.js
    │   ├── MovieList.js
    │   ├── ReviewForm.js
    │   └── TrailerPlayer.js
    ├── data/
    │   └── movies.js
    └── utils/
        └── tmdbImages.js
```

## Verificare rapidă

După instalare, verifică că totul funcționează:

1. Aplicația se deschide fără erori
2. Lista de filme se afișează
3. Căutarea funcționează
4. Poți naviga la detalii film
5. Poți adăuga recenzii

## Probleme comune

### "Cannot find module"
```bash
npm install
npm start -- --reset-cache
```

### "Metro bundler error"
```bash
watchman watch-del-all
npm start -- --reset-cache
```

### Erori de build Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Suport

Pentru mai multe detalii, vezi:
- `README_REACT_NATIVE.md` - Documentație completă
- `SETUP_INSTRUCTIONS.md` - Instrucțiuni detaliate de setup

