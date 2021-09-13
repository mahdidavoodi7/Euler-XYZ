import urls from '../constants/urls'
import req from '../handler/axios';

export function getAssets(params) {
  return req.get(urls.asset.getAll, {
    params
  });
}