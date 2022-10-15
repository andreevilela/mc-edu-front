import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Turmas from './turmas';
import Mural from './mural';
import DetalhesPostagem from './detalhesPostagem';
import Perfil from './perfil';
import NovaTurma from './novaTurma';
import Inscricao from './inscricao';
import NovaPostagem from './novaPostagem';
import InfoTurma from './infoTurma';
import EditaPostagem from './editaPostagem';
import AtividadesEntregues from './atividadesEntregues';
import Entrar from './Auth';

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export default props => {

  const getEmail = async () => {
    const email = await AsyncStorage.getItem("email")
    console.log("Email -> " + email)
    return email.includes("estudante")
  };

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
                  headerBackVisible: false,
                  headerRight: () => (
                    <Button
                      onPress={async () => await getEmail() ?
                        navigation.push("Inscrição Turma") :
                        navigation.push("Nova Turma")}
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
                    <>
                      <Button
                        onPress={() => navigation.push("Info Turma")}
                        type="clear"
                        icon={<Icon name="info-outline" size={25} color="#3399ff" />}
                      />
                      <Button
                        onPress={() => navigation.push("Nova Postagem")}
                        type="clear"
                        icon={<Icon name="add-circle" size={40} color="gray" />}
                      />
                    </>
                  )
                }
              }}
            />
            <SettingsStack.Screen
              name="Detalhes"
              component={DetalhesPostagem}
              options={({ navigation }) => {
                return {
                  headerRight: () => (
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        onPress={() => navigation.push("Atividades Entregues")}
                        type="clear"
                        icon={<Icon name="info-outline" size={25} color="#3399ff" />}
                      />
                      <Button
                        onPress={() => navigation.navigate('Editar Postagem')}
                        type="clear"
                        icon={<Icon name="edit" size={25} color="#ffcc00" />}
                      />
                      <Button
                        onPress={() => deletePost()}
                        type="clear"
                        icon={<Icon name="archive" size={25} color="#e600e6" />}
                      />
                    </View>

                  )
                }
              }}
            />
            <SettingsStack.Screen
              name="Info Turma"
              component={InfoTurma}
              options={({ navigation }) => {
                return {
                  headerRight: () => (
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        onPress={() => navigation.navigate('Editar Postagem')}
                        type="clear"
                        icon={<Icon name="edit" size={25} color="#ffcc00" />}
                      />
                      <Button
                        onPress={() => deletePost()}
                        type="clear"
                        icon={<Icon name="archive" size={25} color="#e600e6" />}
                      />
                    </View>

                  )
                }
              }}
            />
            <SettingsStack.Screen name="Nova Turma" component={NovaTurma} />
            <SettingsStack.Screen name="Inscrição Turma" component={Inscricao} />
            <SettingsStack.Screen name="Nova Postagem" component={NovaPostagem} />
            <SettingsStack.Screen name="Atividades Entregues" component={AtividadesEntregues} />
            <SettingsStack.Screen name="Editar Postagem" component={EditaPostagem} />
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