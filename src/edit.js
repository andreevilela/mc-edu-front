import React from 'react'
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Edit({ navigation }) {
  return (
    <Button
      onPress={() => navigation.navigate('Editar Postagem')}
      type="clear"
      icon={<Icon name="edit" size={40} color="gray" />}
    />
  )
}
export default Edit