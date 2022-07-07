import React from 'react'
import { Button, Icon } from 'react-native-elements';
const Delete = () => {
  return (
    <Button
      type="clear"
      icon={<Icon name="delete" size={40} color="gray" />}
    />
  )
}
export default Delete