import React from 'react';
import {shallow} from 'enzyme'
import GiftExpertApp from '../GifExpertApp';

describe('pruebas en <GifExpertApp/>', () => {

    test('comprobar que el componente se muestra correctamente', () => {
        
        const wrapper = shallow(<GiftExpertApp/>);

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de mostrar una lista de categorias', () => {
        
        const categories = ['One Punch', 'Dragon Ball'];
        const wrapper = shallow(<GiftExpertApp defaultCategories={categories}/>);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('GiftGrid').length).toBe(categories.length);

    });
    
    



});
