import { Context, Next } from "hono";
import { ApiResponse } from "../types/types";

export const validateUserExist = async (c: Context, next: Next) => {
    const userId = c.req.param("userId");
    // const useID= c.req.json().userId;

    if (!userId) {
        return c.json<ApiResponse>({
            success: false,
            message: "User id is required"
        }, 400);
    }
    await next();
};

export const validateOrderRequest = async (c: Context, next: Next) => {
    const body = await c.req.json().catch(() => null);

    if (!body) {
        return c.json<ApiResponse>({
            success: false,
            message: "Invalid request body"
        }, 400);
    }
    
    const { userId, stockSymbol, quantity, price, stockType } = body;

    if (!userId || !stockSymbol || !quantity || !price || !stockType) {
        return c.json<ApiResponse>({
            success: false,
            message: "Something is missing"
        }, 400);
    }

    if (quantity <= 0 || price <= 0) {
        return c.json<ApiResponse>({
            success: false,
            message: "Invalid quantity or price"
        }, 400);
    }

    if (!["yes", "no"].includes(stockType)) {
        return c.json<ApiResponse>({
            success: false,
            message: "Invalid stock type"
        }, 400);
    }
    
    await next();
};

export const ErrorHandler = async (err: Error, c: Context) => {
    // @ts-ignore
    console.error('Error occurred:', err);
    
    return c.json<ApiResponse>({
        success: false,
        message: "Internal server error"
    }, 500);
};

export const PerformanceLogger = async (c: Context, next: Next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    //@ts-ignore
    console.log(`${c.req.method} ${c.req.url} ${end - start}ms`);
};