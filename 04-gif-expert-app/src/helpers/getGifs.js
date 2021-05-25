export const getGifs = async (category) => {
    const url = "https://api.giphy.com/v1/gifs/search";
    const api_key = "NANflJIAkEHkbyqbffZmpOZGrJCkOhqI";
    const limit = "10";
    const lang = "es";
    const endpoint = `${url}?q=${encodeURI(category)}&limit=${limit}&lang=${lang}&api_key=${api_key}`;

    const resp = await fetch(endpoint);
    const { data } = await resp.json();

    const gifs = data.map((img) => {
        return {
            id: img.id,
            title: img.title,
            url: img.images?.downsized_medium.url,
        };
    });

    return gifs;
};
