import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { searchMetaplexAssets, SearchAssetsParams } from "../solana"

const router = new Hono()

router.post(
  "/search-metaplex-assets",
  zValidator(
    "json",
    z.object({ node: z.string(), owner: z.string(), jsonUri: z.string() })
  ),
  async (c) => {
    const params = await c.req.json<SearchAssetsParams>()
    return c.json(await searchMetaplexAssets(params))
  }
)

export default router
