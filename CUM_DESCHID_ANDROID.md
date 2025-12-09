# Cum deschid aplicația pe Android?

## 🎯 Două opțiuni:

### Opțiunea 1: Apasă 'a' în terminalul Metro (dacă ai Android Studio configurat)

În terminalul unde rulează `npm start`, apasă:
```
a
```

Aceasta va încerca să deschidă aplicația pe Android.

**Dacă vezi erori:**
- "SDK location not found" → Trebuie să configurezi ANDROID_HOME
- "No devices found" → Conectează telefonul sau pornește emulator
- "Java not found" → Trebuie să instalezi Java JDK

### Opțiunea 2: Rulează în alt terminal (recomandat)

**Lasă terminalul cu `npm start` deschis!**

Deschide un **AL DOILEA terminal** și rulează:

```cmd
cd C:\Users\Andreea\moviereview
npm run android
```

Aceasta va:
1. Compila aplicația Android
2. O instalează pe telefon/emulator
3. O va porni automat

## ⚠️ Ce ai nevoie:

### Pentru telefon real:
1. ✅ Telefon Android conectat prin USB
2. ✅ USB Debugging activat pe telefon
3. ✅ Android Studio instalat (pentru SDK și ADB)

### Pentru emulator:
1. ✅ Android Studio instalat
2. ✅ Emulator creat și pornit

## 🔍 Verificare rapidă:

Înainte de a rula `npm run android`, verifică:

```cmd
adb devices
```

Ar trebui să vezi:
```
List of devices attached
ABC123XYZ    device
```

Dacă nu vezi niciun device:
- Conectează telefonul și activează USB Debugging
- SAU pornește emulator din Android Studio

## 🚀 Alternativă simplă: Expo

Dacă nu ai Android Studio configurat, poți folosi **Expo**:

1. **Oprește Metro** (Ctrl+C în terminal)

2. **Instalează Expo:**
```cmd
npm install expo
npx expo install
```

3. **Rulează cu Expo:**
```cmd
npx expo start
```

4. **Scanează QR code** cu aplicația **Expo Go** de pe telefon

## 📝 Pași completi:

### Dacă ai Android Studio:
```cmd
# Terminal 1 (deja rulează)
npm start

# Terminal 2 (nou)
cd C:\Users\Andreea\moviereview
npm run android
```

### Dacă nu ai Android Studio:
```cmd
# Oprește Metro (Ctrl+C)
npm install expo
npx expo install
npx expo start
# Scanează QR code cu Expo Go
```

---

**Spune-mi:**
- Ai Android Studio instalat și configurat?
- Ai telefon conectat sau emulator pornit?
- Sau preferi să folosim Expo (mai simplu)?

