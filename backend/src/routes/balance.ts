import { Hono } from 'hono';
import { ApiResponse } from '../types/types';
import { storage } from '../services/storage';


const balancesRoutes = new Hono();


balancesRoutes.get('/inr', async (c) => {
  return c.json<ApiResponse>({
    success: true,
    message: "INR balances retrieved successfully.",
    data: storage.INR_BALANCES
  });
});


balancesRoutes.get('/stock', async (c) => {
  return c.json<ApiResponse>({
    success: true,
    message: "Stock balances retrieved successfully.",
    data: storage.STOCK_BALANCES
  });
});

export { balancesRoutes };