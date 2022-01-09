import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Turmas from './turmas'
import Mural from './mural'
import DetalhesPostagem from './detalhesPostagem'
import Perfil from './perfil'

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export default props => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Início">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Turmas" component={Turmas} />
            <SettingsStack.Screen name="Mural" component={Mural} />
            <SettingsStack.Screen name="Detalhes" component={DetalhesPostagem} />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Conta">
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Perfil" component={Perfil} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}