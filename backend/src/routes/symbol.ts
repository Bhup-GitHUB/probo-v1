import { Hono } from 'hono';
import { ApiResponse } from '../types/types';
import { storage } from '../services/storage';


const symbolRoutes = new Hono();


symbolRoutes.post('/create/:stockSymbol', async (c) => {
  const { stockSymbol } = c.req.param();

  if (storage.ORDERBOOK[stockSymbol]) {
    return c.json<ApiResponse>({
      success: false,
      message: "Symbol already exists."
    }, 409);
  }

  storage.ORDERBOOK[stockSymbol] = {
    yes: {},
    no: {}
  };

  return c.json<ApiResponse>({
    success: true,
    message: "Symbol created successfully."
  });
});

export { symbolRoutes };