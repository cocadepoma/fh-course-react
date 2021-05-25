import { fetchSinToken, fetchConToken } from "../../helpers/fetch";

describe("pruebas en el helper fecth", () => {
    let token = "";

    test("fetchSinToken debe de funcionar", async () => {
        const resp = await fetchSinToken("auth", { email: "paco@paco.paco", password: "123456" }, "POST");
        const body = await resp.json();

        expect(resp instanceof Response).toBeTruthy();

        expect(body.ok).toBe(true);
        expect(body).toEqual({
            ok: expect.any(Boolean),
            uid: expect.any(String),
            name: expect.any(String),
            token: expect.any(String),
        });

        token = body.token;
    });

    test("fetchConToken debe de funcionar", async () => {
        localStorage.setItem("token", token);
        const resp = await fetchConToken("events/604659dd9bab0f0bf3b9aa90", {}, "DELETE");
        const body = await resp.json();

        expect(body).toEqual({ ok: false, msg: "El evento con ese id no existe" });
    });
});
