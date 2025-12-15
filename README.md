# 🚗 Rent a Car API

API REST para gerenciamento de **carros**, **clientes** e **reservas** de um sistema de locação de veículos.

🔗 **Base URL (produção)**

```
https://api-rent-a-car.vercel.app/api
```

---

## 📌 Tecnologias

* Node.js
* Express
* PostgreSQL
* Knex.js
* JWT (JSON Web Token)
* Vercel

---

## 🔐 Autenticação (JWT)

As rotas protegidas exigem um token JWT enviado no header:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

---

## 🏠 Rota Base

### ➤ GET `/`

Retorna uma mensagem de boas-vindas.

```bash
curl -X GET https://api-rent-a-car.vercel.app/api
```

```json
{
  "message": "Bem-vindo à API Rent a Car!"
}
```

---

## 👤 Clientes

### ➤ POST `/clientes` — Cadastrar cliente

```bash
curl -X POST https://api-rent-a-car.vercel.app/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
  "nome": "Gabriel Ribeiro",
  "email": "gabriel.ribeiro4@exemplo.com",
  "telefone": "34998884444",
  "endereço": "Rua Exemplo, 123, São Paulo, SP",
  "senha": "12345678"
}'
```

---

### ➤ POST `/clientes/login` — Login

```bash
curl -X POST https://api-rent-a-car.vercel.app/api/clientes/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🚘 Carros (🔒 JWT obrigatório)

### ➤ GET `/carros` — Listar carros

```bash
curl -X GET https://api-rent-a-car.vercel.app/api/carros \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

---

### ➤ POST `/carros` — Cadastrar carro

```bash
curl -X POST https://api-rent-a-car.vercel.app/api/carros \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
  "marca": "Mitsubishi",
  "modelo": "Lancer",
  "ano": 2023,
  "placa": "HDE8B89",
  "precoDiario": 500.00,
  "disponivel": true
}'
```

---

### ➤ PUT `/carros/:id` — Atualizar carro

```bash
curl -X PUT https://api-rent-a-car.vercel.app/api/carros/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
  "marca": "Honda",
  "modelo": "Civic",
  "ano": 2023,
  "placa": "HDE8J82",
  "precoDiario": 150.00,
  "disponivel": true
}'
```

---

### ➤ DELETE `/carros/:id` — Remover carro

```bash
curl -X DELETE https://api-rent-a-car.vercel.app/api/carros/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

---

## 📅 Reservas (🔒 JWT obrigatório)

### ➤ GET `/reserva` — Listar reservas

```bash
curl -X GET https://api-rent-a-car.vercel.app/api/reserva \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

---

### ➤ POST `/reserva` — Criar reserva

```bash
curl -X POST https://api-rent-a-car.vercel.app/api/reserva \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
  "clienteId": 1,
  "carroId": 1,
  "dias": 3
}'
```

---

### ➤ PUT `/reserva/:id/devolver` — Devolver carro

```bash
curl -X PUT https://api-rent-a-car.vercel.app/api/reserva/2/devolver \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

---

## ▶️ Executar Localmente
1.
```bash
npm install
npm run dev
```
2. Configurar as variaveis de ambiente

A API ficará disponível em:

```
http://localhost:3000/api
```

---

## 🚀 Deploy

Projeto configurado para deploy na **Vercel** usando `@vercel/node`.

---
