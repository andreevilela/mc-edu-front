import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Listar postagens da turma</Text>
      <Button
        title="Atividade 1"
        onPress={() => props.navigation.navigate('Detalhes')}
      />
    </View>
  );
}