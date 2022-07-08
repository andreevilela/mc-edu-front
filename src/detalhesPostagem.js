import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DocumentPicker from './components/DocumentPicker';
import * as api from './services/Endpoints';

export default props => {
    const [postagem, setPostagem] = useState(props.route.params ? props.route.params : {})
    //console.log(postagem.id)
    const [detalhes, setDetalhes] = useState([null]);

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
        } catch (e) {
            console.log("ERROR_GET_DETALHES_POSTAGEM");
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
            <Text label style={{ padding: 5, paddingTop: 35, paddingBottom: 15, fontSize: 16, color: "#0073e6" }}>Entregar</Text>
            <DocumentPicker />

            <View style={{ paddingTop: 45 }}>
                <Button style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
                    title="Enviar"
                    onPress={() => this.createPost()}
                />
            </View>
        </View>

    );
}