import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreCats from './src/store/StoreCats';
import HomeScreen from './src/screens/HomeScreen';
import AddCat from './src/screens/AddCat';
import EditCat from './src/screens/EditCat';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  const store = configureStore({
    reducer: {
      StoreCats,
    },
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerStyle: { backgroundColor: '#ec1149' } }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Add Cat" component={AddCat} />
          <Stack.Screen name="Edit Cat" component={EditCat} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;