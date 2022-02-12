import * as React from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints'

export default class novaTurma extends React.Component {
    state = {
        setNomeTurma: {},
    }

    // Cria a turma passando o nome preenchido no input e ID do usuário(professor) que criou, retorna ID da turma e código para inscrição na mesma
    criarTurma = async () => {
        var data = {
            nome: this.state.setNomeTurma, // Pega o texto que está no input
            professores: [await AsyncStorage.getItem("id")] // Pega o ID do usuário (professor) que está criando a turma
        }
        try {
            console.log("START_CREATE_TURMA");
            console.log("CONSUMING_API_CREATE_TURMA"); // Está passando nome e ID do usuário(professor) que cria a turma
            const createTurma = await api.createNewTurma(data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_POST -> " + createTurma.data.id);
            this.props.navigation.push('Turmas'); // Push navega para o estado atualizado da página
            console.log("END_CREATE_TURMA");
        } catch (e) {
            console.log("ERROR_CREATE_TURMA");
            showError(e)
        }
    };

    render() {
        return (
            <View>

                <View style={{ padding: 20 }}>
                    <Text h4>Nova Turma</Text>
                    <Text label>Digite o nome da turma a ser criada:</Text>

                    <Input
                        style={{ fontSize: 16 }}
                        onChangeText={value => {
                            this.setState({ setNomeTurma: value });
                        }}
                        placeholder="Nome da Turma"
                    />
                </View>

                <View style={{ paddingHorizontal: 40, paddingHorizontal: 20 }}>
                    <Button style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                        title="Criar"
                        onPress={() => this.criarTurma()}
                    />
                </View>

            </View>

        );

    }
}