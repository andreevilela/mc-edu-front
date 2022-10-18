import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from './components/DocumentPicker';
import * as api from './services/Endpoints';

export default class editaPostagem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            open: false,
        }
        this.getDetalhesPostagem()
    }

    state = {
        setTituloPostagem: null,
        setDataEntrega: null,
        setDescPostagem: null,
        setDetalhes: null,
        setLoaded: false
    }

    getDetalhesPostagem = async () => {
        const postagem = await AsyncStorage.getItem("postagem");
        try {
            const detalhes = await api.getDetalhesPostagem(postagem).catch((error) => {
                console.log({ ...error })
            });
            //console.log(detalhes.data)
            this.setState({ setDetalhes: detalhes.data });
            this.setState({ setLoaded: true});
            const data = new Date(this.state.setDetalhes.dataEntrega)
            this.setState({ setDataEntrega: data});
            console.log("Date -> " + data)
            var link = [];
            this.state.setDetalhes.arquivos.map(it => link.push({ id: it.id, url: it.url }));
            //DocumentPicker.Document.setFiles(link);
            // await AsyncStorage.setItem("arquivos", JSON.stringify(link));
            //console.log("Link -> " + JSON.stringify(link));
            //console.log("CHAMA getDetalhesPostagem")
        } catch (e) {
            console.log("ERROR_GET_DETALHES_POSTAGEM");
            showError(e)
        }
    };

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
                { this.state.setLoaded && this.state.setDetalhes != null ?
                    <View>
                        <View style={{ padding: 15 }}>
                            <Text label>Título da Postagem:</Text>
                            <Input
                                placeholder="Título da Postagem"
                                style={{ fontSize: 16 }}
                                defaultValue={this.state.setDetalhes.titulo}
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
                                date={new Date(this.state.setDetalhes.dataEntrega)}
                                locale="pt"
                                onConfirm={(date) => {
                                    this.setState({ open: false })
                                    this.setState({ date: date })
                                    this.setState({ setDataEntrega: date })
                                }}
                                onCancel={() => {
                                    this.setState({ open: false })
                                }}
                                mode="date"
                                androidVariant='nativeAndroid'
                            />
                            <Text>{new Date(this.state.setDataEntrega).toString()}</Text>
                            <Text label style={{ paddingTop: 30 }}>Descrição:</Text>
                            <Input
                                placeholder="Descrição da Postagem"
                                style={{ fontSize: 16, height: 100 }}
                                defaultValue={this.state.setDetalhes.descricao}
                                onChangeText={value => {
                                    this.setState({ setDescPostagem: value });
                                }}
                                multiline={true} // Para preencher o texto verticalmente, no Android fica apenas no meio
                                scrollEnabled={true}
                            />
                            <Text label style={{ paddingTop: 15, paddingBottom: 15 }}>Arquivos:</Text>
                            <DocumentPicker />
                            {
                                // detalhes.arquivos != null ?
                                //     detalhes.arquivos.map(it =>
                                //         <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => alert(it.url)} key={it.url}>
                                //             <Text>{getName(it.url)}</Text>
                                //             <Icon
                                //                 name="delete-forever"
                                //                 color="#DC4C64"
                                //                 size={18}
                                //             />
                                //         </TouchableOpacity>)
                                // : <TouchableOpacity></TouchableOpacity>
                            }

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
                    </View>
                : <View></View>
                }

            </ScrollView>
        );
    }
}