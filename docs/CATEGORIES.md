# Catégories Architecturales

Ce document décrit les catégories architecturales standard utilisées dans l'application.

## Liste des Catégories

### 1. AMÉNAGEMENT URBAIN
- **Description**: Projets d'aménagement et de planification urbaine
- **Couleur**: #a3845b
- **Exemples**: Plans d'urbanisme, aménagement d'espaces publics, développement urbain

### 2. CULTUREL
- **Description**: Projets culturels et patrimoniaux
- **Couleur**: #8b7355
- **Exemples**: Musées, centres culturels, salles de spectacle, bibliothèques

### 3. HÔTELLERIE
- **Description**: Projets hôteliers et d'hospitalité
- **Couleur**: #9d8660
- **Exemples**: Hôtels, resorts, centres de congrès, restaurants

### 4. INDUSTRIE
- **Description**: Projets industriels et commerciaux
- **Couleur**: #7a6b4f
- **Exemples**: Usines, entrepôts, centres logistiques, zones industrielles

### 5. PATRIMOINE
- **Description**: Projets de restauration et conservation du patrimoine
- **Couleur**: #b8a082
- **Exemples**: Restauration de monuments historiques, rénovation de bâtiments patrimoniaux

### 6. RÉSIDENTIEL
- **Description**: Projets résidentiels et logements
- **Couleur**: #6d5f47
- **Exemples**: Maisons individuelles, immeubles d'appartements, complexes résidentiels

### 7. TERTIAIRE
- **Description**: Projets de bureaux et espaces tertiaires
- **Couleur**: #8f7d65
- **Exemples**: Immeubles de bureaux, centres d'affaires, espaces de coworking

### 8. TOURISME
- **Description**: Projets touristiques et de loisirs
- **Couleur**: #a69177
- **Exemples**: Centres de vacances, parcs de loisirs, installations touristiques

## Gestion des Catégories

### Création automatique
Les catégories peuvent être créées automatiquement via:

1. **Seeder**: `php artisan db:seed --class=CategoriesSeeder`
2. **Commande Artisan**: `php artisan categories:create-architectural`
3. **Migration**: Incluse dans les migrations standard

### Interface d'administration
Les catégories peuvent être gérées via l'interface d'administration à l'adresse `/admin/categories`.

## Palette de Couleurs

Toutes les couleurs utilisent une palette cohérente de tons terreux et naturels, reflétant l'esthétique architecturale:

- Base: #a3845b (couleur principale)
- Variations: #8b7355, #9d8660, #7a6b4f, #b8a082, #6d5f47, #8f7d65, #a69177

Cette palette assure une cohérence visuelle tout en permettant de distinguer facilement chaque catégorie.
