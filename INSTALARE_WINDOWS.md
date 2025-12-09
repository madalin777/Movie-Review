# Instalare React Native pe Windows - Ghid Complet

## ✅ Da, poți instala pe Windows!

Aplicația React Native funcționează perfect pe Windows. Poți dezvolta pentru **Android** direct. Pentru **iOS** ai nevoie de Mac, dar poți testa pe Android.

## 📋 Ce trebuie instalat:

### 1. Node.js (Obligatoriu)
- Descarcă de pe: https://nodejs.org/
- Instalează versiunea **LTS** (recomandat 18.x sau 20.x)
- Verifică instalarea:
  ```cmd
  node --version
  npm --version
  ```

### 2. Java Development Kit (JDK) - Pentru Android
- Descarcă JDK 17 de pe: https://adoptium.net/
- Sau folosește: https://www.oracle.com/java/technologies/downloads/#java17
- Adaugă în variabilele de mediu:
  - `JAVA_HOME` = `C:\Program Files\Java\jdk-17` (sau calea ta)
  - Adaugă `%JAVA_HOME%\bin` în `PATH`

### 3. Android Studio (Obligatoriu pentru Android)
- Descarcă de pe: https://developer.android.com/studio
- La instalare, selectează:
  - ✅ Android SDK
  - ✅ Android SDK Platform
  - ✅ Android Virtual Device (AVD)
  - ✅ Performance (Intel HAXM)

### 4. React Native CLI (Obligatoriu)
```cmd
npm install -g react-native-cli
```

### 5. Python 2 (Obligatoriu pentru build Android)
- Descarcă Python 2.7 de pe: https://www.python.org/downloads/
- SAU instalează Python 3 și creează un alias:
  ```cmd
  npm config set python python3
  ```

## 🚀 Pașii de instalare:

### Pasul 1: Deschide Command Prompt ca Administrator
- Apasă `Win + X` → "Windows PowerShell (Admin)" sau "Command Prompt (Admin)"

### Pasul 2: Instalează dependențele proiectului
```cmd
cd C:\Users\Andreea\moviereview
npm install
```

### Pasul 3: Configurează variabilele de mediu Android

Deschide "Editare variabile de mediu pentru sistem":
- `Win + R` → `sysdm.cpl` → Tab "Avansat" → "Variabile de mediu"

Adaugă:
- **ANDROID_HOME** = `C:\Users\Andreea\AppData\Local\Android\Sdk`
  (sau calea unde ai instalat Android SDK)

- Adaugă în **PATH**:
  ```
  %ANDROID_HOME%\platform-tools
  %ANDROID_HOME%\tools
  %ANDROID_HOME%\tools\bin
  ```

### Pasul 4: Verifică instalarea
```cmd
react-native doctor
```

Sau verifică manual:
```cmd
java -version
adb version
node --version
npm --version
```

## 📱 Rulare aplicație:

### Opțiunea 1: Pe Emulator Android (Recomandat pentru testare)

1. **Pornește Android Studio**
2. **Creează un Virtual Device:**
   - Tools → Device Manager → Create Device
   - Alege un telefon (ex: Pixel 5)
   - Alege o versiune Android (ex: Android 13)
   - Finalizează crearea

3. **Pornește emulatorul:**
   - Deschide Device Manager
   - Click pe Play ▶ lângă device-ul creat

4. **Rulează aplicația:**
   ```cmd
   cd C:\Users\Andreea\moviereview
   npm start
   ```
   (Lasă acest terminal deschis)

5. **În alt terminal:**
   ```cmd
   cd C:\Users\Andreea\moviereview
   npm run android
   ```

### Opțiunea 2: Pe Telefon Real Android

1. **Activează USB Debugging pe telefon:**
   - Setări → Despre telefon → Apasă de 7 ori pe "Număr build"
   - Setări → Opțiuni programator → Activează "USB Debugging"

2. **Conectează telefonul prin USB**

3. **Autorizează computerul:**
   - Când apare prompt pe telefon, apasă "Permite"

4. **Verifică conexiunea:**
   ```cmd
   adb devices
   ```
   Ar trebui să vezi telefonul listat

5. **Rulează aplicația:**
   ```cmd
   npm start
   ```
   (În alt terminal)
   ```cmd
   npm run android
   ```

## 🔧 Comenzi utile:

```cmd
# Pornește Metro Bundler
npm start

# Rulează pe Android
npm run android

# Curăță cache
npm start -- --reset-cache

# Reinstalează node_modules
rmdir /s /q node_modules
npm install

# Verifică conexiunea device-uri
adb devices

# Restart ADB server
adb kill-server
adb start-server
```

## ⚠️ Probleme comune pe Windows:

### "SDK location not found"
- Verifică că `ANDROID_HOME` este setat corect
- Restart Command Prompt după setarea variabilelor

### "Unable to resolve module"
```cmd
npm start -- --reset-cache
```

### "Port 8081 already in use"
```cmd
netstat -ano | findstr :8081
taskkill /PID <PID_NUMBER> /F
```

### "Execution failed for task ':app:installDebug'"
- Verifică că emulatorul/telefonul este pornit
- Rulează: `adb devices` pentru a verifica conexiunea

### "Gradle build failed"
```cmd
cd android
gradlew clean
cd ..
npm run android
```

## 📝 Structura comenzilor:

```
1. Deschide Command Prompt (Admin)
2. cd C:\Users\Andreea\moviereview
3. npm install
4. npm start          (Terminal 1 - lasă deschis)
5. npm run android    (Terminal 2 - rulează aplicația)
```

## ✅ Verificare finală:

După instalare, aplicația ar trebui să:
1. ✅ Se deschidă pe emulator/telefon
2. ✅ Afișeze lista de filme
3. ✅ Permită căutare și filtrare
4. ✅ Navigare la detalii film
5. ✅ Adăugare recenzii

## 🎯 Rezumat rapid:

```cmd
# 1. Instalează Node.js, Android Studio, Java
# 2. Configurează ANDROID_HOME în variabile de mediu
# 3. Deschide Command Prompt în folderul proiectului
cd C:\Users\Andreea\moviereview
npm install
npm start
# 4. În alt terminal:
npm run android
```

## 💡 Sfat:

Pentru o experiență mai bună, folosește **PowerShell** sau **Windows Terminal** în loc de Command Prompt vechi. Suportă mai multe funcții și este mai modern.

---

**Succes!** 🚀 Aplicația ta va rula pe Android în câteva minute!

