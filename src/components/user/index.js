import React, { Component } from "react";
import Encabezado from "../encabezado";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { WrapperConsumer, ActionsTypes } from "../../store";
import "./styles.css";
class user extends Component {
  state = {
    idUsuario_edit: "",
    password_edit: "",
    verifi_edit: "",
    usuario_new: "",
    password_new: "",
    verifi_new: "",
    nombre_new: "",
    alerta: {
      tipo: "",
      visible: false,
      mensaje: "",
      titulo: ""
    },
    alertaCambio: {
      tipo: "",
      visible: false,
      mensaje: "",
      titulo: ""
    }
  };
  render() {
    const { usuarios, dispatch, alerta } = this.props.context;
    return (
      <div className="home-user">
        <div className="head-user">
          <Encabezado />
        </div>
        <div className="body-user">
          <div className="nuevo">
            <Form>
              <Form.Label>
                <h3>CREACION DE USUARIOS</h3>
              </Form.Label>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Usuario"
                  value={this.state.usuario_new}
                  onChange={e => {
                    const value = e.target.value;
                    const usuario_new = value.toUpperCase();
                    this.setState({ usuario_new });
                  }}
                />
                <Form.Text className="text-muted">
                  *Digita el Usuarios a Crear
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre Completo"
                  value={this.state.nombre_new}
                  onChange={e => {
                    const value = e.target.value;
                    const nombre_new = value.toUpperCase();
                    this.setState({ nombre_new });
                  }}
                />
                <Form.Text className="text-muted">
                  *Digita el Nombre Completo del Usuario
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.password_new}
                  onChange={e => {
                    const password_new = e.target.value;
                    this.setState({ password_new });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.verifi_new}
                  onChange={e => {
                    const verifi_new = e.target.value;
                    this.setState({ verifi_new });
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
                variant="primary"
                type="submit"
                onClick={e => {
                  e.preventDefault();

                  if (
                    this.state.usuario_new &&
                    this.state.nombre_new &&
                    this.state.password_new &&
                    this.state.verifi_new
                  )
                    if (this.state.password_new === this.state.verifi_new) {
                      dispatch({
                        value: {
                          usuario: this.state.usuario_new,
                          password: this.state.password_new,
                          nombre: this.state.nombre_new
                        },
                        type: ActionsTypes.crearUsuario
                      });
                      this.setState({
                        password_new: "",
                        verifi_new: "",
                        nombre_new: "",
                        usuario_new: "",
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
                          mensaje: "Las Contraseñas No Coinciden",
                          titulo: "No Coinciden"
                        }
                      });
                    }
                  else {
                    this.setState({
                      alerta: {
                        tipo: "warning",
                        visible: true,
                        mensaje: "Todos Los Campos Son Obligatorios",
                        titulo: "Campos Vacíos"
                      }
                    });
                  }
                }}
              >
                Grabar
              </Button>
            </Form>
          </div>
          <div className="actualizar">
            <Form.Label>
              <h3>CAMBIO DE CLAVES</h3>
            </Form.Label>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Seleccione Usuario</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => {
                    const idUsuario_edit = e.target[e.target.selectedIndex].id;
                    this.setState({ idUsuario_edit });
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.password_edit}
                  onChange={e => {
                    const password_edit = e.target.value;
                    this.setState({ password_edit });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.verifi_edit}
                  onChange={e => {
                    const verifi_edit = e.target.value;
                    this.setState({ verifi_edit });
                  }}
                />
              </Form.Group>
              {this.state.alertaCambio.visible && (
                <Alert
                  variant={this.state.alertaCambio.tipo}
                  onClose={() =>
                    this.setState({ alertaCambio: { visible: false } })
                  }
                  dismissible
                >
                  <Alert.Heading>
                    {this.state.alertaCambio.titulo}
                  </Alert.Heading>
                  <p>{this.state.alertaCambio.mensaje}</p>
                </Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  if (this.state.idUsuario_edit)
                    if (this.state.password_edit && this.state.verifi_edit)
                      if (this.state.password_edit === this.state.verifi_edit) {
                        dispatch({
                          value: {
                            idUsuario: this.state.idUsuario_edit,
                            password: this.state.password_edit
                          },
                          type: ActionsTypes.actualizarUsuario
                        });
                        this.setState({
                          password_edit: "",
                          verifi_edit: "",
                          alertaCambio: {
                            tipo: "",
                            visible: false,
                            mensaje: "",
                            titulo: ""
                          }
                        });
                      } else {
                        this.setState({
                          alertaCambio: {
                            tipo: "warning",
                            visible: true,
                            mensaje: "Las Contraseñas No Coinciden",
                            titulo: "No Coinciden"
                          }
                        });
                      }
                    else {
                      this.setState({
                        alertaCambio: {
                          tipo: "warning",
                          visible: true,
                          mensaje: "Todos Los Campos Son Obligatorios",
                          titulo: "Campos Vacíos"
                        }
                      });
                    }
                  else {
                    this.setState({
                      alertaCambio: {
                        tipo: "warning",
                        visible: true,
                        mensaje: "Seleccione Usuario",
                        titulo: "Usuario No Valido"
                      }
                    });
                  }
                }}
              >
                Grabar
              </Button>
            </Form>
          </div>
        </div>
        <Modal
          show={alerta.modal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
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
      </div>
    );
  }
}

export default WrapperConsumer(user);
