import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, Button, Text, Image } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints'

GoogleSignin.configure({
    webClientId: "403824723231-81fko73qi2ambcvu4coruuk0gtt1nu0a.apps.googleusercontent.com",
    offlineAccess: true, // if you want to access Google API on behalf 
});

export default class Auth extends Component {
    state = {
        userGoogleInfo: {},
        loaded: false
    }

    signIn = async () => {
        try {
            console.log("START_SIGN_IN");
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log({ userInfo });
            this.setState({
                userGoogleInfo: userInfo,
                loaded: true
            })
            //console.log(this.state.userGoogleInfo);

            //console.log("SET_TOKEN");
            //console.log(this.state.userGoogleInfo.idToken);
            //axios.defaults.headers.common['Authorization'] = `bearer ${this.state.userGoogleInfo.idToken}`

            //await AsyncStorage.setItem("id", this.state.userGoogleInfo.idToken);
            await AsyncStorage.setItem("id", this.state.userGoogleInfo.user.id);
            await AsyncStorage.setItem("email", this.state.userGoogleInfo.user.email);
            console.log(await AsyncStorage.getItem("id"));
            console.log(await AsyncStorage.getItem("email"));

            console.log("CALLING_SIGN_UP");
            this.signUp()
            console.log("END_SIGN_IN");

        } catch (error) {
            console.log({ error });
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("e 1");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("e 2");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("e 3");
            } else {
                console.log(error.message);
            }
        }
    };

    signUp = async () => {
        var data = {
            id: this.state.userGoogleInfo.user.id,
            nome: this.state.userGoogleInfo.user.name,
            email: this.state.userGoogleInfo.user.email,
            foto: this.state.userGoogleInfo.user.photo
        }
        try {
            console.log("START_SIGN_UP");
            console.log("CONSUMING_API_CREATE_USER");
            const signUp = await api.createUser(data).catch((error) => {
                console.log({ ...error })
            });
            console.log("RETURN_API_POST -> " + signUp.data.id);
            this.props.navigation.navigate('Turmas');
            console.log("END_SIGN_UP");
        } catch (e) {
            console.log("ERROR_SIGN_UP");
            showError(e)
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgb(0,55,151)" }}>
                <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/mc-edu-bb190.appspot.com/o/logo%20mc.png?alt=media&token=51faa885-7a78-4173-ad4d-159797080b74" }}
                    style={{ width: 300, height: 300 }}
                />
                <GoogleSigninButton
                    style={{ width: 250, height: 55 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.signIn}
                />
                {/*this.state.loaded ?
                    <View>
                        <Text>{this.state.userGoogleInfo.user.name}</Text>
                        <Text>{this.state.userGoogleInfo.user.email}</Text>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: this.state.userGoogleInfo.user.photo }}
                        />
                    </View>
                : <Text>Não conectado</Text>*/}
            </View>
        );
    }
}