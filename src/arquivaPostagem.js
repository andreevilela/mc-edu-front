import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default class arquivaPostagem extends Component {

    constructor(props) {
        super(props);
        this.alert()
    }

    alert = async () => {
        const turma = await AsyncStorage.getItem("turma");
        Alert.alert(
            "Atenção!",
            "Deseja arquivar postagem?",
            [
                {
                    text: "Não",
                    onPress: () => this.props.navigation.push('Mural', turma),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => this.archivePostagem() }
            ]
        );
    }

    archivePostagem = async () => {
        const postagem = await AsyncStorage.getItem("postagem");
        const turma = await AsyncStorage.getItem("turma");
        try {
            console.log("START_ARCHIVE_POSTAGEM");
            console.log("CONSUMING_API_ARCHIVE_POSTAGEM");
            const archivePost = await api.archivePostagem(postagem).catch((error) => {
                console.log({ ...error })
            });
            //console.log("RETURN_API_ARCHIVE_POSTAGEM -> " + JSON.stringify(data));
            Alert.alert("Alerta!","Postagem arquivada com sucesso.")
            this.props.navigation.push('Mural', turma);
            console.log("END_ARCHIVE_POSTAGEM");
        } catch (e) {
            console.log("ERROR_ARCHIVE_POSTAGEM");
            showError(e)
        }
    };

    render() {
        return (
            <ScrollView>
            </ScrollView>
        );
    }
}