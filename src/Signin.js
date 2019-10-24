import React from 'react';
import {
  Button,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class SignIn extends React.Component {
  render(){
    return (
      <div className="SignIn">
        <Modal isOpen={ true } className={'className'}>
          <ModalHeader><text display='inline-block'>Sign In</text>
            <Button display='inline-block' border-right='10px' color='link' onClick={ e => this.props.handleLogIn(e) }>
              Login
            </Button>
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="email"
                autoFocus
                type="email"
                value={this.props.email}
                onChange={e => this.props.setEmail(e.target.value)}/>
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="password"
                value={this.props.password}
                onChange={e => this.props.setPassword(e.target.value)}
                type="password"/>
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="password"
                value={this.props.password}
                onChange={e => this.props.setPassword(e.target.value)}
                type="password"/>
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="Full name"
                value={this.props.password}
                onChange={e => this.props.setPassword(e.target.value)}
                type="password"/>
            </InputGroup>
            <br />
            <Button block bsSize="large" color='danger' disabled={!this.props.validateForm()}
              onClick={ e => this.props.handleSignIn(e) } type="submit">
              Sign In
            </Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default SignIn;
