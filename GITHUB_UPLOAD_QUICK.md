# Upload Rapid pe GitHub - Comenzi Copy-Paste

## 🚀 Pași rapizi:

### 1. Deschide Command Prompt în folderul proiectului

```cmd
cd C:\Users\Andreea\moviereview
```

### 2. Inițializează Git (dacă nu e deja)

```cmd
git init
```

### 3. Adaugă remote repository

```cmd
git remote add origin https://github.com/madalin777/Movie-Review.git
```

**Dacă ai deja remote, verifică:**
```cmd
git remote -v
```

**Dacă e greșit, șterge-l:**
```cmd
git remote remove origin
git remote add origin https://github.com/madalin777/Movie-Review.git
```

### 4. Adaugă toate fișierele

```cmd
git add .
```

### 5. Creează commit

```cmd
git commit -m "Add React Native version with Expo support for Android and iOS"
```

### 6. Push pe GitHub

```cmd
git branch -M main
git push -u origin main
```

## 🔐 Autentificare GitHub

Când Git cere autentificare:

1. **Username:** username-ul tău GitHub
2. **Password:** folosește un **Personal Access Token** (nu parola!)

### Cum obții Personal Access Token:

1. Mergi pe: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Selectează permisiuni: `repo` (toate)
4. Click "Generate token"
5. **Copiază token-ul** (nu-l vei mai vedea!)
6. Folosește token-ul ca parolă când Git cere

## ⚠️ Dacă repository-ul are deja conținut:

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

## ✅ Verificare

După push, verifică pe: https://github.com/madalin777/Movie-Review

Toate fișierele ar trebui să fie acolo!

---

**Notă:** `node_modules/` nu se va încărca (e exclus din .gitignore) - e normal!

