# Instrucțiuni de Setup pentru React Native

## Pași pentru a rula aplicația pe telefon

### Pentru Android:

1. **Instalează Android Studio**
   - Descarcă de pe: https://developer.android.com/studio
   - Instalează Android SDK, Android SDK Platform, și Android Virtual Device

2. **Configurează variabilele de mediu**
   - Adaugă `ANDROID_HOME` în variabilele de mediu:
     - Windows: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
     - Mac/Linux: `~/Library/Android/sdk` sau `$HOME/Android/Sdk`

3. **Instalează dependențele**
   ```bash
   npm install
   ```

4. **Pornește Metro Bundler**
   ```bash
   npm start
   ```

5. **Rulează pe Android**
   - Conectează telefonul prin USB sau pornește un emulator
   - Activează "USB Debugging" pe telefon (Setări > Opțiuni programator)
   - Rulează:
     ```bash
     npm run android
     ```

### Pentru iOS (doar pe macOS):

1. **Instalează Xcode**
   - Descarcă din App Store
   - Instalează Command Line Tools: `xcode-select --install`

2. **Instalează CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

3. **Instalează dependențele**
   ```bash
   npm install
   cd ios
   pod install
   cd ..
   ```

4. **Rulează pe iOS**
   ```bash
   npm run ios
   ```

## Configurare pentru build de producție

### Android:

1. **Generează keystore**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configurează `android/gradle.properties`**
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=*****
   MYAPP_RELEASE_KEY_PASSWORD=*****
   ```

3. **Build APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

### iOS:

1. **Deschide proiectul în Xcode**
   ```bash
   open ios/MovieReview.xcworkspace
   ```

2. **Configurează signing în Xcode**
   - Selectează echipa ta de dezvoltare
   - Configurează Bundle Identifier

3. **Build pentru App Store**
   - Product > Archive
   - Distribuie prin App Store Connect

## Permisiuni necesare

### Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS (`ios/MovieReview/Info.plist`):
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

## Depanare probleme comune

### "SDK location not found"
- Verifică că `ANDROID_HOME` este setat corect
- Rulează: `react-native doctor`

### "Unable to resolve module"
```bash
npm start -- --reset-cache
rm -rf node_modules
npm install
```

### Erori de build iOS
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Port 8081 deja folosit
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8081 | xargs kill -9
```

## Testare pe dispozitiv fizic

### Android:
1. Activează "USB Debugging" pe telefon
2. Conectează telefonul prin USB
3. Autorizează computerul când apare prompt-ul
4. Rulează `npm run android`

### iOS:
1. Conectează iPhone-ul
2. Autorizează computerul în Xcode
3. Selectează dispozitivul în Xcode
4. Rulează `npm run ios`

## Note importante

- Asigură-te că ai cel puțin 8GB RAM disponibil
- Pentru iOS, ai nevoie de macOS și Xcode
- Pentru Android, poți folosi Windows, Mac sau Linux
- Recomandat: Node.js 16+ și npm 8+

