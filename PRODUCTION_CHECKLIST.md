# 🚀 Production Checklist

## Backend (Laravel)

### 1. Configuration `.env`
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-domaine.com

# Utiliser MySQL/PostgreSQL au lieu de SQLite
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=verdant_prod
DB_USERNAME=votre_user
DB_PASSWORD=votre_password_securise

# Session sécurisée
SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=none

# Cache en production
CACHE_STORE=redis
QUEUE_CONNECTION=redis
```

### 2. Sécurité
- [ ] Générer une nouvelle `APP_KEY`: `php artisan key:generate`
- [ ] Mettre à jour `CORS` dans `config/cors.php` avec votre domaine frontend
- [ ] Activer HTTPS uniquement
- [ ] Configurer les rate limits
- [ ] Activer la validation CSRF
- [ ] Configurer les headers de sécurité

### 3. Performance
- [ ] Activer le cache de configuration: `php artisan config:cache`
- [ ] Activer le cache des routes: `php artisan route:cache`
- [ ] Activer le cache des vues: `php artisan view:cache`
- [ ] Optimiser l'autoloader: `composer install --optimize-autoloader --no-dev`
- [ ] Configurer Redis pour les sessions et le cache

### 4. Base de données
- [ ] Migrer vers MySQL/PostgreSQL
- [ ] Créer des backups automatiques
- [ ] Configurer les index pour les performances
- [ ] Exécuter les migrations: `php artisan migrate --force`

### 5. Fichiers
- [ ] Configurer le stockage S3/Cloud pour les images
- [ ] Mettre à jour `FILESYSTEM_DISK` dans `.env`
- [ ] Configurer les permissions des dossiers `storage/` et `bootstrap/cache/`

### 6. Monitoring
- [ ] Configurer les logs (Sentry, Bugsnag, etc.)
- [ ] Activer le monitoring des performances
- [ ] Configurer les alertes email

## Frontend (React)

### 1. Variables d'environnement
Créer `.env.production`:
```env
VITE_API_URL=https://api.votre-domaine.com
```

### 2. Build
```bash
cd frontend
npm run build
# ou
bun run build
```

### 3. Déploiement
Options recommandées:
- **Vercel** (recommandé pour React)
- **Netlify**
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**

### 4. Configuration
- [ ] Configurer les redirects pour le SPA
- [ ] Activer la compression gzip/brotli
- [ ] Configurer le CDN
- [ ] Activer le cache des assets

## Serveur

### 1. Nginx (recommandé)
```nginx
server {
    listen 80;
    server_name api.votre-domaine.com;
    root /var/www/verdant/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 2. SSL/TLS
- [ ] Installer un certificat SSL (Let's Encrypt recommandé)
- [ ] Forcer HTTPS
- [ ] Configurer HSTS

### 3. Firewall
- [ ] Ouvrir uniquement les ports 80 et 443
- [ ] Configurer fail2ban
- [ ] Limiter les connexions SSH

## Base de données

### 1. MySQL/PostgreSQL
```sql
-- Créer la base de données
CREATE DATABASE verdant_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Créer un utilisateur dédié
CREATE USER 'verdant_user'@'localhost' IDENTIFIED BY 'mot_de_passe_securise';
GRANT ALL PRIVILEGES ON verdant_prod.* TO 'verdant_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backups
```bash
# Backup quotidien
0 2 * * * mysqldump -u verdant_user -p verdant_prod > /backups/verdant_$(date +\%Y\%m\%d).sql
```

## Monitoring & Logs

### 1. Laravel
```bash
# Logs
tail -f storage/logs/laravel.log

# Queue workers
php artisan queue:work --daemon

# Scheduler (cron)
* * * * * cd /var/www/verdant/backend && php artisan schedule:run >> /dev/null 2>&1
```

### 2. Services recommandés
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Papertrail** - Log management
- **UptimeRobot** - Uptime monitoring

## Sécurité

### 1. Headers de sécurité
```php
// Dans app/Http/Middleware/SecurityHeaders.php
public function handle($request, Closure $next)
{
    $response = $next($request);
    
    $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
    $response->headers->set('X-Content-Type-Options', 'nosniff');
    $response->headers->set('X-XSS-Protection', '1; mode=block');
    $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    return $response;
}
```

### 2. Rate Limiting
```php
// Dans routes/api.php
Route::middleware(['throttle:60,1'])->group(function () {
    // Routes limitées à 60 requêtes par minute
});
```

### 3. Validation des entrées
- [ ] Valider toutes les entrées utilisateur
- [ ] Sanitizer les données
- [ ] Utiliser les prepared statements (déjà fait avec Eloquent)

## Performance

### 1. Backend
- [ ] Activer OPcache
- [ ] Configurer Redis
- [ ] Optimiser les requêtes SQL (N+1 queries)
- [ ] Utiliser le cache pour les données fréquentes

### 2. Frontend
- [ ] Minifier les assets
- [ ] Lazy loading des images
- [ ] Code splitting
- [ ] Service Worker pour le cache

## Tests avant mise en production

### 1. Tests fonctionnels
- [ ] Inscription d'un utilisateur
- [ ] Connexion/Déconnexion
- [ ] Ajout au panier
- [ ] Passage de commande
- [ ] Gestion des produits (admin)
- [ ] Gestion des commandes (admin)

### 2. Tests de sécurité
- [ ] Tester les injections SQL
- [ ] Tester les XSS
- [ ] Tester les CSRF
- [ ] Tester l'authentification
- [ ] Tester les autorisations

### 3. Tests de performance
- [ ] Load testing (Apache Bench, k6)
- [ ] Temps de réponse API
- [ ] Temps de chargement frontend
- [ ] Optimisation des images

## Déploiement

### 1. Stratégie
- [ ] Utiliser Git pour le déploiement
- [ ] Configurer un pipeline CI/CD
- [ ] Tester sur un environnement de staging
- [ ] Planifier une fenêtre de maintenance

### 2. Rollback
- [ ] Avoir un plan de rollback
- [ ] Garder les backups de la DB
- [ ] Tester le processus de rollback

### 3. Post-déploiement
- [ ] Vérifier les logs
- [ ] Tester les fonctionnalités critiques
- [ ] Monitorer les performances
- [ ] Vérifier les emails de notification

## Maintenance

### 1. Mises à jour
- [ ] Mettre à jour Laravel régulièrement
- [ ] Mettre à jour les dépendances PHP
- [ ] Mettre à jour les dépendances npm
- [ ] Appliquer les patches de sécurité

### 2. Backups
- [ ] Backups quotidiens de la DB
- [ ] Backups des fichiers uploadés
- [ ] Tester la restauration des backups

### 3. Monitoring
- [ ] Surveiller l'utilisation du disque
- [ ] Surveiller la mémoire
- [ ] Surveiller le CPU
- [ ] Surveiller les erreurs

## Checklist finale

- [ ] Tous les tests passent
- [ ] La documentation est à jour
- [ ] Les variables d'environnement sont configurées
- [ ] Les certificats SSL sont installés
- [ ] Les backups sont configurés
- [ ] Le monitoring est actif
- [ ] Les logs sont configurés
- [ ] Les emails fonctionnent
- [ ] Le domaine est configuré
- [ ] Les DNS sont configurés
- [ ] Le firewall est configuré
- [ ] Les permissions sont correctes
- [ ] Le cache est activé
- [ ] Les workers de queue tournent
- [ ] Le scheduler est configuré

## Support

### Documentation
- Laravel: https://laravel.com/docs
- React: https://react.dev
- Vite: https://vitejs.dev

### Communauté
- Laravel Discord
- React Discord
- Stack Overflow

---

**Note:** Cette checklist est un guide général. Adaptez-la selon vos besoins spécifiques et votre infrastructure.
