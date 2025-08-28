import { Hono } from 'hono';
import { validateOrderRequest } from '../middlewares/middleware';
import { ApiResponse, OrderRequest } from '../types/types';
import { storage } from '../services/storage';
import { OrderMatchingService } from '../services/orderMtaching';


const orderRoutes = new Hono();


orderRoutes.post('/buy', validateOrderRequest, async (c) => {
  const body: OrderRequest = await c.req.json();
  const { userId, stockSymbol, quantity, price, stockType } = body;

  if (!storage.INR_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User does not exist."
    }, 404);
  }

  if (storage.INR_BALANCES[userId].balance < quantity * price) {
    return c.json<ApiResponse>({
      success: false,
      message: "Insufficient balance."
    }, 400);
  }

  if (!storage.ORDERBOOK[stockSymbol]) {
    return c.json<ApiResponse>({
      success: false,
      message: "Stock symbol does not exist."
    }, 404);
  }


  const totalCost = price * quantity;
  storage.INR_BALANCES[userId].balance -= totalCost;
  storage.INR_BALANCES[userId].locked += totalCost;

  const orderBookWithStockSymStockType = storage.ORDERBOOK[stockSymbol][stockType];
  const isOrderbookPricesEmpty = !Object.keys(orderBookWithStockSymStockType).length;

  if (isOrderbookPricesEmpty) {
    OrderMatchingService.placeReverseOrders(userId, stockSymbol, stockType, quantity, price);
    return c.json<ApiResponse>({
      success: true,
      message: "First order placed successfully."
    });
  }

  const result = OrderMatchingService.matchBuyOrders(userId, price, quantity, stockSymbol, stockType);

  return c.json<ApiResponse>({
    success: true,
    message: result
  });
});


orderRoutes.post('/sell', validateOrderRequest, async (c) => {
  const body: OrderRequest = await c.req.json();
  const { userId, stockSymbol, quantity, price, stockType } = body;

  if (!storage.INR_BALANCES[userId]) {
    return c.json<ApiResponse>({
      success: false,
      message: "User does not exist."
    }, 404);
  }

  if (!storage.STOCK_BALANCES[userId][stockSymbol]) {
    return c.json<ApiResponse>({
      success: false,
      message: "You don't have this stock."
    }, 400);
  }

  if (storage.STOCK_BALANCES[userId][stockSymbol][stockType].quantity < quantity) {
    return c.json<ApiResponse>({
      success: false,
      message: "Insufficient stock quantity."
    }, 400);
  }

 
  storage.STOCK_BALANCES[userId][stockSymbol][stockType].quantity -= quantity;
  storage.STOCK_BALANCES[userId][stockSymbol][stockType].locked += quantity;

  if (!storage.ORDERBOOK[stockSymbol][stockType][price]) {
    storage.ORDERBOOK[stockSymbol][stockType][price] = {
      total: 0,
      orders: {}
    };
  }

  const result = OrderMatchingService.matchSellOrders(userId, price, quantity, stockSymbol, stockType);

  return c.json<ApiResponse>({
    success: true,
    message: result
  });
});

export { orderRoutes };