import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default class editaTurma extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            open: false,
        }
        this.getTurma()
    }

    state = {
        setTurma: null,
        setLoaded: false,
        setNomeTurma: {}
    }

    getTurma = async () => {
        const turmaId = await AsyncStorage.getItem("turma");
        //console.log("Turma Id -> " + turmaId);
        try {
            const turma = await api.getInfoTurma(turmaId).catch((error) => {
                console.log({ ...error })
            });
            //console.log("DATA -> " + JSON.stringify(turma.data));
            this.setState({ setTurma: turma.data });
            this.setState({ setLoaded: true});
        } catch (e) {
            console.log("ERROR_GET_TURMA");
            showError(e)
        }
    };

    editTurma = async () => {
        var data = {
            nome: this.state.setNomeTurma,
            professores: this.state.setTurma.professores.map(it => it. id)
        }
        const turmaId = await AsyncStorage.getItem("turma");
        try {
            console.log("START_EDIT_TURMA");
            console.log("CONSUMING_API_EDIT_TURMA");
            console.log("DATA -> " + JSON.stringify(data));
            const createPost = await api.editTurma(turmaId, data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_EDIT_TURMA -> " + JSON.stringify(data));
            Alert.alert("Alerta!","Alteração efetuada com sucesso.")
            this.props.navigation.push('Turmas');
            console.log("END_EDIT_TURMA");
        } catch (e) {
            console.log("ERROR_EDIT_TURMA");
            showError(e)
        }
    };

    render() {
        return (
            <ScrollView>
                { this.state.setLoaded && this.state.setTurma != null ?
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text label style={{ padding: 10 }}>Nome da Turma:</Text>
                            <Input
                                style={{ fontSize: 16, padding: 10 }}
                                defaultValue={this.state.setTurma.nome}
                                onChangeText={value => {
                                    this.setState({ setNomeTurma: value });
                                }}
                                placeholder="Nome da Turma"
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                            <Button style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                            }}
                                title="Alterar"
                                onPress={() => this.editTurma()}
                            />
                        </View>
                    </View>
                : <View></View>
                }
            </ScrollView>
        );
    }
}