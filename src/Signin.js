import React from 'react';
import {
  Button,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

// const gsec = 'm_-2eChy0DHOoJzwA-R6YLh4';
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
              <Input placeholder="your@email"
                autoFocus
                type="email"
                value={this.props.email}
                onChange={e => this.props.setEmail(e.target.value)}/>
            </InputGroup>
            <br />
            <InputGroup>
              <Input placeholder="password"
                value={this.props.password1}
                onChange={e => this.props.setPassword1(e.target.value)}
                type="password"/>
            </InputGroup>
            <br />
            <InputGroup>
              <Input placeholder="password"
                value={this.props.password2}
                onChange={e => this.props.setPassword2(e.target.value)}
                type="password"/>
            </InputGroup>
            <br />
            <InputGroup>
              <Input placeholder="Full name"
                value={this.props.name}
                onChange={e => this.props.setName(e.target.value)}
                type="name"/>
            </InputGroup>
            <br />
            <Button block bsSize="large" color='danger' disabled={!this.props.validateSignin()}
              onClick={ e => this.props.handleSignIn() } type="submit">
              Sign In
            </Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default SignIn;
