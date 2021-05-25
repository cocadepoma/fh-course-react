
import { useFetchGifs } from '../../hooks/useFetchGifs';
// npm install --save-dev @testing-library/react-hooks, importamos renderHook
import { renderHook } from '@testing-library/react-hooks';

describe('Pruebas en el hook useFetchGifs', () => {

    // Forma de probar Custom HOOKS
    test('debe de retornar el estado inicial', async () => {

        // const { data, loading } = useFetchGifs('One punch ');
        // mediante el renderHook podemos usar nuestro Hook, el objeto result.current tiene los datos
        const { result, waitForNextUpdate } = renderHook(() => useFetchGifs('One punch'));
        const { data, loading } = result.current;
        await waitForNextUpdate();

        expect(data).toEqual([]);
        expect(loading).toBeTruthy();

    });

    test('debe de retornar un array de imágenes y el loading en false', async () => {

        const { result, waitForNextUpdate } = renderHook(() => useFetchGifs('One punch'));

        await waitForNextUpdate();

        const { data, loading } = result.current;

        expect(data.length).toBe(10);
        expect(loading).toBeFalsy();



    });


})
