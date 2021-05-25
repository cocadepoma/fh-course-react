const nombre = "Paco";
const apellido = "Rodríguez";

const nCompleto = nombre + " " + apellido;

const nCompletoBTips = `${nombre} ${apellido}`;

console.log(nCompleto);
console.log(nCompletoBTips);

function getSaludo(nombre) {
    return "Hola Mundo " + nombre;
}

console.log(`Este es un texto: ${getSaludo(nombre)}`);
