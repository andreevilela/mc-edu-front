import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuPrincipal from './src/menuPrincipal';
import Auth from './src/Auth'

export default props => {
  return (
    <NavigationContainer>
      <MenuPrincipal />
    </NavigationContainer>
  );
}