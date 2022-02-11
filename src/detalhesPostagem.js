import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import * as api from './services/Endpoints'

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
            <Text style={{ marginTop: 5, fontSize: 22, color: "#0066cc" }}>
                { detalhes.titulo }
            </Text>
            <Text style={{}}>
                {
                detalhes.dataEntrega != null ?
                    "Data de entrega: " + detalhes.dataEntrega.substr(0, 10).split("-").reverse().join("/") :
                    "Conteúdo"
                }
            </Text>
            <Text style={{ borderBottomColor: "#0066cc", borderBottomWidth: 1 }}></Text>
            <Text style={{ marginTop: 20 }}>
                { detalhes.descricao }
            </Text>
        </View>
    );
}