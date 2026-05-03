# 🔧 Fix Frontend - Instructions

## Problème
Erreur: `Package subpath './internal' is not defined by "exports"`

## Cause
Incompatibilité entre les versions de Vite et le plugin React.

## Solution

### Étape 1: Nettoyer
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
```

### Étape 2: Vérifier package.json
Le fichier `frontend/package.json` a déjà été mis à jour avec:
- ✅ `@vitejs/plugin-react` au lieu de `@vitejs/plugin-react-swc`
- ✅ `axios` ajouté dans les dépendances

### Étape 3: Supprimer le fichier en double
```bash
cd frontend
rm vite.config.ts
```
(Déjà fait - on garde seulement `vite.config.js`)

### Étape 4: Réinstaller
```bash
cd frontend
npm install
```

**Note:** L'installation peut prendre 2-3 minutes. Sois patient!

### Étape 5: Démarrer
```bash
npm run dev
```

## Si ça ne marche toujours pas

### Option A: Utiliser Yarn
```bash
cd frontend
npm install -g yarn
yarn install
yarn dev
```

### Option B: Utiliser pnpm
```bash
cd frontend
npm install -g pnpm
pnpm install
pnpm dev
```

### Option C: Vérifier Node.js
```bash
node --version
```
Assure-toi d'avoir Node.js 18+ installé.

Si tu as une version plus ancienne:
1. Télécharge Node.js 20 LTS depuis https://nodejs.org
2. Installe-le
3. Redémarre ton terminal
4. Réessaye

## Vérification finale

Une fois que `npm run dev` fonctionne, tu devrais voir:
```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

Ouvre http://localhost:5173 dans ton navigateur!

## Démarrage complet (Backend + Frontend)

### Terminal 1 - Backend
```bash
cd backend
php artisan migrate:fresh --seed
php artisan serve
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Comptes de test

**Admin:**
- Email: admin@verdant.co
- Password: password

**User:**
- Email: user@verdant.co
- Password: password

---

**Si tu as toujours des problèmes, partage le message d'erreur complet!**
