import React, { Component } from "react";
import Encabezado from "../encabezado";
import Tabla from './tablaRegistro';
import Opciones from './opcionesRegistro'

import "./styles.css";
export default class registro extends Component {
  render() {
    return (
      <div className="home-route">
        <div className="head-route">
          <Encabezado />
        </div>
        <div className="body-route">
          <div className="tabla">
            <Tabla/>
          </div>
          <div className="opciones">
            <Opciones/>
          </div>
        </div>
      </div>
    );
  }
}
