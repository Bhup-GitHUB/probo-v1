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