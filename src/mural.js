import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './services/Endpoints';

export default props => {
  const [turma, setTurma] = useState(props.route.params ? props.route.params : {})
  //console.log("Turma -> " + turma.id)
  //console.log("Props -> " + props.route.params)

  const [postagens, setPostagens] = useState([null]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPostagensTurma();
  }, [])

  const getPostagensTurma = async () => {
    try {
      const postagens = await api.getPostagensTurma(turma.id != undefined ? turma.id : props.route.params).catch((error) => {
        console.log({ ...error })
      });
      //console.log(postagens.data)
      setPostagens(postagens.data)
      setLoaded(true)
      await AsyncStorage.setItem("turma", turma.id != undefined ? turma.id.toString() : props.route.params);
    } catch (e) {
      console.log("ERROR_GET_POSTAGENS");
      showError(e)
    }
  };

  function getPostagensItem({ item }) {
    return (
      <ListItem bottomDivider onPress={() => props.navigation.push('Detalhes', item)}>
        <Avatar source=
          {
            item.dataEntrega != null ?
              {
                uri: "https://cdn.pixabay.com/photo/2018/02/17/18/37/icon-3160555_960_720.png"
              } :
              {
                uri: "https://cdn.pixabay.com/photo/2013/07/12/19/27/question-mark-154789_960_720.png"
              }
          }
          size={"medium"}
        />
        <ListItem.Content>
          <ListItem.Title>{item.titulo}</ListItem.Title>
          <ListItem.Subtitle>
            {
              item.dataEntrega != null ?
                "Entrega: " + new Date(item.dataEntrega).toLocaleDateString() :
                ""
            }
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  }

  return (
    <View>
      {loaded && postagens != null ?
        <FlatList
          keyExtractor={postagens => postagens.id.toString()}
          data={postagens}
          renderItem={getPostagensItem}
        />
        : console.log("Carregando_Postagens")
      }
    </View>

  );
}