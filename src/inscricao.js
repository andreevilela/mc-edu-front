import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default class inscricao extends Component {
    state = {
        setCodigoTurma: {},
    }

    // Entra na turma que teve o código digitado no input passando o ID do usuário(aluno) logado
    entrarTurma = async () => {
        var data = {
            codigo: this.state.setCodigoTurma, // Pega o texto que está no input
            alunos: [await AsyncStorage.getItem("id")] // Pega o ID do usuário (aluno) que está entrando na turma
        }
        try {
            console.log("START_JOIN_TURMA");
            console.log("CONSUMING_API_JOIN_TURMA"); // Está passando código da turma a se inscrever e o ID do usuário(aluno) que está se inscrevendo
            const createTurma = await api.joinTurma(data).catch((error) => {
                console.log({ ...error })
            });
            // console.log("RETURN_API_POST -> " + createTurma.data.id);
            this.props.navigation.push('Turmas'); // Push navega para o estado atualizado da página
            console.log("END_JOIN_TURMA");
        } catch (e) {
            console.log("ERROR_JOIN_TURMA");
            showError(e)
        }
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={{ padding: 10 }}>
                        <Text label style={{ padding: 10 }}>Digite o código da turma em que deseja entrar:</Text>
                        <Input
                            style={{ fontSize: 16, padding: 10 }}
                            onChangeText={value => {
                                this.setState({ setCodigoTurma: value });
                            }}
                            placeholder="Código da Turma"
                        />
                    </View>

                    <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                        <Button style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}
                            title="Entrar"
                            onPress={() => this.entrarTurma()}
                        />
                    </View>
                </View>
            </ScrollView>

        );

    }
}
