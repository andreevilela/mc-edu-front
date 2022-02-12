import * as React from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints'

export default class novaPostagem extends React.Component {
    state = {
        setTituloPostagem: {},
        setDataEntrega: {},
        setDescPostagem: {},
    }

    // Realiza uma nova postagem na turma passando o ID da turma que está aberta e o ID do usuário(professor) logado
    createPost = async () => {
        var data = {
            titulo: this.state.setTituloPostagem, // Pega o texto que está no input de Título
            // Ver se passa entre [] ou não
            usuario: await AsyncStorage.getItem("id"), // Pega o ID do usuário (professor) que está entrando na turma
            // Ver se passa entre [] ou não e como vai salvar o ID da turma aberta para puxar aqui
            turma: await AsyncStorage.getItem("turma"), // Pega o ID da turma que está aberta
            // Implementar Date-Picker
            dataEntrega: this.state.setDataEntrega, // Pega o texto que está no input de Data de Entrega
            descricao: this.state.setDescPostagem, // Pega o texto que está no input de Descrição

            arquivos: [null]
        }
        try {
            console.log("START_CREATE_POST");
            console.log("CONSUMING_API_CREATE_POST"); // Está passando todos os dados
            const createPost = await api.createPost(data).catch((error) => {
                console.log({ ...error })
            });
            // console.log("RETURN_API_POST -> " + createPost.data.id);
            this.props.navigation.push('Mural'); // Push navega para o estado atualizado da página
            console.log("END_CREATE_POST");
        } catch (e) {
            console.log("ERROR_CREATE_POST");
            showError(e)
        }
    };

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <Text h4>Nova Postagem</Text>
                    <Text label>Título da Postagem:</Text>
                    <Input
                        placeholder="Título da Postagem"
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
                        onPress={() => this.createPost()}
                    />
                </View>
            </View>
        );
    }
}