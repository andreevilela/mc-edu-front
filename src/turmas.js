import * as React from 'react';
import { Button, View, Text } from 'react-native';

export default ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Criar botão para adicionar nova turma</Text>
            <Text>Listar turmas do usuário</Text>
            <Button
                title="Turma A"
                onPress={() => navigation.navigate('Mural')}
            />
        </View>
    );
}