import React, { useState, useEffect, Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import * as api from './services/Endpoints';

/* export default class Delete extends Component {

 constructor(props) {
  const [postagem, setPostagem] = useState(props.route.params ? props.route.params : {})

  useEffect(() => {
    deletePost();
  }, [])

  const deletePost = async () => {
    try {
      const deletePostagem = await api.deletePost(postagem.id).catch((error) => {
        console.log({ ...error })
      });
      this.props.navigation.push('Mural');
    } catch (e) {
      console.log("ERROR_DELETE_POSTAGEM");
      showError(e)
    } 
 }; */

const Delete = () => {

  return (
    <Button
      onPress={() => deletePost()}
      type="clear"
      icon={<Icon name="delete" size={40} color="gray" />}
    />
  )
}

export default Delete
  // }
// }