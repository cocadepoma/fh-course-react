import { getHeroeByID } from "./bases/08-imp-exp";
// Promesas

/* const promesa = new Promise( (resolve, reject)=>{

    setTimeout(() => {
        // Tarea
        const heroe = getHeroeByID(2);
        resolve(heroe);
        //reject(new Error('No hay héroes con ese ID'));

    }, 2000);
});

promesa.then( (resp)=>{
    console.log(resp);
    console.log('then de la promesa');
}).catch( err => console.warn(err)); */

const getHeroeByIDAsync = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Tarea
            const heroe = getHeroeByID(id);
            if (heroe) {
                resolve(heroe);
            } else {
                reject(new Error("No hay héroes con ese ID"));
            }
        }, 2000);
    });
};
getHeroeByIDAsync(24)
    //.then((heroe) => console.log(heroe))
    //.catch((err) => console.warn(err));
    .then(console.log)
    .catch(console.warn);
