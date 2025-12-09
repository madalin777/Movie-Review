# Ordinea corectă a pașilor - Ghid pas cu pas

## 📋 Pașii în ordine:

### 1. ✅ Instalează Android Studio
- Descarcă de pe: https://developer.android.com/studio
- Instalează cu:
  - ✅ Android SDK
  - ✅ Android SDK Platform
  - ✅ Android SDK Platform-Tools (ADB)
  - ❌ Android Virtual Device (NU e necesar dacă folosești telefon real)

### 2. ⚙️ Configurează variabilele de mediu (IMPORTANT!)

**După instalarea Android Studio**, trebuie să configurezi variabilele de mediu:

1. Găsește locația Android SDK:
   - De obicei: `C:\Users\Andreea\AppData\Local\Android\Sdk`
   - SAU deschide Android Studio → File → Settings → Appearance & Behavior → System Settings → Android SDK
   - Vezi "Android SDK Location"

2. Configurează variabilele:
   - `Win + R` → `sysdm.cpl` → Tab "Avansat" → "Variabile de mediu"
   - Adaugă variabila nouă:
     - **Nume:** `ANDROID_HOME`
     - **Valoare:** `C:\Users\Andreea\AppData\Local\Android\Sdk` (calea ta)
   - În **PATH**, adaugă:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\tools\bin`

3. **RESTART Command Prompt** după setarea variabilelor!

### 3. ✅ Instalează Java JDK 17
- Descarcă de pe: https://adoptium.net/
- Instalează JDK 17
- Adaugă în variabilele de mediu:
  - `JAVA_HOME` = `C:\Program Files\Java\jdk-17` (sau calea ta)
  - Adaugă `%JAVA_HOME%\bin` în PATH

### 4. ✅ Instalează dependențele proiectului

Deschide Command Prompt în folderul proiectului:
```cmd
cd C:\Users\Andreea\moviereview
npm install
```

Aceasta va instala toate pachetele React Native necesare.

### 5. ✅ Configurează telefonul Android

1. **Activează Opțiuni Programator:**
   - Setări → Despre telefon
   - Găsește "Număr build" sau "Build number"
   - Apasă de **7 ori** pe el

2. **Activează USB Debugging:**
   - Setări → Opțiuni programator
   - Activează "USB Debugging"
   - Activează "Instalare prin USB" (dacă există)

3. **Conectează telefonul prin USB**

4. **Verifică conexiunea:**
   ```cmd
   adb devices
   ```
   Ar trebui să vezi telefonul listat:
   ```
   List of devices attached
   ABC123XYZ    device
   ```

### 6. ✅ Rulează aplicația

**IMPORTANT:** Rulează în **DOUĂ terminale separate**:

**Terminal 1 - Metro Bundler:**
```cmd
cd C:\Users\Andreea\moviereview
npm start
```
Lasă acest terminal deschis! Nu-l închide.

**Terminal 2 - Rulează pe Android:**
```cmd
cd C:\Users\Andreea\moviereview
npm run android
```

Aplicația se va instala și rula pe telefon! 📱

## ⚠️ Erori comune și soluții:

### "SDK location not found"
- Verifică că `ANDROID_HOME` este setat corect
- **RESTART Command Prompt** după setarea variabilelor

### "Java not found"
- Verifică că `JAVA_HOME` este setat corect
- Verifică: `java -version` în Command Prompt

### "adb: command not found"
- Verifică că `%ANDROID_HOME%\platform-tools` este în PATH
- **RESTART Command Prompt**

### "No devices found"
- Verifică că telefonul este conectat
- Verifică că USB Debugging este activat
- Rulează: `adb devices`
- Dacă vezi "unauthorized", apasă "Permite" pe telefon

## 📝 Checklist final:

Înainte de a rula `npm start` și `npm run android`, verifică:

- [ ] Android Studio instalat
- [ ] `ANDROID_HOME` setat în variabilele de mediu
- [ ] PATH actualizat cu platform-tools
- [ ] Java JDK 17 instalat
- [ ] `JAVA_HOME` setat
- [ ] Command Prompt **RESTARTAT** (după setarea variabilelor)
- [ ] `npm install` rulat cu succes
- [ ] Telefon conectat prin USB
- [ ] USB Debugging activat pe telefon
- [ ] `adb devices` arată telefonul

## 🎯 Rezumat rapid:

```
1. Instalează Android Studio
2. Configurează ANDROID_HOME și PATH
3. Instalează Java JDK 17
4. RESTART Command Prompt
5. npm install
6. Configurează telefonul (USB Debugging)
7. Terminal 1: npm start
8. Terminal 2: npm run android
```

---

**Important:** Nu rula `npm start` și `npm run android` imediat după instalarea Android Studio! Trebuie să configurezi mai întâi variabilele de mediu și să instalezi dependențele.


