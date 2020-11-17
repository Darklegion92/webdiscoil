import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./styles.css";

class MenuContent extends Component {
  constructor(props) {
    super(props);

    this.items = [];
    for (let i = 1; i <= 5; i++) {
      this.items.push(i);
    }
  }

  render() {
    return (
      <div className="menu">
        <div className="titulo">
          <Image src="logo.png" fluid />
        </div>

        <div className="menu-item">
          <a href="/map" onClick={this.props.closeCallback}>
            Segumiento GPS
          </a>
        </div>
        <div className="menu-item">
          <a href="/user" onClick={this.props.closeCallback}>
            Gestión Usuarios
          </a>
        </div>
        <div className="menu-item">
          <a href="/routes" onClick={this.props.closeCallback}>
            Gestión Rutas
          </a>
        </div>
        <div className="menu-item">
          <a href="/registros" onClick={this.props.closeCallback}>
            Registro Rutas
          </a>
        </div>
      </div>
    );
  }
}

/*MenuContent.PropTypes = {
  closeCallback: React.PropTypes.func.isRequired
};*/

export default MenuContent;
