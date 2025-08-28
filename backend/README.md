# 🎯 Probo - Prediction Market Platform

A decentralized prediction market platform built with TypeScript and Hono, designed to run on Cloudflare Workers. Users can create and trade predictions on various outcomes using a binary "yes/no" system with real-time order matching.

## 🚀 Live Demo

The platform is currently running on: **http://127.0.0.1:8787** (local development)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Probo is a prediction market platform where users can:
- **Place buy/sell orders** on prediction outcomes
- **Trade "yes" and "no" positions** on various events
- **Use an advanced order matching engine** for fair price discovery
- **Manage their balance and stock positions** in real-time
- **Create and participate in prediction markets**

## ✨ Features

### 🏦 Trading Features
- **Binary Prediction Markets**: Yes/No outcomes for any event
- **Real-time Order Matching**: Price-time priority matching engine
- **Liquidity Provision**: Automatic reverse order placement
- **Balance Management**: INR and stock position tracking
- **Order Types**: Direct and indirect order support

### 🔧 Technical Features
- **Serverless Architecture**: Runs on Cloudflare Workers
- **Type Safety**: Full TypeScript implementation
- **High Performance**: In-memory order matching
- **Scalable**: Designed for high-frequency trading
- **Real-time**: Instant order execution and updates

## 🏗️ Architecture

### Core Components

#### 1. **Order Matching Engine** (`src/services/orderMtaching.ts`)
```typescript
// Handles complex order matching logic
- Price-time priority matching
- Direct and indirect order processing
- Reverse order placement for liquidity
- Stock and balance transfers
```

#### 2. **Storage Service** (`src/services/storage.ts`)
```typescript
// Singleton pattern for data management
- User balances (INR)
- Stock positions (Yes/No shares)
- Orderbook management
- In-memory data persistence
```

#### 3. **API Routes** (`src/routes/`)
- **User Management**: Create users, manage balances
- **Order Management**: Place buy/sell orders
- **Market Data**: Orderbook and balance queries
- **Trading**: Execute trades and manage positions

#### 4. **Middleware** (`src/middlewares/middleware.ts`)
- Request validation and sanitization
- Error handling and logging
- Performance monitoring

## 🌐 API Endpoints

### Health & System
```http
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "Trading API is running."
}
```

### User Management
```http
POST /user/create/:userId
GET /user/balance/inr/:userId
GET /user/balance/stock/:userId
POST /user/onramp/inr
```

### Market Management
```http
POST /symbol/create
GET /symbol/list
```

### Trading
```http
POST /order/buy
POST /order/sell
GET /orderbook/:symbol
```

### Balance & Positions
```http
GET /balances/inr/:userId
GET /balances/stock/:userId
```

### System
```http
POST /reset  # Reset all data (development only)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Cloudflare account** (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhup-GitHUB/probo-v1
   cd probo-v1/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the API**
   - Local: http://127.0.0.1:8787
   - Health check: http://127.0.0.1:8787/health

### Development Commands
```bash
npm run dev          # Start development server
npm run deploy       # Deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare types
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Language**: TypeScript
- **Validation**: Request validation with custom middleware
- **Deployment**: Wrangler CLI

### Key Technologies
- **Serverless**: Cloudflare's edge network
- **Type Safety**: Full TypeScript implementation
- **Real-time**: In-memory order matching
- **Scalable**: High-frequency trading ready

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── user.ts           # User management endpoints
│   │   ├── symbol.ts         # Market creation endpoints
│   │   ├── order.ts          # Trading endpoints
│   │   ├── orderbook.ts      # Market data endpoints
│   │   ├── balance.ts        # Balance query endpoints
│   │   └── trade.ts          # Trade execution endpoints
│   ├── services/
│   │   ├── orderMtaching.ts  # Order matching engine
│   │   └── storage.ts        # Data storage service
│   ├── middlewares/
│   │   └── middleware.ts     # Request validation & error handling
│   └── types/
│       └── types.ts          # TypeScript type definitions
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── wrangler.jsonc           # Cloudflare Workers configuration
└── README.md               # This file
```

## 💡 Usage Examples

### 1. Create a User
```bash
curl -X POST http://127.0.0.1:8787/user/create/user123
```

### 2. Add Funds
```bash
curl -X POST http://127.0.0.1:8787/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "amount": 1000}'
```

### 3. Create a Prediction Market
```bash
curl -X POST http://127.0.0.1:8787/symbol/create \
  -H "Content-Type: application/json" \
  -d '{"stockSymbol": "BTC_2024_50K"}'
```

### 4. Place a Buy Order
```bash
curl -X POST http://127.0.0.1:8787/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 10,
    "price": 6,
    "stockType": "yes"
  }'
```

### 5. Check Orderbook
```bash
curl http://127.0.0.1:8787/orderbook/BTC_2024_50K
```

## 📊 Data Models

### User Balance
```typescript
interface userBalance {
  balance: number;  // Available INR balance
  locked: number;   // Locked INR for pending orders
}
```

### Stock Position
```typescript
interface StockBalance {
  quantity: number;  // Number of shares held
  locked: number;    // Shares locked in pending orders
}
```

### Order Types
- **Direct Orders**: Traditional buy/sell orders
- **Indirect Orders**: Reverse orders for liquidity provision

## 🔄 Order Matching Logic

### Buy Order Flow
1. **Validate** user balance and order parameters
2. **Search** orderbook for matching sell orders
3. **Execute** trades at best available prices
4. **Place** remaining quantity as reverse orders
5. **Update** user balances and stock positions

### Sell Order Flow
1. **Validate** user stock holdings
2. **Match** with existing buy orders
3. **Place** unmatched quantity in orderbook
4. **Update** orderbook and user positions

## 🚀 Deployment

### Cloudflare Workers
The application is optimized for Cloudflare Workers:

- **Global Edge Distribution**: Low latency worldwide
- **Serverless Scaling**: Automatic scaling based on demand
- **Cost Efficiency**: Pay-per-request pricing model

### Deployment Steps
```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Deploy
npm run deploy
```

### Environment Configuration
Update `wrangler.jsonc` for production settings:
```json
{
  "name": "probo-backend",
  "compatibility_date": "2025-01-27",
  "vars": {
    "ENVIRONMENT": "production"
  }
}
```

## 🔮 Future Enhancements

### Planned Features
- [ ] **WebSocket Support**: Real-time order updates
- [ ] **Persistent Storage**: Cloudflare KV/D1 integration
- [ ] **User Authentication**: JWT-based auth system
- [ ] **Advanced Orders**: Limit, stop-loss orders
- [ ] **Market Management**: Admin panel for market creation
- [ ] **Analytics**: Trading history and performance metrics
- [ ] **Mobile App**: React Native frontend
- [ ] **Multi-language**: Internationalization support

### Technical Improvements
- [ ] **Database Integration**: Persistent data storage
- [ ] **Caching Layer**: Redis for performance
- [ ] **Rate Limiting**: DDoS protection
- [ ] **Monitoring**: Comprehensive logging
- [ ] **Testing**: Unit and integration tests
- [ ] **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Ensure code quality with linting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is a **gambling/prediction market platform**. Please ensure compliance with local gambling laws and regulations before deployment. This software is provided as-is without any guarantees.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: This README and inline code comments

---

**Built with ❤️ using Hono and Cloudflare Workers**

*Probo - Making prediction markets accessible to everyone*
