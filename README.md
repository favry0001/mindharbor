# MindHarbor

Plateforme de soutien au bien-être mental — hackathon 88H, Service Web 25604, Été 2026.

**Dépôt :** https://github.com/favry0001/mindharbor.git

---

## 1. Stack technique

- **Backend :** Express 4, TypeScript 5, Prisma 6
- **Base de données :** PostgreSQL (Neon)
- **Frontend :** React (Vite), Axios, Recharts
- **Authentification :** JWT (access + refresh token avec rotation), bcrypt

---

## 2. Prérequis

- Node.js (LTS)
- Un compte Neon (https://neon.tech) avec un projet PostgreSQL créé

---

## 3. Installation

### 3.1 Cloner le dépôt

```bash
git clone https://github.com/favry0001/mindharbor.git
cd mindharbor/server
```

### 3.2 Installer les dépendances

```bash
npm install
```

### 3.3 Configurer les variables d'environnement

Copiez `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Remplissez les valeurs suivantes dans `.env` :

| Variable | Description |
|---|---|
| `DATABASE_URL` | Chaîne de connexion Neon (pooler) |
| `DATABASE_URL_UNPOOLED` | Chaîne de connexion Neon (directe, requise par `prisma.config.ts` pour les migrations) |
| `JWT_ACCESS_SECRET` | Secret pour signer les tokens d'accès |
|