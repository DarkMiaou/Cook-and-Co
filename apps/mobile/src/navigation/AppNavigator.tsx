import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RecipesList from '../screens/RecipesList';
import RecipeDetail from '../screens/RecipeDetail';
import CreateRecipe from '../screens/CreateRecipe';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Recipes" component={RecipesList} />
            <Stack.Screen name="Detail"   component={RecipeDetail} />
            <Stack.Screen name="Create"   component={CreateRecipe} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login"  component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
