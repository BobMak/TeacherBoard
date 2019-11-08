import React, { useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class Profile extends React.Component {
  render(){
    return (
      <div>
        <Modal isOpen={ this.props.opAccDelete }>
        <ModalHeader>
          { "Type 'delete' to confirm" }
        </ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder=""
              autoFocus
              value={this.props.safeDelete}
              onChange={e => this.props.setSafe(e.target.value)}/>
          </InputGroup>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button onClick={ this.props.hideAccDelete } style={{display: "inline-block"}}>{ "Cancel" }</Button>
          <Button onClick={ this.props.deleteSelf } disabled={ (this.props.safeDelete!="delete") } style={{float: "right"}} color={"danger"}>{ "Delete" }</Button>
        </ModalFooter>
      </Modal>
        <Card>
          <CardHeader>{ "Profile" }</CardHeader>
          <CardBody>
            <div display={'inline-block'}>
              { "Email: " + this.props.email }
            </div>
            <br/>
            <div display={'inline-block'}>
              { "Name: " + this.props.fullName }
              <Button style={{float: "right"}}>{ 'edit' }</Button>
            </div>
            <br/>
            <Button onClick={ this.props.showAccDelete }>{ "Delete Account" }</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Profile;
