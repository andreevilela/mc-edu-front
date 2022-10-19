import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
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
        setDetalhes: null,
        setTituloPostagem: null,
        setDataEntrega: null,
        setDescPostagem: null,
        setArquivos: null,
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
            this.setState({ setTituloPostagem: this.state.setDetalhes.titulo});
            this.setState({ setDataEntrega: new Date(this.state.setDetalhes.dataEntrega)});
            this.setState({ setDescPostagem: this.state.setDetalhes.descricao});
            var arquivos = [];
            this.state.setDetalhes.arquivos.map(it => arquivos.push({ id: it.id, url: it.url }));
            console.log("Arquivos ->" + arquivos)
            this.setState({ setArquivos: arquivos});
            this.setState({ setLoaded: true});
        } catch (e) {
            console.log("ERROR_GET_DETALHES_POSTAGEM");
            showError(e)
        }
    };

    alert(uri) {
        console.log("Alert -> " + uri)
        Alert.alert(
            "Atenção!",
            "Deseja remover arquivo?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => this.remove(uri) }
            ]
        );
    }

    remove(uri) {
        console.log("REMOVE1 -> " + JSON.stringify(this.state.setArquivos))
        var link = this.state.setArquivos.filter(it => it.url != uri)
        console.log("REMOVE2 -> " + JSON.stringify(link))
        //console.log("REMOVE3 -> " + link.map(it => it.id))
        console.log("Link -> " + link)
        this.setState({ setArquivos: link })
        //link != null ? this.setState({ setArquivos: link }) : this.setState({ setArquivos: [] })
    }

    getName(uri) {
        //console.log("getName ->" + uri)
        const begin = uri.indexOf("%2F") + 3;
        const end = uri.lastIndexOf("?") - 28;
        return uri.substring(begin, end);
    }

    async getFiles() {
        const docPicker = JSON.parse(await AsyncStorage.getItem("arquivos"));
        console.log("docPicker -> " + docPicker);
        const arquivos = this.state.setArquivos;
        console.log("arquivos -> " + arquivos);
        var result = "";
        if (docPicker != null && arquivos != "") {
            result = docPicker.concat(arquivos);
            console.log("1")
        } else if (docPicker != null) {
            result = docPicker;
            console.log("2")
        } else {
            result = arquivos;
            console.log("3")
        };
        console.log("result -> " + result)
        return result;
    }

    editPostagem = async () => {
        var data = {
            titulo: this.state.setTituloPostagem,
            usuario: await AsyncStorage.getItem("id"),
            turma: await AsyncStorage.getItem("turma"),
            dataEntrega: this.state.setDataEntrega,
            descricao: this.state.setDescPostagem,

            arquivos: await this.getFiles()
        }
        const postagem = await AsyncStorage.getItem("postagem");
        try {
            console.log("START_EDIT_POST");
            console.log("CONSUMING_API_EDIT_POST");
            console.log("DATA -> " + JSON.stringify(data));
            const createPost = await api.editPostagem(postagem, data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_EDIT_POST -> " + JSON.stringify(data));
            await AsyncStorage.removeItem("arquivos");
            Alert.alert("Alerta!","Alteração efetuada com sucesso.")
            this.props.navigation.push('Mural', data.turma);
            console.log("END_EDIT_POST");
        } catch (e) {
            console.log("ERROR_EDIT_POST");
            showError(e)
        }
    };

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
                            <Text>{new Date(this.state.setDataEntrega).toLocaleDateString()}</Text>
                            <Text label style={{ paddingTop: 30 }}>Descrição:</Text>
                            <Input
                                placeholder="Descrição da Postagem"
                                style={{ fontSize: 16, height: 100 }}
                                defaultValue={this.state.setDetalhes.descricao}
                                onChangeText={value => {
                                    this.setState({ setDescPostagem: value });
                                }}
                                multiline={true}
                                scrollEnabled={true}
                            />
                            <Text label style={{ paddingTop: 15, paddingBottom: 15 }}>Arquivos:</Text>
                            <DocumentPicker />
                            {
                                this.state.setArquivos != null ?
                                    this.state.setArquivos.map(it =>
                                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.alert(it.url)} key={it.url}>
                                            <Text>{this.getName(it.url)}</Text>
                                            <Icon
                                                name="delete-forever"
                                                color="#DC4C64"
                                                size={18}
                                            />
                                        </TouchableOpacity>)
                                : <TouchableOpacity></TouchableOpacity>
                            }

                        </View>

                        <View style={{ paddingHorizontal: 15, paddingTop: 20, paddingBottom: 30 }}>
                            <Button style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                            }}
                                title="Alterar"
                                onPress={() => this.editPostagem()}
                            />
                        </View>
                    </View>
                : <View></View>
                }

            </ScrollView>
        );
    }
}