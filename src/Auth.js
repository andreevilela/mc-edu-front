import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, Button, Text, Image } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import * as api from "./services/Endpoints"


GoogleSignin.configure({
    webClientId: '403824723231-81fko73qi2ambcvu4coruuk0gtt1nu0a.apps.googleusercontent.com',
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

            console.log("CALLING_REGISTRED");
            this.signup()
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


    /*registered = async () => {
        try {
            console.log("START_REGISTRED");
            console.log("CONSUMING_API_GET");
            const userBanco = await api.get(this.state.userGoogleInfo.user.email).catch((error) => {
                console.log({ ...error })
                console.log("CALLING_SIGN_UP");
                this.signup()
            });
            if (userBanco !== undefined) console.log("RETURN_API_GET -> " + userBanco.data.id);
            console.log("SIGN_IN_SUCCESS");
            this.props.navigation.navigate('Turmas')
            console.log("END_REGISTRED");
        } catch (e) {
            console.log("ERROR_REGISTRED");
            showError(e)
        }
    };*/


    signup = async () => {
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }}
                    style={{ width: 200, height: 200, marginBottom: 100 }}
                />
                <GoogleSigninButton
                    style={{ width: 222, height: 55 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
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