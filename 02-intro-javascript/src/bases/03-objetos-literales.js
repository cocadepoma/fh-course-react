const persona = {
    nombre: "Tony",
    apellido: "Stark",
    edad: 45,
    direccion: {
        calle: "Via acede",
        ciudad: "New York",
        lat: 14.3232,
        lng: 34.92921,
    },
};

//console.table(persona);
console.log({ persona: persona });

/* const persona2 = persona;
persona2.nombre = "Peter"; 
console.log(persona, persona2);*/

const persona2 = { ...persona, nombre: "Pep" };

console.log(persona2);
