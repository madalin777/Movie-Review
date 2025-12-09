# De ce nu merge să deschid aplicația pe Android?

## 🔍 Diagnosticare pas cu pas:

### Pasul 1: Verifică ce eroare vezi

Când apeși 'a' în terminalul Metro, ce mesaj apare?
- "SDK location not found"?
- "No devices found"?
- "Java not found"?
- Altă eroare?

### Pasul 2: Verifică dacă telefonul e conectat

Deschide un terminal nou și rulează:
```cmd
adb devices
```

**Dacă vezi:**
```
List of devices attached
ABC123XYZ    device
```
✅ Telefonul e conectat corect!

**Dacă vezi:**
```
List of devices attached
ABC123XYZ    unauthorized
```
⚠️ Apasă "Permite" pe telefon când apare prompt-ul!

**Dacă vezi:**
```
List of devices attached
```
❌ Niciun device conectat - conectează telefonul sau pornește emulator!

**Dacă vezi:**
```
'adb' is not recognized as an internal or external command
```
❌ ANDROID_HOME nu e configurat corect!

### Pasul 3: Verifică configurarea Android Studio

Rulează:
```cmd
echo %ANDROID_HOME%
```

**Dacă vezi o cale** (ex: `C:\Users\Andreea\AppData\Local\Android\Sdk`):
✅ ANDROID_HOME e setat!

**Dacă nu vezi nimic:**
❌ Trebuie să configurezi ANDROID_HOME!

### Pasul 4: Verifică Java

Rulează:
```cmd
java -version
```

**Dacă vezi versiunea Java:**
✅ Java e instalat!

**Dacă vezi "Java is not recognized":**
❌ Trebuie să instalezi Java JDK 17!

## 🛠️ Soluții comune:

### Problema 1: "SDK location not found"

**Soluție:**
1. Găsește locația Android SDK (de obicei: `C:\Users\Andreea\AppData\Local\Android\Sdk`)
2. Configurează variabila de mediu:
   - `Win + R` → `sysdm.cpl` → Tab "Avansat" → "Variabile de mediu"
   - Adaugă: `ANDROID_HOME` = calea către SDK
   - Adaugă în PATH: `%ANDROID_HOME%\platform-tools`
3. **RESTART Command Prompt!**

### Problema 2: "No devices found"

**Soluție:**
1. Conectează telefonul prin USB
2. Activează USB Debugging:
   - Setări → Despre telefon → Apasă de 7 ori pe "Număr build"
   - Setări → Opțiuni programator → Activează "USB Debugging"
3. Verifică: `adb devices`
4. Dacă vezi "unauthorized", apasă "Permite" pe telefon

### Problema 3: "Java not found"

**Soluție:**
1. Instalează Java JDK 17: https://adoptium.net/
2. Configurează `JAVA_HOME` în variabilele de mediu
3. **RESTART Command Prompt!**

### Problema 4: "adb is not recognized"

**Soluție:**
- Verifică că `%ANDROID_HOME%\platform-tools` e în PATH
- **RESTART Command Prompt!**

## 🚀 Alternativă rapidă: Expo

Dacă nu vrei să configurezi Android Studio acum, poți folosi **Expo**:

1. **Oprește Metro** (Ctrl+C)

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

**Avantaje:**
- ✅ Fără Android Studio
- ✅ Fără configurare
- ✅ Funcționează în 2 minute

---

## 📝 Spune-mi:

1. **Ce eroare vezi** când apeși 'a'?
2. **Ce arată** `adb devices`?
3. **Ce arată** `echo %ANDROID_HOME%`?

Cu aceste informații pot să te ajut mai precis!

