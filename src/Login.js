import React from 'react';
import {
  Button,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends React.Component {
  onGoogleSignIn = (res) => {
    const user = res.getBasicProfile();
    console.log('google signIn success'); 
    this.props.handleGoogleSignIn(user);
  } 
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
            <br />
            <GoogleLogin
              clientId="624146639267-25kesoj2ju6t5hsk0o5otmpua3r2ecf7.apps.googleusercontent.com"
              buttonText="Use Google"
              onSuccess={ (response) => { this.onGoogleSignIn( response ) } }
              onFailure={ (response) => { console.log('google signIn failed', response); } }
              cookiePolicy={'single_host_origin'}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Login;
