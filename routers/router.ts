import Router from "koa-router";
import { pg_router } from "./router_postgres";
export const router = new Router();

router.use("/api/pg", pg_router.routes(), pg_router.allowedMethods());
