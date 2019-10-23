import React from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {
  Calendar,
  momentLocalizer } from  'react-big-calendar'

import moment from 'moment'
// a localizer for BigCalendar
require('react-big-calendar/lib/css/react-big-calendar.css')
// var BigCalendar = require('react-big-calendar')
var localizer = momentLocalizer(moment)

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var d = new Dispatcher();

class Ball extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, dx: 1, dy: 1 };
    this.timerID = setInterval(
      () => this.update(),
      1000
    );
  }
  update(props) {
    this.setState({x: this.state.x + this.state.dx, y: this.state.y + this.state.dy})
    this.render()
  }
  render(){
    const x = (this.state.x.toString()+"px");
    const y = (this.state.y.toString()+"px");
    return (
      <button position="absolute" x={x} y={y}>Ball</button>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      TodoStore: { list: [] },
      isOpen: false,
      setIsOpen: false,
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ]
    };
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }

  _setStuff() { this.setState({ isOpen: !this.state.isOpen }); }

  render() {
    return (
      <div position="fixed" top="0" left="0" width="100%">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
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
        <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Teacher",
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ]
    };
  }
  // addEvent() {
  //   setState(
  //     events=this.events.push({
  //       start: ,
  //       end: ,
  //       title: ""
  //     })
  //   )
  // }
  render(){
    switch (this.state.page) {
      case "Teacher":
        console.log("teach");
        return (
          <div>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={this.state.events}
              style={{ height: "100vh" }}
            />
          </div>
        )
      case "Student":
        console.log("St");
        return <div/>
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
