import Koa from "koa";
import { router } from "./routers/router";

const app = new Koa();

app.use(router.routes());

app.listen(8080, () => {
  console.log(`Server is running on port http://localhost:8080/`);
});
