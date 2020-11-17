import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { WrapperConsumer } from "../../store";

const styles = {
  wrapper: {
    height: 550,
    width: "100%",
    margin: "0 auto",
    display: "flex"
  },
  map: {
    flex: 1
  }
};
class Mapa extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.context.punteros !== nextProps.context.punteros;
  }

  myIcon = L.icon({
    iconUrl: "loc.png",
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [-1, -10],
    shadowUrl: "my-icon-shadow.png",
    shadowSize: [0, 0],
    shadowAnchor: [10, 10]
  });

  render() {
    const { punteros } = this.props.context;
    const { market } = this.props;
    return (
      <div style={styles.wrapper}>
        <Map
          center={[7.869940353376568, -72.50701904296875]}
          zoom={12}
          style={styles.map}
          id="mapID"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {!market &&
            punteros.length > 0 &&
            punteros.map(puntero => {
              const fecha = new Date(puntero.ultVisita);
              return (
                <Marker
                  position={[puntero.latitude, puntero.longitude]}
                  icon={this.myIcon}
                >
                  <Popup>
                    {puntero.nombre.toUpperCase()}
                    <br />
                    {puntero.direccion.toUpperCase()}
                    <br />
                    {fecha.toLocaleString()}
                  </Popup>
                </Marker>
              );
            })}
          {market && <Marker position={market} icon={this.myIcon}></Marker>}
        </Map>
      </div>
    );
  }
}
export default WrapperConsumer(Mapa);
