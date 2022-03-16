import * as React from 'react';
import { Button } from 'react-native-elements';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker';
import { useEffect } from 'react';

export default function Document() {
    const [result, setResult] = React.useState<
        Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
    >()

    useEffect(() => {
        console.log(JSON.stringify(result, null, 2))
    }, [result])

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