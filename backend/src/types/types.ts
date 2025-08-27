export interface userBalacnce{
    balance: number,
    locked: number
}

export interface InrBalance{
    [userId:string]: userBalacnce
}

export type UserOrderType= "direct" | "indirect"

export interface OrderType{
    [userId:string]:{
        quantity:number,
        type:UserOrderType,
    }
}

export interface StockType{
    [price:string]:{
        total:number,
        orders:OrderType
    }
}

export type StockSide= "yes" | "no"


export type StockSymbolType = {
    [stockType in StockSide]: StockType;
  };
  

  export interface OrderbookType {
    [stockSymbol: string]: StockSymbolType;
  }
  
  export interface StockBalance {
    quantity: number;
    locked: number;
  }
  
  export type StockSymType = {
    [stockType in StockSide]: StockBalance;
  };
  
  export interface UserStocks {
    [stockSymbol: string]: StockSymType;
  }
  
  export interface StockBalancesType {
    [userId: string]: UserStocks;
  }
  
  export interface CreateUserRequest {
    userId: string;
  }
  
  export interface CreateSymbolRequest {
    stockSymbol: string;
  }
  
  export interface OnrampRequest {
    userId: string;
    amount: number;
  }
  
  export interface OrderRequest {
    userId: string;
    stockSymbol: string;
    quantity: number;
    price: number;
    stockType: StockSide;
  }
  
  export interface MintRequest {
    userId: string;
    stockSymbol: string;
    quantity: number;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
  }