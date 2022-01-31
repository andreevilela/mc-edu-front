import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from "./services/Endpoints"

export default props => {
    const [turmas, setTurmas] = useState([null]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getTurmas();
    }, [])

    const getTurmas = async () => {
        const id = await AsyncStorage.getItem("id");
        console.log("Id -> " + id)
        if (id) {
            try {
                const turmas = await api.getTurmasAluno(id).catch((error) => {
                    console.log({ ...error })
                });
                console.log(turmas.data)
                setTurmas(turmas.data)
                setLoaded(true)
            } catch (e) {
                console.log("ERROR_GET_TURMAS");
                showError(e)
            }
        } else {
            props.navigation.navigate('Entrar');
        }
    };


    function getTurmaItem({ item }) {
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('Mural')}>
                <Avatar source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png' }} size={'medium'} />
                <ListItem.Content>
                    <ListItem.Title>{item.nome}</ListItem.Title>
                    <ListItem.Subtitle>{'Prof. ' + item.professores.map(x => x.nome)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    }

    return (
        <View>
            {loaded && turmas != null ?
                <FlatList
                    keyExtractor={turma => turma.id.toString()}
                    data={turmas}
                    renderItem={getTurmaItem}
                />
                : console.log("Carregando")
            }
        </View>

    );
}