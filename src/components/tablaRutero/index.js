import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { WrapperConsumer, ActionsTypes } from "../../store";
import CONSTANTES from "../../config/CONSTANTES";

class tablaRutero extends Component {
  constructor() {
    super();
    this.state = {
      rutero: [],
    };
  }

  componentDidUpdate() {
    this.cargatDatos();
  }
  cargatDatos = () => {
    const { idUsuario_ruta, dispatch, diaSemana } = this.props.context;
    if (idUsuario_ruta) {
      try {
        axios
          .get(CONSTANTES.APIREST + "/rutas/dia", {
            params: {
              idUsuario: idUsuario_ruta,
              diaSemana,
            },
          })
          .then((res) => {
            const rutero = res.data;
            dispatch({
              value: { cargarTabla: false },
              type: ActionsTypes.cambiarState,
            });
            this.setState({ rutero });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.context.cargarTabla;
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Ult. Visita</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rutero.length > 0 &&
            this.state.rutero.map((ruta, i) => {
              const fecha = new Date(ruta.ultVisita);
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{ruta.documento}</td>
                  <td>{ruta.nombre.toUpperCase()}</td>
                  <td>{ruta.direccion.toUpperCase()}</td>
                  <td>{ruta.telefono}</td>
                  <td>
                    {fecha.toLocaleString() === "Invalid Date"
                      ? "SIN FECHA"
                      : fecha.toLocaleString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default WrapperConsumer(tablaRutero);
