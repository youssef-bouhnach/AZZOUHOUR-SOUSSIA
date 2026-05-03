# 🌿 Verdant & Co. - Setup Guide

Application e-commerce complète avec Laravel (backend) et React (frontend).

## 📋 Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- npm ou bun

## 🚀 Installation

### 1. Backend (Laravel)

```bash
cd backend

# Installer les dépendances
composer install

# Copier le fichier .env (déjà configuré pour SQLite)
# Le fichier .env existe déjà avec la configuration SQLite

# Générer la clé d'application (si nécessaire)
php artisan key:generate

# Créer la base de données SQLite
touch database/database.sqlite

# Exécuter les migrations
php artisan migrate:fresh

# Remplir la base de données avec des données de test
php artisan db:seed

# Démarrer le serveur
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

### 2. Frontend (React + Vite)

```bash
cd frontend

# Installer les dépendances
npm install
# ou
bun install

# Démarrer le serveur de développement
npm run dev
# ou
bun run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## 👤 Comptes de test

Après avoir exécuté `php artisan db:seed`, vous aurez :

### Admin
- **Email:** admin@verdant.co
- **Password:** password
- **Accès:** Panel admin + toutes les fonctionnalités

### Utilisateur
- **Email:** user@verdant.co
- **Password:** password
- **Accès:** Commandes uniquement

## 🎯 Fonctionnalités

### Public
- ✅ Parcourir les produits par catégorie
- ✅ Ajouter au panier
- ✅ Voir les services

### Utilisateur connecté
- ✅ Passer des commandes
- ✅ Voir l'historique des commandes
- ✅ Gérer le profil

### Admin
- ✅ Gérer les produits (CRUD)
- ✅ Voir toutes les commandes
- ✅ Changer le statut des commandes
- ✅ Dashboard avec statistiques

## 🔧 Configuration

### Backend (Laravel)
- Base de données: SQLite (fichier `backend/database/database.sqlite`)
- API: `http://localhost:8000/api`
- Auth: Session-based avec Sanctum

### Frontend (React)
- API URL: `http://localhost:8000` (configuré dans `frontend/src/lib/axios.js`)
- State management: React Context
- UI: shadcn/ui + Tailwind CSS

## 📁 Structure

```
.
├── backend/              # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       ├── api.php       # Routes API
│       └── web.php       # Routes auth
│
└── frontend/             # React SPA
    ├── src/
    │   ├── components/   # Composants UI
    │   ├── context/      # Context API
    │   ├── pages/        # Pages
    │   ├── services/     # API calls
    │   └── lib/          # Utilities
    └── public/

```

## 🐛 Dépannage

### CORS Errors
Assurez-vous que le backend tourne sur `http://localhost:8000` et le frontend sur `http://localhost:5173`.

### Session/Cookie Issues
Vérifiez que `withCredentials: true` est configuré dans axios (`frontend/src/lib/axios.js`).

### Database Errors
```bash
cd backend
php artisan migrate:fresh --seed
```

## 📝 API Endpoints

### Public
- `GET /api/products` - Liste des produits
- `GET /api/products/{id}` - Détails d'un produit

### Auth
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/logout` - Déconnexion

### Utilisateur (authentifié)
- `GET /api/user` - Profil
- `GET /api/orders` - Mes commandes
- `POST /api/orders` - Créer une commande

### Admin
- `POST /api/products` - Créer un produit
- `PUT /api/products/{id}` - Modifier un produit
- `DELETE /api/products/{id}` - Supprimer un produit
- `GET /api/admin/orders` - Toutes les commandes
- `PATCH /api/admin/orders/{id}/status` - Changer le statut

## 🎨 Technologies

### Backend
- Laravel 11
- SQLite
- Laravel Sanctum (auth)

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query
- shadcn/ui
- Tailwind CSS

## ✅ Prochaines étapes

- [ ] Ajouter la gestion des images (upload)
- [ ] Ajouter la pagination
- [ ] Ajouter les filtres avancés
- [ ] Ajouter les notifications en temps réel
- [ ] Ajouter les tests
