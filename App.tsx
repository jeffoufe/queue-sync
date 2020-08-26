import React, { useEffect } from 'react';
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
  /*useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdns-files.dzcdn.net/js/min/dz.js";
    script.async = true;
    script.onload = () => {
      console.log(window.DZ);
    }
  
    document.body.appendChild(script);

  
    return () => {
      document.body.removeChild(script);
    }
  }, []); */

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
              {routes.map((route: { name: string, Component: React.Component }) => (
                <Stack.Screen name={route.name} key={route.name}>
                  {({ navigation }) => generateRouteComponent(navigation, route.Component)}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </PersistGate>
      <IconRegistry icons={EvaIconsPack} />
    </Provider>
  );
}
