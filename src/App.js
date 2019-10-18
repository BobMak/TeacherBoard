import React from 'react';
import logo from './logo.svg';
import imag from './images.jpg';
import './App.css';

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

class TestMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0, TodoStore: { list: [] }};
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = imag

    ctx.onload = () => {
      ctx.drawImage(imag, 0, 0)
      ctx.font = "40px Courier"
      ctx.fillText(this.props.text, 210, 75)
    }
    canvas.onclick = (event) => {
      const x = event.layerX
      const y = event.layerY
      this.setState({ x: x, y: y});
      ctx.fillRect(x, y, 10, 10)
    }
    canvas.onMouseOver = (event) => {
      const x = event.clientX
      const y = event.clientY
    }
  }
  render() {
    const { x, y } = this.state;
    return (
      <div className="shopping-list">
        <h1>Mouse coordinates: { x } { y }</h1>
        <canvas ref="canvas" width={840} height={625} />
        <Ball></Ball>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestMap text='sauce'>Yes!</TestMap>
      </header>
    </div>
  );
}

export default App;
