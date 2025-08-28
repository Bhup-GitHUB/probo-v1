import { Hono } from 'hono';
import { userRoutes } from './user';
import { symbolRoutes } from './symbol';
import { orderbookRoutes } from './orderbook';
import { balancesRoutes } from './balance';
import { orderRoutes } from './order';
import { tradeRoutes } from './trade';
import { ApiResponse } from '../types/types';
import { storage } from '../services/storage';

const routes = new Hono();


routes.route('/user', userRoutes);
routes.route('/symbol', symbolRoutes);
routes.route('/orderbook', orderbookRoutes);
routes.route('/balances', balancesRoutes);
routes.route('/order', orderRoutes);
routes.route('/trade', tradeRoutes);


routes.post('/reset', async (c) => {
  storage.reset();
  
  return c.json<ApiResponse>({
    success: true,
    message: "All data has been reset successfully."
  });
});


routes.get('/health', async (c) => {
  return c.json<ApiResponse>({
    success: true,
    message: "Trading API is running."
  });
});

export { routes };