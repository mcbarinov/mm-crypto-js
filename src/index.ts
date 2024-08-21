import "dotenv/config"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { logger } from "hono/logger"
import solanaRouter from "./routers/solanaRouter"
import { bearerAuth } from "hono/bearer-auth"

const app = new Hono()
app.use(logger())
app.use("/*", bearerAuth({ token: process.env.ACCESS_TOKEN as string }))
app.route("/api/solana", solanaRouter)

const port = 3000
console.log(`Server is running on port ${port}`)
serve({ fetch: app.fetch, port })
