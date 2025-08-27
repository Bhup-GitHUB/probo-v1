import { InrBalance, OrderbookType, StockBalancesType } from "../types/types";

class StorageService {
    private static instance: StorageService;
    
    public INR_BALANCES: InrBalance = {};
    public ORDERBOOK: OrderbookType = {};
    public STOCK_BALANCES: StockBalancesType = {};
  
    private constructor() {}
  
    public static getInstance(): StorageService {
      if (!StorageService.instance) {
        StorageService.instance = new StorageService();
      }
      return StorageService.instance;
    }
  
    public reset(): void {
      this.INR_BALANCES = {};
      this.ORDERBOOK = {};
      this.STOCK_BALANCES = {};
    }
  }
  

  export const storage= StorageService.getInstance();

  

