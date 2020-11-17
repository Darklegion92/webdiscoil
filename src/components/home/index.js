import React, { Component } from "react";
import Encabezado from "../encabezado";

import Mapa from "../mapa";
import OpcionesMapa from "../mapa/opcionesMapa";
import { WrapperConsumer } from "../../store/";
import "./styles.css";

class home extends Component {
  render() {
    return (
      <div className="home-main">
        <div className="head-home">
          <Encabezado />
        </div>
        <div className="body-home">
          <div className="opciones">
            <OpcionesMapa />
          </div>
          <div className="mapa">
            <Mapa />
          </div>
        </div>
      </div>
    );
  }
}

export default WrapperConsumer(home);
