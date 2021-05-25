import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));


// Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)
// Se soluciona igualando a una función vacía
HTMLCanvasElement.prototype.getContext = () => { };