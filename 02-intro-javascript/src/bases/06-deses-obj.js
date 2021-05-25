
// Desestructuración
// Asignación Desestructurante
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment

const persona = {
    nombre: 'Tony',
    edad: 45,
    clave: 'Ironman',
    rango: 'Soldado'
}

const {nombre:nombre2, edad, clave} = persona;
console.log(nombre2, edad, clave);



const retornaPersona = (usuario) => {
    console.log( usuario);
}
retornaPersona(persona);

// Desestructuración en funciones
const retornaPersona2 = ({nombre, edad, rango = 'Capitán'}) => {
    console.log( nombre, edad, rango );
}
retornaPersona2(persona);


const retornaPersona3 = ({nombre, edad, rango = 'Capitán'}) => {
    return {
        nombreClave: nombre,
        hijos: edad,
        direccion: {
            calle: 'Mi calle',
            numero: 34,
            localidad: 'Vila'
        }
    }
}
const {nombreClave, hijos, direccion:{calle} } = retornaPersona3(persona);
console.log(nombreClave, hijos, calle);

