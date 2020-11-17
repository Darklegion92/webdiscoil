import React, { Component } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { WrapperConsumer, ActionsTypes } from "../../../store";
class opcionesRutas extends Component {
  state = {
    documento: "",
    alerta: {
      tipo: "",
      visible: false,
      mensaje: "",
      titulo: ""
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state != nextState ||
      this.props.context.usuarios != nextProps.context.usuarios ||
      this.props.context.idUsuario_ruta != nextProps.context.idUsuario_ruta ||
      this.props.context.alerta != nextProps.context.alerta
    );
  }

  render() {
    const {
      usuarios,
      dispatch,
      idUsuario_ruta,
      alerta,
      diaSemana
    } = this.props.context;
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Seleccion Vendedor</Form.Label>
          <Form.Control
            as="select"
            onChange={e => {
              const idUsuario_ruta = e.target[e.target.selectedIndex].id;
              console.log(idUsuario_ruta);
              if (idUsuario_ruta)
                dispatch({
                  value: { idUsuario_ruta },
                  type: ActionsTypes.cambiarState
                });
              else {
                dispatch({
                  value: { idUsuario_ruta: "" },
                  type: ActionsTypes.cambiarState
                });
              }
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
        {idUsuario_ruta !== "" && (
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Seleccion Día</Form.Label>
            <Form.Control
              as="select"
              onChange={e => {
                const diaSemana = e.target[e.target.selectedIndex].id;
                if (diaSemana)
                  dispatch({
                    value: { diaSemana, cargarTabla: true },
                    type: ActionsTypes.cambiarState
                  });
                else {
                  dispatch({
                    value: { diaSemana: "", cargarTabla: true },
                    type: ActionsTypes.cambiarState
                  });
                }
              }}
            >
              <option>Seleccione...</option>
              <option id="1">LUNES</option>
              <option id="2">MARTES</option>
              <option id="3">MIERCOLES</option>
              <option id="4">JUEVES</option>
              <option id="5">VIERNES</option>
              <option id="6">SABADO</option>
              <option id="0">DOMINGO</option>
            </Form.Control>
          </Form.Group>
        )}
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Documento Cliente</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Ej: 1023569845"
            value={this.state.documento}
            onChange={e => {
              const documento = e.target.value;
              this.setState({ documento });
            }}
          />
        </Form.Group>
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
          variant="dark"
          type="submit"
          onClick={e => {
            e.preventDefault();
            if (idUsuario_ruta && diaSemana)
              if (this.state.documento) {
                dispatch({
                  value: {
                    documento: this.state.documento
                  },
                  type: ActionsTypes.crearRuta
                });
                this.setState({ documento: "" });
              } else {
                this.setState({
                  alerta: {
                    tipo: "warning",
                    visible: true,
                    mensaje: "Por favor Digite Documento Cliente",
                    titulo: "Campos Vacíos"
                  }
                });
              }
            else {
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
          Agregar
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
    );
  }
}
export default WrapperConsumer(opcionesRutas);
