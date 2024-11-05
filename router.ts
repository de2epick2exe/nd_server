import Router from 'koa-router'
import pg_controller from './Postgres_controller'
export const router = new Router()

router.get("/users",pg_controller.get_users )