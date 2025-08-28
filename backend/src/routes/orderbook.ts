import { Hono } from 'hono';
import { ApiResponse } from '../types/types';
import { storage } from '../services/storage';


const orderbookRoutes = new Hono();


orderbookRoutes.get('/', async (c) => {
  return c.json<ApiResponse>({
    success: true,
    message: "Orderbook retrieved successfully.",
    data: storage.ORDERBOOK
  });
});


orderbookRoutes.get('/:stockSymbol', async (c) => {
  const { stockSymbol } = c.req.param();

  if (!storage.ORDERBOOK[stockSymbol]) {
    return c.json<ApiResponse>({
      success: false,
      message: "Stock symbol not found."
    }, 404);
  }

  return c.json<ApiResponse>({
    success: true,
    message: "Symbol orderbook retrieved successfully.",
    data: storage.ORDERBOOK[stockSymbol]
  });
});

export { orderbookRoutes };