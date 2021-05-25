import ReactDOM from "react-dom";
//import PrimeraApp from "./PrimeraApp";
import CounterApp from "./CounterApp";

import "./index.css";

const divRoot = document.querySelector("#root");

//ReactDOM.render(<PrimeraApp saludo="Hola, soy Goku" subtitulo="Soy un subtitulo" />, divRoot);
ReactDOM.render(<CounterApp value={3} />, divRoot);
