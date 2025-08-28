# 🎯 Probo - Prediction Market Platform

A sophisticated prediction market platform built with modern technologies, enabling users to trade binary outcomes on various events with real-time order matching and advanced trading features.

## 🌐 Live Demo
**API Endpoint**: [https://backend.bkumar-be23.workers.dev](https://backend.bkumar-be23.workers.dev)

## 📋 Project Overview

Probo is a decentralized prediction market platform that allows users to:
- **Trade binary outcomes** (Yes/No) on any event
- **Real-time order matching** with price-time priority
- **Advanced liquidity provision** through reverse order placement
- **Comprehensive balance management** for both fiat and digital assets
- **Serverless architecture** for global scalability

### Key Features
- 🚀 **High Performance**: In-memory order matching engine
- 🔒 **Type Safety**: Full TypeScript implementation
- 🌍 **Global Distribution**: Cloudflare Workers edge network
- ⚡ **Real-time Trading**: Instant order execution
- 📊 **Advanced Analytics**: Orderbook and position tracking

## 🛠️ Tech Stack

### Backend Technologies
- **Runtime**: Cloudflare Workers (Serverless)
- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Language**: TypeScript (100% type-safe)
- **Deployment**: Wrangler CLI
- **Architecture**: Microservices with singleton pattern

### Key Libraries & Tools
- **@hono/zod-validator**: Request validation
- **Custom Middleware**: Error handling & performance monitoring
- **In-memory Storage**: High-performance data management
- **Order Matching Engine**: Custom implementation for trading logic

### Development & Deployment
- **Version Control**: Git with GitHub
- **CI/CD**: Automated deployment pipeline
- **Testing**: Comprehensive API test suite
- **Documentation**: Detailed API documentation

## 🏗️ Architecture Highlights

### Core Components
1. **Order Matching Engine**: Sophisticated algorithm for fair price discovery
2. **Storage Service**: Singleton pattern for optimal performance
3. **API Layer**: RESTful endpoints with comprehensive validation
4. **Middleware Stack**: Error handling, logging, and performance monitoring

### Data Models
- **User Management**: Account creation and balance tracking
- **Market Operations**: Prediction market creation and management
- **Trading System**: Buy/sell orders with real-time matching
- **Position Tracking**: Comprehensive balance and stock management

## 🚀 Getting Started

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Bhup-GitHUB/probo-v1.git
cd probo-v1/backend

# Install dependencies
npm install

# Start development server
npm run dev

# Deploy to production
npm run deploy
```

### Development Commands
```bash
npm run dev          # Start local development
npm run deploy       # Deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare types
```

## 📚 Documentation

### API Testing & Examples
For comprehensive API documentation, testing examples, and detailed usage instructions, please refer to:
**[📖 testcase.md](./testcase.md)**

The testcase.md file includes:
- Complete API endpoint documentation
- Step-by-step testing instructions
- Real-world usage examples
- Error handling scenarios
- Complete test flow for full trading sessions

## 🌟 Why This Project Stands Out

### Technical Excellence
- **Modern Architecture**: Built with cutting-edge serverless technology
- **Performance Optimized**: In-memory operations for lightning-fast execution
- **Scalable Design**: Cloudflare Workers for global edge distribution
- **Type Safety**: Full TypeScript implementation for robust development

### Business Value
- **Real-world Application**: Practical prediction market platform
- **Complex Trading Logic**: Sophisticated order matching algorithms
- **Production Ready**: Deployed and tested on live infrastructure
- **Comprehensive Testing**: Extensive test coverage and documentation

### Developer Experience
- **Clean Code**: Well-structured, maintainable codebase
- **Professional Documentation**: Comprehensive guides and examples
- **Easy Deployment**: Streamlined CI/CD pipeline
- **Open Source**: Available for community contribution

## 🔗 Links

- **🌐 Live API**: [https://backend.bkumar-be23.workers.dev](https://backend.bkumar-be23.workers.dev)
- **📂 GitHub Repository**: [https://github.com/Bhup-GitHUB/probo-v1](https://github.com/Bhup-GitHUB/probo-v1)
- **📖 API Documentation**: [testcase.md](./testcase.md)



*Probo - Making prediction markets accessible to everyone*
