# 🧪 Test de l'API

## Prérequis
- Backend démarré sur `http://localhost:8000`
- Base de données seedée (`php artisan db:seed`)

## Tests avec curl

### 1. Vérifier que l'API fonctionne
```bash
curl http://localhost:8000/test
```
Résultat attendu: `{"message":"API is working"}`

### 2. Récupérer les produits (public)
```bash
curl http://localhost:8000/api/products
```

### 3. Récupérer les produits par catégorie
```bash
curl "http://localhost:8000/api/products?category=flowers"
```

### 4. S'inscrire
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### 5. Se connecter
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@verdant.co",
    "password": "password"
  }'
```

### 6. Récupérer l'utilisateur connecté
```bash
curl http://localhost:8000/api/user \
  -H "Accept: application/json" \
  -b cookies.txt
```

### 7. Créer une commande (authentifié)
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -b cookies.txt \
  -d '{
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 3, "quantity": 1}
    ],
    "address": "123 Test Street, Test City",
    "notes": "Please deliver in the morning"
  }'
```

### 8. Récupérer mes commandes
```bash
curl http://localhost:8000/api/orders \
  -H "Accept: application/json" \
  -b cookies.txt
```

### 9. Admin: Créer un produit
```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 29.99,
    "category": "flowers",
    "stock": 100,
    "is_active": true
  }'
```

### 10. Admin: Voir toutes les commandes
```bash
curl http://localhost:8000/api/admin/orders \
  -H "Accept: application/json" \
  -b cookies.txt
```

### 11. Admin: Changer le statut d'une commande
```bash
curl -X PATCH http://localhost:8000/api/admin/orders/1/status \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -b cookies.txt \
  -d '{
    "status": "confirmed"
  }'
```

### 12. Se déconnecter
```bash
curl -X POST http://localhost:8000/auth/logout \
  -H "Accept: application/json" \
  -b cookies.txt
```

## Tests avec Postman

### Configuration
1. Créer une nouvelle collection "Verdant API"
2. Ajouter une variable d'environnement:
   - `base_url`: `http://localhost:8000`

### Endpoints à tester

#### Public
- `GET {{base_url}}/api/products`
- `GET {{base_url}}/api/products/1`
- `GET {{base_url}}/api/products?category=flowers`

#### Auth
- `POST {{base_url}}/auth/register`
- `POST {{base_url}}/auth/login`
- `POST {{base_url}}/auth/logout`

#### User (authentifié)
- `GET {{base_url}}/api/user`
- `GET {{base_url}}/api/orders`
- `POST {{base_url}}/api/orders`
- `GET {{base_url}}/api/orders/1`

#### Admin
- `POST {{base_url}}/api/products`
- `PUT {{base_url}}/api/products/1`
- `DELETE {{base_url}}/api/products/1`
- `GET {{base_url}}/api/admin/orders`
- `PATCH {{base_url}}/api/admin/orders/1/status`

### Important pour Postman
1. Activer "Send cookies" dans les settings
2. Après le login, les cookies seront automatiquement stockés
3. Ils seront envoyés avec chaque requête suivante

## Vérification rapide

### Vérifier que la DB contient des données
```bash
cd backend
php artisan tinker
```

Puis dans tinker:
```php
// Compter les utilisateurs
\App\Models\User::count();

// Compter les produits
\App\Models\Product::count();

// Voir tous les produits
\App\Models\Product::all();

// Voir l'admin
\App\Models\User::where('role', 'admin')->first();
```

### Réinitialiser la DB
```bash
cd backend
php artisan migrate:fresh --seed
```

## Codes de statut attendus

- `200 OK` - Succès (GET, PUT, PATCH)
- `201 Created` - Ressource créée (POST)
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Non autorisé (pas admin)
- `404 Not Found` - Ressource introuvable
- `422 Unprocessable Entity` - Erreur de validation

## Erreurs communes

### CORS Error
**Problème:** `Access-Control-Allow-Origin` error
**Solution:** Vérifier `backend/config/cors.php` et que `supports_credentials` est `true`

### 419 CSRF Token Mismatch
**Problème:** Token CSRF invalide
**Solution:** Appeler `/sanctum/csrf-cookie` avant le login

### 401 Unauthenticated
**Problème:** Session expirée ou cookies non envoyés
**Solution:** Se reconnecter et vérifier que les cookies sont envoyés

### 422 Validation Error
**Problème:** Données invalides
**Solution:** Vérifier le format des données envoyées

## Debug

### Voir les logs Laravel
```bash
tail -f backend/storage/logs/laravel.log
```

### Activer le mode debug
Dans `backend/.env`:
```
APP_DEBUG=true
LOG_LEVEL=debug
```

### Vérifier les routes
```bash
cd backend
php artisan route:list
```

### Vérifier les migrations
```bash
cd backend
php artisan migrate:status
```
