import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import DocumentPicker from './components/DocumentPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default props => {
    const [postagem, setPostagem] = useState(props.route.params ? props.route.params : {})
    //console.log(postagem.id)
    const [detalhes, setDetalhes] = useState([null]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getDetalhesPostagem();
    }, [])

    const getDetalhesPostagem = async () => {
        try {
            const detalhes = await api.getDetalhesPostagem(postagem.id).catch((error) => {
                console.log({ ...error })
            });
            //console.log(detalhes.data)
            setDetalhes(detalhes.data)
            setLoaded(true)
        } catch (e) {
            console.log("ERROR_GET_DETALHES_POSTAGEM");
            showError(e)
        }
    };

    function getName(uri) {
        console.log(uri)
        const begin = uri.indexOf("%2F") + 3;
        const end = uri.lastIndexOf("?") - 28;
        return uri.substring(begin, end);
    }

    deliverPost = async () => {
        const turma = await AsyncStorage.getItem("turma")
        var data = {
            postagem: postagem.id,
            aluno: await AsyncStorage.getItem("id"),

            arquivos: JSON.parse(await AsyncStorage.getItem("arquivos"))
        }
        try {
            console.log("START_DELIVER_POST");
            console.log("CONSUMING_API_DELIVER_POST");
            console.log("DATA -> " + JSON.stringify(data));
            const deliverPost = await api.deliverPost(data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_DELIVER_POST -> " + JSON.stringify(data));
            //await AsyncStorage.removeItem("arquivos");
            Alert.alert("Alerta!","Entrega efetuada com sucesso.")
            props.navigation.push('Mural', turma);
            console.log("END_DELIVER_POST");
        } catch (e) {
            console.log("ERROR_DELIVER_POST");
            showError(e)
        }
    };

    return (
        <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ marginTop: 5, fontSize: 22, color: "#0073e6" }}>
                {detalhes.titulo}
            </Text>
            <Text style={{}}>
                {
                    detalhes.dataEntrega != null ?
                        "Data de entrega: " + detalhes.dataEntrega.substr(0, 10).split("-").reverse().join("/") :
                        "Conteúdo"
                }
            </Text>
            <Text style={{ borderBottomColor: "#0073e6", borderBottomWidth: 1 }}></Text>
            <Text style={{ marginTop: 20 }}>
                {detalhes.descricao}
            </Text>
            <View style={{ marginTop: 20 }}>
                {loaded && detalhes != null ?
                    detalhes.arquivos.map(it =>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => Linking.openURL(it.url)} key={it.url}>
                            <Icon
                                name="file-present"
                                color="#14A44D"
                                size={18}
                            />
                            <Text>{getName(it.url)}</Text>
                        </TouchableOpacity>)
                    : <TouchableOpacity></TouchableOpacity>
                }
            </View>
            <Text label style={{ padding: 5, paddingTop: 35, paddingBottom: 15, fontSize: 16, color: "#0073e6" }}>
                Entregar
            </Text>
            <DocumentPicker />

            <View style={{ paddingTop: 45 }}>
                <Button style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
                    title="Enviar"
                    onPress={() => this.deliverPost()}
                />
            </View>
        </View>

    );
}