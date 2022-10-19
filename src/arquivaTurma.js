import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default class arquivaTurma extends Component {

    constructor(props) {
        super(props);
        this.alert()
    }

    alert = async () => {
        const turma = await AsyncStorage.getItem("turma");
        Alert.alert(
            "Atenção!",
            "Deseja arquivar turma?",
            [
                {
                    text: "Não",
                    onPress: () => this.props.navigation.push('Turmas'),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => this.archivePostagem() }
            ]
        );
    }

    archivePostagem = async () => {
        const turma = await AsyncStorage.getItem("turma");
        try {
            console.log("START_ARCHIVE_TURMA");
            console.log("CONSUMING_API_ARCHIVE_TURMA");
            const archivePost = await api.archiveTurma(turma).catch((error) => {
                console.log({ ...error })
            });
            //console.log("RETURN_API_ARCHIVE_TURMA -> " + JSON.stringify(data));
            Alert.alert("Alerta!","Turma arquivada com sucesso.")
            this.props.navigation.push('Turmas');
            console.log("END_ARCHIVE_TURMA");
        } catch (e) {
            console.log("ERROR_ARCHIVE_TURMA");
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