import React, { useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader, CardFooter,
  Row, Col,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {
  Calendar,
  momentLocalizer 
} from  'react-big-calendar'
import moment from 'moment'
require('react-big-calendar/lib/css/react-big-calendar.css')
var localizer = momentLocalizer(moment)

class Admin extends React.Component {
  showStudent = ( student ) => {
    return (
      <Card style={{marginBottom:"5px"}}>
        <CardBody>
          <div style={{display:"inline-block"}}>{ student.name }</div>
          <Button style={{float:"right"}}>{ 'Remove' }</Button>
        </CardBody>
      </Card>
    )
  }
  showTeacher = ( teacher ) => {
    return (
      <Card style={{marginBottom:"5px"}}>
        <CardBody>
          <div style={{display:"inline-block"}}>{ teacher.name }</div>
          <Button style={{float:"right"}}>{ 'Remove' }</Button>
        </CardBody>
      </Card>
    )
  }
  render(){
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
  }
}

export default Admin;
