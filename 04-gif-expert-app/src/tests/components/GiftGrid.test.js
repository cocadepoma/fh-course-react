import React from "react";
import '@testing-library/jest-dom';
import { shallow } from "enzyme";
import { GiftGrid } from "../../components/GiftGrid";
import { useFetchGifs } from "../../hooks/useFetchGifs";
// para fingir llamadas a ese archivo
jest.mock('../../hooks/useFetchGifs');

describe("pruebas en el componente <GiftGrid/>", () => {

    const category = "zombies";

    test("debe de mostrarse correctamente", () => {

        // Esperamos que el componente se encuentre así de inicio
        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        });

        const wrapper = shallow(<GiftGrid category={category} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar items cuando se cargan imágenes useFetchGifts', ()=>{
        
        const gifs = [{
            id: 'ABC',
            url: 'https://localhost/loquesea',
            title: 'lo que sea'
        },{
            id: 'ABC2',
            url: 'https://localhost/loquesea',
            title: 'lo que sea'
        }];
        
        // Esperamos que el componente cambie así, despues de un fetch
        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        });
        
        const wrapper = shallow(<GiftGrid category={category} />);
        // El párrafo de Loading no debe de existir
        expect(wrapper.find('p').exists()).toBe(false);
        // El array de GridItems debe de ser = a la longitud del array que le pasamos
        expect(wrapper.find('GiftGridItem').length).toBe(gifs.length)
        //expect(wrapper).toMatchSnapshot();
    });
});
