import Router from "koa-router";
import pg_controller from "../controllers/Postgres_controller";
import { Context } from "koa";
export const pg_router = new Router();

// GET
pg_router.get("/artists", pg_controller.get_artists);
pg_router.get("/artist/:id", pg_controller.get_artist);

//POST
pg_router.post("/create_artist", async (ctx: Context) => {
  ctx.body = "200";
});

//PUT
pg_router.put("/update_Album");

//PATCH
pg_router.patch("/update_Album");

//DELETE
pg_router.delete("/artist/:id", pg_controller.delete_artists);
