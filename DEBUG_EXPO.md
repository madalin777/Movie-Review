# Debug - De ce nu rulează aplicația pe telefon?

## 🔍 Informații necesare:

**Spune-mi exact:**
1. **Ce mesaj vezi pe telefon** când scanezi QR code-ul?
   - Eroare roșie?
   - Ecran alb?
   - Mesaj specific?

2. **Ce vezi în terminal** când rulezi `npx expo start`?
   - Erori?
   - Warnings?
   - Mesaje de bundling?

3. **Ce versiune de Expo Go** ai instalat pe telefon?

## 🛠️ Pași de debug:

### Pasul 1: Verifică că Expo Go e instalat corect

Pe telefon:
- Deschide Expo Go
- Verifică că e versiunea cea mai recentă
- Asigură-te că telefonul și computerul sunt pe același Wi-Fi

### Pasul 2: Verifică conexiunea

În terminal, când rulezi `npx expo start`, ar trebui să vezi:
```
› Metro waiting on exp://192.168.x.x:8081
```

Verifică că IP-ul e corect și că telefonul poate accesa acel IP.

### Pasul 3: Testează cu aplicație simplă

Creează un `App.js` simplu pentru test:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Expo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
```

Dacă asta funcționează, problema e în codul aplicației.

### Pasul 4: Verifică erorile în Expo Go

În Expo Go, apasă:
- **Shake device** (scutură telefonul) SAU
- **3 finger tap** (3 degete simultan)

Aceasta deschide Developer Menu unde poți vedea erorile.

## ⚠️ Probleme comune:

### 1. "Unable to resolve module"
- Verifică că toate dependențele sunt instalate
- Rulează: `npm install`

### 2. "Property 'require' doesn't exist"
- Verifică că `babel.config.js` folosește `babel-preset-expo`
- Rulează: `npx expo start --clear`

### 3. "Network request failed"
- Verifică că telefonul și computerul sunt pe același Wi-Fi
- Verifică firewall-ul Windows

### 4. Ecran alb
- Verifică erorile în Developer Menu (shake device)
- Verifică console-ul în terminal

---

**Spune-mi exact ce vezi și te ajut să rezolvăm problema!**

