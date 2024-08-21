import { readPackageSync } from "read-pkg"
import { Hono } from "hono"

const appVersion = readPackageSync().version

const router = new Hono()

router.get("/version", (c) => c.json({ version: appVersion }))

export default router
