import React, { Component } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { WrapperConsumer, ActionsTypes } from "../../../store";
import "./styles.css";
class opcioneesMapa extends Component {
  state = {
    idUsuario: "",
    fecha: new Date(),
    alerta: {
      tipo: "",
      visible: false,
      mensaje: "",
      titulo: ""
    }
  };
  render() {
    const { usuarios, dispatch, alerta } = this.props.context;
    return (
      <div>
        <Form.Label>
          <h5>SEGUIMIENTO USUARIO</h5>
        </Form.Label>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Seleccione Usuario</Form.Label>
            <Form.Control
              as="select"
              onChange={e => {
                const idUsuario = e.target[e.target.selectedIndex].id;
                this.setState({ idUsuario });
              }}
            >
              <option>Seleccione...</option>
              {usuarios.map(usuario => {
                return (
                  <option id={usuario._id}>
                    {usuario.usuario.toUpperCase()}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <div className="datePicker-st">
            <DateTimePicker
              onChange={e => {
                this.setState({ fecha: e });
              }}
              value={this.state.fecha}
            />
          </div>
          {this.state.alerta.visible && (
            <Alert
              variant={this.state.alerta.tipo}
              onClose={() => this.setState({ alerta: { visible: false } })}
              dismissible
            >
              <Alert.Heading>{this.state.alerta.titulo}</Alert.Heading>
              <p>{this.state.alerta.mensaje}</p>
            </Alert>
          )}
          <Button
            variant="dark center"
            type="submit"
            onClick={e => {
              e.preventDefault();
              if (this.state.idUsuario && this.state.fecha) {
                dispatch({
                  value: {
                    fecha: this.state.fecha,
                    idUsuario: this.state.idUsuario
                  },
                  type: ActionsTypes.cargarMapa
                });
                this.setState({
                  alerta: {
                    tipo: "",
                    visible: false,
                    mensaje: "",
                    titulo: ""
                  }
                });
              } else {
                this.setState({
                  alerta: {
                    tipo: "warning",
                    visible: true,
                    mensaje: "Por favor Seleccione Un Usuario",
                    titulo: "Campos Vacíos"
                  }
                });
              }
            }}
          >
            Cargar
          </Button>
          <Modal
            show={alerta.modal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={e =>
              dispatch({
                value: {
                  alerta: { tipo: "", visible: false, mensaje: "", titulo: "" }
                },
                type: ActionsTypes.cambiarState
              })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {alerta.typeModal}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{alerta.mensajeModal}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={e =>
                  dispatch({
                    value: {
                      alerta: { modal: false, typeModal: "", mensajeModal: "" }
                    },
                    type: ActionsTypes.cambiarState
                  })
                }
              >
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    );
  }
}
export default WrapperConsumer(opcioneesMapa);
