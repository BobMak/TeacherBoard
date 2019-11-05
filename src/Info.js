import React from 'react';
import {
  Alert,
  Modal, ModalBody
} from 'reactstrap';
import { setTimeout } from 'timers';

class Info extends React.Component {
  componentDidMount(){
    console.log('alert timer started');
    setTimeout( this.props.onDismis, 3000 );
  }
  render(){
    return (
      <Modal isOpen={ this.props.visible } backdrop={false}>
        <Alert style={{height: "100%"}}>
          { this.props.text }
        </Alert>
      </Modal>
    )
  }
}

export default Info;
