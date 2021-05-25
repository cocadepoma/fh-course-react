
// Ternario

const activo = true;

let mensaje = ``;

if(activo) {
    mensaje ='Activo';
} else {
    mensaje = 'Inactivo';
}

//const mensaje2 = (activo) ? 'Activo' : 'Inactivo';
//console.log(mensaje2);

const mensaje3 = !activo && 'Activo';
console.log(mensaje3);
