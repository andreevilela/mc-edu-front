import React, { Component } from 'react';
import axios from "axios";
import { View, StyleSheet, ToastAndroid, Button, Text, Image } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


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

            console.log("SET_TOKEN");
            //console.log(this.state.userGoogleInfo.idToken);
            axios.defaults.headers.common['Authorization'] = `bearer ${this.state.userGoogleInfo.idToken}`

            console.log("CALLING_REGISTRED");
            this.registered()
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


    registered = async () => {
        try {
            console.log("START_REGISTRED");
            console.log("CONSUMING_API");
            const existEmail = await axios.get(`http://192.168.100.103:8080/alunos/email/${this.state.userGoogleInfo.user.email}`)
            //const existEmail = (email) => { api.existsByEmail(this.state.userGoogleInfo.user.email).then() }
            console.log("RETURN_API -> " + existEmail.data);
            console.log("SIGN_IN_OR_SIGN_UP");
            existEmail.data ? this.props.navigation.navigate('Turmas') : this.signup()
            console.log("END_REGISTRED");
        } catch (e) {
            console.log("ERROR_REGISTRED");
            showError(e)
        }
    };

    signup = async () => {
        try {
            console.log("START_SIGN_UP");
            console.log("CONSUMING_API");
            await axios.post(`http://192.168.100.103:8080/alunos`, {
                nome: this.state.userGoogleInfo.user.name,
                email: this.state.userGoogleInfo.user.email,
                foto: this.state.userGoogleInfo.user.photo
            });
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