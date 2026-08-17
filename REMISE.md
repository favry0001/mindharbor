# Remise — Hackathon MindHarbor

> **Mode d'emploi (à supprimer avant de déposer)**
> 1. Renommez ce fichier en `REMISE.md`.
> 2. Remplacez chaque valeur entre chevrons `<...>`. Supprimez les lignes de membres inutilisées.
> 3. Commitez `REMISE.md` à la racine de votre dépôt.
> 4. Déposez le **même fichier** sur Teams, dans le devoir prévu, **avant le dimanche 16 août 2026, 23 h 59**.
> 5. Un seul dépôt par équipe : c'est le capitaine qui remet.

**Cours :** Service Web — Groupe 25604 — Session Été 2026
**Équipe :** <nom de l'équipe>
**Date de remise :** <AAAA-MM-JJ HH:MM>

---

## 1. Dépôt GitHub

- **URL (public) :** https://github.com/favry0001/mindharbor.git
- **Commit final à corriger :** <hash complet du commit>
- **Branche :** main
- [x] Vérifié en navigation privée : le dépôt est bien **PUBLIC**.

---

## 2. Membres de l'équipe

| # | Prénom | Nom | Courriel | Compte GitHub |
|---|--------|-----|----------|---------------|
| 1 | Maxance | Zeka    | zkmance@gmail.com  | maxance-devcode |
| 2 | Fabiola | Sainvry | fsainvry@gmail.com | Favry0001       |


**Capitaine :** <prénom nom>

---

## 3. Comptes de démonstration

| Rôle | Courriel | Mot de passe | Particularité |
|------|----------|--------------|---------------|
| Administrateur | admin@mindharbor.com | AdminPswd1! | rôle `ADMINISTRATEUR` |
| Modérateur | <courriel> | <mot de passe> | modère le groupe <nom> |
| Utilisateur |  lea@test.com | Test1234! | entrée de journal du jour saisie |
| Utilisateur | marc@test.com | Test1234! | profil privé|

---

## 4. État du projet

### Noyau obligatoire

 Fonctionnalité | État | Remarque |
|----------------|------|----------|
| Journal de bien-être | complet | création avec contrainte d'unicité userId, date testée ; lecture par date restreinte à l'auteur ; modification limitée au jour même |
| Analyse et tendances | complet | `GET /journal/stats?range=30d`  et `GET /journal/insights` 
| Ressources et favoris | absent | ; modèles Prisma déjà en base |
| Groupes de soutien | absent |  ; modèles Prisma  déjà en base |
| Messagerie et confidentialité | absent |  ; modèle Prisma (`Message`) déjà en base |
| Profils et visibilité | partiel | champs `profileVisibility` et `contactLevel` présents et retournés par `/auth/me` ; aucune route pour les modifier après inscription |
| Tableau de bord | |  côté frontend |
| Administration | partiel | rôle `ADMINISTRATEUR` fonctionnel au niveau du modèle `User` et exploitable via le middleware `requireRole` ; aucune route `/admin/*` ou `/reports` implémentee |



### Extensions réalisées

<liste, ou « aucune »>

### Non terminé / limitations connues

<Soyez honnêtes et précis. Une limitation déclarée coûte moins cher qu'une
fonctionnalité qui plante à la correction.>

---

## 5. Notre part de créativité

<Trois à dix lignes : ce que vous avez ajouté ou soigné de votre propre
initiative, et pourquoi ce choix sert les personnes qui utiliseront
MindHarbor.>

---
calculée automatiquement sur `/journal/insights` compare la première et la seconde moitié de la période de 30 jours pour détecter une tendance directionnelle amélioration ou dégradation de l'humeur, hausse de l'anxiété, ou sommeil insuffisant, plutôt que de se limiter à une moyenne statique.



## 6. Vérifications avant dépôt

- [x] `npx tsc --noEmit` passe sans erreur dans `server/` **et** dans `client/`
- [x] Le projet s'installe et démarre en suivant le README, sur une machine vierge
- [x] La base Neon est peuplée et restera accessible après la remise
- [ x] Aucun fichier `.env` n'est commité ; les `.env.example` sont présents
- [ ] Le scénario de validation de l'énoncé a été déroulé en entier
- [x] Le dépôt est public et le lien ci-dessus fonctionne en navigation privée
