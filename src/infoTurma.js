import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default props => {
    const [infoTurma, setInfoTurma] = useState([null]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getInfoTurma();
    }, [])

    const getInfoTurma = async () => {
        const turma = await AsyncStorage.getItem("turma")
        //console.log(turma)
        try {
            const infoTurma = await api.getInfoTurma(turma).catch((error) => {
                console.log({ ...error })
            });
            //console.log(infoTurma.data)
            setInfoTurma(infoTurma.data)
            setLoaded(true)
        } catch (e) {
            console.log("ERROR_GET_INFO_TURMA");
            showError(e)
        }
    };

    return (
        <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ marginTop: 5, fontSize: 22, color: "#0073e6" }}>
                Professor(es)
            </Text>
            <Text style={{ marginBottom: 10, borderBottomColor: "#0073e6", borderBottomWidth: 1 }}></Text>

            <Text style={{  }}>
            {loaded && infoTurma != null ?
                infoTurma.professores.map(it =>
                    <Text key={it.id}>
                        <Avatar
                            rounded
                            source={{ uri: "" + it.foto + "" }}
                            size={"medium"}
                        />
                        <Text>{it.nome}</Text>
                    </Text>
                    
                )
                : <Text></Text>
            }
            </Text>
            <Text style={{ marginTop: 10, fontSize: 22, color: "#0073e6" }}>
                Aluno(s)
            </Text>
            <Text style={{ marginBottom: 10, borderBottomColor: "#0073e6", borderBottomWidth: 1 }}></Text>

            <Text style={{  }}>
                {loaded && infoTurma != null ?
                    infoTurma.alunos.map(it =>
                        <Text key={it.id}>
                            <Avatar
                                rounded
                                source={{ uri: "" + it.foto + "" }}
                                size={"medium"}
                            />
                            <Text>{it.nome}</Text>
                        </Text>
                    )
                    : <Text></Text>
                }
            </Text>
        </View>

    );
}