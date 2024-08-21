import pkg from "../../package.json"

import { Hono } from "hono"

const appVersion = pkg.version

const router = new Hono()

router.get("/version", (c) => c.json({ version: appVersion }))

export default router
