
const getImagen = async () => {

    try {
        const apiKey = "NANflJIAkEHkbyqbffZmpOZGrJCkOhqI";
        const urlBase = 'http://api.giphy.com/v1/gifs/random';
        const httpCall = await fetch(`${urlBase}?api_key=${apiKey}`);
        const {data} = await httpCall.json();
        const {url} = data.images.original;
        const img = document.createElement('img');
        img.src = url;
        document.body.append(img);
        
    } catch (error) {
        console.log(error);
    }

}
getImagen();




