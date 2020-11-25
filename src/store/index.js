import React, { Component, createContext } from 'react'
import reducer from './reducer'
import ActionsTypes from './actionsTypes'
import CONSTANTES from '../config/CONSTANTES'
import axios from 'axios'
const { Provider, Consumer } = createContext()

class ContextStore extends Component {
  state = {
    usuarios: [],
    alerta: { modal: false, typeModal: '', mensajeModal: '' },
    idUsuario_ruta: '',
    cargarTabla: false,
    punteros: [],
    diaSemana: '',
    consultarLocalizacion: async datos => {
      const punteros = await axios.get(CONSTANTES.APIREST + '/localizacion', {
        params: {
          idUsuario: datos.idUsuario,
          fecha: datos.fecha
        }
      })
      console.log(punteros)
      if (punteros.data.res.length > 0)
        this.setState({ punteros: punteros.data.res })
      else {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Sin Datos',
            mensajeModal: 'No Existen Datos Para Visualizar'
          }
        })
      }
    },
    consultarRuta: async datos => {
      const punteros = await axios.get(CONSTANTES.APIREST + '/rutas/usuario', {
        params: {
          idUsuario: datos.idUsuario,
          fecha: datos.fecha
        }
      })

      if (punteros.data.length > 0) this.setState({ punteros: punteros.data })
      else {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Sin Datos',
            mensajeModal: 'No Existen Datos Para Visualizar'
          }
        })
      }
    },
    consultarCliente: async datos => {
      var cliente
      try {
        cliente = await axios.get(
          CONSTANTES.APIREST + '/clientes/consultar/documento/' + datos
        )

        if (cliente.status === 200) {
          return cliente
        } else
          this.setState({
            alerta: {
              modal: true,
              typeModal: 'Error',
              mensajeModal:
                'El Cliente Con Documento: ' + datos + ' No Existe En SIIGO'
            }
          })
      } catch (error) {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Error',
            mensajeModal: 'Se ha prensentado un error ' + error.getMessage()
          }
        })
      }
    },
    guardarRuta: async datos => {
      try {
        const { Identification, Phone, FullName, IdSiigo, Address } = datos
        console.log(datos)
        await axios.post(CONSTANTES.APIREST + '/rutas/guardar', {
          documento: Identification,
          telefono: Phone.Number,
          nombre: FullName,
          idUsuario: this.state.idUsuario_ruta,
          idSIIGO: IdSiigo,
          direccion: Address,
          barrio: '',
          diaSemana: this.state.diaSemana
        })
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Correcto',
            mensajeModal: 'Cliente Agregado Correctamente'
          },
          cargarTabla: true
        })
      } catch (error) {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Error',
            mensajeModal: 'Se ha prensentado un error ' + error
          }
        })
      }
    },
    actualizarUsuario: async datos => {
      try {
        const res = await axios.post(
          CONSTANTES.APIREST + '/usuario/actualizar',
          {
            id: datos.idUsuario,
            password: datos.password
          }
        )
        console.log(res)

        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Correcto',
            mensajeModal: 'Usuario Actualizado Corractamente'
          }
        })
      } catch (error) {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Error',
            mensajeModal: 'Se ha prensentado un error ' + error
          }
        })
        console.log(error)
      }
    },
    crearUsuario: async datos => {
      try {
        await axios.post(CONSTANTES.APIREST + '/usuario/guardar', {
          usuario: datos.usuario,
          password: datos.password,
          nombre: datos.nombre
        })
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Correcto',
            mensajeModal: 'Usuario Creado Corractamente'
          }
        })
      } catch (error) {
        this.setState({
          alerta: {
            modal: true,
            typeModal: 'Error',
            mensajeModal: 'Se ha prensentado un error ' + error
          }
        })
        console.log(error)
      }
    },
    dispatch: async action => {
      const response = await reducer(this.state, action)
      this.setState(response)
    }
  }

  componentDidMount () {
    this.cargarDatosIniciales()
  }
  render () {
    return <Provider value={this.state}>{this.props.comp}</Provider>
  }

  /*Funciones*/

  cargarDatosIniciales = async () => {
    try {
      const res = await axios.get(CONSTANTES.APIREST + '/usuario/consultar')
      this.setState({ usuarios: res.data })
    } catch (error) {
      console.log(error)
    }
  }
}
const WrapperConsumer = Component => {
  return props => {
    return (
      <Consumer>
        {context => <Component {...props} context={context} />}
      </Consumer>
    )
  }
}

export { Provider, WrapperConsumer, ContextStore, Consumer, ActionsTypes }
