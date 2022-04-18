import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import DocumentPicker, {
    isInProgress
} from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';

export default function Document() {
    const [result, setResult] = useState([])

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
            .putString(res, 'base64', {contentType: item.type});
        
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
                });
            }
        );
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
    )
}