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
  async get_users(ctx: Context) {
    try {
      console.log("get_users func");
      const users = await db.query('SELECT * FROM public."Album"');
      console.log("users", users.rowCount);
      ctx.body = users.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("get_users error:", error.message);
      }
    }
  }
}
export default new Postgres_controller();
