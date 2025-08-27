# Probo - Prediction Market Platform

A decentralized prediction market platform built with TypeScript and Hono, designed to run on Cloudflare Workers. Users can create and trade predictions on various outcomes using a binary "yes/no" system.

## 🎯 Overview

Probo is a prediction market platform where users can:
- Place buy/sell orders on prediction outcomes
- Trade "yes" and "no" positions on various events
- Use an order matching engine for fair price discovery
- Manage their balance and stock positions

## 🏗️ Architecture

### Core Components

#### 1. **Order Matching Engine** (`src/services/orderMtaching.ts`)
- Handles buy/sell order matching with price-time priority
- Supports both direct and indirect order types
- Implements reverse order placement for liquidity
- Manages stock transfers and balance updates

#### 2. **Storage Service** (`src/services/storage.ts`)
- Singleton pattern for in-memory data storage
- Manages user balances, orderbook, and stock positions
- Provides reset functionality for testing

#### 3. **Middleware** (`src/middlewares/middleware.ts`)
- Request validation for user existence and order parameters
- Input sanitization and error handling
- Performance monitoring with request timing

#### 4. **Type Definitions** (`src/types/types.ts`)
- Comprehensive TypeScript interfaces for all data structures
- Defines order types, balance structures, and API responses
- Ensures type safety across the application

## 🛠️ Tech Stack

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Language**: TypeScript
- **Validation**: [@hono/zod-validator](https://github.com/honojs/hono/tree/main/packages/zod-validator) for request validation
- **Deployment**: Wrangler CLI for Cloudflare Workers

### Key Features
- **Serverless**: Runs on Cloudflare's edge network
- **Type Safety**: Full TypeScript implementation
- **Real-time**: In-memory order matching for fast execution
- **Scalable**: Designed for high-frequency trading operations

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main application entry point
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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)



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
1. Validate user balance and order parameters
2. Search orderbook for matching sell orders
3. Execute trades at best available prices
4. Place remaining quantity as reverse orders
5. Update user balances and stock positions

### Sell Order Flow
1. Validate user stock holdings
2. Match with existing buy orders
3. Place unmatched quantity in orderbook
4. Update orderbook and user positions

## 🌐 API Endpoints

*Note: API endpoints are currently being implemented*

### Planned Endpoints
- `POST /users` - Create new user
- `POST /symbols` - Create new prediction market
- `POST /onramp` - Add funds to user account
- `POST /orders` - Place buy/sell orders
- `POST /mint` - Mint initial stock positions
- `GET /orderbook/:symbol` - Get orderbook for symbol
- `GET /balance/:userId` - Get user balance

## 🔧 Configuration

### Environment Variables
- Configure in `wrangler.jsonc` for Cloudflare Workers
- Add custom bindings for KV storage, R2 buckets, or D1 databases

### Development
```bash
npm run dev          # Start local development server
npm run cf-typegen   # Generate Cloudflare types
```

## 🚀 Deployment

### Cloudflare Workers
The application is designed to run on Cloudflare Workers for:
- **Global Edge Distribution**: Low latency worldwide
- **Serverless Scaling**: Automatic scaling based on demand
- **Cost Efficiency**: Pay-per-request pricing model

### Deployment Commands
```bash
npm run deploy       # Deploy to production
npm run cf-typegen   # Update type definitions
```

## 🔮 Future Enhancements

### Planned Features
- [ ] WebSocket support for real-time updates
- [ ] Persistent storage with Cloudflare KV/D1
- [ ] User authentication and authorization
- [ ] Advanced order types (limit, stop-loss)
- [ ] Market creation and management
- [ ] Historical data and analytics
- [ ] Mobile-responsive frontend
- [ ] Multi-language support

### Technical Improvements
- [ ] Database integration for persistence
- [ ] Redis caching for performance
- [ ] Rate limiting and DDoS protection
- [ ] Comprehensive logging and monitoring
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This is a gambling/prediction market platform. Please ensure compliance with local gambling laws and regulations before deployment. This software is provided as-is without any guarantees.

---

**Built with ❤️ using Hono and Cloudflare Workers**
