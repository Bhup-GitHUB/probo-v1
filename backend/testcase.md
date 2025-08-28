# 🧪 Probo API Test Cases & Documentation

## 🌐 Live API Endpoint
**Base URL**: https://backend.bkumar-be23.workers.dev/

## 📋 Table of Contents
- [Health Check](#health-check)
- [User Management](#user-management)
- [Market Management](#market-management)
- [Trading Operations](#trading-operations)
- [Balance & Positions](#balance--positions)
- [System Operations](#system-operations)
- [Complete Test Flow](#complete-test-flow)

---

## 🔍 Health Check

### GET /health
**Purpose**: Check if the API is running and responsive

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/health
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Trading API is running."
}
```

**Test Command**:
```bash
# Test health endpoint
curl -X GET https://backend.bkumar-be23.workers.dev/health | jq
```

---

## 👤 User Management

### 1. Create User
**POST** `/user/create/:userId`

**Purpose**: Create a new user account with initial balance

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/user123
```

**Expected Response**:
```json
{
  "success": true,
  "message": "User created successfully."
}
```

**Test Cases**:
```bash
# Test 1: Create new user
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/alice123

# Test 2: Try to create duplicate user (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/alice123

# Test 3: Create another user
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/bob456
```

### 2. Add Funds (Onramp)
**POST** `/user/onramp/inr`

**Purpose**: Add INR funds to user's account

**Request Body**:
```json
{
  "userId": "alice123",
  "amount": 1000
}
```

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "amount": 1000
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Funds added successfully."
}
```

**Test Cases**:
```bash
# Test 1: Add funds to existing user
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "alice123", "amount": 1000}'

# Test 2: Add more funds
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "alice123", "amount": 500}'

# Test 3: Add funds to non-existent user (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "nonexistent", "amount": 100}'

# Test 4: Invalid amount (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "alice123", "amount": -100}'
```

### 3. Get INR Balance
**GET** `/user/balance/inr/:userId`

**Purpose**: Retrieve user's INR balance

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/user/balance/inr/alice123
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Balance retrieved successfully.",
  "data": {
    "balance": 1500
  }
}
```

**Test Cases**:
```bash
# Test 1: Get balance for existing user
curl -X GET https://backend.bkumar-be23.workers.dev/user/balance/inr/alice123

# Test 2: Get balance for non-existent user (should fail)
curl -X GET https://backend.bkumar-be23.workers.dev/user/balance/inr/nonexistent
```

### 4. Get Stock Balance
**GET** `/user/balance/stock/:userId`

**Purpose**: Retrieve user's stock positions

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/user/balance/stock/alice123
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Stock balance retrieved successfully.",
  "data": {}
}
```

---

## 📈 Market Management

### 1. Create Prediction Market
**POST** `/symbol/create`

**Purpose**: Create a new prediction market

**Request Body**:
```json
{
  "stockSymbol": "BTC_2024_50K"
}
```

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/symbol/create \
  -H "Content-Type: application/json" \
  -d '{
    "stockSymbol": "BTC_2024_50K"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Symbol created successfully."
}
```

**Test Cases**:
```bash
# Test 1: Create new market
curl -X POST https://backend.bkumar-be23.workers.dev/symbol/create \
  -H "Content-Type: application/json" \
  -d '{"stockSymbol": "BTC_2024_50K"}'

# Test 2: Create another market
curl -X POST https://backend.bkumar-be23.workers.dev/symbol/create \
  -H "Content-Type: application/json" \
  -d '{"stockSymbol": "ETH_2024_3K"}'

# Test 3: Try to create duplicate market (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/symbol/create \
  -H "Content-Type: application/json" \
  -d '{"stockSymbol": "BTC_2024_50K"}'
```

### 2. List All Markets
**GET** `/symbol/list`

**Purpose**: Get list of all available prediction markets

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/symbol/list
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Symbols retrieved successfully.",
  "data": ["BTC_2024_50K", "ETH_2024_3K"]
}
```

---

## 💰 Trading Operations

### 1. Place Buy Order
**POST** `/order/buy`

**Purpose**: Place a buy order for prediction shares

**Request Body**:
```json
{
  "userId": "alice123",
  "stockSymbol": "BTC_2024_50K",
  "quantity": 10,
  "price": 6,
  "stockType": "yes"
}
```

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 10,
    "price": 6,
    "stockType": "yes"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "First order placed successfully."
}
```

**Test Cases**:
```bash
# Test 1: Place first buy order (creates market)
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 10,
    "price": 6,
    "stockType": "yes"
  }'

# Test 2: Place another buy order
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "bob456",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 5,
    "price": 7,
    "stockType": "yes"
  }'

# Test 3: Place buy order for "no" position
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 8,
    "price": 4,
    "stockType": "no"
  }'

# Test 4: Insufficient balance (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 1000,
    "price": 10,
    "stockType": "yes"
  }'
```

### 2. Place Sell Order
**POST** `/order/sell`

**Purpose**: Place a sell order for prediction shares

**Request Body**:
```json
{
  "userId": "alice123",
  "stockSymbol": "BTC_2024_50K",
  "quantity": 5,
  "price": 8,
  "stockType": "yes"
}
```

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/order/sell \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 5,
    "price": 8,
    "stockType": "yes"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Sell order processed successfully."
}
```

**Test Cases**:
```bash
# Test 1: Place sell order (should match with existing buy orders)
curl -X POST https://backend.bkumar-be23.workers.dev/order/sell \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 5,
    "price": 8,
    "stockType": "yes"
  }'

# Test 2: Place sell order for "no" position
curl -X POST https://backend.bkumar-be23.workers.dev/order/sell \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 3,
    "price": 6,
    "stockType": "no"
  }'

# Test 3: Insufficient stock (should fail)
curl -X POST https://backend.bkumar-be23.workers.dev/order/sell \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice123",
    "stockSymbol": "BTC_2024_50K",
    "quantity": 100,
    "price": 5,
    "stockType": "yes"
  }'
```

### 3. Get Orderbook
**GET** `/orderbook/:symbol`

**Purpose**: Get current orderbook for a specific market

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/orderbook/BTC_2024_50K
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Orderbook retrieved successfully.",
  "data": {
    "yes": {
      "7": {
        "total": 5,
        "orders": {
          "bob456": {
            "quantity": 5,
            "type": "direct"
          }
        }
      }
    },
    "no": {
      "4": {
        "total": 8,
        "orders": {
          "alice123": {
            "quantity": 8,
            "type": "indirect"
          }
        }
      }
    }
  }
}
```

**Test Cases**:
```bash
# Test 1: Get orderbook for existing market
curl -X GET https://backend.bkumar-be23.workers.dev/orderbook/BTC_2024_50K

# Test 2: Get orderbook for non-existent market
curl -X GET https://backend.bkumar-be23.workers.dev/orderbook/NONEXISTENT
```

---

## 💳 Balance & Positions

### 1. Get INR Balance
**GET** `/balances/inr/:userId`

**Purpose**: Get user's INR balance (alternative endpoint)

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/balances/inr/alice123
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Balance retrieved successfully.",
  "data": {
    "balance": 1200,
    "locked": 300
  }
}
```

### 2. Get Stock Positions
**GET** `/balances/stock/:userId`

**Purpose**: Get user's stock positions (alternative endpoint)

**Request**:
```bash
curl -X GET https://backend.bkumar-be23.workers.dev/balances/stock/alice123
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Stock balance retrieved successfully.",
  "data": {
    "BTC_2024_50K": {
      "yes": {
        "quantity": 5,
        "locked": 0
      },
      "no": {
        "quantity": 8,
        "locked": 0
      }
    }
  }
}
```

---

## 🔧 System Operations

### 1. Reset All Data
**POST** `/reset`

**Purpose**: Reset all data (development/testing only)

**Request**:
```bash
curl -X POST https://backend.bkumar-be23.workers.dev/reset
```

**Expected Response**:
```json
{
  "success": true,
  "message": "All data has been reset successfully."
}
```

---

## 🧪 Complete Test Flow

### Scenario: Complete Trading Session

```bash
# Step 1: Health Check
echo "=== Health Check ==="
curl -X GET https://backend.bkumar-be23.workers.dev/health

# Step 2: Create Users
echo -e "\n=== Creating Users ==="
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/trader1
curl -X POST https://backend.bkumar-be23.workers.dev/user/create/trader2

# Step 3: Add Funds
echo -e "\n=== Adding Funds ==="
curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "trader1", "amount": 2000}'

curl -X POST https://backend.bkumar-be23.workers.dev/user/onramp/inr \
  -H "Content-Type: application/json" \
  -d '{"userId": "trader2", "amount": 1500}'

# Step 4: Create Market
echo -e "\n=== Creating Market ==="
curl -X POST https://backend.bkumar-be23.workers.dev/symbol/create \
  -H "Content-Type: application/json" \
  -d '{"stockSymbol": "TEST_MARKET"}'

# Step 5: Place Buy Orders
echo -e "\n=== Placing Buy Orders ==="
curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "trader1",
    "stockSymbol": "TEST_MARKET",
    "quantity": 20,
    "price": 6,
    "stockType": "yes"
  }'

curl -X POST https://backend.bkumar-be23.workers.dev/order/buy \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "trader2",
    "stockSymbol": "TEST_MARKET",
    "quantity": 15,
    "price": 7,
    "stockType": "yes"
  }'

# Step 6: Check Orderbook
echo -e "\n=== Checking Orderbook ==="
curl -X GET https://backend.bkumar-be23.workers.dev/orderbook/TEST_MARKET

# Step 7: Place Sell Order (should match)
echo -e "\n=== Placing Sell Order ==="
curl -X POST https://backend.bkumar-be23.workers.dev/order/sell \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "trader1",
    "stockSymbol": "TEST_MARKET",
    "quantity": 10,
    "price": 5,
    "stockType": "yes"
  }'

# Step 8: Check Balances
echo -e "\n=== Checking Balances ==="
curl -X GET https://backend.bkumar-be23.workers.dev/balances/inr/trader1
curl -X GET https://backend.bkumar-be23.workers.dev/balances/inr/trader2
curl -X GET https://backend.bkumar-be23.workers.dev/balances/stock/trader1
curl -X GET https://backend.bkumar-be23.workers.dev/balances/stock/trader2

# Step 9: Final Orderbook
echo -e "\n=== Final Orderbook ==="
curl -X GET https://backend.bkumar-be23.workers.dev/orderbook/TEST_MARKET
```

---

## 📝 Error Response Examples

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid quantity or price"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User does not exist."
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User already exists."
}
```

---

## 🔍 Testing Tools

### Using curl with jq (for pretty output)
```bash
# Install jq if not available
# Windows: choco install jq
# Mac: brew install jq
# Linux: sudo apt-get install jq

# Test with pretty output
curl -X GET https://backend.bkumar-be23.workers.dev/health | jq
```

### Using Postman Collection
```json
{
  "info": {
    "name": "Probo API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "https://backend.bkumar-be23.workers.dev/health"
      }
    }
  ]
}
```

---

## 📊 Expected Test Results

After running the complete test flow, you should see:
- ✅ All API endpoints responding correctly
- ✅ Order matching working properly
- ✅ Balances updating correctly
- ✅ Orderbook reflecting current state
- ✅ Error handling working for invalid requests

---

**🎯 Happy Testing!** 

For any issues or questions, please refer to the main README.md file or create an issue in the repository.
