import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuPrincipal from './src/menuPrincipal'

export default props => {
  return (
    <NavigationContainer>
      <MenuPrincipal />
    </NavigationContainer>
  );
}