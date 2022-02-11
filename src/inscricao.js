import * as React from 'react';
import { View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';

export default class inscricao extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('Inscrição realizada com sucesso!');
        event.preventDefault();
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 15, alignItems: "center" }}>

                <Text h3>Inscrição em Nova Turma</Text>
                <Text label>Digite o código da turma em que deseja entrar:</Text>

                <Input
                    placeholder="Código da Turma"
                />

                <Button
                    title="Entrar"
                    onPress={() => entrar()}
                />

            </View>

        );

    }
}
