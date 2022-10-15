import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default props => {
    const [entregas, setEntregas] = useState([null]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        AtividadesEntregues();
    }, [])

    const AtividadesEntregues = async () => {
        const postagem = await AsyncStorage.getItem("postagem")
        //console.log(turma)
        try {
            const entregas = await api.getAtividadesEntregues(postagem).catch((error) => {
                console.log({ ...error })
            });
            console.log(entregas.data)
            setEntregas(entregas.data)
            setLoaded(true)
        } catch (e) {
            console.log("ERROR_GET_INFO_TURMA");
            showError(e)
        }
    };

    function getName(uri) {
        console.log(uri)
        const begin = uri.indexOf("%2F") + 3;
        const end = uri.lastIndexOf("?") - 28;
        return uri.substring(begin, end);
    }

    return (
        <ScrollView>
        <View style={{ flex: 1, paddingRight: 15, paddingBottom: 15, paddingLeft: 15 }}>
            <View>
                {loaded && entregas != null ?
                    entregas.map(it =>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5, display: "flex", alignItems: "center" }} key={it.aluno.id}>
                                <Avatar
                                    rounded
                                    source={{ uri: "" + it.aluno.foto + "" }}
                                    size={"medium"}
                                />
                                <Text style={{ marginLeft: 5 }}>{it.aluno.nome.toUpperCase()}</Text>
                            </View>
                            {
                                it.arquivos.map(it => 
                                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => Linking.openURL(it.url)} key={it.url}>
                                        <Icon
                                            name="file-present"
                                            color="#14A44D"
                                            size={18}
                                        />
                                        <Text>{getName(it.url)}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                    : <View></View>
                }
            </View>
        </View>
        </ScrollView>

    );
}