import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints'

export default props => {
    const [usuario, setUsuario] = useState([null]);

    useEffect(() => {
        getUsuario();
    }, [])

    const getUsuario = async () => {
        try {
            const id = await AsyncStorage.getItem("id");
            //console.log("Id -> " + id)
            const usuario = await api.getUsuario(id).catch((error) => {
                console.log({ ...error })
            });
            //console.log(usuario.data)
            setUsuario(usuario.data)
        } catch (e) {
            console.log("ERROR_GET_USUARIO");
            showError(e)
        }
    };

    return (
        <View style={{ flex: 1, padding: 15, alignItems: "center" }}>
            <Avatar 
                rounded 
                source={{ uri: "" + usuario.foto + "" }} 
                size={"large"} 
            />
            <Text style={{ marginTop: 15, fontSize: 22, fontWeight: "bold" }}>
                { usuario.nome }
            </Text>
            <Text >{ usuario.email }</Text>
        </View>
    );
}