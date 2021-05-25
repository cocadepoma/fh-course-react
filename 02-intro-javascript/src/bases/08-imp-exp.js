//import heroes from "./data/heroes";
//import heroes, {owners} from "./data/heroes"; //heroes exportado como default
//import {heroes, owners} from "./data/heroes"; // Exportado como un objeto, sin default

import heroes ,{ owners } from "../data/heroes";



//console.log(owners);


// Find retorna el heroe que corresponda
export const getHeroeByID = (id) => heroes.find( heroe => heroe.id === id);
//console.log(getHeroeByID(2));


// Filter filtrará por la condición
export const getHeroesByOwner = (owner) => heroes.filter( heroe => heroe.owner === owner);
//console.log(getHeroesByOwner('Marvel'));

