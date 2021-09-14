export function parseHash(hash) {
  if (hash.indexOf("/") === -1) {
    return false;
  }

  return {
    asset_contract_address: hash.substring(1, hash.indexOf("/")),
    token_id: hash.substring(hash.indexOf("/") + 1, hash.length + 1),
  };
}
