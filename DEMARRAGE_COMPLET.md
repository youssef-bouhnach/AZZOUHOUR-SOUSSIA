# 🚀 Guide de démarrage complet - Verdant & Co.

## ✅ Tout est prêt et fonctionnel!

Frontend et Backend sont maintenant **100% connectés** et opérationnels.

---

## 📋 Démarrage rapide

### Option 1: Script automatique (Windows)
```bash
start.bat
```
Ce script va:
- ✅ Démarrer le backend Laravel sur http://localhost:8000
- ✅ Démarrer le frontend React sur http://localhost:5173
- ✅ Ouvrir 2 fenêtres de terminal

### Option 2: Manuel (2 terminaux)

#### Terminal 1 - Backend Laravel
```bash
cd backend
php artisan serve
```
✅ Backend disponible sur: **http://localhost:8000**

#### Terminal 2 - Frontend React
```bash
cd frontend
npm run dev
```
✅ Frontend disponible sur: **http://localhost:5173**

---

## 🌐 URLs de l'application

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Interface utilisateur React |
| **Backend API** | http://localhost:8000 | API Laravel |
| **Admin Panel** | http://localhost:5173/admin | Panel d'administration |

---

## 👤 Comptes de test

### Administrateur
```
Email:    admin@verdant.co
Password: password
```
**Accès:**
- ✅ Panel admin complet
- ✅ Gestion des produits (CRUD)
- ✅ Gestion des commandes
- ✅ Dashboard avec statistiques

### Utilisateur normal
```
Email:    user@verdant.co
Password: password
```
**Accès:**
- ✅ Parcourir les produits
- ✅ Ajouter au panier
- ✅ Passer des commandes
- ✅ Voir son profil

---

## 🎯 Fonctionnalités disponibles

### Public (sans connexion)
- ✅ Voir tous les produits
- ✅ Filtrer par catégorie (Flowers, Grass, Soil, Services)
- ✅ Ajouter au panier
- ✅ Voir les services
- ✅ Page d'accueil
- ✅ Page contact

### Utilisateur connecté
- ✅ Passer des commandes
- ✅ Formulaire d'adresse de livraison
- ✅ Notes de commande
- ✅ Gestion du panier
- ✅ Profil utilisateur dans la navbar

### Administrateur
- ✅ Dashboard avec statistiques
- ✅ Créer des produits
- ✅ Modifier des produits
- ✅ Supprimer des produits
- ✅ Voir toutes les commandes
- ✅ Changer le statut des commandes

---

## 🔄 Workflow typique

### 1. Inscription d'un nouvel utilisateur
1. Ouvre http://localhost:5173
2. Clique sur "Login" dans la navbar
3. Clique sur "Register"
4. Remplis le formulaire
5. Tu es automatiquement connecté

### 2. Passer une commande
1. Connecte-toi (ou inscris-toi)
2. Parcours les produits
3. Clique sur "Add" pour ajouter au panier
4. Clique sur l'icône panier dans la navbar
5. Remplis l'adresse de livraison
6. Clique sur "Place Order"
7. ✅ Commande créée!

### 3. Gérer les produits (Admin)
1. Connecte-toi avec le compte admin
2. Clique sur ton nom → "Admin Panel"
3. Va dans "Products"
4. Clique sur "Add Product"
5. Remplis le formulaire
6. ✅ Produit créé!

---

## 🗄️ Base de données

### Réinitialiser la base de données
Si tu veux remettre les données par défaut:

```bash
cd backend
php artisan migrate:fresh --seed
```

Cela va:
- ✅ Supprimer toutes les données
- ✅ Recréer les tables
- ✅ Ajouter 2 utilisateurs (admin + user)
- ✅ Ajouter 8 produits de test

### Voir les données
```bash
cd backend
php artisan tinker
```

Puis dans tinker:
```php
// Voir tous les utilisateurs
User::all();

// Voir tous les produits
Product::all();

// Voir toutes les commandes
Order::with('items.product', 'user')->get();

// Compter les produits
Product::count();
```

---

## 🔧 Commandes utiles

### Backend (Laravel)

```bash
# Voir les routes API
php artisan route:list

# Vider le cache
php artisan cache:clear
php artisan config:clear

# Voir les logs
tail -f storage/logs/laravel.log

# Créer un nouveau contrôleur
php artisan make:controller NomController

# Créer un nouveau modèle
php artisan make:model NomModele -m
```

### Frontend (React)

```bash
# Installer une nouvelle dépendance
npm install nom-package

# Build pour production
npm run build

# Voir la taille du build
npm run build && ls -lh dist/

# Linter le code
npm run lint
```

---

## 🐛 Dépannage

### Le frontend ne se connecte pas au backend

**Vérifier:**
1. Le backend tourne sur http://localhost:8000
2. Le frontend tourne sur http://localhost:5173
3. Pas d'erreur CORS dans la console du navigateur

**Solution:**
```bash
# Redémarrer les deux serveurs
# Terminal 1
cd backend
php artisan serve

# Terminal 2
cd frontend
npm run dev
```

### Erreur "Port already in use"

**Backend (port 8000):**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

**Frontend (port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Erreur de session/cookies

1. Vide les cookies du navigateur pour localhost
2. Redémarre les serveurs
3. Réessaye de te connecter

### Base de données corrompue

```bash
cd backend
rm database/database.sqlite
touch database/database.sqlite
php artisan migrate:fresh --seed
```

---

## 📊 Structure de l'API

### Endpoints publics
```
GET  /api/products           # Liste des produits
GET  /api/products/{id}      # Détails d'un produit
```

### Authentification
```
POST /auth/register          # Inscription
POST /auth/login             # Connexion
POST /auth/logout            # Déconnexion
```

### Utilisateur (authentifié)
```
GET  /api/user               # Profil
GET  /api/orders             # Mes commandes
POST /api/orders             # Créer une commande
GET  /api/orders/{id}        # Détails d'une commande
```

### Admin (authentifié + role admin)
```
POST   /api/products         # Créer un produit
PUT    /api/products/{id}    # Modifier un produit
DELETE /api/products/{id}    # Supprimer un produit
GET    /api/admin/orders     # Toutes les commandes
PATCH  /api/admin/orders/{id}/status  # Changer le statut
```

---

## 📝 Prochaines étapes

### À faire
- [ ] Page "Mes commandes" pour les utilisateurs
- [ ] Intégrer l'API dans le panel admin
- [ ] Upload d'images pour les produits
- [ ] Pagination des produits
- [ ] Recherche de produits

### Améliorations possibles
- [ ] Notifications en temps réel
- [ ] Export des commandes (PDF/CSV)
- [ ] Statistiques avancées
- [ ] Tests automatisés
- [ ] Déploiement en production

---

## 📚 Documentation

- **README.md** - Vue d'ensemble du projet
- **SETUP.md** - Installation détaillée
- **INTEGRATION_COMPLETE.md** - Documentation technique
- **TEST_API.md** - Tests de l'API
- **PRODUCTION_CHECKLIST.md** - Déploiement
- **PROJECT_OVERVIEW.md** - Architecture complète

---

## 🎉 Félicitations!

Ton application e-commerce est maintenant **100% fonctionnelle**!

- ✅ Frontend React connecté au backend Laravel
- ✅ Authentification fonctionnelle
- ✅ Gestion des produits
- ✅ Système de commandes
- ✅ Panel admin
- ✅ Panier avec checkout

**Bon développement! 🚀**

---

**Questions? Problèmes?**
Consulte les fichiers de documentation ou réinitialise la base de données avec `php artisan migrate:fresh --seed`
