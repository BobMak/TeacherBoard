import React from 'react';
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
var mysql = require('mysql');

// var Dispatcher = require('flux').Dispatcher;
// var assign = require('object-assign');
// var d = new Dispatcher();
//

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TodoStore: { list: [] },
      isOpen: false,
      setIsOpen: false,
    };
  }
  componentDidMount(){
    var connection = mysql.createConnection({
      host     : 'teacherboard.chrqjhfpa44g.us-east-2.rds.amazonaws.com',
      user     : 'admin1853',
      password : 'CAMS3onfwm563$',
      port     : '3306'
    });
    connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
      }
      console.log('Connected to database.');
    });
    connection.end();
  };
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
      email: "",
      password: "",
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
  handleLogIn = (event) => {
    console.log('Submit Event');
    this.setState({ page: "Student" })
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
