import { Hono } from 'hono';
import { ApiResponse, MintRequest } from '../types/types';
import { storage } from '../services/storage';


const tradeRoutes = new Hono();


tradeRoutes.post('/mint', async (c) => {
  const body: MintRequest = await c.req.json();
  const { userId, stockSymbol, quantity } = body;

  if (!userId || !stockSymbol || !quantity) {
    return c.json<ApiResponse>({
      success: false,
      message: "Please provide all required fields: userId, stockSymbol, quantity."
    }, 400);
  }

  if (quantity <= 0) {
    return c.json<ApiResponse>({
      success: false,
      message: "Quantity must be positive."
    }, 400);
  }

  if (!storage.ORDERBOOK[stockSymbol]) {
    return c.json<ApiResponse>({
      success: false,
      message: "Stock symbol not available."
    }, 404);
  }

  if (!storage.STOCK_BALANCES[userId]) {
    storage.STOCK_BALANCES[userId] = {};
  }

  if (!storage.STOCK_BALANCES[userId][stockSymbol]) {
    storage.STOCK_BALANCES[userId][stockSymbol] = {
      yes: {
        quantity: 0,
        locked: 0,
      },
      no: {
        quantity: 0,
        locked: 0
      }
    };
  }

  storage.STOCK_BALANCES[userId][stockSymbol].yes.quantity += quantity;
  storage.STOCK_BALANCES[userId][stockSymbol].no.quantity += quantity;

  return c.json<ApiResponse>({
    success: true,
    message: "Tokens minted successfully."
  });
});

export { tradeRoutes };