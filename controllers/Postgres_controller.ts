import pg from "pg";
const { Client } = pg;
import "dotenv/config";
import { Context } from "koa";

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});
(async () => {
  await db.connect();
})();

class Postgres_controller {
  async get_artists(ctx: Context) {
    try {
      console.log("get_users func");
      const users = await db.query('SELECT * FROM public."Artist"');
      console.log("users", users.rowCount);
      ctx.body = users.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("get_users error:", error.message);
      }
    }
  }
  async get_artist(ctx: Context) {
    try {
      console.log("get_users func");
      const user = await db.query('SELECT * FROM public."Artist" WHERE "ArtistId" = $1',[ctx.params.id]);
      console.log("users", user.rowCount);
      ctx.body = user.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("get_users error:", error.message);
      }
    }
  }



  async delete_artists(ctx: Context) {
    try {
      console.log("get_users func");
      const user = await db.query('Delete FROM public."Artist" WHERE "ArtistId" = $1',[ctx.params.id]);
      console.log("users", user.rowCount);
      ctx.body = user.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("get_users error:", error.message);
      }
    }
  }

}
export default new Postgres_controller();
