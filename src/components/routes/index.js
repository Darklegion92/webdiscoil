import React, { Component } from "react";
import Encabezado from "../encabezado";
import Tabla from '../tablaRutero';
import Opciones from './opcionesRutas'

import "./styles.css";
export default class routes extends Component {
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
