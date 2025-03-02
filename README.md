> 🚧 **UNDER CONSTRUCTION** 🚧  
> This project is actively being developed! Stay tuned for updates.

# 🏦 Bank API

A simple **Banking System API** built with **TypeScript and Express**, allowing users to manage their bank accounts, deposits, withdrawals, and transfers.

## 📌 Features

- 💰 **Account Management**: Create and manage bank accounts.
- 📥 **Deposits**: Add funds to an account.
- 📤 **Withdrawals**: Withdraw money from an account.
- 🔄 **Transfers**: Transfer money between accounts.
- 🛡 **Security**: Input validation for safe transactions.

## 📌 Technologies Used

- ✅ **TypeScript**
- ✅ **Node.js**
- ✅ **Express.js**
- ✅ **Jest** (for testing) // TO DO 🚧
- ✅ **Postgres** (for data persistence)
- ✅ **Docker** (for containerization) // TO DO 🚧

## 🛠 Installation

To set up the project locally:

```bash
git clone https://github.com/atilaspo/bank-api.git
cd bank-api
npm install
```

## 🚀 Running the Project

Start the server with:

```bash
npm run dev
```

Then, test the API using **Postman** or **cURL** at:

```
http://localhost:3000/api
```


## API Endpoints

### Get all accounts

```http
GET /api/accounts
```

#### Response

```json
[
  {
    "id": 1,
    "owner": "Messi",
    "balance": 1000
  },
  {
    "id": 2,
    "owner": "Di Maria",
    "balance": 500
  }
]
```

### Create a new account

```http
POST /api/accounts
```

#### Request Body

```json
{
  "owner": "Dibu Martinez"
}
```

#### Response

```json
{
  "id": 3,
  "owner": "Dibu Martinez",
  "balance": 0
}
```

### Deposit into an account

```http
PUT /api/accounts/1/deposit
```

#### Request Body

```json
{
  "amount": 500
}
```

#### Response

```json
{
  "id": 1,
  "owner": "Messi",
  "balance": 1500
}
```

### Withdraw from an account

```http
PUT /api/accounts/2/withdraw
```

#### Request Body

```json
{
  "amount": 200
}
```

#### Response

```json
{
  "id": 2,
  "owner": "Di Maria",
  "balance": 300
}
```

### Transfer between accounts

```http
PUT /api/accounts/1/transfer/2
```

#### Request Body

```json
{
  "amount": 100
}
```

#### Response

```json
{
  "fromAccount": {
    "id": 1,
    "owner": "Messi",
    "balance": 1400
  },
  "toAccount": {
    "id": 2,
    "owner": "Di Maria",
    "balance": 400
  }
}
```

## 🔗 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repo 🍴
2. Create a new branch `git checkout -b feature-branch` 🌱
3. Commit changes `git commit -m "Added awesome feature"` 🎉
4. Push to the branch `git push origin feature-branch` 🚀
5. Open a **Pull Request** 🔥

---

Made with ❤️ by 
[Santiago](https://github.com/atilaspo)

