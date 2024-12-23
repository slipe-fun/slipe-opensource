import fetcher from "./fetcher";

export default (url, mutate, token) => {
    mutate(
        url,
        (async () => {
            const updatedData = await fetcher(url, "get", null, { Authorization: "Bearer " + token });
            return updatedData;
        })(),
        false
    );
};