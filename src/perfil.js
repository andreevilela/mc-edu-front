import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints'
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: "403824723231-81fko73qi2ambcvu4coruuk0gtt1nu0a.apps.googleusercontent.com",
    offlineAccess: true, // if you want to access Google API on behalf 
});

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

    signOut = async () => {
        try {
            console.log("START_SIGN_OUT");
            await GoogleSignin.revokeAccess();
            console.log("REVOKE_ACCESS_OK");
            await GoogleSignin.signOut();
            console.log("SIGN_OUT_OK");
            props.navigation.navigate('Entrar');
            console.log("END_SIGN_OUT");
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <View>
            <View style={{ padding: 15, alignItems: "center" }}>
                <Avatar
                    rounded
                    source={{ uri: "" + usuario.foto + "" }}
                    size={"large"}
                />
                <Text style={{ marginTop: 15, fontSize: 22, fontWeight: "bold" }}>
                    {usuario.nome}
                </Text>
                <Text >{usuario.email}</Text>
            </View>

            <View style={{ paddingHorizontal: 40, paddingHorizontal: 20 }}>
                <Button style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
                    title="Sair da Conta"
                    onPress={() => this.signOut()}
                />
            </View>
        </View>
    );
}