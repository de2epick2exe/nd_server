import pg from "pg";
const { Client } = pg;
import "dotenv/config";
const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  //@ts-ignore
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
async () => await db.connect();

class Postgres_controller {
  //@ts-ignore
  async get_users(req, res) {
    try {
      console.log("get_users func");
      const users = await db.query('SELECT * FROM public."Album"');
      console.log("users");

      return res.end(users.rows);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("get_users error:", error.message);
      }
    }
  }
}
export default new Postgres_controller();
