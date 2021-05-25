
// Funciones en JSON

function saludar (nombre) {
    return `Hola, ${nombre}`;
}

// Función con const
const saludar1 = function (nombre) {
    return `Hola, ${nombre}`;
}
console.log(saludar);


// Arrow
const saludar2 = (nombre) => {
    return `Hola, ${nombre}`;
}
// Arrow2
const saludar3 = (nombre) =>  `Hola, ${nombre}`;

// Para dsevolver un objeto en arrow functions, paréntesis
const getUser = () => ({ uid: '123', username: 'Pep'});




// Tarea
function getUsuarioActivo (nombre) {
    return {
        uid: 'ABC',
        username: nombre
    }
};
const usuarioActivo =getUsuarioActivo();

// convertir a arrow function implícito
const getUsuarioActivo2 = (nombre) => ({uid: 'ABC', username: nombre})
const user = getUsuarioActivo2('paco');
console.log(user);