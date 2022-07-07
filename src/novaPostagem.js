import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from './components/DocumentPicker';
import * as api from './services/Endpoints';

export default class novaPostagem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            open: false,
        }
    }

    state = {
        setTituloPostagem: null,
        setDataEntrega: null,
        setDescPostagem: null,
    }

    // Realiza uma nova postagem na turma passando o ID da turma que está aberta e o ID do usuário(professor) logado
    createPost = async () => {
        var data = {
            titulo: this.state.setTituloPostagem, // Pega o texto que está no input de Título
            usuario: await AsyncStorage.getItem("id"), // Pega o ID do usuário (professor) que está entrando na turma
            turma: await AsyncStorage.getItem("turma"), // Pega o ID da turma que está aberta
            dataEntrega: this.state.setDataEntrega, // Pega o texto que está no input de Data de Entrega
            descricao: this.state.setDescPostagem, // Pega o texto que está no input de Descrição

            arquivos: JSON.parse(await AsyncStorage.getItem("arquivos"))
        }
        try {
            console.log("START_CREATE_POST");
            console.log("CONSUMING_API_CREATE_POST"); // Está passando todos os dados
            console.log("DATA -> " + JSON.stringify(data));
            const createPost = await api.createPost(data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_POST -> " + JSON.stringify(data));
            //await AsyncStorage.removeItem("arquivos");
            this.props.navigation.push('Mural', data.turma); // Push navega para o estado atualizado da página
            console.log("END_CREATE_POST");
        } catch (e) {
            console.log("ERROR_CREATE_POST");
            showError(e)
        }
    };

    converteLista = async () => {
        var jsonValue = JSON.parse(await AsyncStorage.getItem("arquivos"))
        //console.log("JSON ->" + jsonValue.map(it=> it.url))
        //var x = jsonValue.map(it=> it.url)
        return jsonValue
        /*if (jsonValue != null) {
            const arquivos = JSON.parse(jsonValue).map(it => it.value)
            console.log("Arquivos -> "+ arquivos)
            return arquivos
        }
        else return null;*/
    }

    render() {
        return (
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <Text label>Título da Postagem:</Text>
                    <Input
                        placeholder="Título da Postagem"
                        style={{ fontSize: 16 }}
                        onChangeText={value => {
                            this.setState({ setTituloPostagem: value });
                        }}
                    />
                    <Text label style={{ paddingBottom: 15 }}>Data de Entrega:</Text>
                    <Button
                        icon={{
                            name: "date-range",
                            size: 25,
                            color: "#0073e6"
                        }} title="Escolha uma data"
                        type="outline"
                        onPress={() => this.setState({ open: true })} />
                    <DatePicker
                        modal
                        open={this.state.open}
                        date={this.state.date}
                        // locale={pt - BR}
                        onConfirm={(date) => {
                            this.setState({ open: false })
                            this.setState({ date: date })
                            this.setState({ setDataEntrega: date })
                        }}
                        onCancel={() => {
                            this.setState({ open: false })
                            this.setState({ setDataEntrega: null })
                        }}
                        mode="date"
                        androidVariant='nativeAndroid' />
                    <Text label style={{ paddingTop: 30 }}>Descrição:</Text>
                    <Input
                        placeholder="Descrição da Postagem"
                        style={{ fontSize: 16, height: 100 }}
                        onChangeText={value => {
                            this.setState({ setDescPostagem: value });
                        }}
                        multiline={true} // Para preencher o texto verticalmente, no Android fica apenas no meio
                        scrollEnabled={true}
                    />
                    <Text label style={{ paddingTop: 15, paddingBottom: 15 }}>Arquivos:</Text>
                    <DocumentPicker />

                </View>

                <View style={{ paddingHorizontal: 15, paddingTop: 20, paddingBottom: 30 }}>
                    <Button style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                        title="Salvar"
                        onPress={() => this.createPost()}
                    />
                </View>
            </ScrollView>
        );
    }
}