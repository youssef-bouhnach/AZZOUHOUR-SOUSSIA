# 🚀 Quick Fix - Démarrage Frontend

## Problème résolu
✅ Supprimé `@tailwindcss/vite` du vite.config.js  
✅ Ajouté l'alias `@` pour les imports

## Commandes à exécuter

### 1. Réessayer npm run dev
```bash
cd frontend
npm run dev
```

### 2. Si erreur "Cannot find module"
```bash
cd frontend
npm install
npm run dev
```

### 3. Si erreur persiste
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Vérification rapide

### Vérifier que Node.js est installé
```bash
node --version
# Doit afficher v18.x ou v20.x
```

### Vérifier que npm fonctionne
```bash
npm --version
# Doit afficher 9.x ou 10.x
```

## Démarrage complet

### Terminal 1 - Backend
```bash
cd backend
php artisan serve
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```

## URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000

## Comptes de test

**Admin:**
```
Email: admin@verdant.co
Password: password
```

**User:**
```
Email: user@verdant.co
Password: password
```

## Si ça marche

Tu devrais voir dans le terminal:
```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Ouvre http://localhost:5173 dans ton navigateur! 🎉

## Problèmes courants

### Port 5173 déjà utilisé
```bash
# Tuer le processus sur le port 5173
npx kill-port 5173
npm run dev
```

### Port 8000 déjà utilisé (backend)
```bash
# Tuer le processus sur le port 8000
npx kill-port 8000
cd backend
php artisan serve
```

### Erreur CORS
Assure-toi que:
1. Le backend tourne sur http://localhost:8000
2. Le frontend tourne sur http://localhost:5173
3. Les deux serveurs sont démarrés

---

**Essaye maintenant: `npm run dev` dans le dossier frontend!**
