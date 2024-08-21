import "dotenv/config"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { bearerAuth } from "hono/bearer-auth"
import solanaRouter from "./routers/solanaRouter"
import systemRouter from "./routers/systemRouter"

const app = new Hono()
app.use(logger())
app.use("/*", bearerAuth({ token: process.env.ACCESS_TOKEN as string }))
app.route("/api/solana", solanaRouter)
app.route("/api/system", systemRouter)

const port = 3000
console.log(`Server is running on port ${port}`)
serve({ fetch: app.fetch, port })
