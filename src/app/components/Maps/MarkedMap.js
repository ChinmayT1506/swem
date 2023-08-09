import { Map } from 'leaflet';
import React, { useRef } from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';


export const BasicMarkedMap = () => {
    return (
        <Map center={[51.505, -0.091]} zoom={13}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.091]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
    )
}
