# Eroare: Ai rulat din folderul greșit!

## ❌ Problema:

Ai rulat comenzile din `C:\Windows\System32` în loc de folderul proiectului!

Eroarea "EPERM" apare pentru că încearcă să citească din System32 (care are restricții de permisiuni).

## ✅ Soluție:

### Pasul 1: Navighează la folderul proiectului

```cmd
cd C:\Users\Andreea\moviereview
```

### Pasul 2: Verifică că ești în folderul corect

```cmd
dir
```

Ar trebui să vezi:
- `App.js`
- `package.json`
- `src\`
- etc.

### Pasul 3: Instalează Expo (din folderul corect)

```cmd
npm install expo
npx expo install
```

### Pasul 4: Rulează Expo (din folderul corect)

```cmd
npx expo start
```

## 🎯 Comenzi complete (copy-paste):

```cmd
cd C:\Users\Andreea\moviereview
npm install expo
npx expo install
npx expo start
```

## 💡 Sfat:

**Cel mai ușor:** Deschide VS Code în folderul `C:\Users\Andreea\moviereview` și folosește terminalul integrat. Se deschide automat în folderul corect!

SAU

Click dreapta în folderul `C:\Users\Andreea\moviereview` → "Open in Terminal"

---

**Important:** Toate comenzile trebuie rulate din `C:\Users\Andreea\moviereview`, NU din System32!

