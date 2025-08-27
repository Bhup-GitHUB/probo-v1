import { InrBalance, OrderbookType, StockBalancesType } from "../types/types";

class StorageService{
    private static instance: StorageService;

    
    public INR_BALANCES: InrBalance={};
    public ORDERBOOK: OrderbookType={};
    public STOCK_BALANCES: StockBalancesType={};

    private constructor(){}
}
