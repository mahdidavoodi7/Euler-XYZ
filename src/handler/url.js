export function appendToUrl(url = "", id) {
  let stringId = id.toString();
  if (url.length === 0) {
    console.log("url can not be empty");
  } else {
    let lastChar = url.slice(-1);
    if (lastChar === "/") {
      return url + stringId + "/";
    } else {
      return url + "/" + stringId + "/";
    }
  }
}