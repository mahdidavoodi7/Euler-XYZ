import urls from "../constants/urls";
import req from "../handler/axios";
import { appendToUrl } from "../handler/url";

export function getAssets(params) {
  return req.get(urls.asset.getAll, {
    params,
  });
}
export function getOneAsset(params) {
  return req.get(
    appendToUrl(
      appendToUrl(urls.asset.getOne, params.asset_contract_address),
      params.token_id
    )
  );
}
