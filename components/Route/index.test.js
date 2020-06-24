import React from 'react';
import { act } from 'react-dom/test-utils';
import Route from '.';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SET_ROUTE } from '../../reducers/router/constants';

const Stack = createStackNavigator();

describe('Route', () => {
    const routeProps = {
        navigation: {},
        Component: () => <div />
    };

    const MockedNavigator = ({Component, params = {}}) => {
        return (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MockedScreen"
                component={Component}
                initialParams={params}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
    };

    const RouteComponent = (
        <Provider store={store}>
            <MockedNavigator Component={() => <Route {...routeProps} />} />
        </Provider> 
    )

    it('renders correctly', async () => {
        let route;
        await act(async () => {
            route = shallow(RouteComponent);
        })
        expect(route).toMatchSnapshot();
    })

    it('dispatch called in componentDidMount', async () => {
        await act(async () => {
            mount(RouteComponent);
        })
        expect(store.dispatch).toHaveBeenCalledWith({
            type: SET_ROUTE,
            payload: { route: 'MockedScreen' }
        });
    })
})