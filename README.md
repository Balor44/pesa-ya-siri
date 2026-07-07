# 🔐 Pesa Ya Siri
> Private ZCash payments over WhatsApp — built for Tanzania and East Africa

[![Live API](https://img.shields.io/badge/API-Live-brightgreen)](YOUR-RAILWAY-URL/health)
[![GitHub](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![ZCash](https://img.shields.io/badge/Powered%20by-ZCash-F4B728)](https://z.cash)

---

## What is Pesa Ya Siri?

Pesa Ya Siri means *Secret Money* in Swahili.

It is a ZCash-powered peer-to-peer payment wallet that runs entirely over WhatsApp. No app download. No bank account. No KYC. No technical knowledge required.

A user sends a WhatsApp message:
SEND 0712345678 5

And five ZEC is transferred privately to another phone number within seconds.

---

## Why it exists

Tanzania has 60 million people. Mobile money is everywhere — but every transaction is tracked, logged, and visible to the government and operators.

ZCash provides full financial privacy. Pesa Ya Siri delivers it through the one platform Tanzanians already use every day: WhatsApp.

---

## How it works

| Step | Action |
|------|--------|
| 1 | User sends CREATE on WhatsApp |
| 2 | System generates a shielded ZCash z-address linked to their phone number |
| 3 | User buys a physical recharge card from a local vendor |
| 4 | User sends REDEEM [code] — ZEC is credited instantly |
| 5 | User sends SEND [phone] [amount] to transfer ZEC to anyone |
| 6 | Recipient gets a WhatsApp notification. Transaction is shielded on-chain. |

---

## WhatsApp Commands
CREATE              — Open a new wallet
BALANCE             — Check your ZEC balance
SEND [phone] [amt]  — Send ZEC to a phone number
REDEEM [code]       — Top up using a recharge card
HELP                — Show all commands

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Server status check |
| POST | /api/create-wallet | Register phone number, generate z-address |
| GET | /api/balance/:phone | Check wallet balance |
| POST | /api/send | Transfer ZEC between two phone numbers |
| POST | /api/redeem | Redeem a recharge card code |
| POST | /api/message | Simulate a WhatsApp message (for testing) |
| POST | /api/webhook | Live WhatsApp Cloud API webhook |

---

## Live Demo

Base URL: YOUR-RAILWAY-URL

Test it right now with curl:
# Check the server is running
curl YOUR-RAILWAY-URL/health

# Simulate a WhatsApp message
curl -X POST YOUR-RAILWAY-URL/api/message \
  -H "Content-Type: application/json" \
  -d '{"phone":"0712345678","message":"HELP"}'

---

## Tech Stack

- Runtime — Node.js v20 + TypeScript
- Framework — Express.js
- Database — MongoDB (Atlas)
- ZCash — lightwalletd (integration in progress)
- WhatsApp — Meta Cloud API (integration in progress)
- Hosting — Railway

---

## Run Locally
# Clone the repo
git clone https://github.com/YOUR-USERNAME/pesa-ya-siri.git
cd pesa-ya-siri

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Fill in your MONGODB_URI and other values

# Start the development server
npm run dev

# Server runs at http://localhost:3000
# Test: http://localhost:3000/health

---

## Project Structure
pesa-ya-siri/
├── src/
│   ├── controllers/     — request handlers for each endpoint
│   ├── routes/          — URL path definitions
│   ├── services/        — chatbot engine and business logic
│   ├── models/          — MongoDB schemas (User, Transaction, RechargeCard)
│   ├── middleware/       — auth, error handling
│   ├── utils/           — helper functions
│   ├── wallet/          — ZCash service (lightwalletd integration)
│   ├── database/        — MongoDB connection
│   ├── app.ts           — Express app setup
│   └── server.ts        — entry point
├── dist/                — compiled JavaScript (auto-generated)
├── .env.example         — environment variable template
├── railway.json         — Railway deployment config
└── README.md

---

## Environment Variables

Create a .env file based on .env.example:
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development

---

## Roadmap

- [x] Backend architecture
- [x] Wallet creation endpoint
- [x] Balance lookup endpoint
- [x] Send money endpoint
- [x] Recharge card redemption
- [x] WhatsApp chatbot engine
- [x] Deployed to Railway
- [ ] Real ZCash lightwalletd integration
- [ ] Meta WhatsApp Cloud API webhook
- [ ] MongoDB persistent connection
- [ ] PIN protection per wallet
- [ ] JWT authentication
- [ ] Physical recharge card distribution (Tanzania)
- [ ] Swahili language support
- [ ] Merchant payment module


---

## License

MIT — free to use, fork, and deploy in your own community.