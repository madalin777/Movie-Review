# Fix eroare npm install - Conflict React

## 🔧 Soluție rapidă:

### Pasul 1: Șterge node_modules și package-lock.json

```cmd
cd C:\Users\Andreea\moviereview
rmdir /s /q node_modules
del package-lock.json
```

### Pasul 2: Instalează cu --legacy-peer-deps

```cmd
npm install --legacy-peer-deps
```

Aceasta va ignora conflictele de versiuni și va instala totul.

## 📝 Explicație:

Problema este că:
- Proiectul web original folosește React 19.2.0
- React Native 0.72.6 necesită React 18.2.0
- `package-lock.json` vechi conține dependențele web

Soluția: ștergem totul și reinstalăm doar dependențele React Native.

## ✅ Verificare după instalare:

După `npm install --legacy-peer-deps`, verifică:
```cmd
npm list react
```

Ar trebui să vezi React 18.2.0 (nu 19.2.0).

## 🚀 Apoi rulează:

```cmd
npm start
```

---

**Dacă tot vezi erori**, poți încerca și:
```cmd
npm cache clean --force
npm install --legacy-peer-deps
```

