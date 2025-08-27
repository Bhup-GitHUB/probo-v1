import { Context , Next } from "hono";
import { ApiResponse } from "../types/types";


export const validateUserExist = async (c:Context , next:Next)=>{
    const userId= c.req.param("userId")
    // const useID= c.req.json().userId;

    if (!userId){
        return c.json<ApiResponse>({
            success:false,
            message:"User id is required"


        }, 400 )
    }
    await next();
    

}
