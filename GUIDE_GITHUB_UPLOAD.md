# Ghid: Încărcare proiect pe GitHub

## 📋 Pași pentru a încărca proiectul pe GitHub

### Pasul 1: Verifică dacă ai Git instalat

Deschide Command Prompt și rulează:
```cmd
git --version
```

Dacă vezi o versiune, Git e instalat ✅
Dacă nu, instalează Git de pe: https://git-scm.com/download/win

### Pasul 2: Navighează la folderul proiectului

```cmd
cd C:\Users\Andreea\moviereview
```

### Pasul 3: Inițializează repository Git (dacă nu e deja)

```cmd
git init
```

### Pasul 4: Adaugă remote repository

```cmd
git remote add origin https://github.com/madalin777/Movie-Review.git
```

Dacă ai deja un remote, verifică:
```cmd
git remote -v
```

Dacă e greșit, șterge-l și adaugă-l din nou:
```cmd
git remote remove origin
git remote add origin https://github.com/madalin777/Movie-Review.git
```

### Pasul 5: Adaugă toate fișierele

```cmd
git add .
```

### Pasul 6: Creează commit

```cmd
git commit -m "Add React Native version with Expo support"
```

### Pasul 7: Push pe GitHub

```cmd
git branch -M main
git push -u origin main
```

Dacă e prima dată, GitHub te va cere să te autentifici.

## 🔐 Autentificare GitHub

### Opțiunea 1: Personal Access Token (recomandat)

1. Mergi pe GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Selectează permisiuni: `repo` (toate)
4. Copiază token-ul
5. Când Git cere parola, folosește token-ul în loc de parolă

### Opțiunea 2: GitHub Desktop (mai ușor)

1. Descarcă GitHub Desktop: https://desktop.github.com/
2. Instalează și autentifică-te
3. File → Add Local Repository
4. Selectează folderul `C:\Users\Andreea\moviereview`
5. Commit & Push

## 📁 Fișiere care vor fi încărcate

### ✅ Fișiere incluse (din .gitignore):
- Toate fișierele sursă (`.js`, `.json`, `.md`)
- Configurații (`.config.js`, `app.json`)
- Componente și ecrane

### ❌ Fișiere excluse (din .gitignore):
- `node_modules/` - nu se încarcă (prea mari)
- `package-lock.json` - poate fi exclus sau inclus (recomandat inclus)
- Fișiere temporare

## 🚀 Comenzi complete (copy-paste):

```cmd
cd C:\Users\Andreea\moviereview
git init
git remote add origin https://github.com/madalin777/Movie-Review.git
git add .
git commit -m "Add React Native version with Expo support"
git branch -M main
git push -u origin main
```

## ⚠️ Dacă repository-ul are deja conținut:

Dacă repository-ul de pe GitHub are deja fișiere, ai două opțiuni:

### Opțiunea 1: Pull mai întâi (recomandat)

```cmd
git pull origin main --allow-unrelated-histories
git add .
git commit -m "Merge React Native version"
git push origin main
```

### Opțiunea 2: Force push (șterge tot ce e pe GitHub)

**ATENȚIE:** Aceasta va șterge tot ce e deja pe GitHub!

```cmd
git push -u origin main --force
```

## 📝 Structura finală pe GitHub:

După upload, repository-ul va conține:

```
Movie-Review/
├── App.js                    # React Native App
├── index.js                  # Entry point
├── app.json                  # Expo config
├── babel.config.js           # Babel config
├── metro.config.js          # Metro config
├── package.json              # Dependencies
├── .gitignore               # Git ignore rules
├── README.md                 # Documentation
│
└── src/
    ├── screens/              # React Native screens
    │   ├── HomeScreen.js
    │   └── MovieDetailScreen.js
    ├── components/           # React Native components
    │   ├── Header.js
    │   ├── MovieCard.js
    │   ├── MovieList.js
    │   ├── ReviewForm.js
    │   └── TrailerPlayer.js
    ├── data/                 # Movie data
    │   └── movies.js
    └── utils/                # Utilities
        └── tmdbImages.js
```

## ✅ Verificare după upload:

1. Mergi pe: https://github.com/madalin777/Movie-Review
2. Verifică că toate fișierele sunt acolo
3. Verifică că README.md este actualizat

## 🔄 Actualizări viitoare:

Pentru a actualiza repository-ul după modificări:

```cmd
cd C:\Users\Andreea\moviereview
git add .
git commit -m "Descriere modificări"
git push origin main
```

---

**Notă:** Nu pot face push direct pe GitHub din motive de securitate, dar acest ghid te va ajuta să o faci rapid!

