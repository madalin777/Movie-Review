# Cum deschid aplicația pe telefon - Ghid simplu

## ✅ Metoda cea mai simplă: Expo Go (Recomandat)

Nu ai nevoie de Android Studio pentru asta!

### Pasul 1: Instalează Expo Go pe telefon

1. Deschide **Google Play Store** pe telefonul tău Android
2. Caută **"Expo Go"**
3. Instalează aplicația

### Pasul 2: Asigură-te că telefonul și computerul sunt pe același Wi-Fi

**IMPORTANT:** Telefonul și computerul trebuie să fie pe **același rețea Wi-Fi**!

### Pasul 3: Scanează QR code-ul

1. **Lasă terminalul deschis** cu `npm start` (unde vezi QR code-ul)
2. **Deschide aplicația Expo Go** pe telefon
3. **Alege "Scan QR Code"** sau folosește camera telefonului
4. **Scanează QR code-ul** din terminal
5. Aplicația se va încărca automat pe telefon! 🎉

## ⚠️ Dacă nu funcționează:

### Problema 1: "Unable to connect to Metro bundler"

**Soluție:**
1. Verifică că telefonul și computerul sunt pe **același Wi-Fi**
2. În terminal, apasă **`s`** pentru a schimba la "development build"
3. Sau rulează: `npx expo start --tunnel` (folosește tunel Expo)

### Problema 2: QR code-ul nu se scanează

**Soluție:**
1. În terminal, apasă **`s`** pentru a schimba modul
2. Sau rulează: `npx expo start --tunnel`

### Problema 3: Aplicația nu se încarcă

**Soluție:**
1. În terminal, apasă **`r`** pentru a reîncărca aplicația
2. Sau în Expo Go, scutură telefonul și alege "Reload"

## 🚀 Comenzi utile în terminal:

Când rulează `npm start`, poți apăsa:
- **`r`** - Reîncarcă aplicația
- **`s`** - Schimbă între Expo Go și development build
- **`m`** - Deschide meniul developer
- **`j`** - Deschide debugger-ul
- **`?`** - Vezi toate comenzile

## 📱 Alternativă: Android Studio (dacă vrei)

Dacă vrei să folosești Android Studio (nu e necesar pentru Expo Go):

1. Instalează Android Studio
2. Configurează variabila de mediu `ANDROID_HOME`
3. Conectează telefonul prin USB cu USB Debugging activat
4. Apoi poți apăsa **`a`** în terminal

**Dar nu e necesar!** Expo Go este mult mai simplu! 😊

---

**Rezumat:** Instalează Expo Go → Scanează QR code → Gata! 🎬

