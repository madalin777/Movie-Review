# Fix conflict versiuni React

## ✅ Am actualizat:

- `react-test-renderer`: 18.2.0 → 19.1.0 (compatibil cu React 19.1.0)
- `@types/react`: actualizat pentru React 19

## 🔧 Instalează pachetele:

### Opțiunea 1: Command Prompt (recomandat)

**Deschide Command Prompt** (nu PowerShell) și rulează:

```cmd
cd C:\Users\Andreea\moviereview
npm install --legacy-peer-deps
```

### Opțiunea 2: PowerShell (dacă vrei să folosești PowerShell)

Deschide PowerShell ca Administrator și rulează:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
cd C:\Users\Andreea\moviereview
npm install --legacy-peer-deps
```

## 📝 Explicație:

- `--legacy-peer-deps` ignoră conflictele de versiuni minore
- Este sigur de folosit pentru React Native/Expo
- Permite instalarea pachetelor chiar dacă există mici conflicte

## 🚀 După instalare:

```cmd
npx expo start --clear
```

Apoi scanează QR code-ul cu Expo Go!

---

**Important:** Folosește Command Prompt pentru a evita problemele cu PowerShell execution policy!

