# Unde rulezi comenzile - Ghid clar

## 📁 Da, trebuie în folderul proiectului!

### Pentru React Native CLI (proiectul actual):

```cmd
# 1. Deschide Command Prompt
# 2. Navighează la folderul proiectului
cd C:\Users\Andreea\moviereview

# 3. Apoi rulează comenzile
npm install
npm start
npm run android
```

**Important:** Toate comenzile trebuie rulate din `C:\Users\Andreea\moviereview`

### Pentru Expo (alternativă simplă):

Ai **două opțiuni**:

#### Opțiunea 1: Folosește proiectul existent
```cmd
cd C:\Users\Andreea\moviereview
npm install expo
npx expo install
npx expo start
```

#### Opțiunea 2: Creează proiect nou Expo (recomandat)
```cmd
# Navighează unde vrei proiectul nou (ex: Desktop)
cd C:\Users\Andreea\Desktop

# Creează proiect nou
npx create-expo-app MovieReviewApp

# Intră în folderul nou
cd MovieReviewApp

# Apoi copiază codul din proiectul vechi
# (App.js și folderul src/)
```

## 🎯 Structura folderelor:

### React Native CLI (actual):
```
C:\Users\Andreea\moviereview\
├── App.js
├── index.js
├── package.json
├── src\
└── ...
```
**Rulezi comenzile aici:** `cd C:\Users\Andreea\moviereview`

### Expo (nou proiect):
```
C:\Users\Andreea\Desktop\MovieReviewApp\
├── App.js
├── package.json
├── src\
└── ...
```
**Rulezi comenzile aici:** `cd C:\Users\Andreea\Desktop\MovieReviewApp`

## 📝 Pași pentru Command Prompt:

### Metoda 1: Navigare manuală
```cmd
# Deschide Command Prompt
# Scrie:
cd C:\Users\Andreea\moviereview

# Verifică că ești în folderul corect:
dir
# Ar trebui să vezi: App.js, package.json, src\, etc.

# Apoi rulează comenzile
npm install
```

### Metoda 2: Deschide direct în folder
1. Deschide File Explorer
2. Navighează la `C:\Users\Andreea\moviereview`
3. Click dreapta în folder → "Open in Terminal" sau "Open PowerShell window here"
4. Command Prompt se deschide direct în folderul corect!

### Metoda 3: Din VS Code
1. Deschide VS Code
2. File → Open Folder → Selectează `C:\Users\Andreea\moviereview`
3. Terminal → New Terminal
4. Terminalul se deschide automat în folderul proiectului!

## ✅ Verificare că ești în folderul corect:

După `cd C:\Users\Andreea\moviereview`, verifică:
```cmd
dir
```

Ar trebui să vezi:
```
App.js
index.js
package.json
src\
node_modules\
...
```

Dacă vezi aceste fișiere, ești în folderul corect! ✅

## 🚀 Comenzi complete (copy-paste):

### Pentru React Native CLI:
```cmd
cd C:\Users\Andreea\moviereview
npm install
npm start
```
(În alt terminal:)
```cmd
cd C:\Users\Andreea\moviereview
npm run android
```

### Pentru Expo:
```cmd
cd C:\Users\Andreea\moviereview
npm install expo
npx expo install
npx expo start
```

## 💡 Sfat:

**Cel mai ușor:** Deschide VS Code în folderul `C:\Users\Andreea\moviereview` și folosește terminalul integrat. Se deschide automat în folderul corect!

---

**Răspuns scurt:** Da, toate comenzile trebuie rulate din `C:\Users\Andreea\moviereview` (sau din folderul proiectului dacă creezi unul nou cu Expo).


