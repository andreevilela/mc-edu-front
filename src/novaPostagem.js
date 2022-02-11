import * as React from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';

export default class novaPostagem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }

    selectDate = (date) => {
        this.setState({ date: date });
    }


    render() {
        return (

            <View style={{ flex: 1, padding: 15, alignItems: "center" }}>

                <Text h3>Nova Postagem</Text>

                <Text label>Título da Postagem:</Text>

                <Input
                    placeholder=""
                />

                <Text label>Data de Entrega:</Text>

                <Input
                    placeholder="Selecione a Data de Entrega"
                />

                <Text label>Descrição:</Text>

                <Input
                    placeholder=""
                />

                <Button
                    title="Salvar"
                    onPress={() => criar()}
                />

            </View>

        );
    }
}