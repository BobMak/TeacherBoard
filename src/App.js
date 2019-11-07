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
import Info from './Info';
import { post, get } from './Utils';
import Admin from './Admin';

require('react-big-calendar/lib/css/react-big-calendar.css')
var localizer = momentLocalizer(moment)

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
                <NavLink href="https://github.com/BobMak/TeacherBoard">GitHub</NavLink>
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
      email:          "a@", // User email
      addTeachEmail:    "", // Teacher email in add teacher window on Admin page
      password:      "tea", 
      fullName: "New User",
      page:        "Login",
      modal:         false, // modal state for login/signIn
      opAddTeacher:  false, // modal state for add teacher on Admin page
      currTitle:        "", // Current event title
      currEvent:      null, // The event currently modified in the modal
      oldEvent:       null, // To find index in events on change
      events: [
        {
          start: new Date(),
          end:   new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ],
      students:        [], // All students in admin page
      teachers:        [], 
      isOpen:       false, // Header state
      showInfo:     false, // Notification modal state
      typeInfo: 'success', // color
      textInfo:     'Yes', // text
    };
  }
  componentDidMount = async () => {
    console.log('logging');
  }
  getEeventName = e => {
    console.log('logging', this.state.currEvent.title);
    return this.state.currEvent.title
  }
  // When admin page is loaded
  getStudents = async () => {
    let res = await get( 'students' );
    console.log('got students', res)
    this.setState( { students: res.students } );
  }
  // When admin page is loaded
  getTeachers = async () => {
    let res = await get( 'teachers' );
    console.log('got tescers', res)
    this.setState( { teachers: res.teachers } );
  }
  editEvent = (event, e) => {
    console.log('yes', event, e);
    this.setState({
      currTitle: event.title,
      currEvent: event,
      oldEvent:  event,
      modal: !this.state.modal });
  }
  saveEditEvent = e => {
    var index = this.state.events.indexOf(this.state.oldEvent)
    var evs = this.state.events
    evs[index] = this.state.currEvent
    console.log('old event index', index);
    this.setState({
      currEvent: null,
      oldEvent:  null,
      modal:    !this.state.modal,
      events:    evs });
  }
  exitEdit = e => {
    this.setState({
      currEvent: null,
      oldEvent:  null,
      modal:    !this.state.modal });
  }
  // When admin adds the specified email
  addTeacher = async () => {
    let res = await post( 'addTeacher', { email: this.state.addTeachEmail } );
    if (res.status===0) {
      this.showInfo( `Added ${this.state.addTeachEmail} to teachers`, "success");
    }
    else if (res.status===1) {
      this.showInfo( `Can't add ${this.state.addTeachEmail} to teachers`, "warning");
    }
    else {
      this.showInfo( `Can't add ${this.state.addTeachEmail} to teachers`, "danger");
    }
    this.setState( {opAddTeacher: false });
  }
  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleLogIn = async (event) => {
    const data = { login: this.state.email, password: this.state.password };
    const body = await post('login', data);
    console.log(body);
    if (body.data === 0) {
      this.setState({ page: "Dashboard" })
    }
    else if (body.data === 1) {
      this.setState({ page: "Dashboard" })
    }
    else if (body.data === 2) {
      this.setState({ page: "Admin" })
    }
  }
  // When user creates account
  handleSignUp = async (event) => {
    console.log('New user');
    let res = await post('register', { email: this.state.email, password: this.state.password, fullName: this.state.fullName } );
    if ( res.status == true ) { 
      this.setState({ page: "Dashboard" });
      this.showInfo( `Welcome, ${this.state.fullName}!`, "success");
    } 
  }
  showInfo(message, type) {
    this.setState( {showInfo: true, textInfo: message, typeInfo: type} )
    setTimeout( () => { this.setState( {showInfo: false} ) }, 3000 );
  }
  view(){
    switch (this.state.page) {
      case "Dashboard":
        return (
          <div>
            <Calendar
              localizer=    { localizer }
              defaultDate=  { new Date() }
              defaultView=  "week"
              events=       { this.state.events }
              style=        { { height: "90vh" } }
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
                <Button color="primary"   onClick={this.saveEditEvent}>Save</Button>{' '}
                <Button color="secondary" onClick={this.exitEdit}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
      case "Teacher":
        return (
          <Header
            toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
            isOpen={ this.state.isOpen }
          />
        )
      case "Login":
        return (
          <Login 
            validateForm={ this.validateForm                          }
            email=       { this.state.email                           }
            password=    { this.state.password                        }
            setEmail=    { e => { this.setState({ email: e }) }       }
            setPassword= { e => { this.setState({ password: e }) }    }
            handleLogIn= { this.handleLogIn                           }
            handleSignIn={ e => { this.setState({ page: "SignIn" }) } }
          />
        )
      case "SignIn":
        return (
          <SignIn 
            validateForm={ this.validateForm                         }
            setEmail=    { e => { this.setState({ email   : e }) }   }
            setName=     { e => { this.setState({ fullName: e }) }   }
            setPassword= { e => { this.setState({ password: e }) }   }
            handleSignIn={ this.handleSignUp                         }
            handleLogIn= { e => { this.setState({ page: "Login" }) } }
          />
        )
      case "Admin":
        return (
          <Admin
            getStudents= { (e) => this.getStudents() }
            students=    { this.state.students       }
            getTeachers= { (e) => this.getTeachers() }
            teachers=    { this.state.teachers       }
            addTeacher=  { (e) => this.addTeacher() }
            opAddTeacher={ this.state.opAddTeacher   }
            showAddTeach={ (e) => this.setState( {opAddTeacher: true  }) }
            hideAddTeach={ (e) => this.setState( {opAddTeacher: false }) }
            addTeachEmail={ this.state.addTeachEmail }
            setTeachEmail={ (e) => this.setState( {addTeachEmail: e} ) }
          />
        )
      default:
        return (<div>404PageNotFound</div>)
    }
  }    
  render(){
    return (
      <div>
        <Header
          toggle={ e => { this.setState({ isOpen: !this.state.isOpen }) } }
          isOpen={ this.state.isOpen }
        />
        <Info
          visible = { this.state.showInfo }
          typeInfo ={ this.state.typeInfo }
          text =    { this.state.textInfo }
        />
        { this.view() }
      </div> );
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
