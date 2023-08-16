import React from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import image from "../../../assets/images/marker.png"
import { Grid } from '@mui/material';

export const BasicMarkedMap = ({ lat, long }) => {
    const position = [lat, long]
    return (
        <>
            <Grid>
                <MapContainer
                    style={{ width: "100%", height: "67vh" }}
                    zoom={13}
                    center={position}
                    scrollWheelZoom={false}
                    fadeAnimation={true}
                    markerZoomAnimation={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}
                    icon={new Icon({iconUrl: image, iconSize: [100, 81]})}
                    >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid>
        </>
    )
}
