import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "dlpvgah6w",
    api_key: "574487484285149",
    api_secret: "ELoTvfPn28VlStm3CWdziNZms50",
});

describe("pruebas en fileUpload", () => {
    test("debe de cargar un archivo y retornar un URL", async () => {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        // capturar una imagen cualquiera y crear un BLOB
        const resp = await fetch(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png"
        );
        const blob = await resp.blob();

        // Crear un File y agregarle el blob. Ya tenemos una file creado
        const file = new File([blob], "foto.png");
        const url = await fileUpload(file);

        const newUrl = new URL(url);
        expect(typeof url).toBe("string");
        expect(regexp.test(newUrl)).toBe(true);

        // Borrar imagen por id
        const segments = url.split("/");
        const imageID = segments[segments.length - 1].replace(".png", "");

        await cloudinary.v2.api.delete_resources(imageID, {}, () => {
            console.log("img deleted");
        });
    });

    test("debe de retornar un error", async () => {
        const file = new File([], "foto.png");
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
