import { getHeroeById, getHeroesByOwner } from "../../base/08-imp-exp";
import heroes from "../../data/heroes";

describe("pruebas en funciones de Heroes", () => {
    test("debe retornar un héroes por ID", () => {
        const id = 1;
        const heroe = getHeroeById(id);
        const heroeData = heroes.find((h) => h.id === id);

        expect(heroe).toEqual(heroeData);
    });
    test("debe retornar undefined si el Héroe no existe", () => {
        const id = 10;
        const heroe = getHeroeById(id);
        expect(heroe).toBe(undefined);
    });

    test("Debe de retornar un array con heróes DC", () => {
        const banda = "DC";
        const dcArray = getHeroesByOwner(banda);
        const heroesArray = heroes.filter((heroe) => heroe.owner === banda);
        expect(heroesArray).toEqual(dcArray);
    });
    test("Debe de retornar un array con heróes MARVEL", () => {
        const banda = "Marvel";
        const dcArray = getHeroesByOwner(banda);
        const heroesArray = heroes.filter((heroe) => heroe.owner === banda);
        expect(heroesArray.length).toBe(dcArray.length);
    });
});
