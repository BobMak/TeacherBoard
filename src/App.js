import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {
  Calendar,
  momentLocalizer } from  'react-big-calendar'
import moment from 'moment'

import Header  from './Header';
import Login   from './Login';
import SignIn  from './Signin';
import Info    from './Info';
import { post, get, makeid } from './Utils';
import Admin   from './Admin';
import Profile from './Profile';
import MySchedule from './MySchedule';

require('react-big-calendar/lib/css/react-big-calendar.css')
var localizer = momentLocalizer(moment)

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:             null,
      isAdminTeacher: null,
      email:          "a@", // User email
      addTeachEmail:    "", // Teacher email in add teacher window on Admin page
      password1:     "tea", 
      password2:        "",
      fullName: "New User",
      page:        "Login",
      modal:         false, // modal state for login/signIn
      opAddTeacher:  false, // modal state for add teacher on Admin page
      opAccDelete:   false, // modal state for account delete
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
      students:        {}, // All students in admin page
      teachers:        {}, 
      isOpen:       false, // Header state
      showInfo:     false, // Notification modal state
      typeInfo: 'success', // color
      textInfo:     'Yes', // text
      safeDelete:      "",
    };
  }
  componentDidMount = async () => {
    console.log('logging');
    this.getStudents();
    this.getTeachers();
  }
  getEeventName = e => {
    console.log('logging', this.state.currEvent.title);
    return this.state.currEvent.title
  }
  // When admin page is loaded
  getStudents = async () => {
    let res = await get( 'students' );
    var students = {};
    res.students.map( s => { students[s.id]={email: s.email, name: s.name} } );
    console.log('students are', students);
    this.setState( { students: students } );
  }
  // When admin page is loaded
  getTeachers = async () => {
    let res = await get( 'teachers' );
    var teachers = {};
    res.teachers.map( s => { teachers[s.id]={email: s.email, name: s.name} })
    console.log('teachers are', teachers)
    this.setState( { teachers: teachers } );
  }
  getAllLessons = async () => {
    let res = await get( 'getAllLessons' );
    console.log('got tescers', res)
    this.setState( { teachers: res.teachers } );
  }
  getMyLessons = async () => {
    console.log('getting lessons', this.state.id)
    let res = await post( 'getUserLessons', { id: this.state.id } );
    console.log('got lessons', res.lessons)
    this.setState( { events: res.lessons.map( (p => { 
      return { start: Date(p.time), end: Date(p.len), title: `${this.state.teachers[p.tid]} - ${this.state.students[p.sid]}` } 
    } )) } );
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
  validateLogin = () => {
    return this.state.email.length > 0 && this.state.password1.length > 0;
  }
  validateSignin = () => {
    return this.state.email.length > 0 && this.state.email.includes('@') && this.state.password1.length > 0 && this.state.password1===this.state.password2;
  }
  handleLogIn = async (event) => {
    const data = { login: this.state.email, password: this.state.password1 };
    const body = await post('login', data);
    console.log(body);
    if (body.data >= 0) {
      this.setState({ page: "Dashboard", id: body.id, isAdminTeacher: body.data })
      this.getMyLessons();
    }
    if (body.data === 2) {
      this.setState({ page: "Admin"})
    }
  }
  // When user creates account
  handleSignUp = async () => {
    console.log('New user');
    let res = await post('register', { email: this.state.email, password: this.state.password1, fullName: this.state.fullName } );
    if ( res.status == true ) { 
      this.setState({ page: "Dashboard" });
      this.showInfo( `Welcome, ${this.state.fullName}!`, "success");
    } 
  }
  handleGoogleSignIn = async (user) => {
    this.setState( { email: user.getEmail(), fullName: user.getName() } ); 
    const res = await post('userExists', { email: this.state.email });
    if ( res.status>-1 ) {
      this.setState({ page: "Dashboard", id: res.id, isAdminTeacher: res.status });
    }
    else {
      let reg = await post('register', { email: this.state.email, password: makeid(20), fullName: this.state.fullName } );
      if ( reg.status == true ) { 
        this.setState({ page: "Dashboard" });
        this.showInfo( `Welcome, ${this.state.fullName}!`, "success");
      } 
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
            validateForm={ this.validateLogin                          }
            email=       { this.state.email                           }
            password=    { this.state.password1                       }
            setEmail=    { e => { this.setState({ email: e }) }       }
            setPassword= { e => { this.setState({ password1: e }) }    }
            handleLogIn= { this.handleLogIn                           }
            handleSignIn={ e => { this.setState({ page: "SignIn" }) } }
            handleGoogleSignIn={ this.handleGoogleSignIn }
          />
        )
      case "SignIn":
        return (
          <SignIn 
            validateSignin={ this.validateSignin                      }
            setEmail=    { e => { this.setState({ email    : e }) }   }
            setName=     { e => { this.setState({ fullName : e }) }   }
            setPassword1={ e => { this.setState({ password1: e }) }   }
            setPassword2={ e => { this.setState({ password2: e }) }   }
            handleSignIn={ this.handleSignUp                         }
            handleLogIn= { e => { this.setState({ page: "Login" }) } }
          />
        )
      case "Admin":
        return (
          <Admin
            getStudents=  { (e) => this.getStudents() }
            students=     { this.state.students       }
            getTeachers=  { (e) => this.getTeachers() }
            teachers=     { this.state.teachers       }
            addTeacher=   { (e) => this.addTeacher()  }
            opAddTeacher= { this.state.opAddTeacher   }
            showAddTeach= { (e) => this.setState( {opAddTeacher: true  }) }
            hideAddTeach= { (e) => this.setState( {opAddTeacher: false }) }
            addTeachEmail={ this.state.addTeachEmail }
            setTeachEmail={ (e) => this.setState( {addTeachEmail: e} ) }
          />
        )
      case "Profile":
        return (
          <Profile
            email={ this.state.email }
            fullName={ this.state.fullName }
            deleteSelf={ () => { post('deleteUser', { email: this.state.email, password: this.state.password1 })  } }
            opAccDelete= { this.state.opAccDelete }
            showAccDelete= { (e) => this.setState( { opAccDelete: true } ) }
            hideAccDelete= { (e) => this.setState( { opAccDelete: false } ) }
            safeDelete=    { this.state.safeDelete }
            setSafe= { (e) => this.setState({safeDelete: e}) }
          />
        )
      default:
        return (<div>404NotFound</div>)
    }
  }    
  render(){
    return (
      <div>
        <Header
          toggle=          { e => { this.setState({ isOpen: !this.state.isOpen }) } }
          isOpen=          { this.state.isOpen }
          isAdmin=         { (this.state.isAdminTeacher===2) }
          onSignOut=       { () => { this.setState( {id: null, email: "", password1: "", page: 'Login'} ) } }
          onGoMySchedule = { () => { this.setState( { page: 'MySchedule' } ) } }
          onGoProfile=     { () => { this.setState( { page: 'Profile'    } ) } }
          onGoDashboard=   { () => { this.setState( { page: 'Dashboard'  } ) } }
          onGoAdmin=       { () => { this.setState( { page: 'Admin'      } ) } }
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
