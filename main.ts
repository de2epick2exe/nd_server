import Koa from "koa";
import { router } from "./routers/router";
import Postgres_controller from "./controllers/Postgres_controller";
import { UnknownError } from "http-errors";
const app = new Koa();
app.use(router.routes());


let server: any;
const start = async () => {
  try {
    await Postgres_controller.connect_db();
    return new Promise<any>((resolve) => {
      server = app.listen(8080, () => {
        process.env.NODE_ENV !== "test" &&  console.log(`Server is running on port http://localhost:8080/`);
        resolve(server);
      });
    });
  } catch (error) {
    console.error("Server start error:", error);
    throw error;
  }
};

const stop = async () => {
  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err: Error) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    await Postgres_controller.disconnect_db();
  } catch (error) {
    console.error("Server stop error:", error);
  }
};

if (process.env.NODE_ENV !== "test") {
  start();
}

export { app, start, stop };

