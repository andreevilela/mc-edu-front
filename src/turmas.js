import * as React from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import turmas from '../data/turmas'

export default props => {

    function getTurmaItem({ item }) {
        return (
            <ListItem bottomDivider onPress={() => props.navigation.navigate('Mural')}>
                <Avatar source={{ uri: item.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{'Prof. ' + item.professor}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    }

    return (
        <View>
            <FlatList
                keyExtractor={turma => turma.id.toString()}
                data={turmas}
                renderItem={getTurmaItem}
            />
        </View>
    );
}