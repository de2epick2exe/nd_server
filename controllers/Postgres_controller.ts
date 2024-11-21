import pg from "pg";
const { Client } = pg;
import "dotenv/config";
import { Context } from "koa";

class Postgres_controller {
  private db: pg.Client;
  private isConnected: boolean = false;
  constructor() {
    this.db = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    });
    this.get_artists = this.get_artists.bind(this);
    this.get_artist = this.get_artist.bind(this);
    this.delete_artists = this.delete_artists.bind(this);
  }
  async connect_db() {
    if(this.isConnected) return;
    await this.db.connect();
    this.isConnected = true;
    process.env.NODE_ENV !== "test" &&  console.log(`connected from db`);    
  }
  async disconnect_db() {
    await this.db.end();
    this.isConnected = false;
    process.env.NODE_ENV !== "test" &&  console.log(`disconnected from db`);
    
  }

  async get_artists(ctx: Context) {
    try {      
      const users = await this.db.query('SELECT * FROM public."Artist"');
      ///console.log("users", users.rowCount);
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
      const user = await this.db.query(
        'SELECT * FROM public."Artist" WHERE "ArtistId" = $1',
        [ctx.params.id],
      );
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
      const user = await this.db.query(
        'Delete FROM public."Artist" WHERE "ArtistId" = $1',
        [ctx.params.id],
      );
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
