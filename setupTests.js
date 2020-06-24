import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

enzyme.configure({ adapter: new Adapter() });

// test setup with JSDOM
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);
const store = mockStore({});
store.dispatch = jest.fn();

global.window = window;
global.document = window.document;
global.store = store;