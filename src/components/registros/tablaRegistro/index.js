import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-modal";
import { IoIosEye } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";
import { WrapperConsumer } from "../../../store";
import Mapa from "../../mapa";

class tablaRutero extends Component {
  state = {
    rutero: [],
    market: [],
    mapa: false
  };
  render() {
    const { punteros } = this.props.context;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Ult. Visita</th>
              <th>Novedad</th>
              <th>Localizacion</th>
            </tr>
          </thead>
          <tbody>
            {punteros.length > 0 &&
              punteros.map((puntero, i) => {
                const fecha = new Date(puntero.ultVisita);
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{puntero.documento}</td>
                    <td>{puntero.nombre.toUpperCase()}</td>
                    <td>{puntero.direccion.toUpperCase()}</td>
                    <td>{puntero.telefono}</td>
                    <td>{fecha.toLocaleString()}</td>
                    <td align="center">
                      {puntero.novedad && <IoIosEye size={30} />}
                    </td>
                    <td align="center">
                      {puntero.latitude && (
                        <FaMapMarkedAlt
                          size={30}
                          onClick={e =>
                            this.setState({
                              market: [puntero.latitude, puntero.longitude],
                              mapa: true
                            })
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Modal
          isOpen={this.state.mapa}
          contentLabel="Minimal Modal Example"
          onRequestClose={_ => {
            this.setState({ mapa: false });
          }}
        >
          <Mapa market={this.state.market} />
        </Modal>
      </div>
    );
  }
}

export default WrapperConsumer(tablaRutero);
