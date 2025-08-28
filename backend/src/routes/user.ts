import { Hono } from 'hono';
import { storage } from '../services/storage';
import { ApiResponse, OnrampRequest } from '../types/types';
import { validateUserExist } from '../middlewares/middleware';


const userRoutes = new Hono();

// Create user
userRoutes.post('/create/:userId', async (c) => {
  const { userId } = c.req.param();

  if (storage.INR_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User already exists."
    }, 409);
  }

  storage.INR_BALANCES[userId] = {
    balance: 0,
    locked: 0
  };

  storage.STOCK_BALANCES[userId] = {};

  return c.json<ApiResponse>({
    success: true,
    message: "User created successfully."
  });
});

// Get INR balance for user
userRoutes.get('/balance/inr/:userId', validateUserExist, async (c) => {
  const { userId } = c.req.param();
  
  if (!storage.INR_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User does not exist."
    }, 404);
  }

  const balance = storage.INR_BALANCES[userId].balance;

  return c.json<ApiResponse<{ balance: number }>>({
    success: true,
    message: "Balance retrieved successfully.",
    data: { balance }
  });
});

// Get stock balance for user
userRoutes.get('/balance/stock/:userId', validateUserExist, async (c) => {
  const { userId } = c.req.param();

  if (!storage.STOCK_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User stock balance does not exist."
    }, 404);
  }

  return c.json<ApiResponse>({
    success: true,
    message: "Stock balance retrieved successfully.",
    data: storage.STOCK_BALANCES[userId]
  });
});

// Onramp INR
userRoutes.post('/onramp/inr', async (c) => {
  const body: OnrampRequest = await c.req.json();
  const { userId, amount } = body;

  if (!userId || !amount) {
    return c.json<ApiResponse>({
      success: false,
      message: "User ID and amount are required."
    }, 400);
  }

  if (amount <= 0) {
    return c.json<ApiResponse>({
      success: false,
      message: "Amount must be positive."
    }, 400);
  }

  if (!storage.INR_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User does not exist."
    }, 404);
  }

  storage.INR_BALANCES[userId].balance += amount;

  return c.json<ApiResponse>({
    success: true,
    message: "Balance added successfully."
  });
});

export { userRoutes };