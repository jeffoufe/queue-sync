import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { default as appTheme } from './theme.json';
import { mapping, Player, Route } from './components';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import * as eva from '@eva-design/eva';
import { routes } from './utils';

const Stack = createStackNavigator();

const generateRouteComponent = (navigation: any, Component: any) => (
  <Route navigation={navigation} Component={Component} />
)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApplicationProvider 
          {...eva} 
          theme={{ ...eva.light, ...appTheme }}
          customMapping={mapping}
        >
          <NavigationContainer>
            <Stack.Navigator headerMode='none'>
              {Object.keys(routes).map((route: string) => (
                <Stack.Screen name={route} key={route}>
                  {({ navigation }) => generateRouteComponent(navigation, routes[route])}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
            <Player />
          </NavigationContainer>
        </ApplicationProvider>
      </PersistGate>
      <IconRegistry icons={EvaIconsPack} />
    </Provider>
  );
}
