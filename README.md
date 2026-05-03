# 🌿 Verdant & Co. - E-commerce Platform

Application e-commerce complète pour une jardinerie, avec gestion des produits, commandes et authentification.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## 📸 Aperçu

- 🛍️ **Shop** - Parcourir et acheter des produits
- 🛒 **Panier** - Gestion du panier avec calcul automatique
- 👤 **Authentification** - Inscription, connexion, profil
- 📦 **Commandes** - Historique et suivi des commandes
- 🔐 **Admin Panel** - Gestion complète des produits et commandes

## 🚀 Démarrage rapide

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
./start.sh
```

### Manuel
Voir [SETUP.md](SETUP.md) pour les instructions détaillées.

## 👤 Comptes de test

### Admin
- **Email:** admin@verdant.co
- **Password:** password

### Utilisateur
- **Email:** user@verdant.co
- **Password:** password

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Frontend (React)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │   Pages    │  │ Components │  │  Context   │         │
│  └────────────┘  └────────────┘  └────────────┘         │
│         │                │                │               │
│         └────────────────┴────────────────┘               │
│                         │                                 │
│                    ┌────▼────┐                           │
│                    │ API     │                           │
│                    │ Service │                           │
│                    └────┬────┘                           │
└─────────────────────────┼──────────────────────────────┘
                          │ HTTP/JSON
                          │
┌─────────────────────────▼──────────────────────────────┐
│                  Backend (Laravel API)                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │Controllers │  │   Models   │  │Middleware  │       │
│  └────────────┘  └────────────┘  └────────────┘       │
│         │                │                │             │
│         └────────────────┴────────────────┘             │
│                         │                               │
│                    ┌────▼────┐                         │
│                    │ SQLite  │                         │
│                    │   DB    │                         │
│                    └─────────┘                         │
└─────────────────────────────────────────────────────────┘
```

## 📁 Structure du projet

```
.
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/ # Contrôleurs API
│   │   │   └── Middleware/  # Middleware (auth, admin)
│   │   └── Models/          # Modèles Eloquent
│   ├── database/
│   │   ├── migrations/      # Migrations de la DB
│   │   └── seeders/         # Seeders (données de test)
│   ├── routes/
│   │   ├── api.php          # Routes API
│   │   └── web.php          # Routes auth
│   └── .env                 # Configuration
│
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── site/        # Composants du site
│   │   │   ├── admin/       # Composants admin
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── context/         # React Context (Auth, Cart, Admin)
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Services API
│   │   └── lib/             # Utilitaires
│   └── public/              # Assets statiques
│
├── SETUP.md                 # Guide d'installation
├── INTEGRATION_COMPLETE.md  # Documentation de l'intégration
├── TEST_API.md              # Guide de test de l'API
├── PRODUCTION_CHECKLIST.md  # Checklist pour la production
├── start.sh                 # Script de démarrage (Linux/Mac)
└── start.bat                # Script de démarrage (Windows)
```

## 🎯 Fonctionnalités

### ✅ Implémentées

#### Public
- Parcourir les produits
- Filtrer par catégorie
- Ajouter au panier
- Voir les services

#### Utilisateur
- Inscription / Connexion
- Passer des commandes
- Gestion du panier
- Profil utilisateur

#### Admin
- Dashboard avec statistiques
- CRUD des produits
- Gestion des commandes
- Changement de statut des commandes

### 🚧 À venir
- Page "Mes commandes" pour les utilisateurs
- Upload d'images pour les produits
- Pagination des produits
- Recherche avancée
- Notifications en temps réel
- Export des commandes

## 🛠️ Technologies

### Backend
- **Laravel 11** - Framework PHP
- **SQLite** - Base de données (dev)
- **Laravel Sanctum** - Authentification
- **Eloquent ORM** - Gestion de la DB

### Frontend
- **React 18** - Library UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **shadcn/ui** - Composants UI
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📚 Documentation

- [SETUP.md](SETUP.md) - Installation et configuration
- [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md) - Détails de l'intégration
- [TEST_API.md](TEST_API.md) - Tests de l'API
- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Déploiement en production

## 🔌 API Endpoints

### Public
```
GET  /api/products           # Liste des produits
GET  /api/products/{id}      # Détails d'un produit
```

### Auth
```
POST /auth/register          # Inscription
POST /auth/login             # Connexion
POST /auth/logout            # Déconnexion
```

### Utilisateur (authentifié)
```
GET  /api/user               # Profil utilisateur
GET  /api/orders             # Mes commandes
POST /api/orders             # Créer une commande
GET  /api/orders/{id}        # Détails d'une commande
```

### Admin
```
POST   /api/products         # Créer un produit
PUT    /api/products/{id}    # Modifier un produit
DELETE /api/products/{id}    # Supprimer un produit
GET    /api/admin/orders     # Toutes les commandes
PATCH  /api/admin/orders/{id}/status  # Changer le statut
```

## 🧪 Tests

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run test
```

### API
Voir [TEST_API.md](TEST_API.md) pour les tests manuels.

## 🐛 Dépannage

### Le backend ne démarre pas
```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan migrate:fresh --seed
```

### Le frontend ne se connecte pas à l'API
1. Vérifier que le backend tourne sur `http://localhost:8000`
2. Vérifier `frontend/src/lib/axios.js` pour l'URL de l'API
3. Vérifier la console du navigateur pour les erreurs CORS

### Erreurs de session/cookies
1. Vérifier que `withCredentials: true` dans axios
2. Vérifier `backend/config/cors.php` - `supports_credentials` doit être `true`
3. Vider les cookies du navigateur

## 📝 Licence

Ce projet est sous licence MIT.

## 👥 Contributeurs

- **Backend** - Laravel API avec authentification et gestion des commandes
- **Frontend** - React SPA avec interface moderne

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème:
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les logs (`backend/storage/logs/laravel.log`)

---

**Fait avec ❤️ et 🌿**
