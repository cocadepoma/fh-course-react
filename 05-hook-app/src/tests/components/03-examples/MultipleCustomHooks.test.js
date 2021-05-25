import { shallow } from "enzyme";
import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useCounter } from "../../../hooks/useCounter";
import { useFetch } from "../../../hooks/useFetch";
// Con jest.mock le introduciremos información para poder implementarlo
jest.mock("../../../hooks/useFetch");
jest.mock("../../../hooks/useCounter");

describe("Pruebas en <MultipleCustomHooks/>", () => {
    beforeEach(() => {
        useCounter.mockReturnValue({
            counter: 10,
            increment: () => {},
            decrement: () => {},
        });
    });
    test("debe de mostrarse correctamente", () => {
        // Le damos un estado inicial al useFetch
        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });
        const wrapper = shallow(<MultipleCustomHooks />);

        expect(wrapper).toMatchSnapshot();
    });
    test("debe de mostrar la información correctamente", () => {
        useFetch.mockReturnValue({
            data: [{ author: "Paco", quote: "Pruebas unitarias" }],
            loading: false,
            error: null,
        });
        const wrapper = shallow(<MultipleCustomHooks />);
        //expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert").exists()).toBe(false);
        expect(wrapper.find(".parrafo").text().trim()).toBe("Pruebas unitarias");
        expect(wrapper.find(".blockquote-footer").text().trim()).toBe("Paco");
    });
});
