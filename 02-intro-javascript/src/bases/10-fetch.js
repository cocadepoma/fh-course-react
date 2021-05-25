
const apiKey = "NANflJIAkEHkbyqbffZmpOZGrJCkOhqI";
const urlBase = 'http://api.giphy.com/v1/gifs/random';

const httpCall = fetch(`${urlBase}?api_key=${apiKey}`);

/* httpCall.then( resp => {
    resp.json().then( data => {
         console.log(data)
    })
    
}).catch(err => {console.warn(err)})
 */
httpCall.then( resp => resp.json())
.then(({data}) => {
    const { url } = data.images.original;

    const img = document.createElement('img');
    img.src = url;
    document.body.append(img);
})
.catch(err => {console.warn(err)})