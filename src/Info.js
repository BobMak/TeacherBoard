import React from 'react';
import {
  Alert,
  Modal, ModalBody
} from 'reactstrap';
import { setTimeout } from 'timers';
import { type } from 'os';

class Info extends React.Component {
  render(){
    return (
      <Modal isOpen={ this.props.visible } backdrop={false}>
        <Alert color={ this.props.typeInfo } style={{marginBottom: "0px"}}>
          { this.props.text }
        </Alert>
      </Modal>
    )
  }
}

export default Info;
