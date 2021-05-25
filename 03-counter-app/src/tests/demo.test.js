describe("Pruebas en el archivo demo.test.js", () => {
    test("deben de ser iguales los string", () => {
        // Inicialización
        const mensaje = "Hola mundo";

        // Estímulo
        const mensaje2 = "Hola mundo";

        // Observar el comportamiento
        expect(mensaje).toBe(mensaje2);
    });
});
