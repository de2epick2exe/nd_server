import Router from "koa-router";
import { pg_router } from "./router_postgres";
import { Context } from "koa";
export const router = new Router();
router.get("/", (ctx: Context)=>{
    ctx.body = '200'
})
router.use("/api/pg", pg_router.routes(), pg_router.allowedMethods());
