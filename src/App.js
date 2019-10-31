import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Collapse,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {
  Calendar,
  momentLocalizer } from  'react-big-calendar'
import moment from 'moment'
import { GoogleLogout } from 'react-google-login';

import Login from './Login';
import SignIn from './Signin';
// a localizer for BigCalendar
require('react-big-calendar/lib/css/react-big-calendar.css')
// var BigCalendar = require('react-big-calendar')
var localizer = momentLocalizer(moment)
// var Dispatcher = require('flux').Dispatcher;
// var assign = require('object-assign');
// var d = new Dispatcher();
const HOST = "http://52.15.223.49:5000/"
// const HOST = "http://13.58.137.105:3000/"
// const HOST = "http://localhost:5000/"

async function post (addr, data) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  };
  const res = await fetch(HOST+addr, options);
  return await res.json();
}

async function get (addr) {
  const res = await fetch(HOST+addr, { mode: "cors" });
  const bod = await res.json();
  return bod;
}

class Header extends React.Component {
  render() {
    return (
      <div position="fixed" top="0" left="0" width="100%">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TeacherBoard</NavbarBrand>
          <NavbarToggler onClick={ this.props.toggle } />
          <Collapse isOpen={ this.props.isOpen } navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "a@",
      password: "tea",
      page: "Login",
      modal: false,
      currTitle: "",
      currEvent: null, // The event currently modified in the modal
      oldEvent: null,  // To find index in events on change
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ],
      isOpen: false
    };
  }
  componentDidMount = async () => {
    // this.handleLogIn();
    console.log('logging');
  }
  getEeventName = e => {
    console.log('logging', this.state.currEvent.title);
    return this.state.currEvent.title
  }
  editEvent = (event, e) => {
    console.log('yes', event, e);
    this.setState({
      currTitle: event.title,
      currEvent: event,
      oldEvent: event,
      modal: !this.state.modal });
  }
  saveEditEvent = e => {
    var index = this.state.events.indexOf(this.state.oldEvent)
    var evs = this.state.events
    evs[index] = this.state.currEvent
    console.log('old event index', index);
    this.setState({
      currEvent: null,
      oldEvent: null,
      modal: !this.state.modal,
      events: evs });
  }
  exitEdit = e => {
    this.setState({
      currEvent: null,
      oldEvent: null,
      modal: !this.state.modal });
  }
  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleLogIn = async (event) => {
    const data = { login: this.state.email, password: this.state.password };
    const body = await post('login', data);
    console.log(body);
    if (body.data == 0) {
      this.setState({ page: "Dashboard" })
    }
    else if (body.data == 1) {
      this.setState({ page: "Dashboard" })
    }
    else if (body.data == 2) {
      this.setState({ page: "Dashboard" })
    }
  }
  handleSignIn = async (event) => {
    console.log('New user');
    this.setState({ page: "Dashboard" })
  }
  render(){
    switch (this.state.page) {
      case "Dashboard":
        console.log("teach");
        return (
          <div>
            <Header
              toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
              isOpen={ this.state.isOpen }
            />
            <Calendar
              localizer={ localizer }
              defaultDate={ new Date() }
              defaultView="month"
              events={ this.state.events }
              style={ { height: "90vh" } }
              onSelectEvent={ this.editEvent }
            />
            <Modal isOpen={this.state.modal} className={'className'}>
              <ModalHeader toggle={this.exitEdit}>{ this.state.currTitle }</ModalHeader>
              <ModalBody>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Time</InputGroupText>
                  </InputGroupAddon>
                  <Input />
                </InputGroup>
                <br />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.saveEditEvent}>Save</Button>{' '}
                <Button color="secondary" onClick={this.exitEdit}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
      case "Teacher":
        return (
          <div>
            <Header
              toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
              isOpen={ this.state.isOpen }
            />
          </div>
        )
      case "Login":
        return (
          <div>
            <Header
              toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
              isOpen={ this.state.isOpen }
            />
            <Login validateForm={ this.validateForm }
              email=   { this.state.email }
              password={ this.state.password }
              setEmail=   { e => { this.setState({ email: e }) } }
              setPassword={ e => { this.setState({ password: e }) } }
              handleLogIn={ this.handleLogIn }
              handleSignIn={ e => { this.setState({ page: "SignIn" }) } }
            />
          </div>
        )
      case "SignIn":
        return (
          <div>
            <Header
              toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
              isOpen={ this.state.isOpen }
            />
            <SignIn validateForm={ this.validateForm }
              setEmail=   { e => { this.setState({ email: e }) } }
              setPassword={ e => { this.setState({ password: e }) } }
              handleSignIn={ this.handleSignIn }
              handleLogIn={ e => { this.setState({ page: "Login" }) } }
            />
          </div>
        )
      case "Admin":
        return (
          <div>
            <Header
              toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
              isOpen={ this.state.isOpen }
            />
          </div>
        )
      default:
        console.log("404PageNotFound");}
        return (
          <div>404PageNotFound</div>
        )
  }
}


function App() {
  return (
    <div className="App">
      <Body/>
    </div>
  );
}

export default App;
