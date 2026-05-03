# 🔧 Connecter le Panel Admin au Backend

## 📊 État actuel

### ✅ Déjà connecté au Backend
- Shop (produits publics)
- Panier et commandes
- Authentification

### ❌ Pas encore connecté (LocalStorage)
- Dashboard admin
- Gestion des produits (admin)
- Gestion des services (admin)
- Paramètres du magasin

---

## 🎯 Objectif

Remplacer le `AdminContext` (localStorage) par des appels API vers le backend Laravel.

---

## 📝 Plan d'action

### 1. Dashboard Admin
**Actuellement:** Lit les produits depuis localStorage  
**À faire:** Lire depuis `/api/products` (déjà disponible!)

### 2. Gestion des Produits
**Actuellement:** CRUD en localStorage  
**À faire:** Utiliser les endpoints API:
- `POST /api/products` - Créer
- `PUT /api/products/{id}` - Modifier
- `DELETE /api/products/{id}` - Supprimer

### 3. Gestion des Commandes
**Actuellement:** Pas implémenté  
**À faire:** Utiliser les endpoints API:
- `GET /api/admin/orders` - Toutes les commandes
- `PATCH /api/admin/orders/{id}/status` - Changer le statut

---

## 🔨 Modifications nécessaires

### Étape 1: Mettre à jour le Dashboard

**Fichier:** `frontend/src/pages/admin/Dashboard.tsx`

**Avant:**
```typescript
import { useAdmin } from "@/context/AdminContext";

export const Dashboard = () => {
  const { products, services, settings } = useAdmin();
  // ...
}
```

**Après:**
```typescript
import { useState, useEffect } from "react";
import { productsApi } from "@/services/api";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ... reste du code
}
```

### Étape 2: Mettre à jour la page Products

**Fichier:** `frontend/src/pages/admin/Products.tsx`

**Remplacer:**
```typescript
const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
```

**Par:**
```typescript
const [products, setProducts] = useState([]);

// Charger les produits
useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  const data = await productsApi.getAll();
  setProducts(data);
};

// Créer un produit
const handleAdd = async (formData) => {
  await productsApi.create(formData);
  fetchProducts(); // Recharger la liste
};

// Modifier un produit
const handleUpdate = async (id, formData) => {
  await productsApi.update(id, formData);
  fetchProducts();
};

// Supprimer un produit
const handleDelete = async (id) => {
  await productsApi.delete(id);
  fetchProducts();
};
```

### Étape 3: Créer une page Orders Admin

**Nouveau fichier:** `frontend/src/pages/admin/Orders.tsx`

```typescript
import { useState, useEffect } from "react";
import { ordersApi } from "@/services/api";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersApi.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      fetchOrders(); // Recharger
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      <h1>Gestion des Commandes</h1>
      {/* Interface pour afficher et gérer les commandes */}
    </div>
  );
};
```

---

## 🎨 Avantages de la connexion au Backend

### ✅ Données en temps réel
- Les changements sont immédiatement visibles
- Pas de perte de données au refresh
- Synchronisation entre utilisateurs

### ✅ Sécurité
- Validation côté serveur
- Authentification requise
- Middleware admin vérifié

### ✅ Cohérence
- Une seule source de vérité (la DB)
- Pas de désynchronisation
- Stock géré automatiquement

---

## 📋 Checklist de migration

### Dashboard
- [ ] Charger les produits depuis l'API
- [ ] Charger les commandes depuis l'API
- [ ] Calculer les stats depuis les vraies données

### Products
- [ ] Lister les produits depuis l'API
- [ ] Créer un produit via l'API
- [ ] Modifier un produit via l'API
- [ ] Supprimer un produit via l'API
- [ ] Gérer les erreurs et le loading

### Orders (nouveau)
- [ ] Créer la page Orders
- [ ] Lister toutes les commandes
- [ ] Afficher les détails (user, items, total)
- [ ] Changer le statut (pending → confirmed → delivered)
- [ ] Filtrer par statut

### Services
- [ ] Créer un endpoint backend pour les services
- [ ] Créer le modèle Service
- [ ] Créer la migration
- [ ] Connecter le frontend

---

## 🚀 Ordre recommandé

1. **Dashboard** (facile - juste lecture)
2. **Products** (moyen - CRUD complet)
3. **Orders** (nouveau - à créer)
4. **Services** (nécessite backend)

---

## 💡 Exemple complet: Products.tsx connecté

```typescript
import { useState, useEffect } from "react";
import { productsApi } from "@/services/api";
import { toast } from "sonner";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Charger les produits
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Créer
  const handleCreate = async (formData) => {
    try {
      await productsApi.create({
        name: formData.name,
        description: formData.blurb,
        price: formData.price,
        category: formData.category,
        stock: 100, // ou depuis le form
        image: formData.image,
        is_active: true,
      });
      toast.success("Product created!");
      fetchProducts();
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  // Modifier
  const handleUpdate = async (id, formData) => {
    try {
      await productsApi.update(id, {
        name: formData.name,
        description: formData.blurb,
        price: formData.price,
        category: formData.category,
        image: formData.image,
      });
      toast.success("Product updated!");
      fetchProducts();
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    try {
      await productsApi.delete(id);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      {/* Interface existante */}
      {/* Remplacer les appels useAdmin() par les fonctions ci-dessus */}
    </div>
  );
};
```

---

## 🔍 Différences clés

### LocalStorage (actuel)
```typescript
const { products, addProduct } = useAdmin();
addProduct(newProduct); // Sauvegarde en local
```

### API Backend (à faire)
```typescript
const [products, setProducts] = useState([]);
await productsApi.create(newProduct); // Sauvegarde en DB
fetchProducts(); // Recharge depuis la DB
```

---

## ⚠️ Points d'attention

### 1. Mapping des données
Le backend utilise:
- `description` (pas `blurb`)
- `is_active` (boolean)
- `stock` (nombre)

Le frontend utilise:
- `blurb` (description courte)
- `category` (Trees, Flowers, etc.)

**Solution:** Mapper les données lors de l'envoi/réception

### 2. Catégories
Backend: `flowers`, `grass`, `soil`, `services`  
Frontend: `Trees`, `Flowers`, `Grass`, `Soil`

**Solution:** Utiliser les catégories du backend partout

### 3. Images
Actuellement: URLs ou base64  
À faire: Upload vers le serveur

---

## 📚 Ressources

- `frontend/src/services/api.ts` - Service API déjà créé
- `backend/routes/api.php` - Endpoints disponibles
- `TEST_API.md` - Tester les endpoints

---

## 🎯 Résultat final

Une fois connecté:
- ✅ Dashboard affiche les vraies données
- ✅ Créer un produit l'ajoute en DB
- ✅ Modifier un produit le met à jour en DB
- ✅ Supprimer un produit le supprime de la DB
- ✅ Tout est synchronisé entre admin et shop
- ✅ Pas de perte de données au refresh

---

**Veux-tu que je connecte le panel admin au backend maintenant?**
