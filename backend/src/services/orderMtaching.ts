// src/services/orderMatching.ts
import { StockSide } from '../types/types';
import { storage } from './storage';


export class OrderMatchingService {
  static placeReverseOrders(
    userId: string, 
    stockSymbol: string, 
    stockType: StockSide, 
    quantity: number, 
    price: number
  ): void {
    const reversedStockType: StockSide = stockType === "yes" ? "no" : "yes";
    const complementPrice = 10 - price;
    
    if (quantity > 0) {
      if (!storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice]) {
        storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice] = {
          total: 0,
          orders: {}
        };
      }

      if (!storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice].orders[userId]) {
        storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice].orders[userId] = {
          quantity: 0,
          type: "indirect"
        };
      }

      storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice].total += quantity;
      storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice].orders[userId].quantity += quantity;
      storage.ORDERBOOK[stockSymbol][reversedStockType][complementPrice].orders[userId].type = "indirect";
    }
  }

  static matchBuyOrders(
    userId: string, 
    price: number, 
    quantity: number, 
    stockSymbol: string, 
    stockType: StockSide
  ): string {
    const availablePricesInOrderbook = storage.ORDERBOOK[stockSymbol][stockType];
    let remainingQuantity = quantity;

    Object.keys(availablePricesInOrderbook)
      .filter(availablePrice => parseInt(availablePrice) <= price)
      .forEach(availablePrice => {
        if (remainingQuantity <= 0) return;

        const availableQuantity = availablePricesInOrderbook[availablePrice].total;
        const matchedQuantity = Math.min(availableQuantity, remainingQuantity);
        const pendingOrders = availablePricesInOrderbook[availablePrice].orders;

        Object.keys(pendingOrders).forEach(pendingOrderUserId => {
          if (remainingQuantity <= 0) return;

          const pendingOrder = pendingOrders[pendingOrderUserId];
          const { quantity: pendingOrderQuantity, type: pendingOrderType } = pendingOrder;
          const actualMatchedQuantity = Math.min(pendingOrderQuantity, matchedQuantity, remainingQuantity);

          if (pendingOrderType === "direct") {
            this.processDictBuyMatch(
              userId, pendingOrderUserId, stockSymbol, stockType, 
              actualMatchedQuantity, price
            );
          } else if (pendingOrderType === "indirect") {
            this.processIndirectBuyMatch(
              userId, pendingOrderUserId, stockSymbol, stockType, 
              actualMatchedQuantity, price
            );
          }

          pendingOrder.quantity -= actualMatchedQuantity;
          availablePricesInOrderbook[availablePrice].total -= actualMatchedQuantity;
          remainingQuantity -= actualMatchedQuantity;
        });
      });

    if (remainingQuantity > 0) {
      this.placeReverseOrders(userId, stockSymbol, stockType, remainingQuantity, price);
    }

    return "Order processed successfully";
  }

  private static processDictBuyMatch(
    buyerId: string, 
    sellerId: string, 
    stockSymbol: string, 
    stockType: StockSide, 
    quantity: number, 
    price: number
  ): void {
    // Transfer stocks
    storage.STOCK_BALANCES[sellerId][stockSymbol][stockType].locked -= quantity;
    this.initializeUserStockBalance(buyerId, stockSymbol);
    storage.STOCK_BALANCES[buyerId][stockSymbol][stockType].quantity += quantity;

    // Transfer money
    const transactionAmount = price * quantity;
    storage.INR_BALANCES[buyerId].locked -= transactionAmount;
    storage.INR_BALANCES[sellerId].balance += transactionAmount;
  }

  private static processIndirectBuyMatch(
    buyerId: string, 
    sellerId: string, 
    stockSymbol: string, 
    stockType: StockSide, 
    quantity: number, 
    price: number
  ): void {
    const reverseStockType: StockSide = stockType === "yes" ? "no" : "yes";
    const complementPrice = 10 - price;

    // Initialize stock balances if needed
    this.initializeUserStockBalance(buyerId, stockSymbol);
    this.initializeUserStockBalance(sellerId, stockSymbol);

    // Transfer money
    storage.INR_BALANCES[sellerId].locked -= complementPrice * quantity;
    storage.INR_BALANCES[buyerId].locked -= price * quantity;

    // Transfer stocks
    storage.STOCK_BALANCES[sellerId][stockSymbol][reverseStockType].quantity += quantity;
    storage.STOCK_BALANCES[buyerId][stockSymbol][stockType].quantity += quantity;
  }

  static matchSellOrders(
    userId: string, 
    price: number, 
    quantity: number, 
    stockSymbol: string, 
    stockType: StockSide
  ): string {
    const orderbookPendingOrderPrices = storage.ORDERBOOK[stockSymbol][stockType];
    let remainingQuantity = quantity;

    Object.keys(orderbookPendingOrderPrices)
      .filter(orderPrice => parseInt(orderPrice) >= price)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .forEach(orderPrice => {
        if (remainingQuantity <= 0) return;

        const pendingOrders = orderbookPendingOrderPrices[orderPrice].orders;

        Object.keys(pendingOrders).forEach(pendingOrderUserId => {
          if (remainingQuantity <= 0) return;

          const pendingOrder = pendingOrders[pendingOrderUserId];
          
          if (pendingOrder.type === "indirect") {
            const matchedQuantity = Math.min(pendingOrder.quantity, remainingQuantity);
            const reversedStockType: StockSide = stockType === "yes" ? "no" : "yes";

            // Transfer stocks and money
            storage.STOCK_BALANCES[userId][stockSymbol][stockType].locked -= matchedQuantity;
            this.initializeUserStockBalance(pendingOrderUserId, stockSymbol);
            storage.STOCK_BALANCES[pendingOrderUserId][stockSymbol][reversedStockType].quantity += matchedQuantity;
            storage.INR_BALANCES[userId].balance += matchedQuantity * price;
            storage.INR_BALANCES[pendingOrderUserId].locked -= matchedQuantity * price;

            // Update orderbook
            orderbookPendingOrderPrices[orderPrice].total -= matchedQuantity;
            pendingOrder.quantity -= matchedQuantity;
            remainingQuantity -= matchedQuantity;
          }
        });
      });

    if (remainingQuantity > 0) {
      if (!storage.ORDERBOOK[stockSymbol][stockType][price]) {
        storage.ORDERBOOK[stockSymbol][stockType][price] = {
          total: 0,
          orders: {}
        };
      }

      if (!storage.ORDERBOOK[stockSymbol][stockType][price].orders[userId]) {
        storage.ORDERBOOK[stockSymbol][stockType][price].orders[userId] = {
          quantity: 0,
          type: "direct"
        };
      }

      storage.ORDERBOOK[stockSymbol][stockType][price].total += remainingQuantity;
      storage.ORDERBOOK[stockSymbol][stockType][price].orders[userId].quantity += remainingQuantity;
    }

    return "Sell order processed successfully";
  }

  private static initializeUserStockBalance(userId: string, stockSymbol: string): void {
    if (!storage.STOCK_BALANCES[userId][stockSymbol]) {
      storage.STOCK_BALANCES[userId][stockSymbol] = {
        yes: { quantity: 0, locked: 0 },
        no: { quantity: 0, locked: 0 }
      };
    }
  }
}