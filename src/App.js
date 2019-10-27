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

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TodoStore: { list: [] },
      isOpen: false,
      setIsOpen: false,
    };
  }
  // componentDidMount(){
  //
  // };
  render() {
    return (
      <div position="fixed" top="0" left="0" width="100%">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TeacherBoard</NavbarBrand>
          <NavbarToggler onClick={this._setStuff} />
          <Collapse isOpen={this.state.isOpen} navbar>
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
      email: "admin1853",
      password: "CAMS3onfwm563$",
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
      ]
    };
  }
  _parseJSON = (response) => {
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    });
  }
  getLessons = async () => {
    const response = await fetch(HOST+'lessons', { mode: "cors" });
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  componentDidMount() {
    this.getLessons()
      .then( res => console.log(res.status))
      .catch( err => console.log(err) )
    // const data = { login: this.state.email, passwod: this.state.passwod };
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   method: 'GET',  // POST
    //   mode: 'no-cors',
    //   // body: JSON.stringify(data)
    // };
    // // fetch('http://localhost:3001/students', options).then(res => res.json()).then(body => console.log(body));
    // fetch(HOST+'lessons', options)  // login
    //   .then(res => res.json() )
    //   .then(data => console.log('Data', data) )
    //   .catch(error => console.log('Error', error));
    // fetch('http://localhost:3001/students').then(res => res.json()).then(body => console.log(body));
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
  // chaechLogin = async () => {
  //   const response = await fetch('lessons');
  //   const body = await response.json();
  //   console.log(body);
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // }
  handleLogIn = async (event) => {
    console.log('Submit Event');
    this.setState({ page: "Student" })
    const data = { login: this.state.email, passwod: this.state.password };
    const options = {
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    };
    const res = await fetch(HOST+'login', options);
    const body = await res.json();
    console.log(body);
  }
  handleSignIn = (event) => {
    console.log('New user');
    this.setState({ page: "Student" })
  }
  setEmail = (val) => {
    this.setState({ email: val })
  }
  setPassword = (val) => {
    this.setState({ password: val })
  }
  render(){
    switch (this.state.page) {
      case "Student":
        console.log("teach");
        // var tit = this.state.currEvent.title;
        return (
          <div>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={this.state.events}
              style={{ height: "90vh" }}
              onSelectEvent={this.editEvent}
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
          <div></div>
        )
      case "Login":
        return (
          <Login validateForm={ this.validateForm }
            setEmail={ this.setEmail }
            setPassword={ this.setPassword }
            handleLogIn={ this.handleLogIn }
            handleSignIn={ e => { this.setState({ page: "SignIn" }) } }/>
        )
      case "SignIn":
        return (
          <SignIn validateForm={ this.validateForm }
            setEmail={ this.setEmail }
            setPassword={ this.setPassword }
            handleSignIn={ this.handleSignIn }
            handleLogIn={ e => { this.setState({ page: "Login" }) } }/>
        )
      case "Admin":
        return (
          <div></div>
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
      <Header/>
      <Body/>
    </div>
  );
}

export default App;
