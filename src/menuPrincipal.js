import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from 'react-native-elements';

import Turmas from './turmas';
import Mural from './mural';
import DetalhesPostagem from './detalhesPostagem';
import Perfil from './perfil';
import NovaTurma from './novaTurma';
import Inscricao from './inscricao';
import NovaPostagem from './novaPostagem';
import Entrar from './Auth'

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export default props => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Início"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="school" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Entrar" component={Entrar} />
            <SettingsStack.Screen
              name="Turmas"
              component={Turmas}
              options={({ navigation }) => {
                return {
                  headerLeft: () => (
                    <Button
                      onPress={() => navigation.navigate("Nova Turma")}
                      type="clear"
                      icon={<Icon name="add-circle" size={40} color="black" />}
                    />
                  ),
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate("Inscrição Turma")}
                      type="clear"
                      icon={<Icon name="add-circle" size={40} color="gray" />}
                    />
                  )
                }
              }}
            />
            <SettingsStack.Screen
              name="Mural"
              component={Mural}
              options={({ navigation }) => {
                return {
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate("Nova Postagem")}
                      type="clear"
                      icon={<Icon name="add-circle" size={40} color="gray" />}
                    />
                  )
                }
              }}
            />
            <SettingsStack.Screen name="Detalhes" component={DetalhesPostagem} />
            <SettingsStack.Screen name="Nova Turma" component={NovaTurma} />
            <SettingsStack.Screen name="Inscrição Turma" component={Inscricao} />
            <SettingsStack.Screen name="Nova Postagem" component={NovaPostagem} />
          </SettingsStack.Navigator>
        )}

      </Tab.Screen>
      <Tab.Screen name="Conta"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Perfil" component={Perfil} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}