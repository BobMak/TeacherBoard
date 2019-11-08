import React, { useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader, CardFooter,
  Row, Col,
  InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

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
        <Modal isOpen={ this.props.opAddTeacher }>
        <ModalHeader>
          { "Add teacher" }
        </ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input placeholder="teacher@email"
              autoFocus
              type="email"
              value={this.props.addTeachEmail}
              onChange={e => this.props.setTeachEmail(e.target.value)}/>
          </InputGroup>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button onClick={ this.props.addTeacher } style={{display: "inline-block"}}>{ "Submit" }</Button>
          <Button onClick={ this.props.hideAddTeach } style={{float: "right"}} color={"danger"}>{ "Cancel" }</Button>
        </ModalFooter>
      </Modal>
        <Row>
          <Col style={{margin:"10px"}}>
            <Card>
              <CardHeader>{ "Students" }</CardHeader>
              <CardBody>
                { Object.values(this.props.students).map( (st) => this.showStudent(st) ) }
              </CardBody>
            </Card>
          </Col>
          <Col style={{margin:"10px"}}>
            <Card>
              <CardHeader>{ "Teachers" }</CardHeader>
              <CardBody>
                { Object.values(this.props.teachers).map( (tc) => this.showTeacher(tc) ) }
              </CardBody>
              <CardFooter>
                <Button onClick={ this.props.showAddTeach }>{ "Add teacher" }</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin;
