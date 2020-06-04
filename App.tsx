import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { default as appTheme } from './theme.json';
import { mapping } from './components';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import * as eva from '@eva-design/eva';

import { Home, Settings } from './pages';

const Stack = createStackNavigator();

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
              <Stack.Screen name='Home' component={Home}/>
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </PersistGate>
      <IconRegistry icons={EvaIconsPack} />
    </Provider>
  );
}
