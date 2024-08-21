import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { publicKey } from "@metaplex-foundation/umi"
import {
  dasApi,
  DasApiAsset,
} from "@metaplex-foundation/digital-asset-standard-api"

export interface MetaplexAsset {
  interface: string
  id: string
  jsonUri: string
  metadataName: string
  metadataSymbol: string
  creators: string[]
}

export interface SearchAssetsParams {
  node: string
  owner: string
  jsonUri: string
}

export async function searchMetaplexAssets(
  params: SearchAssetsParams
): Promise<MetaplexAsset[]> {
  const umi = createUmi(params.node).use(dasApi())
  const assets = await umi.rpc.searchAssets({
    owner: publicKey(params.owner),
    jsonUri: params.jsonUri,
  })
  return assets.items.map(toMetaplexAsset)
}

function toMetaplexAsset(input: DasApiAsset): MetaplexAsset {
  return {
    interface: input.interface,
    id: input.id,
    jsonUri: input.content.json_uri,
    metadataName: input.content.metadata.name,
    metadataSymbol: input.content.metadata.symbol,
    creators: input.creators.map((c) => c.address),
  }
}
