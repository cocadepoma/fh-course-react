import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { GiftGridItem } from "../../components/GiftGridItem";

describe("componente <GiftGridItem>", () => {
    const title = "gif de prueba";
    const url =
        "https://media2.giphy.com/media/VXJWhaO7afRe/giphy.gif?cid=05b050dfqw4732v9ots1n8gu46zle3j89wwcn76qa7mmwwh5&rid=giphy.gif";

    const wrapper = shallow(<GiftGridItem title={title} url={url} />);
    test("debe de mostrar el componente correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de tener un párrafo con el title", () => {
        const p = wrapper.find("p");
        expect(p.text().trim()).toBe(title);
    });
    test("debe de tener la imagen igual al url y alt de los props", () => {
        const img = wrapper.find("img");
        expect(img.prop("src")).toBe(url);
        expect(img.prop("alt")).toBe(title);
        // expect(img.props().src).toBe(url);
        // expect(img.props().alt).toBe(title);
    });

    test("debe de tener animate__fadeIn", () => {
        const div = wrapper.find("div");
        expect(div.hasClass("animate__fadeIn")).toBe(true);
    });
});
