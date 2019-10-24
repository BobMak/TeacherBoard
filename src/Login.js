import React from 'react';
import {
  Button,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class Login extends React.Component {
  // Props:
  // login = () => parent.setState( { email: ..., passwod: ..., } )
  render(){
    return (
      <div className="Login">
        <Modal isOpen={ true } className={'className'}>
          <ModalHeader>{ 'Login' }</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="username"
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
            <Button block bsSize="large" disabled={!this.props.validateForm()} onClick={ e => this.props.handleLogIn(e) } type="submit">
              Login
            </Button>
            <Button block bsSize="large" color='danger'
              onClick={ e => this.props.handleSignIn(e) } type="submit">
              Sign In
            </Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Login;
