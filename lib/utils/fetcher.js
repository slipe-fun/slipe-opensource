export default async (url, method = "get", body = {}, headers = {}) => await fetch(url, {
    method,
    body: method === "post" ? body : null,
    headers
}).then(async res => { return { ...await res.json(), response: res } });