import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import { TouchableOpacity, Text, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Document() {
    const [result, setResult] = useState([])
    const [url, setUrl] = useState([])

    useEffect(() => {
        chooseFile()
    }, [result])

    function chooseFile() {
        console.log(result.map(it => it))
        result.map(it => RNFS.readFile(it.uri, 'base64').then(res => {
            //console.log("res -> " + res)
            saveItem(it, res)
        })
            .catch(err => {
                console.log(err.message, err.code);
            }));
    }

    async function saveItem(item, res) {
        const uploadTask = storage().ref(`allFiles/${item.name}`)
            .putString(res, 'base64', { contentType: item.type });

        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    url.push({ url: downloadURL, name: item.name });
                    console.log("URL -> " + url.map(it => it.name))
                });
            }
        );
        //await AsyncStorage.removeItem("arquivos");
        await AsyncStorage.setItem("arquivos", JSON.stringify(url));
    }

    function alert(uri) {
        Alert.alert(
            "Atenção!",
            "Deseja remover arquivo?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => remove(uri) }
            ]
        );
    }

    async function remove(uri) {
        url.splice(url.indexOf(uri), 1);
        //await AsyncStorage.removeItem("arquivos");
        await AsyncStorage.setItem("arquivos", JSON.stringify(url));
        const x = await AsyncStorage.getItem("arquivos");
        console.log(JSON.parse(x))
    }

    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    return (
        <View>
            <Button
                icon={{
                    name: "file-upload",
                    size: 25,
                    color: "#0073e6"
                }}
                title="Adicione arquivos"
                type="outline"
                onPress={() => {
                    DocumentPicker.pickMultiple().then(setResult).catch(handleError)
                }}
            />
            {
                url.length > 0 ?
                    url.map(it =>
                        <TouchableOpacity onPress={() => alert(it.url)}>
                            <Text>{it.name}</Text>
                        </TouchableOpacity>)
                    : <TouchableOpacity></TouchableOpacity>
            }
        </View>
    )
}