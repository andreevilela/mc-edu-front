import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

export default function Document() {
    const [result, setResult] = useState([])

    useEffect(() => {
        chooseFile()
    }, [result])

    function chooseFile() {
        console.log(result.map(it => it))
        result.map(it => RNFS.readFile(it.uri, 'base64').then(res => {
            console.log("res -> " + res)
        })
        .catch(err => {
            console.log(err.message, err.code);
        }));
    }

    function normalize(path) {
        const prefix = "content://";
        if(path.startsWith(prefix)) {
            path = path.substring(prefix.length);
            try {
                path = decodeURI(path);
            } catch (e) {

            } 
        }
        console.log("normalize -> " + path)
        return path
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