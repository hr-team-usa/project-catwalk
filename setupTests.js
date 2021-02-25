// Not totally sure where these go but I'm putting them here for now.
// https://enzymejs.github.io/enzyme/docs/installation/react-16.html

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test file
import { shallow, mount, render } from 'enzyme';