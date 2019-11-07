import React from 'react';
import {
  Collapse,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';

class Header extends React.Component {
    goToAdmin(){
      if ( this.props.isAdmin ) {
        return (
          <NavItem>
            <NavLink onClick={ this.props.onGoAdmin }>Admin</NavLink>
          </NavItem>
        )
      }
      else { return (<div></div>) }
    }
    render() {
      return (
        <div position="fixed" top="0" left="0" width="100%">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">TeacherBoard</NavbarBrand>
            <NavbarToggler onClick={ this.props.toggle } />
            <Collapse isOpen={ this.props.isOpen } navbar>
              <Nav className="ml-auto" navbar>
                { this.goToAdmin() }
                <NavItem>
                  <NavLink href="https://github.com/BobMak/TeacherBoard">GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Account
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={ this.props.onGoDashboard }>
                      Dashboard
                    </DropdownItem>
                    <DropdownItem onClick={ this.props.onGoMySchedule }>
                      My Schedule
                    </DropdownItem>
                    <DropdownItem onClick={ this.props.onGoProfile }>
                      Propfile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={ this.props.onSignOut }>
                      Sign Out
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

export default Header;
