import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Criar botão para criar postagens</Text>
      <Text>Listar postagens da turma</Text>
      <Button
        title="Atividade 1"
        onPress={() => navigation.navigate('Detalhes')}
      />
    </View>
  );
}