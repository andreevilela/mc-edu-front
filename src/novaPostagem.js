import * as React from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

export default class novaPostagem extends React.Component {
    state = {
        setTituloPostagem: {},
        setDataEntrega: {},
        setDescPostagem: {},
    }

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <Text h4>Nova Postagem</Text>
                    <Text label>Título da Postagem:</Text>
                    <Input
                        placeholder="Descrição da Postagem"
                        style={{ fontSize: 16 }}
                        onChangeText={value => {
                            this.setState({ setTituloPostagem: value });
                        }}
                    />
                    <Text label>Data de Entrega:</Text>
                    <Input
                        placeholder="Data de Entrega"
                        style={{ fontSize: 16 }}
                        onChangeText={value => {
                            this.setState({ setDataEntrega: value });
                        }}
                    />
                    <Text label>Descrição:</Text>
                    <Input
                        placeholder="Descrição da Postagem"
                        style={{ fontSize: 16 }}
                        onChangeText={value => {
                            this.setState({ setDescPostagem: value });
                        }}
                    />
                </View>

                <View style={{ paddingHorizontal: 40, paddingHorizontal: 20 }}>
                    <Button style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                        title="Salvar"
                        onPress={() => criarPostagem()}
                    />
                </View>
            </View>
        );
    }
}