import * as env from 'env-var';
import dotenv from "dotenv";
dotenv.config();


export const envs = {
    
    PORT: env.get('PORT').required().asPortNumber(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString(),

}